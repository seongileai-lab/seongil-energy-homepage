import type { Metadata } from 'next';
import Link from 'next/link';
import { about, company, technology } from '@/lib/site';

export const metadata: Metadata = {
  title: '핵심기술',
  description: '기계 설계, 발전기 기술, 전력전자, 에너지 저장, 임베디드 소프트웨어와 AI 제어를 통합한 성일에너지의 핵심기술입니다.',
};

export default function TechnologyPage() {
  return (
    <main className="wrap page-wide">
      <div className="crumb"><Link href="/">홈</Link> › 핵심기술</div>
      <div className="phead">
        <div className="tag">{technology.eyebrow}</div>
        <h1 className="pre-line">{technology.title}</h1>
        <p className="lead">{technology.desc}</p>
      </div>

      <section className="list-block">
        <h2 className="list-title">통합 엔지니어링</h2>
        <div className="values tech-values">
          {technology.values.map((v) => (
            <div className="value" key={v.b}><b>{v.b}</b><p>{v.t}</p></div>
          ))}
        </div>
      </section>

      <section className="list-block">
        <h2 className="list-title">핵심 기술 · 인증</h2>
        <div className="facts tech-facts">
          {about.facts.map((f) => (
            <div className="fact" key={f.b}><b>{f.b}</b><span>{f.t}</span></div>
          ))}
        </div>
      </section>

      <div className="tech-cta">
        <p>기술 협력과 개발 상담은 언제든지 문의해 주세요. 전화 {company.phone}</p>
        <Link className="btn" href="/contact">기술상담 문의 →</Link>
      </div>
    </main>
  );
}
