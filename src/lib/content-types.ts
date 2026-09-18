export type LinkTarget = 'pageProducts' | 'pageGallery' | 'pageAdvisory';

export interface HeroConfig {
  logoUrl: string;
  logoText: string;
  headerBlur: boolean;
  title: string;
  desc: string;
  whiteText: boolean;
  textShadow: boolean;
  darkOverlay: boolean;
  bgActive: boolean;
  mediaType: 'image' | 'video';
  bgImageUrl: string;
  bgVideoUrl: string;
  bgPosX: number;
  bgPosY: number;
}

export interface ShowcaseItem {
  title: string;
  desc: string;
  imageUrl: string;
  linkTo: LinkTarget;
}

export interface ShowcaseConfig {
  topLabel: string;
  mainTitle: string;
  subDesc: string;
  items: ShowcaseItem[];
}

export interface Attachment {
  url: string;
  name: string;
}

export interface HubItem {
  id: string;
  title: string;
  desc: string;
  badge: string;
  thumbnailUrl: string;
  detailImages: string[];
  detailVideoUrl: string;
  detailDesc: string;
  attachments: Attachment[];
}

export interface HubConfig {
  mainTitle: string;
  mainDesc: string;
  bannerUrl: string;
  subTitle: string;
  subDesc: string;
  items: HubItem[];
}

export interface ContactConfig {
  subLabel: string;
  heading: string;
  leadDesc: string;
  sheetWebhookUrl: string;
}

export interface FooterConfig {
  brand: string;
  intro: string;
  details: string;
  copy: string;
}

export interface PolicyConfig {
  title: string;
  content: string;
}

export interface SiteContent {
  hero: HeroConfig;
  showcase: ShowcaseConfig;
  products: HubConfig;
  gallery: HubConfig;
  advisory: HubConfig;
  contact: ContactConfig;
  footer: FooterConfig;
  privacy: PolicyConfig;
  terms: PolicyConfig;
}

function id(prefix: string, n: number) {
  return `${prefix}-${n}`;
}

export const defaultSiteContent: SiteContent = {
  hero: {
    logoUrl: '',
    logoText: 'COMPANY NAME',
    headerBlur: false,
    title: '메인 타이틀을 입력하세요',
    desc: '서브 카피 문구를 입력하세요.',
    whiteText: false,
    textShadow: true,
    darkOverlay: false,
    bgActive: true,
    mediaType: 'image',
    bgImageUrl: '',
    bgVideoUrl: '',
    bgPosX: 50,
    bgPosY: 50,
  },
  showcase: {
    topLabel: 'Building is What We Do',
    mainTitle: '회사가 만들어가는\n신뢰와 기술의 가치',
    subDesc: '이 회사를 소개하는 문구를 입력하세요.',
    items: [
      {
        title: '소개 항목 1',
        desc: '소개 항목 1에 대한 설명을 입력하세요.',
        imageUrl: '',
        linkTo: 'pageProducts',
      },
      {
        title: '소개 항목 2',
        desc: '소개 항목 2에 대한 설명을 입력하세요.',
        imageUrl: '',
        linkTo: 'pageGallery',
      },
      {
        title: '소개 항목 3',
        desc: '소개 항목 3에 대한 설명을 입력하세요.',
        imageUrl: '',
        linkTo: 'pageAdvisory',
      },
    ],
  },
  products: {
    mainTitle: 'Products',
    mainDesc: 'Products 페이지 소개 문구를 입력하세요.',
    bannerUrl: '',
    subTitle: 'Lineup',
    subDesc: '목록 섹션 설명을 입력하세요. (클릭 시 상세페이지로 이동)',
    items: [
      {
        id: id('prod', 1),
        title: '제품 1',
        desc: '제품 1에 대한 요약 설명을 입력하세요.',
        badge: 'Brochure',
        thumbnailUrl: '',
        detailImages: [],
        detailVideoUrl: '',
        detailDesc: '제품 1에 대한 상세 설명을 입력하세요.',
        attachments: [],
      },
    ],
  },
  gallery: {
    mainTitle: 'Gallery',
    mainDesc: 'Gallery 페이지 소개 문구를 입력하세요.',
    bannerUrl: '',
    subTitle: 'Archive',
    subDesc: '목록 섹션 설명을 입력하세요. (클릭 시 상세페이지로 이동)',
    items: [
      {
        id: id('gal', 1),
        title: '갤러리 항목 1',
        desc: '갤러리 항목 1에 대한 요약 설명을 입력하세요.',
        badge: '',
        thumbnailUrl: '',
        detailImages: [],
        detailVideoUrl: '',
        detailDesc: '갤러리 항목 1에 대한 상세 설명을 입력하세요.',
        attachments: [],
      },
    ],
  },
  advisory: {
    mainTitle: 'Advisory',
    mainDesc: 'Advisory 페이지 소개 문구를 입력하세요.',
    bannerUrl: '',
    subTitle: 'Programs',
    subDesc: '목록 섹션 설명을 입력하세요. (클릭 시 상세페이지로 이동)',
    items: [
      {
        id: id('adv', 1),
        title: '자문 프로그램 1',
        desc: '자문 프로그램 1에 대한 요약 설명을 입력하세요.',
        badge: '',
        thumbnailUrl: '',
        detailImages: [],
        detailVideoUrl: '',
        detailDesc: '자문 프로그램 1에 대한 상세 설명을 입력하세요.',
        attachments: [],
      },
    ],
  },
  contact: {
    subLabel: 'Talk to Us',
    heading: 'Contact Us',
    leadDesc: "We're here to help! If you have any questions, feedback, or need assistance, please don't hesitate to reach out.",
    sheetWebhookUrl: '',
  },
  footer: {
    brand: 'COMPANY NAME',
    intro: '회사 소개',
    details: '주소를 입력하세요\n(주)회사명 | 대표자 이름 | 사업자등록번호 000-00-00000',
    copy: '©2026 COMPANY NAME. All rights reserved.',
  },
  privacy: {
    title: '개인정보처리방침',
    content: '개인정보처리방침 내용을 입력하세요.',
  },
  terms: {
    title: '이용약관',
    content: '이용약관 내용을 입력하세요.',
  },
};

// Migrates items saved before multi-image/multi-attachment support existed.
function normalizeHubItem(raw: HubItem): HubItem {
  const item = raw as Partial<HubItem> & Record<string, unknown>;
  const legacyDetailImageUrl = typeof item.detailImageUrl === 'string' ? item.detailImageUrl : '';
  const legacyFileUrl = typeof item.fileUrl === 'string' ? item.fileUrl : '';
  const legacyFileName = typeof item.fileName === 'string' ? item.fileName : '';

  return {
    id: item.id ?? '',
    title: item.title ?? '',
    desc: item.desc ?? '',
    badge: item.badge ?? '',
    thumbnailUrl: item.thumbnailUrl ?? '',
    detailVideoUrl: item.detailVideoUrl ?? '',
    detailDesc: item.detailDesc ?? '',
    detailImages: item.detailImages ?? (legacyDetailImageUrl ? [legacyDetailImageUrl] : []),
    attachments: item.attachments ?? (legacyFileUrl ? [{ url: legacyFileUrl, name: legacyFileName || '첨부파일' }] : []),
  };
}

function normalizeHub(hub: Partial<HubConfig> | undefined, fallback: HubConfig): HubConfig {
  return {
    ...fallback,
    ...hub,
    items: hub?.items?.length ? hub.items.map(normalizeHubItem) : fallback.items,
  };
}

export function mergeWithDefaults(partial: Partial<SiteContent> | null | undefined): SiteContent {
  if (!partial) return defaultSiteContent;
  return {
    hero: { ...defaultSiteContent.hero, ...partial.hero },
    showcase: {
      ...defaultSiteContent.showcase,
      ...partial.showcase,
      items: partial.showcase?.items?.length ? partial.showcase.items : defaultSiteContent.showcase.items,
    },
    products: normalizeHub(partial.products, defaultSiteContent.products),
    gallery: normalizeHub(partial.gallery, defaultSiteContent.gallery),
    advisory: normalizeHub(partial.advisory, defaultSiteContent.advisory),
    contact: { ...defaultSiteContent.contact, ...partial.contact },
    footer: { ...defaultSiteContent.footer, ...partial.footer },
    privacy: { ...defaultSiteContent.privacy, ...partial.privacy },
    terms: { ...defaultSiteContent.terms, ...partial.terms },
  };
}
