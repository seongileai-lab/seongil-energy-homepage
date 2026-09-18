import { getSiteContent } from '@/lib/content';

export default async function AboutPage() {
  const { about } = await getSiteContent();

  return (
    <div className="content-hub-page">
      <div className="hub-container">
        <div className="hub-header">
          <h1 className="hub-title">{about.heading}</h1>
          <p className="hub-desc">{about.subDesc}</p>
        </div>
        {about.bannerUrl && <div className="hub-key-banner" style={{ backgroundImage: `url('${about.bannerUrl}')` }} />}
        <div className="about-body">{about.body}</div>
      </div>
    </div>
  );
}
