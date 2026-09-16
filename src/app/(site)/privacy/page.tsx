import { getSiteContent } from '@/lib/content';

export default async function PrivacyPage() {
  const { privacy } = await getSiteContent();
  return (
    <div className="policy-page-view">
      <div className="policy-container">
        <h2>{privacy.title}</h2>
        <div className="policy-body">{privacy.content}</div>
      </div>
    </div>
  );
}
