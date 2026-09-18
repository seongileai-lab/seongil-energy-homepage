'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Attachment } from '@/lib/content-types';

export default function MultiFileUpload({
  label,
  values,
  onChange,
  guideText,
}: {
  label: string;
  values: Attachment[];
  onChange: (files: Attachment[]) => void;
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
    const uploaded: Attachment[] = [];

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
      uploaded.push({ url: data.publicUrl, name: file.name });
    }

    onChange([...values, ...uploaded]);
    setUploading(false);
    e.target.value = '';
  }

  function removeAt(i: number) {
    onChange(values.filter((_, idx) => idx !== i));
  }

  function renameAt(i: number, name: string) {
    onChange(values.map((f, idx) => (idx === i ? { ...f, name } : f)));
  }

  return (
    <div className="form-group">
      <label>{label}</label>
      {guideText && <div className="guide-text">{guideText}</div>}
      <input
        type="file"
        accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
        multiple
        className="form-control"
        onChange={handleFilesChange}
        disabled={uploading}
      />
      {uploading && <p className="mt-1 text-xs text-blue-600">업로드 중...</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {values.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
          {values.map((file, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                className="form-control"
                value={file.name}
                onChange={(e) => renameAt(i, e.target.value)}
                style={{ flex: 1 }}
              />
              <a href={file.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline" style={{ whiteSpace: 'nowrap' }}>
                열기
              </a>
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="text-xs font-semibold text-red-600 hover:underline"
                style={{ whiteSpace: 'nowrap' }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
