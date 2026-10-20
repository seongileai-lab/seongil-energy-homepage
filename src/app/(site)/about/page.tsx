import type { Metadata } from 'next';
import { about, company, vision } from '@/lib/site';

export const metadata: Metadata = {
  title: '회사소개',
  description: '성일에너지는 발전기 제조·개발 40년 노하우로 신재생에너지, 풍력발전기 등 폭넓은 기술 개발을 수행합니다.',
};

export default function AboutPage() {
  return (
    <main className="wrap page-narrow">
      <div className="phead">
        <div className="tag">{about.tag}</div>
        <h1 className="pre-line">{about.heading}</h1>
        {about.paragraphs.map((t) => <p className="lead" key={t}>{t}</p>)}
      </div>

      <div className="facts page-block">
        {about.facts.map((f) => (
          <div className="fact" key={f.b}><b>{f.b}</b><span>{f.t}</span></div>
        ))}
      </div>

      <section className="page-block">
        <h2 className="page-h2">회사 개요</h2>
        <table className="spec wide">
          <tbody>
            {about.overview.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}
            <tr><th>대표전화</th><td>{company.phone}</td></tr>
          </tbody>
        </table>
      </section>

      <section className="page-block">
        <h2 className="page-h2">주요 사업 분야</h2>
        <ul className="plain-list">
          {about.business.map((b) => <li key={b}>{b}</li>)}
        </ul>
      </section>

      <section className="page-block">
        <h2 className="page-h2">ESG</h2>
        <div className="esg flat">
          {vision.items.map((e) => (
            <div key={e.b}><b>{e.b}</b><p>{e.t}</p></div>
          ))}
        </div>
      </section>
    </main>
  );
}
