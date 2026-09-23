'use client';

import type { ContactConfig, FooterConfig, PolicyConfig } from '@/lib/content-types';

interface Props {
  contact: ContactConfig;
  footer: FooterConfig;
  privacy: PolicyConfig;
  terms: PolicyConfig;
  onContactChange: (v: ContactConfig) => void;
  onFooterChange: (v: FooterConfig) => void;
  onPrivacyChange: (v: PolicyConfig) => void;
  onTermsChange: (v: PolicyConfig) => void;
}

export default function MiscEditor({ contact, footer, privacy, terms, onContactChange, onFooterChange, onPrivacyChange, onTermsChange }: Props) {
  return (
    <div>
      <div className="form-group">
        <label>Contact 페이지 - 서브 라벨 / 제목 / 안내 문구</label>
        <input className="form-control" value={contact.subLabel} onChange={(e) => onContactChange({ ...contact, subLabel: e.target.value })} />
        <input className="form-control" style={{ marginTop: 6 }} value={contact.heading} onChange={(e) => onContactChange({ ...contact, heading: e.target.value })} />
        <textarea className="form-control" style={{ marginTop: 6 }} value={contact.leadDesc} onChange={(e) => onContactChange({ ...contact, leadDesc: e.target.value })} />
      </div>

      <div className="form-group">
        <label>문의 알림 웹훅 URL (구글 시트 + 이메일)</label>
        <div className="guide-text">
          문의가 접수되면 이 주소로 전송됩니다. Apps Script에서 스프레드시트 기록과 이메일 알림을 함께 처리하도록 설정하세요 (SETUP.md 참고).
        </div>
        <input
          className="form-control"
          placeholder="https://script.google.com/macros/s/xxxx/exec"
          value={contact.sheetWebhookUrl}
          onChange={(e) => onContactChange({ ...contact, sheetWebhookUrl: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>푸터 - 브랜드명 / 소개 제목 / 상세 정보 / 저작권 문구</label>
        <input className="form-control" value={footer.brand} onChange={(e) => onFooterChange({ ...footer, brand: e.target.value })} />
        <input className="form-control" style={{ marginTop: 6 }} value={footer.intro} onChange={(e) => onFooterChange({ ...footer, intro: e.target.value })} />
        <textarea className="form-control" style={{ marginTop: 6 }} value={footer.details} onChange={(e) => onFooterChange({ ...footer, details: e.target.value })} />
        <input className="form-control" style={{ marginTop: 6 }} value={footer.copy} onChange={(e) => onFooterChange({ ...footer, copy: e.target.value })} />
      </div>

      <div className="form-group">
        <label>개인정보처리방침</label>
        <input className="form-control" value={privacy.title} onChange={(e) => onPrivacyChange({ ...privacy, title: e.target.value })} />
        <textarea className="form-control" style={{ marginTop: 6, minHeight: 160 }} value={privacy.content} onChange={(e) => onPrivacyChange({ ...privacy, content: e.target.value })} />
      </div>

      <div className="form-group">
        <label>이용약관</label>
        <input className="form-control" value={terms.title} onChange={(e) => onTermsChange({ ...terms, title: e.target.value })} />
        <textarea className="form-control" style={{ marginTop: 6, minHeight: 160 }} value={terms.content} onChange={(e) => onTermsChange({ ...terms, content: e.target.value })} />
      </div>
    </div>
  );
}
