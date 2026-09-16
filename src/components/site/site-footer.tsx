import Link from 'next/link';
import type { FooterConfig } from '@/lib/content-types';

export default function SiteFooter({ footer }: { footer: FooterConfig }) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand">{footer.brand}</div>
          <div className="footer-links">
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/terms">이용약관</Link>
          </div>
        </div>
        <div className="footer-main-grid">
          <div className="footer-info-col">
            <div className="footer-intro-title">{footer.intro}</div>
            <div className="footer-details">{footer.details}</div>
            <div className="footer-copy">{footer.copy}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
