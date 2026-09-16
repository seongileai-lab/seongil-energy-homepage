'use server';

import { createClient } from '@/lib/supabase/server';

export interface ContactFormState {
  ok: boolean;
  error?: string;
}

export async function submitContactForm(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const firstName = String(formData.get('firstName') || '').trim();
  const lastName = String(formData.get('lastName') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!firstName || !lastName || !email || !message) {
    return { ok: false, error: '필수 항목을 모두 입력해주세요.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('contact_submissions').insert({
    first_name: firstName,
    last_name: lastName,
    email,
    phone: phone || null,
    message,
  });

  if (error) {
    return { ok: false, error: '전송에 실패했습니다. 잠시 후 다시 시도해주세요.' };
  }

  return { ok: true };
}
