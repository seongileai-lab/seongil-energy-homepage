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
  const [tab, setTabRaw] = useState<TabKey>('home');
  const [section, setSection] = useState('all');
  function setTab(t: TabKey) { setTabRaw(t); setSection('all'); }
  function handleSelect(t: string, s: string) { setTabRaw(t); setSection(s); }
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
    // A new tab also gets an intro box on the home page that links to it.
    const showcaseItem = { title: hub.navLabel, desc: hub.mainDesc, imageUrl: '', linkTo: hub.id };
    setContent({
      ...content,
      hubs: [...content.hubs, hub],
      showcase: { ...content.showcase, items: [...content.showcase.items, showcaseItem] },
    });
    setTab(hub.id);
    setAddingHub(false);
    setNewHubName('');
  }

  function handleDeleteHub(hubId: string) {
    setContent({
      ...content,
      hubs: content.hubs.filter((h) => h.id !== hubId),
      showcase: { ...content.showcase, items: content.showcase.items.filter((it) => it.linkTo !== hubId) },
    });
    setTab('home');
  }

  const [dragHubId, setDragHubId] = useState<string | null>(null);

  function moveHub(fromId: string, toId: string) {
    if (fromId === toId) return;
    const hubs = [...content.hubs];
    const from = hubs.findIndex((h) => h.id === fromId);
    const to = hubs.findIndex((h) => h.id === toId);
    const [moved] = hubs.splice(from, 1);
    hubs.splice(to, 0, moved);
    setContent({ ...content, hubs });
  }

  const activeHub = content.hubs.find((h) => h.id === tab);

  return (
    <div className="admin-shell">
      <div className="admin-preview-note">
        <LivePreview content={content} tab={tab} section={section} onSelect={handleSelect} />
      </div>

      <aside className="editor-pane">
        <nav className="depth1-tabs">
          <button className={`depth1-btn${tab === 'home' ? ' active' : ''}`} onClick={() => setTab('home')}>홈</button>
          <button className={`depth1-btn${tab === 'about' ? ' active' : ''}`} onClick={() => setTab('about')}>About</button>
          {content.hubs.map((hub) => (
            <button
              key={hub.id}
              className={`depth1-btn${tab === hub.id ? ' active' : ''}${dragHubId === hub.id ? ' dragging' : ''}`}
              onClick={() => setTab(hub.id)}
              draggable
              title="드래그해서 메뉴 순서 변경"
              onDragStart={(e) => { setDragHubId(hub.id); e.dataTransfer.effectAllowed = 'move'; }}
              onDragOver={(e) => { e.preventDefault(); if (dragHubId) moveHub(dragHubId, hub.id); }}
              onDragEnd={() => setDragHubId(null)}
              onDrop={(e) => e.preventDefault()}
            >
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
          {section !== 'all' && (
            <div className="section-bar">
              <span>미리보기에서 선택한 영역만 편집 중</span>
              <button type="button" className="btn-item-toggle" onClick={() => setSection('all')}>이 페이지 전체 보기</button>
            </div>
          )}
          {section === 'all' && tab !== 'etc' && <p className="section-hint">왼쪽 미리보기에서 수정할 부분을 클릭하세요.</p>}
          {tab === 'home' && (
            <HeroEditor
              section={section}
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
              section={section}
              hub={activeHub}
              onChange={(updated) => setContent({ ...content, hubs: content.hubs.map((h) => (h.id === updated.id ? updated : h)) })}
              onDelete={() => handleDeleteHub(activeHub.id)}
            />
          )}
          {tab === 'etc' && (
            <MiscEditor
              section={section}
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
