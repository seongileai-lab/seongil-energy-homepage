import { getSiteContent } from '@/lib/content';
import SiteHeader from '@/components/site/site-header';
import SiteFooter from '@/components/site/site-footer';

const DEFAULT_SITE_URL = 'https://seongileng.kr';

function extractPhone(text: string): string | undefined {
  const match = text.match(/0\d{1,2}-\d{3,4}-\d{4}/);
  return match?.[0];
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  const phone = extractPhone(content.footer.details);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: content.footer.brand,
    url: siteUrl,
    ...(content.hero.logoUrl ? { logo: content.hero.logoUrl } : {}),
    description: content.about.body,
    ...(phone ? { telephone: phone } : {}),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      streetAddress: content.footer.details,
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <SiteHeader logoUrl={content.hero.logoUrl} logoText={content.hero.logoText} headerBlur={content.hero.headerBlur} hubs={content.hubs} />
      <main className="flex-1">{children}</main>
      <SiteFooter footer={content.footer} />
    </div>
  );
}
