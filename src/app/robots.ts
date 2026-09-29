import type { MetadataRoute } from "next";

const DEFAULT_SITE_URL = "https://seongileng.kr";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
