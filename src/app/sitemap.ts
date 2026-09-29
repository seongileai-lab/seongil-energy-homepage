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

  return [...staticPaths, ...hubPaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
