'use server';

import { revalidatePath } from 'next/cache';
import { updateSiteContent } from '@/lib/content';
import type { SiteContent } from '@/lib/content-types';

export async function saveSiteContent(content: SiteContent) {
  await updateSiteContent(content);

  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath('/advisory');
  revalidatePath('/about');
  revalidatePath('/contact');
  revalidatePath('/privacy');
  revalidatePath('/terms');
  revalidatePath('/admin');
}
