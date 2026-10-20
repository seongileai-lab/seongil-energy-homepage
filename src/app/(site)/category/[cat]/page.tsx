import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/site/product-card';
import { categories, products, type Category } from '@/lib/products';

export function generateStaticParams() {
  return (Object.keys(categories) as Category[]).map((cat) => ({ cat }));
}

export async function generateMetadata({ params }: PageProps<'/category/[cat]'>): Promise<Metadata> {
  const { cat } = await params;
  const c = categories[cat as Category];
  if (!c) return {};
  return { title: `${c.label} 전체보기`, description: c.desc.slice(0, 80) };
}

export default async function CategoryPage({ params }: PageProps<'/category/[cat]'>) {
  const { cat } = await params;
  const c = categories[cat as Category];
  if (!c) notFound();
  const items = products.filter((p) => p.category === cat);

  return (
    <main className="wrap page-wide">
      <div className="crumb"><Link href="/">홈</Link> › <Link href="/solutions">제품·솔루션</Link> › {c.label}</div>
      <div className="phead">
        <div className="tag">{c.en}</div>
        <h1>{c.label}</h1>
        <p className="lead">{c.desc}</p>
      </div>
      <div className="grid cat-grid">
        {items.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
    </main>
  );
}
