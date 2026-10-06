'use client';

import { isTextRight, type HeroConfig, type ShowcaseConfig, type HubSection } from '@/lib/content-types';
import { useState } from 'react';
import MediaUpload from '@/components/admin/media-upload';
import ConfirmDialog from './confirm-dialog';

interface Props {
  section?: string;
  hero: HeroConfig;
  showcase: ShowcaseConfig;
  hubs: HubSection[];
  onHeroChange: (hero: HeroConfig) => void;
  onShowcaseChange: (showcase: ShowcaseConfig) => void;
}

export default function HeroEditor({ section = 'all', hero, showcase, hubs, onHeroChange, onShowcaseChange }: Props) {
  function set<K extends keyof HeroConfig>(key: K, value: HeroConfig[K]) {
    onHeroChange({ ...hero, [key]: value });
  }

  function setItem(i: number, patch: Partial<ShowcaseConfig['items'][number]>) {
    const items = showcase.items.map((it, idx) => (idx === i ? { ...it, ...patch } : it));
    onShowcaseChange({ ...showcase, items });
  }

  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  function confirmRemoveItem() {
    if (deletingIndex === null) return;
    onShowcaseChange({ ...showcase, items: showcase.items.filter((_, idx) => idx !== deletingIndex) });
    setDeletingIndex(null);
  }

  const show = (k: string) => section === 'all' || section === k;

  return (
    <div>
      {show('header') && (<>
      <div className="form-group">
        <label>로고 텍스트 (이미지 미등록 시 표시)</label>
        <input className="form-control" value={hero.logoText} onChange={(e) => set('logoText', e.target.value)} />
      </div>

      <MediaUpload
        label="좌측 상단 로고 이미지"
        value={hero.logoUrl}
        onChange={(url) => set('logoUrl', url)}
        guideText="로고 높이 42px에 맞춰 최적화됩니다."
      />

      <div className="form-group">
        <label className="switch-label">
          <input type="checkbox" checked={hero.headerBlur} onChange={(e) => set('headerBlur', e.target.checked)} />
          헤더 바 항상 반투명 블러 적용
        </label>
      </div>
      </>)}

      {show('hero') && (<>
      <div className="form-group">
        <label>메인 카피 문구</label>
        <textarea className="form-control" value={hero.title} onChange={(e) => set('title', e.target.value)} />
        <textarea className="form-control" style={{ marginTop: 6 }} value={hero.desc} onChange={(e) => set('desc', e.target.value)} />
        <div className="option-box">
          <label className="switch-label"><input type="checkbox" checked={hero.whiteText} onChange={(e) => set('whiteText', e.target.checked)} /> <strong>화이트(White) 글자색</strong></label>
          <label className="switch-label"><input type="checkbox" checked={hero.textShadow} onChange={(e) => set('textShadow', e.target.checked)} /> <strong>글자 그림자(Shadow) 적용</strong></label>
          <label className="switch-label"><input type="checkbox" checked={hero.darkOverlay} onChange={(e) => set('darkOverlay', e.target.checked)} /> <strong>배경 어둡게(Dark Tint)</strong></label>
        </div>
      </div>

      <div className="form-group">
        <div className="label-wrapper">
          <label>히어로 배경 미디어 설정</label>
          <label className="switch-label"><input type="checkbox" checked={hero.bgActive} onChange={(e) => set('bgActive', e.target.checked)} /> 배경 활성화</label>
        </div>

        <div className="media-type-selector">
          <label className="media-radio-lbl"><input type="radio" name="heroMediaType" checked={hero.mediaType === 'image'} onChange={() => set('mediaType', 'image')} /> 배경 사진</label>
          <label className="media-radio-lbl"><input type="radio" name="heroMediaType" checked={hero.mediaType === 'video'} onChange={() => set('mediaType', 'video')} /> 배경 동영상 (MP4)</label>
        </div>

        {hero.mediaType === 'image' ? (
          <MediaUpload label="배경 이미지" value={hero.bgImageUrl} onChange={(url) => set('bgImageUrl', url)} />
        ) : (
          <MediaUpload
            label="배경 동영상"
            value={hero.bgVideoUrl}
            onChange={(url) => set('bgVideoUrl', url)}
            accept="video/mp4,video/webm"
            guideText="업로드한 동영상이 백그라운드에서 자동 반복 재생됩니다."
          />
        )}

        <div className="pos-controller" style={{ marginTop: 8 }}>
          <span>배경 위치 X: {hero.bgPosX}%</span>
          <input type="range" min={0} max={100} value={hero.bgPosX} onChange={(e) => set('bgPosX', Number(e.target.value))} />
        </div>
        <div className="pos-controller" style={{ marginTop: 8 }}>
          <span>배경 위치 Y: {hero.bgPosY}%</span>
          <input type="range" min={0} max={100} value={hero.bgPosY} onChange={(e) => set('bgPosY', Number(e.target.value))} />
        </div>
      </div>
      </>)}

      {show('showcase') && (
      <div className="form-group">
        <label>프로젝트 소개 섹션 상단 라벨 / 제목 / 설명</label>
        <input className="form-control" value={showcase.topLabel} onChange={(e) => onShowcaseChange({ ...showcase, topLabel: e.target.value })} />
        <textarea className="form-control" style={{ marginTop: 6 }} value={showcase.mainTitle} onChange={(e) => onShowcaseChange({ ...showcase, mainTitle: e.target.value })} />
        <textarea className="form-control" style={{ marginTop: 6 }} value={showcase.subDesc} onChange={(e) => onShowcaseChange({ ...showcase, subDesc: e.target.value })} />
      </div>
      )}

      {showcase.items.map((item, i) => (show('item-' + i) || section === 'showcase-items') && (
        <div className="zigzag-edit-card" key={i}>
          <div className="label-wrapper">
            <div className="zigzag-edit-title">소개 항목 {i + 1}</div>
            <button type="button" className="btn-item-delete" onClick={() => setDeletingIndex(i)}>이 항목 삭제</button>
          </div>
          <div className="form-group" style={{ marginBottom: 10, paddingBottom: 10 }}>
            <label>글 박스(View All) 위치</label>
            <div style={{ display: 'flex', gap: 16, fontSize: '0.82rem' }}>
              {(['left', 'right'] as const).map((side) => (
                <label key={side} style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>
                  <input
                    type="radio"
                    name={`text-side-${i}`}
                    checked={isTextRight(item, i) === (side === 'right')}
                    onChange={() => setItem(i, { textSide: side })}
                  />
                  {side === 'left' ? '왼쪽' : '오른쪽'}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: 10, paddingBottom: 10 }}>
            <label>제목</label>
            <input className="form-control" value={item.title} onChange={(e) => setItem(i, { title: e.target.value })} />
          </div>
          <div className="form-group" style={{ marginBottom: 10, paddingBottom: 10 }}>
            <label>설명</label>
            <textarea className="form-control" value={item.desc} onChange={(e) => setItem(i, { desc: e.target.value })} />
          </div>
          <div className="form-group" style={{ marginBottom: 10, paddingBottom: 0, border: 'none' }}>
            <label>연결 페이지</label>
            <select className="form-control" value={item.linkTo} onChange={(e) => setItem(i, { linkTo: e.target.value })}>
              <option value="">(연결 안 함)</option>
              {hubs.map((hub) => (
                <option key={hub.id} value={hub.id}>{hub.navLabel}</option>
              ))}
            </select>
          </div>
          <MediaUpload label="이미지" value={item.imageUrl} onChange={(url) => setItem(i, { imageUrl: url })} />
        </div>
      ))}

      {deletingIndex !== null && (
        <ConfirmDialog
          title="소개 항목 삭제"
          message={`"${showcase.items[deletingIndex]?.title || '(제목 없음)'}" 소개 항목을 삭제하시겠습니까?

우측 하단 "전체 저장"을 눌러야 실제로 반영됩니다.`}
          onConfirm={confirmRemoveItem}
          onCancel={() => setDeletingIndex(null)}
        />
      )}
    </div>
  );
}
