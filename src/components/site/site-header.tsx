'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { company, nav, navCta } from '@/lib/site';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = usePathname() === '/';

  // 홈 첫 화면에서는 헤더를 숨기고, 스크롤하면 나타낸다.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const hidden = isHome && !scrolled && !open;

  return (
    <header className={`site-header${isHome ? ' on-home' : ''}${hidden ? ' is-hidden' : ''}`}>
      <div className="head wrap">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          <b>SL</b>
          <div>
            {company.shortName}
            <small>{company.en}</small>
          </div>
        </Link>
        <button className="menu-toggle" aria-label="메뉴 열기" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
        <nav className={open ? 'open' : ''}>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
          <Link className="contact" href="/contact" onClick={() => setOpen(false)}>{navCta}</Link>
        </nav>
      </div>
    </header>
  );
}
