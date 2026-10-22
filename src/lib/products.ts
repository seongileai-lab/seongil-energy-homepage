// 제품·배너 데이터. 이미지·PDF·카테고리·제품 이름은 구글 드라이브 "[연결] 홈페이지" 폴더에서 가져옵니다.
// (npm run sync:drive 로 src/data/drive.json 과 public/drive 를 갱신) 설명 문구는 product-texts.ts 에서 같은 이름으로 연결합니다.
import raw from '@/data/drive.json';
import { productTexts, type ProductText, type Section } from './product-texts';

export type { Section };
export type Category = string;

interface DriveProduct {
  name: string;
  order: number | null;
  thumb: string | null;
  gallery: string[];
  pdfs: { name: string; src: string }[];
}
interface DriveData {
  banners: { title: string; src: string; link: string }[];
  pages: { about: string[]; tech: string[]; esg: string[]; news: string[] };
  categories: { name: string; order: number | null; products: DriveProduct[] }[];
}
const drive = raw as DriveData;

export interface Product {
  slug: string;
  category: Category;
  title: string;
  badge: string;
  badgeTone?: 'warn' | 'ok';
  summary: string;
  tileDesc?: string;
  cardImage: string; // 비어 있으면 이미지 없음
  cardPos?: string;
  gallery: { src: string; alt: string }[];
  pdfs: { name: string; src: string }[];
  lead: string;
  sections: Section[];
  specs: [string, string][];
  note?: string;
  faq?: { q: string; a: string }[];
}

export interface Banner {
  src: string;
  alt: string;
  href: string; // 비어 있으면 눌러도 이동하지 않음
  pos: string;
}

function hash(s: string): string {
  let h = 5381;
  for (const ch of s) h = ((h << 5) + h + ch.charCodeAt(0)) >>> 0;
  return h.toString(36);
}

// 알고 있는 카테고리는 영문 라벨·설명을 붙이고, 새 카테고리는 폴더 이름만 사용합니다.
const KNOWN_CATEGORIES: Record<string, { key: string; en: string; desc: string }> = {
  풍력발전기: { key: 'wind', en: 'WIND POWER', desc: '미풍에서도 돌아가는 모듈형 풍력 기술로, 도로·도심·산업단지에 맞는 분산형 발전 솔루션을 제안합니다.' },
  기술개발: { key: 'rnd', en: 'R&D', desc: 'ESS, 소수력, 열회수 냉방, AI 제품개발까지. 개발 중인 기술은 현재 상태를 있는 그대로 안내합니다.' },
};
const KNOWN_ORDER = Object.keys(KNOWN_CATEGORIES);
const TEXT_ORDER = productTexts.map((t) => t.title);
const textByTitle = new Map<string, ProductText>(productTexts.map((t) => [t.title, t]));

const sortedCategories = [...drive.categories].sort((a, b) => {
  const ka = a.order ?? 1000 + (KNOWN_ORDER.indexOf(a.name) >= 0 ? KNOWN_ORDER.indexOf(a.name) : 500);
  const kb = b.order ?? 1000 + (KNOWN_ORDER.indexOf(b.name) >= 0 ? KNOWN_ORDER.indexOf(b.name) : 500);
  return ka - kb;
});

export const categories: Record<Category, { label: string; en: string; desc: string }> = {};
export const categoryKeys: Category[] = [];
export const products: Product[] = [];

for (const cat of sortedCategories) {
  const known = KNOWN_CATEGORIES[cat.name];
  const key = known?.key ?? `c-${hash(cat.name)}`;
  categories[key] = { label: cat.name, en: known?.en ?? '', desc: known?.desc ?? '' };
  categoryKeys.push(key);

  const ordered = cat.products
    .map((p, i) => ({ p, i }))
    .sort((a, b) => {
      const ta = TEXT_ORDER.indexOf(a.p.name);
      const tb = TEXT_ORDER.indexOf(b.p.name);
      const ka = a.p.order ?? 1000 + (ta >= 0 ? ta : 500 + a.i);
      const kb = b.p.order ?? 1000 + (tb >= 0 ? tb : 500 + b.i);
      return ka - kb;
    });

  for (const { p } of ordered) {
    const t = textByTitle.get(p.name);
    const images = p.gallery.length ? p.gallery : p.thumb ? [p.thumb] : [];
    products.push({
      slug: t?.slug ?? `p-${hash(p.name)}`,
      category: key,
      title: p.name,
      badge: t?.badge ?? '',
      badgeTone: t?.badgeTone,
      summary: t?.summary ?? '',
      tileDesc: t?.tileDesc,
      cardImage: p.thumb ?? images[0] ?? '',
      cardPos: t?.cardPos,
      gallery: images.map((src, i) => ({ src, alt: images.length > 1 ? `${p.name} ${i + 1}` : p.name })),
      pdfs: p.pdfs,
      lead: t?.lead ?? '',
      sections: t?.sections ?? [],
      specs: t?.specs ?? [],
      note: t?.note,
      faq: t?.faq,
    });
  }
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// 홈 배너: 링크가 제품 이름이면 그 제품 상세로, / 또는 http 로 시작하면 그 주소로 이동합니다.
export const banners: Banner[] = drive.banners.map((b) => {
  const linked = products.find((p) => p.title === b.link);
  const href = linked ? `/product/${linked.slug}` : /^(\/|https?:\/\/)/.test(b.link) ? b.link : '';
  const text = textByTitle.get(b.link) ?? textByTitle.get(b.title);
  return { src: b.src, alt: b.title, href, pos: text?.slidePos ?? '50% 50%' };
});

// 회사소개·핵심기술·ESG·뉴스 폴더의 사진 (없으면 빈 배열)
export const pageImages = drive.pages;
