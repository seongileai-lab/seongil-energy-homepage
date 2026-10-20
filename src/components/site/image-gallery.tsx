'use client';

import { useCallback, useEffect, useState } from 'react';

interface Img {
  src: string;
  alt: string;
}

// 이미지를 세로로 나열하고, 누르면 어두운 배경 위에 크게 띄워 보여줍니다.
export default function ImageGallery({ images }: { images: Img[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  return (
    <>
      <div className="single">
        {images.map((g, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={g.src} src={g.src} alt={g.alt} loading="lazy" className="zoomable" onClick={() => setOpen(i)} />
        ))}
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="이미지 크게 보기" onClick={close}>
          <button className="lb-close" aria-label="닫기" onClick={close}>×</button>
          {images.length > 1 && (
            <button className="lb-nav prev" aria-label="이전 이미지" onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[open].src} alt={images[open].alt} onClick={(e) => e.stopPropagation()} />
          {images.length > 1 && (
            <button className="lb-nav next" aria-label="다음 이미지" onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
          )}
          {images.length > 1 && <div className="lb-count">{open + 1} / {images.length}</div>}
        </div>
      )}
    </>
  );
}
