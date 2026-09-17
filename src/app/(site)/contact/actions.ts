'use server';

import { createClient } from '@/lib/supabase/server';
import { getSiteContent } from '@/lib/content';

export interface ContactFormState {
  ok: boolean;
  error?: string;
}

export async function submitContactForm(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!name || !email || !message) {
    return { ok: false, error: '필수 항목을 모두 입력해주세요.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('contact_submissions').insert({
    name,
    email,
    phone: phone || null,
    message,
  });

  if (error) {
    return { ok: false, error: '전송에 실패했습니다. 잠시 후 다시 시도해주세요.' };
  }

  const { contact } = await getSiteContent();
  if (contact.sheetWebhookUrl) {
    try {
      await fetch(contact.sheetWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
    } catch {
      // Sheet sync is best-effort; the submission is already saved in Supabase.
    }
  }

  return { ok: true };
}
