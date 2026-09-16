import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEONGIL ENERGY",
  description: "성일에너지 공식 홈페이지",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
