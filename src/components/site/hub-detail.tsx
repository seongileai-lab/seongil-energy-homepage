import Link from 'next/link';
import type { HubItem } from '@/lib/content-types';

export default function HubDetail({ basePath, backLabel, item }: { basePath: string; backLabel: string; item: HubItem }) {
  return (
    <div className="content-detail-page">
      <div className="detail-page-container">
        <Link href={basePath} className="btn-back-to-list">← {backLabel} 목록으로 돌아가기</Link>
        <div><span className="detail-view-badge">{item.badge}</span></div>
        <h1 className="detail-view-title">{item.title}</h1>
        <div className="detail-media-container">
          {item.detailVideoUrl ? (
            <iframe
              className="detail-view-video"
              src={item.detailVideoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="detail-view-img" style={{ backgroundImage: `url('${item.detailImageUrl || item.thumbnailUrl}')` }} />
          )}
        </div>
        <div className="detail-view-body">{item.detailDesc}</div>
        <div className="detail-download-card">
          <div className="detail-download-meta">
            <strong>공식 문서 및 안내자료</strong>
            <span>{item.fileName || '등록된 첨부파일이 없습니다.'}</span>
          </div>
          <a
            href={item.fileUrl || '#'}
            className={`btn-page-download${item.fileUrl ? '' : ' disabled'}`}
            download
          >
            자료 다운로드
          </a>
        </div>
      </div>
    </div>
  );
}
