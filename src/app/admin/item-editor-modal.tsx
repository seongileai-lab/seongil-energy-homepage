'use client';

import { useState } from 'react';
import type { HubItem } from '@/lib/content-types';
import MediaUpload from '@/components/admin/media-upload';
import MultiImageUpload from '@/components/admin/multi-image-upload';
import MultiFileUpload from '@/components/admin/multi-file-upload';

export default function ItemEditorModal({
  item,
  onSave,
  onClose,
}: {
  item: HubItem;
  onSave: (item: HubItem) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<HubItem>(item);

  function set<K extends keyof HubItem>(key: K, value: HubItem[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15, 23, 42, 0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}
    >
      <div
        style={{
          background: '#fff', width: '100%', maxWidth: 760, maxHeight: '90vh', borderRadius: 12,
          display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>항목 편집</h2>
          <button type="button" onClick={onClose} style={{ fontSize: '1.3rem', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>
            ×
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          <div className="form-group">
            <label>제목</label>
            <input
              className="form-control"
              value={draft.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="제목을 입력하세요"
              style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}
            />
          </div>

          <div className="form-group">
            <label>목록 카드 - 배지(뱃지) 텍스트</label>
            <input className="form-control" value={draft.badge} onChange={(e) => set('badge', e.target.value)} />
          </div>

          <div className="form-group">
            <label>목록 카드 - 요약 설명</label>
            <textarea className="form-control" value={draft.desc} onChange={(e) => set('desc', e.target.value)} />
          </div>

          <MediaUpload label="목록 카드 - 썸네일 이미지" value={draft.thumbnailUrl} onChange={(url) => set('thumbnailUrl', url)} />

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '20px 0' }} />

          <div className="form-group">
            <label>상세 페이지 - 본문 (블로그 글쓰기처럼 자유롭게 작성하세요)</label>
            <textarea
              className="form-control"
              style={{ minHeight: 220, fontSize: '0.95rem', lineHeight: 1.7 }}
              value={draft.detailDesc}
              onChange={(e) => set('detailDesc', e.target.value)}
            />
          </div>

          <MultiImageUpload
            label="상세 페이지 - 이미지 (여러 장 등록 가능)"
            values={draft.detailImages}
            onChange={(images) => set('detailImages', images)}
          />

          <div className="form-group">
            <label>상세 페이지 - 동영상 임베드 URL (선택, 유튜브 등)</label>
            <input
              className="form-control"
              placeholder="https://www.youtube.com/embed/..."
              value={draft.detailVideoUrl}
              onChange={(e) => set('detailVideoUrl', e.target.value)}
            />
          </div>

          <MultiFileUpload
            label="첨부파일 (여러 개 등록 가능, PDF/문서/이미지 등)"
            values={draft.attachments}
            onChange={(attachments) => set('attachments', attachments)}
          />

          <div className="form-group" style={{ borderBottom: 'none' }}>
            <label className="switch-label">
              <input
                type="checkbox"
                checked={draft.showContactCta}
                onChange={(e) => set('showContactCta', e.target.checked)}
              />
              상세 페이지 하단에 &quot;문의하기&quot; 버튼 표시 (Contact 페이지로 이동)
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, padding: '16px 24px', borderTop: '1px solid #e2e8f0' }}>
          <button
            type="button"
            onClick={onClose}
            style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #cbd5e1', background: '#fff', color: '#334155', fontWeight: 600, cursor: 'pointer' }}
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => onSave(draft)}
            className="btn-save-inline"
            style={{ flex: 2, marginTop: 0 }}
          >
            적용하고 닫기 (전체 저장 버튼을 눌러야 실제 반영됩니다)
          </button>
        </div>
      </div>
    </div>
  );
}
