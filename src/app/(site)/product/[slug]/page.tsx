import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ImageGallery from '@/components/site/image-gallery';
import ProductCarousel from '@/components/site/product-carousel';
import { categories, getProduct, products } from '@/lib/products';
import { SITE_URL, company } from '@/lib/site';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/product/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary || p.lead.slice(0, 80) || p.title,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { title: p.title, description: p.summary || p.title, images: p.cardImage ? [{ url: p.cardImage }] : [] },
  };
}

export default async function ProductPage({ params }: PageProps<'/product/[slug]'>) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    brand: { '@type': 'Brand', name: company.shortName },
    description: p.summary || p.title,
    ...(p.cardImage ? { image: `${SITE_URL}${p.cardImage}` } : {}),
  };

  return (
    <main className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <div className="crumb">
        <Link href="/">홈</Link> › <Link href="/solutions">제품·솔루션</Link> › <Link href={`/category/${p.category}`}>{categories[p.category].label}</Link> › {p.title}
      </div>
      <div className="phead">
        {p.badge && <span className={`badge${p.badgeTone ? ` ${p.badgeTone}` : ''}`}>{p.badge}</span>}
        <h1>{p.title}</h1>
        {p.lead && <p className="lead">{p.lead}</p>}
      </div>

      <div className="layout">
        <div className="body">
          <ImageGallery images={p.gallery} />

          {p.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.text && <p>{s.text}</p>}
              {s.list && (
                <ul>
                  {s.list.map((l) => <li key={l.b}><b>{l.b}</b> — {l.t}</li>)}
                </ul>
              )}
            </section>
          ))}

          {p.note && <div className="note">{p.note}</div>}

          {p.faq && (
            <section>
              <h2>자주 묻는 질문</h2>
              {p.faq.map((f) => (
                <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
              ))}
            </section>
          )}
        </div>

        <aside className="side">
          {p.specs.length > 0 && (
            <div className="box">
              <h3>제품 정보</h3>
              <table className="spec">
                <tbody>
                  {p.specs.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}
                </tbody>
              </table>
            </div>
          )}
          <div className="box">
            <h3>도입 · 기술 문의</h3>
            <p className="side-p">제품 문의와 협력 제안을 함께 검토합니다. 전화 {company.phone}</p>
            <Link className="btn block" href="/contact">문의하기</Link>
            {p.pdfs.map((f) => (
              <a key={f.src} className="btn dark block" href={f.src} download={f.name}>{p.pdfs.length > 1 ? f.name : '소개서 PDF 받기'}</a>
            ))}
          </div>
        </aside>
      </div>

      <div className="related-wrap">
        <ProductCarousel title="함께 보면 좋은 제품" excludeSlug={p.slug} viewAllHref="/solutions" shuffle />
      </div>
    </main>
  );
}
