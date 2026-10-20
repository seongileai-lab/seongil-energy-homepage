import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDate, getPost, posts, sortedPosts } from '@/lib/posts';
import { SITE_URL, company } from '@/lib/site';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/news/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/news/${p.slug}` },
    openGraph: { title: p.title, description: p.summary, type: 'article', publishedTime: p.date },
  };
}

export default async function PostPage({ params }: PageProps<'/news/[slug]'>) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const i = sortedPosts.findIndex((x) => x.slug === p.slug);
  const newer = sortedPosts[i - 1];
  const older = sortedPosts[i + 1];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.summary,
    datePublished: p.date,
    author: { '@type': 'Organization', name: company.shortName },
    publisher: { '@type': 'Organization', name: company.shortName },
    mainEntityOfPage: `${SITE_URL}/news/${p.slug}`,
  };

  return (
    <main className="wrap page-narrow">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <div className="crumb"><Link href="/">홈</Link> › <Link href="/news">뉴스·인사이트</Link> › {p.category}</div>
      <article>
        <div className="phead">
          <span className="post-cat">{p.category}</span>
          <h1>{p.title}</h1>
          <time className="post-date" dateTime={p.date}>{formatDate(p.date)}</time>
        </div>
        <div className="article-body">
          {p.body.map((b, k) => (
            <section key={k}>
              {b.h && <h2>{b.h}</h2>}
              {b.p && <p>{b.p}</p>}
              {b.ul && <ul>{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>}
            </section>
          ))}
        </div>
      </article>

      <div className="post-nav">
        {newer ? <Link href={`/news/${newer.slug}`}><small>다음 글</small>{newer.title}</Link> : <span />}
        {older ? <Link href={`/news/${older.slug}`}><small>이전 글</small>{older.title}</Link> : <span />}
      </div>

      <div className="tech-cta">
        <p>제품·기술 관련 문의는 언제든지 남겨 주세요. 전화 {company.phone}</p>
        <Link className="btn" href="/contact">문의하기 →</Link>
      </div>
      <p className="back-list"><Link href="/news">← 목록으로</Link></p>
    </main>
  );
}
