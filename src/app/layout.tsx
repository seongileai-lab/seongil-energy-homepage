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
  // Naver 서치어드바이저는 페이지 설명/OG 설명을 80자 이내로 권장한다.
  const rawDescription = (about.subDesc || hero.desc || `${footer.brand} 공식 홈페이지`).trim();
  const descriptionChars = [...rawDescription];
  const description = descriptionChars.length <= 80 ? rawDescription : `${descriptionChars.slice(0, 79).join("")}…`;
  const ogImage = hero.bgImageUrl || hero.logoUrl || undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: footer.brand,
      template: `%s | ${footer.brand}`,
    },
    description,
    robots: { index: true, follow: true },
    verification: { other: { "naver-site-verification": "f2f580ede14dec83f216cf8d8970f8facd398d4c" } },
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
