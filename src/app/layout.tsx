import type { Metadata } from "next";
import "./globals.css";
import { getSiteContent } from "@/lib/content";

// Fallback site URL used for absolute metadata (OG image, canonical base).
// Override with the NEXT_PUBLIC_SITE_URL env var when reusing this template
// for a different company/domain.
const DEFAULT_SITE_URL = "https://seongileng.kr";

export async function generateMetadata(): Promise<Metadata> {
  const { footer, about, hero } = await getSiteContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  const description = (about.subDesc || hero.desc || `${footer.brand} 공식 홈페이지`).slice(0, 160);
  const ogImage = hero.bgImageUrl || hero.logoUrl || undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: footer.brand,
      template: `%s | ${footer.brand}`,
    },
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title: footer.brand,
      description,
      type: "website",
      locale: "ko_KR",
      ...(siteUrl ? { url: siteUrl } : {}),
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
