'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { HubSection } from '@/lib/content-types';

interface SiteHeaderProps {
  logoUrl: string;
  logoText: string;
  headerBlur: boolean;
  hubs: HubSection[];
}

export default function SiteHeader({ logoUrl, logoText, headerBlur, hubs }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showBg = headerBlur || scrolled;

  return (
    <header className={`site-header${showBg ? ' has-bar-bg' : ''}`}>
      <Link href="/" className="site-logo-box">
        {logoUrl ? <img src={logoUrl} alt={logoText} /> : <span>{logoText}</span>}
      </Link>
      <nav className="site-nav-right">
        <Link href="/about" style={{ textDecoration: 'none', color: '#1e293b', fontSize: '0.83rem', fontWeight: 600 }}>About Us</Link>
        {hubs.map((hub) => (
          <Link key={hub.id} href={`/${hub.id}`} style={{ textDecoration: 'none', color: '#1e293b', fontSize: '0.83rem', fontWeight: 600 }}>
            {hub.navLabel}
          </Link>
        ))}
        <Link href="/contact" className="site-nav-btn">Contact</Link>
      </nav>
    </header>
  );
}
