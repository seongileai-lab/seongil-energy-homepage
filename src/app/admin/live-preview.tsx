'use client';

import type { SiteContent } from '@/lib/content-types';
import SiteHeader from '@/components/site/site-header';
import SiteFooter from '@/components/site/site-footer';
import HubList from '@/components/site/hub-list';

type TabKey = 'home' | 'about' | 'products' | 'gallery' | 'advisory' | 'etc';

export default function LivePreview({ content, tab }: { content: SiteContent; tab: TabKey }) {
  const { hero, showcase } = content;

  const contentClass = [
    'canvas-content',
    hero.whiteText ? 'theme-white' : '',
    hero.textShadow ? 'has-shadow' : '',
  ].filter(Boolean).join(' ');

  const heroStyle: React.CSSProperties & Record<string, string> = {
    '--bg-pos-x': `${hero.bgPosX}%`,
    '--bg-pos-y': `${hero.bgPosY}%`,
  };
  if (hero.bgActive && hero.mediaType === 'image' && hero.bgImageUrl) {
    heroStyle.backgroundImage = `url('${hero.bgImageUrl}')`;
  }

  return (
    <div className="mock-browser">
      <div className="mock-browser-bar">
        <div className="mock-dot mock-dot-red" />
        <div className="mock-dot mock-dot-yellow" />
        <div className="mock-dot mock-dot-green" />
      </div>
      <div className="mock-browser-screen" onClickCapture={(e) => e.preventDefault()}>
        <SiteHeader logoUrl={hero.logoUrl} logoText={hero.logoText} headerBlur={hero.headerBlur} />

        {tab === 'home' && (
          <>
            <section className={`hero-canvas${hero.darkOverlay ? ' has-dark-overlay' : ''}`} style={heroStyle}>
              {hero.bgActive && hero.mediaType === 'video' && hero.bgVideoUrl && (
                <video className="hero-bg-video" src={hero.bgVideoUrl} autoPlay muted loop playsInline />
              )}
              <div className={contentClass}>
                <h2 className="canvas-title">{hero.title}</h2>
                <p className="canvas-desc">{hero.desc}</p>
              </div>
            </section>

            <section className="showcase-section">
              <div className="showcase-header-area">
                <div className="showcase-category-label">{showcase.topLabel}</div>
                <h3 className="showcase-main-title">{showcase.mainTitle}</h3>
                <p className="showcase-sub-desc">{showcase.subDesc}</p>
              </div>

              <div className="zigzag-list">
                {showcase.items.map((item, i) => (
                  <div key={i} className={`zigzag-item${i % 2 === 1 ? ' reverse' : ''}`}>
                    <div className="zigzag-textbox">
                      <div className="zigzag-tag">{item.title}</div>
                      <div className="zigzag-body-desc">{item.desc}</div>
                      <span className="btn-zigzag-link">View All</span>
                    </div>
                    <div className="zigzag-imgbox" style={{ backgroundImage: `url('${item.imageUrl}')` }} />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {tab === 'about' && (
          <div className="content-hub-page">
            <div className="hub-container">
              <div className="hub-header">
                <h1 className="hub-title">{content.about.heading}</h1>
                <p className="hub-desc">{content.about.subDesc}</p>
              </div>
              {content.about.bannerUrl && <div className="hub-key-banner" style={{ backgroundImage: `url('${content.about.bannerUrl}')` }} />}
              <div className="about-body">{content.about.body}</div>
            </div>
          </div>
        )}

        {tab === 'products' && <HubList basePath="/products" hub={content.products} />}
        {tab === 'gallery' && <HubList basePath="/gallery" hub={content.gallery} />}
        {tab === 'advisory' && <HubList basePath="/advisory" hub={content.advisory} />}

        {tab === 'etc' && (
          <div className="content-hub-page contact-hub-override">
            <div className="contact-wrapper">
              <div className="contact-intro-box">
                <div className="contact-sub-label">{content.contact.subLabel}</div>
                <h1 className="contact-main-heading">{content.contact.heading}</h1>
                <p className="contact-lead-desc">{content.contact.leadDesc}</p>
              </div>
              <div className="contact-form-box">
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>(문의 폼은 실제 홈페이지에서 동작합니다)</p>
              </div>
            </div>
          </div>
        )}

        <SiteFooter footer={content.footer} />
      </div>
    </div>
  );
}
