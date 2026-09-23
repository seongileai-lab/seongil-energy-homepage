'use client';

import { useState, useTransition } from 'react';
import { type SiteContent, newHubSection } from '@/lib/content-types';
import { saveSiteContent } from './actions';
import HeroEditor from './hero-editor';
import AboutEditor from './about-editor';
import HubEditor from './hub-editor';
import MiscEditor from './misc-editor';
import LivePreview from './live-preview';

type TabKey = 'home' | 'about' | 'etc' | string;

export default function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState(initialContent);
  const [tab, setTab] = useState<TabKey>('home');
  const [pending, startTransition] = useTransition();
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [saveError, setSaveError] = useState('');
  const [addingHub, setAddingHub] = useState(false);
  const [newHubName, setNewHubName] = useState('');

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

  function handleConfirmAddHub() {
    const name = newHubName.trim();
    if (!name) {
      setAddingHub(false);
      setNewHubName('');
      return;
    }
    const hub = newHubSection(name, content.hubs.map((h) => h.id));
    setContent({ ...content, hubs: [...content.hubs, hub] });
    setTab(hub.id);
    setAddingHub(false);
    setNewHubName('');
  }

  function handleDeleteHub(hubId: string) {
    setContent({ ...content, hubs: content.hubs.filter((h) => h.id !== hubId) });
    setTab('home');
  }

  const activeHub = content.hubs.find((h) => h.id === tab);

  return (
    <div className="admin-shell">
      <div className="admin-preview-note">
        <LivePreview content={content} tab={tab} />
      </div>

      <aside className="editor-pane">
        <nav className="depth1-tabs">
          <button className={`depth1-btn${tab === 'home' ? ' active' : ''}`} onClick={() => setTab('home')}>홈</button>
          <button className={`depth1-btn${tab === 'about' ? ' active' : ''}`} onClick={() => setTab('about')}>About</button>
          {content.hubs.map((hub) => (
            <button key={hub.id} className={`depth1-btn${tab === hub.id ? ' active' : ''}`} onClick={() => setTab(hub.id)}>
              {hub.navLabel}
            </button>
          ))}
          <button className="depth1-btn" title="새 탭 추가" onClick={() => setAddingHub(true)}>+</button>
          <button className={`depth1-btn${tab === 'etc' ? ' active' : ''}`} onClick={() => setTab('etc')}>기타</button>
        </nav>

        {addingHub && (
          <div style={{ display: 'flex', gap: 6, padding: '10px 12px', background: '#eff6ff', borderBottom: '1px solid #bfdbfe' }}>
            <input
              autoFocus
              className="form-control"
              placeholder="새 탭 이름 (예: Gallery, News, Team)"
              value={newHubName}
              onChange={(e) => setNewHubName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmAddHub()}
              style={{ flex: 1 }}
            />
            <button type="button" className="btn-item-toggle" onClick={handleConfirmAddHub}>추가</button>
            <button type="button" className="btn-item-delete" onClick={() => { setAddingHub(false); setNewHubName(''); }}>취소</button>
          </div>
        )}

        <div className="tab-content" style={{ display: 'block' }}>
          {tab === 'home' && (
            <HeroEditor
              hero={content.hero}
              showcase={content.showcase}
              hubs={content.hubs}
              onHeroChange={(hero) => setContent({ ...content, hero })}
              onShowcaseChange={(showcase) => setContent({ ...content, showcase })}
            />
          )}
          {tab === 'about' && <AboutEditor about={content.about} onChange={(about) => setContent({ ...content, about })} />}
          {activeHub && (
            <HubEditor
              hub={activeHub}
              onChange={(updated) => setContent({ ...content, hubs: content.hubs.map((h) => (h.id === updated.id ? updated : h)) })}
              onDelete={() => handleDeleteHub(activeHub.id)}
            />
          )}
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
