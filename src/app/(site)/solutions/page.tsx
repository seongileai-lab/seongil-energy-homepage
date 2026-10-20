import type { Metadata } from 'next';
import Link from 'next/link';
import { categories, products, type Category } from '@/lib/products';
import { solutions } from '@/lib/site';

export const metadata: Metadata = {
  title: '제품·솔루션',
  description: '풍력발전기부터 ESS, 소수력, 폐열회수 에어컨, AI 제품개발까지 성일에너지의 모든 제품과 솔루션을 한눈에 볼 수 있습니다.',
};

export default function SolutionsPage() {
  const groups = (Object.keys(categories) as Category[]).map((cat) => ({
    cat,
    items: products.filter((p) => p.category === cat),
  }));

  return (
    <main className="wrap page-wide">
      <div className="crumb"><Link href="/">홈</Link> › 제품·솔루션</div>
      <div className="phead">
        <div className="tag">{solutions.tag}</div>
        <h1>{solutions.title}</h1>
        <p className="lead">{solutions.intro}</p>
      </div>

      {groups.map(({ cat, items }) => (
        <section key={cat} className="list-block">
          <h2 className="list-title">{categories[cat].label}</h2>
          <div className="title-grid">
            {items.map((p) => (
              <Link className="car-item" key={p.slug} href={`/product/${p.slug}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.cardImage} alt={p.gallery[0]?.alt ?? p.title} style={p.cardPos ? { objectPosition: p.cardPos } : undefined} loading="lazy" />
                <h4>{p.title}</h4>
              </Link>
            ))}
            {cat === 'rnd' && (
              <Link className="car-item" href={solutions.custom.href}>
                <div className="car-ph">{solutions.custom.placeholder}</div>
                <h4>{solutions.custom.title}</h4>
              </Link>
            )}
          </div>
        </section>
      ))}
    </main>
  );
}
