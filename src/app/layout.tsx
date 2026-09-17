import type { Metadata } from "next";
import "./globals.css";
import { getSiteContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { footer } = await getSiteContent();
  return {
    title: footer.brand,
    description: `${footer.brand} 공식 홈페이지`,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
