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

export interface HubItem {
  id: string;
  title: string;
  desc: string;
  badge: string;
  thumbnailUrl: string;
  detailImageUrl: string;
  detailVideoUrl: string;
  detailDesc: string;
  fileUrl: string;
  fileName: string;
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
    logoText: 'SEONGIL ENERGY',
    headerBlur: false,
    title: 'THE FUTURE OF\nMOBILITY IS HERE',
    desc: 'Discover the safest self-driving experience with Autono.',
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
    mainTitle: '성일에너지가 만들어가는\n신뢰와 기술의 가치',
    subDesc: '혁신적인 공법과 철저한 품질 관리로 지속 가능한 미래 건축 및 에너지 솔루션을 실현합니다.',
    items: [
      {
        title: 'Commercial',
        desc: '첨단 상업 시설 및 비즈니스 인프라 구축을 위한 정밀 시공과 최적화된 설계 솔루션을 제공합니다.',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?w=800&q=85',
        linkTo: 'pageProducts',
      },
      {
        title: 'Infrastructure',
        desc: '대형 교량, 고속철도, 공공 기반 시설 등 국가 기간 인프라 프로젝트를 성공적으로 수행합니다.',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85',
        linkTo: 'pageGallery',
      },
      {
        title: 'Residential',
        desc: '삶의 질을 높이는 프리미엄 주거 공간과 미래지향적 스마트 홈 시스템을 융합합니다.',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=85',
        linkTo: 'pageAdvisory',
      },
    ],
  },
  products: {
    mainTitle: 'Next-Gen Energy Products',
    mainDesc: '성일에너지가 독자 개발한 미래형 하이브리드 발전 시스템 및 스마트 에너지 기술 포트폴리오입니다.',
    bannerUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=85',
    subTitle: 'Core Development Lineup',
    subDesc: '지속 가능한 청정 에너지 공급을 위한 주력 개발 모델 안내 (클릭 시 상세페이지로 이동)',
    items: [
      {
        id: id('prod', 1),
        title: '도심형 수소-풍력 발전 타워',
        desc: '초속 2m/s 저풍속 환경에서도 발전 가능한 도심형 하이브리드 타워입니다.',
        badge: 'IR Brochure',
        thumbnailUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=85',
        detailImageUrl: '',
        detailVideoUrl: '',
        detailDesc: '초속 2m/s 저풍속 환경에서도 최적의 발전 효율을 발휘하는 무코어 스크루형 수직축 발전 시스템입니다.',
        fileUrl: '',
        fileName: '',
      },
    ],
  },
  gallery: {
    mainTitle: 'R&D Archive & Patents',
    mainDesc: '성일에너지가 직접 연구·제작해온 하드웨어 실증 현장과 공식 특허 및 인증 내역입니다.',
    bannerUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=85',
    subTitle: 'Field Production & Testing',
    subDesc: '설계부터 완제품 조립까지 자체 기술력으로 검증한 실증 갤러리 (클릭 시 상세페이지로 이동)',
    items: [
      {
        id: id('gal', 1),
        title: '리튬인산철 배터리 팩 자체 제작',
        desc: '자체 밸런싱 BMS 기술을 결합한 2.4kWh급 에너지 저장 장치 모듈 제작 기록.',
        badge: '제작 실증',
        thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=85',
        detailImageUrl: '',
        detailVideoUrl: '',
        detailDesc: '자체 밸런싱 BMS 기술을 결합한 2.4kWh급 에너지 저장 장치 모듈 제작 및 부하 테스트 공정 기록.',
        fileUrl: '',
        fileName: '',
      },
    ],
  },
  advisory: {
    mainTitle: 'Expert Engineering Advisory',
    mainDesc: '풍력발전 시스템 설계, 인프라 융합 구조 검토 및 신재생에너지 기술 컨설팅 자문 서비스입니다.',
    bannerUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=85',
    subTitle: 'Core Advisory Programs',
    subDesc: '전문 엔지니어링 그룹의 맞춤형 기술 자문 프로그램 안내 (클릭 시 상세페이지로 이동)',
    items: [
      {
        id: id('adv', 1),
        title: '풍력발전 시스템 구조 최적화 컨설팅',
        desc: '저풍속 환경 대응 스크루형 터빈 구조 설계 검토 자문 제공.',
        badge: '기술 자문',
        thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=85',
        detailImageUrl: '',
        detailVideoUrl: '',
        detailDesc: '저풍속 환경 대응 스크루형 터빈 구조 설계 검토 및 도로 인프라 연계 타당성 분석 자문 제공.',
        fileUrl: '',
        fileName: '',
      },
    ],
  },
  contact: {
    subLabel: 'Talk to Us',
    heading: 'Contact Us',
    leadDesc: "We're here to help! If you have any questions, feedback, or need assistance, please don't hesitate to reach out.",
  },
  footer: {
    brand: 'SEONGIL ENERGY',
    intro: '성일에너지 소개',
    details: '서울특별시 강남구 테헤란로 123 성일타워 8층\n(주)성일에너지 | 대표자 홍길동 | 사업자등록번호 101-82-12345',
    copy: '©2026 SEONGIL ENERGY. All rights reserved.',
  },
  privacy: {
    title: '개인정보처리방침',
    content: '성일에너지는 정보주체의 자유와 권리 보호를 위해 개인정보 보호법 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다.',
  },
  terms: {
    title: '이용약관',
    content: '본 약관은 성일에너지가 제공하는 공식 온라인 웹사이트 및 제반 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.',
  },
};

export function mergeWithDefaults(partial: Partial<SiteContent> | null | undefined): SiteContent {
  if (!partial) return defaultSiteContent;
  return {
    hero: { ...defaultSiteContent.hero, ...partial.hero },
    showcase: {
      ...defaultSiteContent.showcase,
      ...partial.showcase,
      items: partial.showcase?.items?.length ? partial.showcase.items : defaultSiteContent.showcase.items,
    },
    products: { ...defaultSiteContent.products, ...partial.products, items: partial.products?.items ?? defaultSiteContent.products.items },
    gallery: { ...defaultSiteContent.gallery, ...partial.gallery, items: partial.gallery?.items ?? defaultSiteContent.gallery.items },
    advisory: { ...defaultSiteContent.advisory, ...partial.advisory, items: partial.advisory?.items ?? defaultSiteContent.advisory.items },
    contact: { ...defaultSiteContent.contact, ...partial.contact },
    footer: { ...defaultSiteContent.footer, ...partial.footer },
    privacy: { ...defaultSiteContent.privacy, ...partial.privacy },
    terms: { ...defaultSiteContent.terms, ...partial.terms },
  };
}
