import Link from 'next/link';
import { getSiteContent } from '@/lib/content';

const linkPathMap = {
  pageProducts: '/products',
  pageAdvisory: '/advisory',
} as const;

export default async function HomePage() {
  const { hero, showcase } = await getSiteContent();

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
                <Link className="btn-zigzag-link" href={linkPathMap[item.linkTo]}>View All</Link>
              </div>
              <div className="zigzag-imgbox" style={{ backgroundImage: `url('${item.imageUrl}')` }} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
