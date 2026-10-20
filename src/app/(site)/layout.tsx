import SiteHeader from '@/components/site/site-header';
import SiteFooter from '@/components/site/site-footer';
import { SITE_URL, company } from '@/lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.name,
  url: SITE_URL,
  description: company.description,
  telephone: company.phone,
  address: { '@type': 'PostalAddress', addressCountry: 'KR', streetAddress: company.address },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
