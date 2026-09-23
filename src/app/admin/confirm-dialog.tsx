'use client';

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = '삭제',
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(15, 23, 42, 0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', width: '100%', maxWidth: 380, borderRadius: 12, padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{title}</h3>
        <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, whiteSpace: 'pre-line', marginBottom: 20 }}>{message}</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={onCancel}
            style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #cbd5e1', background: '#fff', color: '#334155', fontWeight: 600, cursor: 'pointer' }}
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{ flex: 1, padding: 10, borderRadius: 6, border: 'none', background: '#dc2626', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
