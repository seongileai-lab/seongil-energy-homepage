import type { Metadata } from 'next';
import Link from 'next/link';
import PostCard from '@/components/site/post-card';
import { posts } from '@/lib/posts';
import { vision } from '@/lib/site';

export const metadata: Metadata = {
  title: 'ESG·비전',
  description: '탄소 저감에 기여하는 친환경 기술 개발, 안전을 고려한 설계, 책임 있는 기업운영을 지향하는 성일에너지의 ESG·비전입니다.',
};

export default function EsgPage() {
  const esgPosts = posts.filter((p) => p.category === 'ESG');

  return (
    <main className="wrap page-wide">
      <div className="crumb"><Link href="/">홈</Link> › ESG·비전</div>
      <div className="phead">
        <div className="tag">{vision.tag}</div>
        <h1>{vision.title}</h1>
        <p className="lead">{vision.intro}</p>
      </div>

      <div className="grid esg-cards">
        {vision.items.map((v) => (
          <div className="value light" key={v.b}><b>{v.b}</b><p>{v.t}</p></div>
        ))}
      </div>

      {esgPosts.length > 0 && (
        <section className="list-block">
          <div className="carousel-head">
            <h2 className="list-title">ESG 관련 글</h2>
            <Link href="/news" className="view-all">전체보기 →</Link>
          </div>
          <div className="post-grid">
            {esgPosts.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </section>
      )}
    </main>
  );
}
