'use client';

import { useState } from 'react';
import type { HubConfig, HubItem } from '@/lib/content-types';
import MediaUpload from '@/components/admin/media-upload';
import ItemEditorModal from './item-editor-modal';

function newItem(): HubItem {
  return {
    id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: '새 항목',
    desc: '',
    badge: '',
    thumbnailUrl: '',
    detailImages: [],
    detailVideoUrl: '',
    detailDesc: '',
    attachments: [],
    showContactCta: false,
  };
}

export default function HubEditor({ hub, onChange }: { hub: HubConfig; onChange: (hub: HubConfig) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);

  function setField<K extends keyof HubConfig>(key: K, value: HubConfig[K]) {
    onChange({ ...hub, [key]: value });
  }

  function saveItem(updated: HubItem) {
    onChange({ ...hub, items: hub.items.map((it) => (it.id === updated.id ? updated : it)) });
    setEditingId(null);
  }

  function addItem() {
    const item = newItem();
    onChange({ ...hub, items: [...hub.items, item] });
    setEditingId(item.id);
  }

  function deleteItem(id: string) {
    if (!confirm('이 항목을 삭제하시겠습니까?')) return;
    onChange({ ...hub, items: hub.items.filter((it) => it.id !== id) });
  }

  const editingItem = hub.items.find((it) => it.id === editingId) || null;

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

      {hub.items.map((item) => (
        <div key={item.id} className="manage-card">
          <div className="manage-head">
            <span className="manage-title">{item.title || '(제목 없음)'}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button type="button" className="btn-item-toggle" onClick={() => setEditingId(item.id)}>편집</button>
              <button type="button" className="btn-item-delete" onClick={() => deleteItem(item.id)}>삭제</button>
            </div>
          </div>
        </div>
      ))}

      {editingItem && (
        <ItemEditorModal item={editingItem} onSave={saveItem} onClose={() => setEditingId(null)} />
      )}
    </div>
  );
}
