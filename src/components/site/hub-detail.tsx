import Link from 'next/link';
import type { HubItem } from '@/lib/content-types';

export default function HubDetail({ basePath, backLabel, item }: { basePath: string; backLabel: string; item: HubItem }) {
  const images = item.detailImages.length ? item.detailImages : item.thumbnailUrl ? [item.thumbnailUrl] : [];

  return (
    <div className="content-detail-page">
      <div className="detail-page-container">
        <Link href={basePath} className="btn-back-to-list">← {backLabel} 목록으로 돌아가기</Link>
        <div><span className="detail-view-badge">{item.badge}</span></div>
        <h1 className="detail-view-title">{item.title}</h1>

        {item.detailVideoUrl && (
          <div className="detail-media-container">
            <iframe
              className="detail-view-video"
              src={item.detailVideoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {images.length > 0 && (
          <div className={`detail-image-grid${images.length === 1 ? ' single' : ''}`}>
            {images.map((url, i) => (
              <div key={i} className="detail-image-grid-item" style={{ backgroundImage: `url('${url}')` }} />
            ))}
          </div>
        )}

        <div className="detail-view-body">{item.detailDesc}</div>

        <div className="detail-attachment-list">
          {item.attachments.length === 0 ? (
            <div className="detail-download-card">
              <div className="detail-download-meta">
                <strong>공식 문서 및 안내자료</strong>
                <span>등록된 첨부파일이 없습니다.</span>
              </div>
              <a href="#" className="btn-page-download disabled" download>자료 다운로드</a>
            </div>
          ) : (
            item.attachments.map((file, i) => (
              <div className="detail-download-card" key={i}>
                <div className="detail-download-meta">
                  <strong>{file.name || '첨부파일'}</strong>
                </div>
                <a href={file.url} className="btn-page-download" download>
                  자료 다운로드
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
