import Link from 'next/link';
import type { HubSection } from '@/lib/content-types';

export default function HubList({ basePath, hub }: { basePath: string; hub: HubSection }) {
  return (
    <div className="content-hub-page">
      <div className="hub-container">
        <div className="hub-header">
          <h1 className="hub-title">{hub.mainTitle}</h1>
          <p className="hub-desc">{hub.mainDesc}</p>
        </div>
        {hub.bannerUrl && <div className="hub-key-banner" style={{ backgroundImage: `url('${hub.bannerUrl}')` }} />}
        <div className="hub-sub-header">
          <h2 className="hub-sub-title">{hub.subTitle}</h2>
          <p className="hub-sub-desc">{hub.subDesc}</p>
        </div>
        <div className="hub-card-grid">
          {hub.items.map((item) => (
            <Link key={item.id} href={`${basePath}/${item.id}`} className="hub-card-btn">
              <div className="hub-card-media-box" style={{ backgroundImage: `url('${item.thumbnailUrl}')` }} />
              <div className="hub-card-body">
                <h3 className="hub-card-title">{item.title}</h3>
                <p className="hub-card-desc">{item.desc}</p>
                <div className="hub-card-foot">
                  <span className="hub-card-badge">{item.badge}</span>
                  <span className="hub-card-click-hint">자세히 보기 →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
