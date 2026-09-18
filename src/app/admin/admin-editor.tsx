'use client';

import { useState, useTransition } from 'react';
import type { SiteContent } from '@/lib/content-types';
import { saveSiteContent } from './actions';
import HeroEditor from './hero-editor';
import AboutEditor from './about-editor';
import HubEditor from './hub-editor';
import MiscEditor from './misc-editor';
import LivePreview from './live-preview';

type TabKey = 'home' | 'about' | 'products' | 'gallery' | 'advisory' | 'etc';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: '홈' },
  { key: 'about', label: 'About' },
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
        <LivePreview content={content} tab={tab} />
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
          {tab === 'about' && <AboutEditor about={content.about} onChange={(about) => setContent({ ...content, about })} />}
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
