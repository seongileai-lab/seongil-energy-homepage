'use server';

import { revalidatePath } from 'next/cache';
import { updateSiteContent } from '@/lib/content';
import type { SiteContent } from '@/lib/content-types';

export async function saveSiteContent(content: SiteContent) {
  await updateSiteContent(content);

  revalidatePath('/', 'layout');
  revalidatePath('/admin');
}
