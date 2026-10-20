import type { Metadata } from 'next';
import ContactForm from './contact-form';
import { company } from '@/lib/site';

export const metadata: Metadata = {
  title: '문의하기',
  description: '제품 문의, 기술 상담, 파트너 제안을 남겨주시면 이메일로 회신드립니다.',
};

export default function ContactPage() {
  return (
    <main className="wrap page-narrow">
      <div className="phead">
        <div className="tag">CONTACT</div>
        <h1>문의하기</h1>
        <p className="lead">제품 문의 · 기술 상담 · 파트너 제안을 남겨주시면 이메일로 회신드립니다.<br />전화 문의 {company.phone}</p>
      </div>
      <div className="contact-card">
        <ContactForm />
      </div>
    </main>
  );
}
