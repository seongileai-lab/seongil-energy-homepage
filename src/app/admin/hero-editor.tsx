'use client';

import type { HeroConfig, ShowcaseConfig } from '@/lib/content-types';
import MediaUpload from '@/components/admin/media-upload';

interface Props {
  hero: HeroConfig;
  showcase: ShowcaseConfig;
  onHeroChange: (hero: HeroConfig) => void;
  onShowcaseChange: (showcase: ShowcaseConfig) => void;
}

export default function HeroEditor({ hero, showcase, onHeroChange, onShowcaseChange }: Props) {
  function set<K extends keyof HeroConfig>(key: K, value: HeroConfig[K]) {
    onHeroChange({ ...hero, [key]: value });
  }

  function setItem(i: number, patch: Partial<ShowcaseConfig['items'][number]>) {
    const items = showcase.items.map((it, idx) => (idx === i ? { ...it, ...patch } : it));
    onShowcaseChange({ ...showcase, items });
  }

  return (
    <div>
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

      <div className="form-group">
        <label>프로젝트 소개 섹션 상단 라벨 / 제목 / 설명</label>
        <input className="form-control" value={showcase.topLabel} onChange={(e) => onShowcaseChange({ ...showcase, topLabel: e.target.value })} />
        <textarea className="form-control" style={{ marginTop: 6 }} value={showcase.mainTitle} onChange={(e) => onShowcaseChange({ ...showcase, mainTitle: e.target.value })} />
        <textarea className="form-control" style={{ marginTop: 6 }} value={showcase.subDesc} onChange={(e) => onShowcaseChange({ ...showcase, subDesc: e.target.value })} />
      </div>

      {showcase.items.map((item, i) => (
        <div className="zigzag-edit-card" key={i}>
          <div className="zigzag-edit-title">소개 항목 {i + 1}</div>
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
            <select className="form-control" value={item.linkTo} onChange={(e) => setItem(i, { linkTo: e.target.value as typeof item.linkTo })}>
              <option value="pageProducts">Products</option>
              <option value="pageGallery">Gallery</option>
              <option value="pageAdvisory">Advisory</option>
            </select>
          </div>
          <MediaUpload label="이미지" value={item.imageUrl} onChange={(url) => setItem(i, { imageUrl: url })} />
        </div>
      ))}
    </div>
  );
}
