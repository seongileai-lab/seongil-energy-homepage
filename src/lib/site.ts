// 회사 공통 정보와 홈 문구. index.html 시안의 문구를 그대로 옮겼습니다. 바꾸려면 이 파일만 수정하세요.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://seongileng.kr';

export const company = {
  name: '성일에너지 주식회사',
  shortName: '성일에너지',
  en: 'SEONGIL ENERGY',
  ceo: '김영실',
  address: '경기도 김포시 김포한강4로420번길 30, 한강비즈나인 1215호',
  phone: '050-6337-2731',
  phoneHref: 'tel:05063372731',
  bizNo: '864-87-02738',
  description: '소형 풍력발전기, 에너지 고속도로, 원코드형 ESS, 소수력 등 분산형 신재생에너지 기술을 개발하는 성일에너지(주)입니다.',
};

export const nav = [
  { href: '/about', label: '회사소개' },
  { href: '/technology', label: '핵심기술' },
  { href: '/solutions', label: '제품·솔루션' },
  { href: '/esg', label: 'ESG·비전' },
  { href: '/news', label: '뉴스·인사이트' },
];
export const navCta = '기술상담 문의 ↗';

export const hero = {
  eyebrow: 'NEXT GENERATION ENERGY & TECHNOLOGY',
  titleLine1: '에너지의 새로운 기준,',
  titleLine2: '기술로 미래를 연결하다.',
  desc: '도심형 분산에너지부터 모듈형 풍력, 수소 하이브리드, 원코드형 ESS, AI 기반 제품개발까지. 성일에너지는 새로운 전력 인프라를 연구합니다.',
  primary: { label: '핵심 솔루션 살펴보기 →', href: '/#solutions' },
  secondary: { label: '성일에너지 소개', href: '/#about' },
  foot: [
    { b: 'MODULAR', t: '모듈형 분산발전' },
    { b: 'HYBRID', t: '풍력·수소 연계' },
    { b: 'SMART', t: 'AI·ESS 전력제어' },
  ],
};

export const solutions = {
  tag: 'OUR SOLUTIONS',
  title: '에너지 생산에서 저장·제어까지',
  intro: '서로 다른 기술을 연결해, 전력이 필요한 곳에서 생산하고 효율적으로 활용하는 솔루션을 제안합니다.',
  viewAll: '전체보기',
  // 기술개발 줄 마지막에 붙는 상담 카드
  custom: {
    title: '맞춤형 기술개발',
    desc: '아이디어 검토부터 설계, 시험, 실증 및 기술 고도화까지 맞춤형 개발을 지원합니다.',
    placeholder: 'R&D · ENGINEERING',
    href: '/contact',
    cta: '상담하기 ↗',
  },
};

export const technology = {
  eyebrow: 'INTEGRATED ENGINEERING',
  title: '하나의 기술이 아닌,\n연결된 시스템의 혁신.',
  desc: '기계 설계, 발전기 기술, 전력전자, 에너지 저장, 임베디드 소프트웨어와 인공지능 제어를 통합합니다. 단순한 부품 개발을 넘어 실제 운용 환경에 맞는 시스템을 설계합니다.',
  values: [
    { b: '01 · 에너지 생산', t: '소형 모듈형 풍력 및 복합 발전 기술' },
    { b: '02 · 전력 저장', t: 'ESS 및 전력변환 시스템' },
    { b: '03 · 지능형 제어', t: '센서·AI·임베디드 피드백 제어' },
    { b: '04 · 제품 구현', t: '설계부터 시제품 제작 및 검증' },
  ],
};

export const about = {
  tag: 'ABOUT SEONGIL ENERGY',
  heading: '아이디어를 기술로,\n기술을 미래의 가치로.',
  paragraphs: [
    '성일에너지는 친환경 에너지와 지능형 제품개발을 중심으로 지속가능한 기술혁신을 추구합니다. 에너지가 필요한 곳 가까이에서 전력을 생산하고 저장·제어하는 분산형 에너지 시스템으로 미래의 가능성을 확장합니다.',
    '또한 기계·전기전자·AI를 융합한 맞춤형 연구개발을 통해 다양한 아이디어의 실현을 지원합니다.',
  ],
  badge: { mark: 'SL', name: 'SEONGIL ENERGY', sub: 'Clean Energy · Smart Technology' },
  // 회사소개 페이지에서만 보여주는 추가 정보
  facts: [
    { b: '코어리스 더블로터', t: '철심 없는 발전기 구조로 미풍에도 회전 (특허 출원)' },
    { b: '스크류 블레이드', t: '바람을 감아 회전력을 높이는 나선형 구조' },
    { b: '특허 · 인증', t: '등록특허 2건, 다수 출원 / 벤처기업 확인' },
    { b: '산학협력', t: '국민대학교 LINC 3.0 사업단 협력' },
  ],
  overview: [
    ['회사명', '(주)성일에너지 (Seongil Energy Co., Ltd.)'],
    ['대표자', '김영실'],
    ['설립일', '2023년 8월 9일'],
    ['사업장 소재지', '경기도 김포시 김포한강4로420번길 30, 1215호 (구래동)'],
    ['자본금', '1억 5천만원'],
    ['임직원', '5명'],
  ] as [string, string][],
  business: [
    '신재생에너지 및 전력절감 제품 개발 — 소형 풍력발전기, 태양광 발전기, 하이브리드 발전기, 다목적 ESS',
    '기술고문 및 맞춤형 제품 개발(R&D 컨설팅) — 고객 맞춤형 제품 기획·설계 지원, 전력 제어 분야 기술 자문',
    '전략적 파트너십 및 협력사 연계 — 공동 연구개발 및 상생 협력 체계 구축',
  ],
};

export const vision = {
  tag: 'OUR VISION · ESG',
  title: '더 나은 에너지, 더 지속가능한 내일',
  intro: '탄소 저감에 기여하는 친환경 기술 개발, 안전을 고려한 설계, 책임 있는 기업운영을 지향합니다. 지역 현장에 적합한 분산형 발전기술로 지속가능한 에너지 생태계를 만들어갑니다.',
  items: [
    { b: 'Environment', t: '친환경 에너지·탄소저감 기술 개발' },
    { b: 'Social', t: '안전하고 유용한 기술을 통한 사회 기여' },
    { b: 'Governance', t: '투명성과 신뢰를 지향하는 경영' },
  ],
};

export const cta = {
  title: '새로운 기술개발, 성일에너지와 상의하세요.',
  desc: '1:1 맞춤 기술상담 · 연구개발 · 시제품 제작',
  button: `문의 ${company.phone} ↗`,
};
