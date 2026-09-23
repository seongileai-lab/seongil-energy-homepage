import { getSiteContent } from '@/lib/content';
import SiteHeader from '@/components/site/site-header';
import SiteFooter from '@/components/site/site-footer';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader logoUrl={content.hero.logoUrl} logoText={content.hero.logoText} headerBlur={content.hero.headerBlur} hubs={content.hubs} />
      <main className="flex-1">{children}</main>
      <SiteFooter footer={content.footer} />
    </div>
  );
}
