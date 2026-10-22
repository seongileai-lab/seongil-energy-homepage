import Link from 'next/link';
import ThumbImage from '@/components/site/thumb-image';
import type { Product } from '@/lib/products';

export default function ProductCard({ p, compact = false }: { p: Product; compact?: boolean }) {
  return (
    <Link className={`card${compact ? ' compact' : ''}`} href={`/product/${p.slug}`}>
      <ThumbImage p={p} />
      <div className="info">
        {!compact && p.badge && <span className={`badge${p.badgeTone ? ` ${p.badgeTone}` : ''}`}>{p.badge}</span>}
        <h3>{p.title}</h3>
        {!compact && (p.tileDesc ?? p.summary) && <p>{p.tileDesc ?? p.summary}</p>}
        <span className="more">상세 보기 ↗</span>
      </div>
    </Link>
  );
}
