'use client';

import { useState, useTransition } from 'react';
import type { SiteContent } from '@/lib/content-types';
import { saveSiteContent } from './actions';
import HeroEditor from './hero-editor';
import HubEditor from './hub-editor';
import MiscEditor from './misc-editor';

type TabKey = 'home' | 'products' | 'gallery' | 'advisory' | 'etc';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: '홈' },
  { key: 'products', label: 'Products' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'advisory', label: 'Advisory' },
  { key: 'etc', label: '기타' },
];

export default function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState(initialContent);
  const [tab, setTab] = useState<TabKey>('home');
  const [pending, startTransition] = useTransition();
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [saveError, setSaveError] = useState('');

  function handleSave() {
    setSaveError('');
    startTransition(async () => {
      try {
        await saveSiteContent(content);
        setSavedAt(new Date().toLocaleTimeString('ko-KR'));
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : '저장에 실패했습니다.');
      }
    });
  }

  return (
    <div className="admin-shell">
      <div className="admin-preview-note">
        <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.7 }}>
          왼쪽 탭에서 원하는 섹션을 수정한 뒤 우측 하단의 <strong>전체 저장</strong> 버튼을 누르면 실제 홈페이지에 즉시 반영됩니다.
          <br /><br />
          실제 화면은 새 탭에서 <a href="/" target="_blank" style={{ color: '#2563eb', fontWeight: 600 }}>홈페이지 바로가기 →</a> 로 확인하세요.
        </p>
      </div>

      <aside className="editor-pane">
        <nav className="depth1-tabs">
          {tabs.map((t) => (
            <button key={t.key} className={`depth1-btn${tab === t.key ? ' active' : ''}`} onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </nav>

        <div className="tab-content" style={{ display: 'block' }}>
          {tab === 'home' && (
            <HeroEditor
              hero={content.hero}
              showcase={content.showcase}
              onHeroChange={(hero) => setContent({ ...content, hero })}
              onShowcaseChange={(showcase) => setContent({ ...content, showcase })}
            />
          )}
          {tab === 'products' && <HubEditor hub={content.products} onChange={(products) => setContent({ ...content, products })} />}
          {tab === 'gallery' && <HubEditor hub={content.gallery} onChange={(gallery) => setContent({ ...content, gallery })} />}
          {tab === 'advisory' && <HubEditor hub={content.advisory} onChange={(advisory) => setContent({ ...content, advisory })} />}
          {tab === 'etc' && (
            <MiscEditor
              contact={content.contact}
              footer={content.footer}
              privacy={content.privacy}
              terms={content.terms}
              onContactChange={(contact) => setContent({ ...content, contact })}
              onFooterChange={(footer) => setContent({ ...content, footer })}
              onPrivacyChange={(privacy) => setContent({ ...content, privacy })}
              onTermsChange={(terms) => setContent({ ...content, terms })}
            />
          )}

          {saveError && <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: 8 }}>{saveError}</p>}
          {savedAt && !saveError && <p style={{ color: '#16a34a', fontSize: '0.78rem', marginTop: 8 }}>{savedAt} 저장 완료</p>}

          <button type="button" className="btn-save-inline" onClick={handleSave} disabled={pending}>
            {pending ? '저장 중...' : '전체 저장'}
          </button>
        </div>
      </aside>
    </div>
  );
}
