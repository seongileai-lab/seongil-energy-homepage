import Link from 'next/link';
import HeroSlider from '@/components/site/hero-slider';
import PostCard from '@/components/site/post-card';
import ProductCarousel from '@/components/site/product-carousel';
import { sortedPosts } from '@/lib/posts';
import { categoryKeys, pageImages } from '@/lib/products';
import { about, company, cta, hero, solutions, technology, vision } from '@/lib/site';

// 드라이브 폴더의 사진을 CSS 배경으로 쓰기 위한 값 (사진이 없으면 배경 사진 없이 표시)
function cssImg(name: string, src?: string): React.CSSProperties {
  return src ? ({ [name]: `url("${src}")` } as React.CSSProperties) : {};
}

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      <section id="home" className="intro-band">
        <div className="wrap">
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1>{hero.titleLine1}<br /><span>{hero.titleLine2}</span></h1>
          <p>{hero.desc}</p>
          <div className="actions">
            <Link className="btn" href={hero.primary.href}>{hero.primary.label}</Link>
            <Link className="btn line" href={hero.secondary.href}>{hero.secondary.label}</Link>
          </div>
          <div className="hero-foot">
            {hero.foot.map((f) => <div key={f.b}><strong>{f.b}</strong>{f.t}</div>)}
          </div>
        </div>
      </section>

      <section id="about" className="section about-sec" style={cssImg('--about-img', pageImages.about[0])}>
        <div className="wrap about-grid">
          <div>
            <div className="tag">{about.tag}</div>
            <h2 className="pre-line">{about.heading}</h2>
            {about.paragraphs.map((t) => <p key={t}>{t}</p>)}
            <p><Link href="/about" className="link-blue">회사소개 자세히 보기 →</Link></p>
          </div>
          <div className="aboutpic">
            <strong>{about.badge.mark}</strong>
            <span>{about.badge.name}</span>
            <p>{about.badge.sub}</p>
          </div>
        </div>
      </section>

      <section id="technology" className="statement">
        <div className="wrap">
          <div>
            <div className="eyebrow">{technology.eyebrow}</div>
            <h2 className="pre-line">{technology.title}</h2>
            <p>{technology.desc}</p>
            <p><Link href="/technology" className="more-link">핵심기술 자세히 보기 →</Link></p>
          </div>
          <div className="values">
            {technology.values.map((v) => (
              <div className="value" key={v.b}><b>{v.b}</b><p>{v.t}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="section solutions-sec">
        <div className="wrap">
          <div className="tag">{solutions.tag}</div>
          <h2>{solutions.title}</h2>
          <p className="intro">{solutions.intro}</p>
          {categoryKeys.map((k, i) => (
            <ProductCarousel key={k} category={k} extra={i === categoryKeys.length - 1 ? solutions.custom : undefined} />
          ))}
        </div>
      </section>

      <section id="vision" className="section vision-sec" style={cssImg('--esg-img', pageImages.esg[0])}>
        <div className="wrap">
          <div className="tag">{vision.tag}</div>
          <h2>{vision.title}</h2>
          <p className="intro">{vision.intro}</p>
          <p><Link href="/esg" className="more-link">ESG·비전 자세히 보기 →</Link></p>
          <div className="grid">
            {vision.items.map((v) => (
              <div className="value glass" key={v.b}><b>{v.b}</b><p>{v.t}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="section news-sec">
        <div className="wrap">
          <div className="carousel-head">
            <div>
              <div className="tag">NEWS &amp; INSIGHTS</div>
              <h2 className="news-h2">뉴스·인사이트</h2>
            </div>
            <Link href="/news" className="view-all">{solutions.viewAll} →</Link>
          </div>
          <div className="post-grid">
            {sortedPosts.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      <section id="inquiry" className="cta">
        <div className="wrap">
          <div>
            <h2>{cta.title}</h2>
            <p>{cta.desc}</p>
          </div>
          <div className="cta-actions">
            <a className="btn white" href={company.phoneHref}>{cta.button}</a>
            <Link className="btn line" href="/contact">온라인 문의</Link>
          </div>
        </div>
      </section>
    </>
  );
}
