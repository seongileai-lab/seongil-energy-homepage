import Link from 'next/link';
import { formatDate, type Post } from '@/lib/posts';

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link className="post-card" href={`/news/${post.slug}`}>
      <span className="post-cat">{post.category}</span>
      <h3>{post.title}</h3>
      <p>{post.summary}</p>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
    </Link>
  );
}
