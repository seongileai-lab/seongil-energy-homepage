'use client';

import { useState } from 'react';
import type { HubConfig, HubItem } from '@/lib/content-types';
import MediaUpload from '@/components/admin/media-upload';

function newItem(): HubItem {
  return {
    id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: '새 항목',
    desc: '',
    badge: '',
    thumbnailUrl: '',
    detailImageUrl: '',
    detailVideoUrl: '',
    detailDesc: '',
    fileUrl: '',
    fileName: '',
  };
}

export default function HubEditor({ hub, onChange }: { hub: HubConfig; onChange: (hub: HubConfig) => void }) {
  const [openId, setOpenId] = useState<string | null>(null);

  function setField<K extends keyof HubConfig>(key: K, value: HubConfig[K]) {
    onChange({ ...hub, [key]: value });
  }

  function setItem(id: string, patch: Partial<HubItem>) {
    onChange({ ...hub, items: hub.items.map((it) => (it.id === id ? { ...it, ...patch } : it)) });
  }

  function addItem() {
    const item = newItem();
    onChange({ ...hub, items: [...hub.items, item] });
    setOpenId(item.id);
  }

  function deleteItem(id: string) {
    if (!confirm('이 항목을 삭제하시겠습니까?')) return;
    onChange({ ...hub, items: hub.items.filter((it) => it.id !== id) });
  }

  return (
    <div>
      <div className="form-group">
        <label>목록 메인 제목 / 설명</label>
        <input className="form-control" value={hub.mainTitle} onChange={(e) => setField('mainTitle', e.target.value)} />
        <textarea className="form-control" style={{ marginTop: 6 }} value={hub.mainDesc} onChange={(e) => setField('mainDesc', e.target.value)} />
      </div>

      <MediaUpload label="상단 배너 이미지" value={hub.bannerUrl} onChange={(url) => setField('bannerUrl', url)} />

      <div className="form-group">
        <label>목록 섹션 제목 / 설명</label>
        <input className="form-control" value={hub.subTitle} onChange={(e) => setField('subTitle', e.target.value)} />
        <textarea className="form-control" style={{ marginTop: 6 }} value={hub.subDesc} onChange={(e) => setField('subDesc', e.target.value)} />
      </div>

      <button type="button" className="btn-add-item" onClick={addItem}>+ 새 항목 추가</button>

      {hub.items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className={`manage-card${isOpen ? ' is-open' : ''}`}>
            <div className="manage-head" onClick={() => setOpenId(isOpen ? null : item.id)}>
              <span className="manage-title">{item.title || '(제목 없음)'}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button type="button" className="btn-item-toggle" onClick={(e) => { e.stopPropagation(); setOpenId(isOpen ? null : item.id); }}>
                  {isOpen ? '접기' : '편집'}
                </button>
                <button type="button" className="btn-item-delete" onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}>삭제</button>
              </div>
            </div>
            {isOpen && (
              <div className="accordion-body">
                <div className="form-group">
                  <label>목록 카드 - 제목</label>
                  <input className="form-control" value={item.title} onChange={(e) => setItem(item.id, { title: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>목록 카드 - 요약 설명</label>
                  <textarea className="form-control" value={item.desc} onChange={(e) => setItem(item.id, { desc: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>목록 카드 - 배지(뱃지) 텍스트</label>
                  <input className="form-control" value={item.badge} onChange={(e) => setItem(item.id, { badge: e.target.value })} />
                </div>
                <MediaUpload label="목록 카드 - 썸네일 이미지" value={item.thumbnailUrl} onChange={(url) => setItem(item.id, { thumbnailUrl: url })} />

                <div className="form-group">
                  <label>상세 페이지 - 본문 설명</label>
                  <textarea className="form-control" value={item.detailDesc} onChange={(e) => setItem(item.id, { detailDesc: e.target.value })} />
                </div>
                <MediaUpload label="상세 페이지 - 이미지 (동영상 URL이 없을 때 표시)" value={item.detailImageUrl} onChange={(url) => setItem(item.id, { detailImageUrl: url })} />
                <div className="form-group">
                  <label>상세 페이지 - 동영상 임베드 URL (선택, 유튜브 등)</label>
                  <input className="form-control" placeholder="https://www.youtube.com/embed/..." value={item.detailVideoUrl} onChange={(e) => setItem(item.id, { detailVideoUrl: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>첨부파일 표시명</label>
                  <input className="form-control" value={item.fileName} onChange={(e) => setItem(item.id, { fileName: e.target.value })} />
                </div>
                <MediaUpload
                  label="첨부파일 업로드 (PDF 등)"
                  value={item.fileUrl}
                  onChange={(url) => setItem(item.id, { fileUrl: url })}
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
