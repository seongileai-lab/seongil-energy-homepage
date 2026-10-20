'use client';

import { useActionState } from 'react';
import { submitContactForm, type ContactFormState } from './actions';

const initialState: ContactFormState = { ok: false };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.ok) {
    return (
      <div className="thanks">
        <h3>문의가 정상 접수되었습니다.</h3>
        <p>영업일 기준 1~2일 내 회신 드리겠습니다. 감사합니다.</p>
      </div>
    );
  }

  return (
    <form className="form" action={formAction}>
      <label>이름 *<input type="text" name="name" required /></label>
      <label>이메일 *<input type="email" name="email" required /></label>
      <label>연락처<input type="tel" name="phone" /></label>
      <label>문의 내용 *<textarea name="message" rows={6} required /></label>
      {state.error && <p className="form-error">{state.error}</p>}
      <p className="form-note">문의 접수 시 <a href="/privacy">개인정보처리방침</a>에 따라 이름·연락처·이메일·문의 내용이 수집됩니다.</p>
      <button type="submit" disabled={pending}>{pending ? '전송 중...' : '문의 보내기'}</button>
    </form>
  );
}
