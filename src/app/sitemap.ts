import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { posts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/contact", "/privacy", "/terms", "/solutions", "/technology", "/esg", "/news", "/category/wind", "/category/rnd", ...products.map((p) => `/product/${p.slug}`), ...posts.map((p) => `/news/${p.slug}`)];
  // 실제 수정 시각을 알 수 없으므로 lastModified를 생략한다 (요청마다 현재 시각이 찍히면 크롤러 신뢰도가 낮아짐).
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
