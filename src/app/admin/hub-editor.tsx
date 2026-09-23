'use client';

import { useEffect, useRef, useState } from 'react';
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

  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [pointerY, setPointerY] = useState(0);
  const dragGeometryRef = useRef<{ offsetY: number; left: number; width: number; height: number } | null>(null);
  const dragIdRef = useRef<string | null>(null);
  const dragOverIndexRef = useRef<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  function startDrag(e: React.MouseEvent, id: string, index: number) {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    dragGeometryRef.current = {
      offsetY: e.clientY - rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
    dragIdRef.current = id;
    dragOverIndexRef.current = index;
    setDragId(id);
    setDragOverIndex(index);
    setPointerY(e.clientY);
  }

  useEffect(() => {
    if (dragId === null) return;

    function onMove(e: MouseEvent) {
      setPointerY(e.clientY);
      let closest = dragOverIndexRef.current ?? 0;
      let closestDist = Infinity;
      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(e.clientY - mid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = idx;
        }
      });
      if (closest !== dragOverIndexRef.current) {
        dragOverIndexRef.current = closest;
        setDragOverIndex(closest);
      }
    }

    function onUp() {
      const id = dragIdRef.current;
      const to = dragOverIndexRef.current;
      if (id !== null && to !== null) {
        const from = hub.items.findIndex((it) => it.id === id);
        if (from !== -1 && from !== to) {
          const items = [...hub.items];
          const [moved] = items.splice(from, 1);
          items.splice(to, 0, moved);
          onChange({ ...hub, items });
        }
      }
      dragIdRef.current = null;
      dragOverIndexRef.current = null;
      dragGeometryRef.current = null;
      setDragId(null);
      setDragOverIndex(null);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragId]);

  const editingItem = hub.items.find((it) => it.id === editingId) || null;
  const deletingItem = hub.items.find((it) => it.id === deletingItemId) || null;

  // Live preview order while dragging, so other cards visibly make room.
  const displayItems = (() => {
    if (dragId === null || dragOverIndex === null) return hub.items;
    const from = hub.items.findIndex((it) => it.id === dragId);
    if (from === -1) return hub.items;
    const items = [...hub.items];
    const [moved] = items.splice(from, 1);
    items.splice(dragOverIndex, 0, moved);
    return items;
  })();

  const draggedItem = dragId ? hub.items.find((it) => it.id === dragId) : null;
  const geom = dragGeometryRef.current;

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

      {hub.items.length > 1 && (
        <div className="guide-text" style={{ marginBottom: 10 }}>≡ 손잡이를 드래그해서 순서를 바꿀 수 있습니다. 순서는 실제 홈페이지 목록에도 그대로 반영됩니다.</div>
      )}

      {displayItems.map((item, i) => {
        const isDragging = dragId === item.id;
        return (
          <div
            key={item.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="manage-card"
            style={{ visibility: isDragging ? 'hidden' : 'visible' }}
          >
            <div className="manage-head">
              <span
                onMouseDown={(e) => { e.preventDefault(); startDrag(e, item.id, i); }}
                style={{ cursor: dragId ? 'grabbing' : 'grab', color: '#94a3b8', fontWeight: 700, padding: '0 4px' }}
                title="드래그해서 순서 변경"
              >
                ≡
              </span>
              <span className="manage-title" style={{ flex: 1 }}>{item.title || '(제목 없음)'}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button type="button" className="btn-item-toggle" onClick={() => setEditingId(item.id)}>편집</button>
                <button type="button" className="btn-item-delete" onClick={() => setDeletingItemId(item.id)}>삭제</button>
              </div>
            </div>
          </div>
        );
      })}

      {draggedItem && geom && (
        <div
          className="manage-card is-open"
          style={{
            position: 'fixed',
            left: geom.left,
            top: pointerY - geom.offsetY,
            width: geom.width,
            zIndex: 500,
            boxShadow: '0 16px 32px rgba(15, 23, 42, 0.28)',
            transform: 'scale(1.02) rotate(1deg)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div className="manage-head">
            <span style={{ color: '#2563eb', fontWeight: 700, padding: '0 4px' }}>≡</span>
            <span className="manage-title" style={{ flex: 1 }}>{draggedItem.title || '(제목 없음)'}</span>
          </div>
        </div>
      )}

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
