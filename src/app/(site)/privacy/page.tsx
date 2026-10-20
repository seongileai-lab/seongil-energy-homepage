import type { Metadata } from 'next';
import { privacy } from '@/lib/policies';

export const metadata: Metadata = { title: privacy.title, description: '성일에너지 개인정보처리방침' };

export default function PrivacyPage() {
  return (
    <main className="wrap page-narrow">
      <div className="phead"><h1>{privacy.title}</h1></div>
      <div className="policy">{privacy.content}</div>
    </main>
  );
}
