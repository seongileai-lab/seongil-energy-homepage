import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, company } from "@/lib/site";
import { banners } from "@/lib/products";

// 네이버에서 한글 상호("성일에너지") 검색 시 title 매칭이 되도록 title에 한글명을 포함한다.
const TITLE = `${company.shortName} - 발전기·신재생에너지 전문`;
// Naver 서치어드바이저는 설명을 80자 이내로 권장한다.
const DESCRIPTION = company.description;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${company.shortName}` },
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  verification: { google: "00X5yWaOv-qp-SEVVplSe3I9j1pYlNseHguji-Kjips", other: { "naver-site-verification": "f2f580ede14dec83f216cf8d8970f8facd398d4c" } },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    images: banners[0] ? [{ url: banners[0].src }] : [],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
