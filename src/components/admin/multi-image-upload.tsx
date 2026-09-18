'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function MultiImageUpload({
  label,
  values,
  onChange,
  guideText,
}: {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
  guideText?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setError('');

    const supabase = createClient();
    const uploaded: string[] = [];

    for (const file of files) {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('media').upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (uploadError) {
        setError('업로드 실패: ' + uploadError.message);
        continue;
      }
      const { data } = supabase.storage.from('media').getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    onChange([...values, ...uploaded]);
    setUploading(false);
    e.target.value = '';
  }

  function removeAt(i: number) {
    onChange(values.filter((_, idx) => idx !== i));
  }

  return (
    <div className="form-group">
      <label>{label}</label>
      {guideText && <div className="guide-text">{guideText}</div>}
      <input type="file" accept="image/*" multiple className="form-control" onChange={handleFilesChange} disabled={uploading} />
      {uploading && <p className="mt-1 text-xs text-blue-600">업로드 중...</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {values.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {values.map((url, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <img src={url} alt="" style={{ height: 64, width: 64, objectFit: 'cover', borderRadius: 6, border: '1px solid #e2e8f0' }} />
              <button
                type="button"
                onClick={() => removeAt(i)}
                style={{
                  position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%',
                  background: '#ef4444', color: '#fff', fontSize: 12, border: 'none', cursor: 'pointer', lineHeight: '20px',
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
