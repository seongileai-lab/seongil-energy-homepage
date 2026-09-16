'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface MediaUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  guideText?: string;
}

export default function MediaUpload({ label, value, onChange, accept = 'image/*', guideText }: MediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from('media').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (uploadError) {
      setError('업로드 실패: ' + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('media').getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="form-group">
      <label>{label}</label>
      {guideText && <div className="guide-text">{guideText}</div>}
      <input type="file" accept={accept} className="form-control" onChange={handleFileChange} disabled={uploading} />
      {uploading && <p className="mt-1 text-xs text-blue-600">업로드 중...</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {value && (
        <div className="mt-2 flex items-center gap-2">
          {accept.startsWith('video') ? (
            <video src={value} className="h-16 rounded border border-slate-200" muted />
          ) : accept.startsWith('image') ? (
            <img src={value} alt="" className="h-16 rounded border border-slate-200 object-cover" />
          ) : (
            <a href={value} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline">
              업로드된 파일 열기
            </a>
          )}
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-xs font-semibold text-red-600 hover:underline"
          >
            제거
          </button>
        </div>
      )}
    </div>
  );
}
