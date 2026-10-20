import type { Metadata } from 'next';
import { terms } from '@/lib/policies';

export const metadata: Metadata = { title: terms.title, description: '성일에너지 이용약관' };

export default function TermsPage() {
  return (
    <main className="wrap page-narrow">
      <div className="phead"><h1>{terms.title}</h1></div>
      <div className="policy">{terms.content}</div>
    </main>
  );
}
