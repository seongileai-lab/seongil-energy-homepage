import Link from 'next/link';
import type { Product } from '@/lib/products';

export default function ProductCard({ p, compact = false }: { p: Product; compact?: boolean }) {
  return (
    <Link className={`card${compact ? ' compact' : ''}`} href={`/product/${p.slug}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.cardImage} alt={p.gallery[0]?.alt ?? p.title} style={p.cardPos ? { objectPosition: p.cardPos } : undefined} loading="lazy" />
      <div className="info">
        {!compact && <span className={`badge${p.badgeTone ? ` ${p.badgeTone}` : ''}`}>{p.badge}</span>}
        <h3>{p.title}</h3>
        {!compact && <p>{p.tileDesc ?? p.summary}</p>}
        <span className="more">상세 보기 ↗</span>
      </div>
    </Link>
  );
}
