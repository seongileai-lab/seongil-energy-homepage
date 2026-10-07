import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";

const DEFAULT_SITE_URL = "https://seongileng.kr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  const { hubs } = await getSiteContent();

  const staticPaths = ["", "/about", "/contact", "/privacy", "/terms"];

  const hubPaths = hubs.flatMap((hub) => [
    `/${hub.id}`,
    ...hub.items.map((item) => `/${hub.id}/${item.id}`),
  ]);

  // 실제 수정 시각을 알 수 없으므로 lastModified를 생략한다 (요청마다 현재 시각이 찍히면 크롤러 신뢰도가 낮아짐).
  return [...staticPaths, ...hubPaths].map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
