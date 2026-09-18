'use client';

import type { AboutConfig } from '@/lib/content-types';
import MediaUpload from '@/components/admin/media-upload';

export default function AboutEditor({ about, onChange }: { about: AboutConfig; onChange: (about: AboutConfig) => void }) {
  function set<K extends keyof AboutConfig>(key: K, value: AboutConfig[K]) {
    onChange({ ...about, [key]: value });
  }

  return (
    <div>
      <div className="form-group">
        <label>페이지 제목 / 서브 문구</label>
        <input className="form-control" value={about.heading} onChange={(e) => set('heading', e.target.value)} />
        <textarea className="form-control" style={{ marginTop: 6 }} value={about.subDesc} onChange={(e) => set('subDesc', e.target.value)} />
      </div>

      <MediaUpload label="상단 배너 이미지 (선택)" value={about.bannerUrl} onChange={(url) => set('bannerUrl', url)} />

      <div className="form-group">
        <label>회사 소개 본문</label>
        <textarea
          className="form-control"
          style={{ minHeight: 260 }}
          value={about.body}
          onChange={(e) => set('body', e.target.value)}
        />
      </div>
    </div>
  );
}
