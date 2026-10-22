import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/site/product-card';
import { categories, categoryKeys, products } from '@/lib/products';

export function generateStaticParams() {
  return categoryKeys.map((cat) => ({ cat }));
}

export async function generateMetadata({ params }: PageProps<'/category/[cat]'>): Promise<Metadata> {
  const { cat } = await params;
  const c = categories[cat];
  if (!c) return {};
  return { title: `${c.label} 전체보기`, description: (c.desc || `${c.label} 제품 전체보기`).slice(0, 80) };
}

export default async function CategoryPage({ params }: PageProps<'/category/[cat]'>) {
  const { cat } = await params;
  const c = categories[cat];
  if (!c) notFound();
  const items = products.filter((p) => p.category === cat);

  return (
    <main className="wrap page-wide">
      <div className="crumb"><Link href="/">홈</Link> › <Link href="/solutions">제품·솔루션</Link> › {c.label}</div>
      <div className="phead">
        {c.en && <div className="tag">{c.en}</div>}
        <h1>{c.label}</h1>
        {c.desc && <p className="lead">{c.desc}</p>}
      </div>
      <div className="grid cat-grid">
        {items.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
    </main>
  );
}
