import { getSiteContent } from '@/lib/content';

export default async function TermsPage() {
  const { terms } = await getSiteContent();
  return (
    <div className="policy-page-view">
      <div className="policy-container">
        <h2>{terms.title}</h2>
        <div className="policy-body">{terms.content}</div>
      </div>
    </div>
  );
}
