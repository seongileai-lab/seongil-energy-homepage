import type { Metadata } from 'next';
import Link from 'next/link';
import PostCard from '@/components/site/post-card';
import { sortedPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: '뉴스·인사이트',
  description: 'ESG 공시, REC, 신재생에너지 제도를 쉽게 풀어 쓰고 성일에너지의 소식을 전합니다.',
};

export default function NewsPage() {
  return (
    <main className="wrap page-wide">
      <div className="crumb"><Link href="/">홈</Link> › 뉴스·인사이트</div>
      <div className="phead">
        <div className="tag">NEWS &amp; INSIGHTS</div>
        <h1>뉴스·인사이트</h1>
        <p className="lead">ESG 공시, REC, 신재생에너지 제도를 쉽게 풀어 쓰고 성일에너지의 소식을 전합니다.</p>
      </div>
      <div className="post-grid">
        {sortedPosts.map((p) => <PostCard key={p.slug} post={p} />)}
      </div>
    </main>
  );
}
