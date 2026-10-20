'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { categories, products, type Category, type Product } from '@/lib/products';
import { solutions } from '@/lib/site';

interface Extra {
  title: string;
  desc: string;
  placeholder: string;
  href: string;
  cta: string;
}

interface Props {
  category?: Category; // 지정하면 해당 카테고리 제품만
  excludeSlug?: string; // 이 제품은 제외 (상세 페이지의 "함께 보면 좋은 제품")
  title?: string;
  viewAllHref?: string;
  shuffle?: boolean; // 방문할 때마다 순서를 무작위로
  extra?: Extra;
}

function shuffled<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 제품을 가로로 나열하고, 넘치면 양옆 버튼으로 넘겨 봅니다.
export default function ProductCarousel({ category, excludeSlug, title, viewAllHref, shuffle, extra }: Props) {
  const base: Product[] = products.filter((p) => (!category || p.category === category) && p.slug !== excludeSlug);
  const [items, setItems] = useState(base);
  const track = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!shuffle) return;
    // 서버에서 미리 만든 HTML과 달라지지 않도록 화면이 뜬 뒤에 순서를 섞는다.
    const t = setTimeout(() => setItems(shuffled(base)), 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffle, excludeSlug]);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update, items]);

  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  };

  const heading = title ?? (category ? categories[category].label : '');
  const href = viewAllHref ?? (category ? `/category/${category}` : '/solutions');

  return (
    <div className="carousel-block">
      <div className="carousel-head">
        <h3>{heading}</h3>
        <Link href={href} className="view-all">{solutions.viewAll} →</Link>
      </div>
      <div className="car-row">
        <button className="car-btn" aria-label="이전" disabled={!canPrev} onClick={() => move(-1)}>‹</button>
        <div className="car-track" ref={track} onScroll={update}>
          {items.map((p) => (
            <Link className="car-item" key={p.slug} href={`/product/${p.slug}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.cardImage} alt={p.gallery[0]?.alt ?? p.title} style={p.cardPos ? { objectPosition: p.cardPos } : undefined} loading="lazy" />
              <h4>{p.title}</h4>
            </Link>
          ))}
          {extra && (
            <Link className="car-item" href={extra.href}>
              <div className="car-ph">{extra.placeholder}</div>
              <h4>{extra.title}</h4>
            </Link>
          )}
        </div>
        <button className="car-btn" aria-label="다음" disabled={!canNext} onClick={() => move(1)}>›</button>
      </div>
    </div>
  );
}
