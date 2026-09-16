'use client';

import { useActionState } from 'react';
import { submitContactForm, type ContactFormState } from './actions';

const initialState: ContactFormState = { ok: false };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.ok) {
    return (
      <div className="thankyou-modal show" style={{ position: 'static', background: 'none', backdropFilter: 'none' }}>
        <div className="modal-card" style={{ margin: 0, padding: 0, textAlign: 'left', maxWidth: 'none' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>문의가 정상 접수되었습니다.</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 8 }}>
            성일에너지 담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <div className="contact-row"><label>First name *</label><input type="text" name="firstName" className="contact-input" required /></div>
      <div className="contact-row"><label>Last name *</label><input type="text" name="lastName" className="contact-input" required /></div>
      <div className="contact-row"><label>Email *</label><input type="email" name="email" className="contact-input" required /></div>
      <div className="contact-row"><label>Phone</label><input type="tel" name="phone" className="contact-input" /></div>
      <div className="contact-row"><label>Message *</label><textarea name="message" className="contact-input" style={{ minHeight: 100 }} required /></div>
      {state.error && <p style={{ color: '#dc2626', fontSize: '0.8rem', marginBottom: 12 }}>{state.error}</p>}
      <button type="submit" className="btn-contact-submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
