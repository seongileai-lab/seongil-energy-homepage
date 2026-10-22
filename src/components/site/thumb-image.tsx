import type { Product } from '@/lib/products';

// 제품 썸네일. 드라이브에 이미지가 없으면 색 상자를 보여줍니다.
export default function ThumbImage({ p, className }: { p: Product; className?: string }) {
  if (!p.cardImage) return <div className={`car-ph${className ? ` ${className}` : ''}`}>{p.title}</div>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={p.cardImage}
      alt={p.title}
      style={p.cardPos ? { objectPosition: p.cardPos } : undefined}
      loading="lazy"
    />
  );
}
