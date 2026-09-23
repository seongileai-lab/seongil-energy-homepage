'use client';

import { useState } from 'react';
import { type HubSection, type HubItem, newHubItem } from '@/lib/content-types';
import MediaUpload from '@/components/admin/media-upload';
import ItemEditorModal from './item-editor-modal';
import ConfirmDialog from './confirm-dialog';

export default function HubEditor({
  hub,
  onChange,
  onDelete,
}: {
  hub: HubSection;
  onChange: (hub: HubSection) => void;
  onDelete: () => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [confirmingTabDelete, setConfirmingTabDelete] = useState(false);

  function setField<K extends keyof HubSection>(key: K, value: HubSection[K]) {
    onChange({ ...hub, [key]: value });
  }

  function saveItem(updated: HubItem) {
    onChange({ ...hub, items: hub.items.map((it) => (it.id === updated.id ? updated : it)) });
    setEditingId(null);
  }

  function addItem() {
    const item = newHubItem();
    onChange({ ...hub, items: [...hub.items, item] });
    setEditingId(item.id);
  }

  function confirmDeleteItem() {
    if (!deletingItemId) return;
    onChange({ ...hub, items: hub.items.filter((it) => it.id !== deletingItemId) });
    setDeletingItemId(null);
  }

  const editingItem = hub.items.find((it) => it.id === editingId) || null;
  const deletingItem = hub.items.find((it) => it.id === deletingItemId) || null;

  return (
    <div>
      <div className="form-group">
        <div className="label-wrapper">
          <label>탭/메뉴 이름</label>
          <button type="button" className="btn-item-delete" onClick={() => setConfirmingTabDelete(true)}>이 탭 삭제</button>
        </div>
        <div className="guide-text">헤더 메뉴와 어드민 탭에 표시되는 이름입니다.</div>
        <input className="form-control" value={hub.navLabel} onChange={(e) => setField('navLabel', e.target.value)} />
      </div>

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
              <button type="button" className="btn-item-delete" onClick={() => setDeletingItemId(item.id)}>삭제</button>
            </div>
          </div>
        </div>
      ))}

      {editingItem && (
        <ItemEditorModal item={editingItem} onSave={saveItem} onClose={() => setEditingId(null)} />
      )}

      {deletingItem && (
        <ConfirmDialog
          title="항목 삭제"
          message={`"${deletingItem.title || '(제목 없음)'}" 항목을 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`}
          onConfirm={confirmDeleteItem}
          onCancel={() => setDeletingItemId(null)}
        />
      )}

      {confirmingTabDelete && (
        <ConfirmDialog
          title="탭 삭제"
          message={`"${hub.navLabel}" 탭을 삭제하시겠습니까?\n\n이 탭의 모든 항목(${hub.items.length}개)이 함께 삭제되며, 이 작업은 되돌릴 수 없습니다.\n우측 하단 "전체 저장"을 눌러야 실제로 반영됩니다.`}
          onConfirm={onDelete}
          onCancel={() => setConfirmingTabDelete(false)}
        />
      )}
    </div>
  );
}
