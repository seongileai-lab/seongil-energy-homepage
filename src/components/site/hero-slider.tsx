'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { banners } from '@/lib/products';

// 슬라이드는 드라이브 "0.배너" 폴더에서 옵니다. 링크가 있으면 눌렀을 때 이동합니다.
const SLIDES = banners;
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
      {SLIDES.map((s, i) => {
        const cls = `hero-slide${i === index ? ' active' : ''}`;
        const img = (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.src} alt={s.alt} style={{ objectPosition: s.pos }} loading={i === 0 ? 'eager' : 'lazy'} />
        );
        return s.href ? (
          <Link key={s.src} href={s.href} className={cls} aria-hidden={i !== index} tabIndex={i === index ? 0 : -1}>
            {img}
          </Link>
        ) : (
          <div key={s.src} className={cls} aria-hidden={i !== index}>
            {img}
          </div>
        );
      })}
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
