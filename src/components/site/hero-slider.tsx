'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { slideProducts } from '@/lib/products';

// 슬라이드는 src/lib/products.ts 에서 slide 가 지정된 제품입니다. 클릭하면 제품 상세로 이동합니다.
const SLIDES = slideProducts.map((p) => ({
  src: p.slide!.src,
  pos: p.slide!.pos,
  alt: p.gallery[0]?.alt ?? p.title,
  href: `/product/${p.slug}`,
}));
const INTERVAL_MS = 5000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((n: number) => setIndex((n + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused, index]);

  return (
    <section
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label="성일에너지 주요 소개"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <Link
          key={s.src}
          href={s.href}
          className={`hero-slide${i === index ? ' active' : ''}`}
          aria-hidden={i !== index}
          tabIndex={i === index ? 0 : -1}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.src} alt={s.alt} style={{ objectPosition: s.pos }} loading={i === 0 ? 'eager' : 'lazy'} />
        </Link>
      ))}
      <button className="hero-edge prev" aria-label="이전 배너" onClick={() => go(index - 1)}><span>‹</span></button>
      <button className="hero-edge next" aria-label="다음 배너" onClick={() => go(index + 1)}><span>›</span></button>
      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={i === index ? 'on' : ''} aria-label={`${i + 1}번 배너`} onClick={() => go(i)} />
        ))}
      </div>
    </section>
  );
}
