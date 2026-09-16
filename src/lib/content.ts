import { createClient } from '@/lib/supabase/server';
import { defaultSiteContent, mergeWithDefaults, type SiteContent } from '@/lib/content-types';

export async function getSiteContent(): Promise<SiteContent> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('site_content').select('data').eq('id', 1).single();

  if (error || !data) {
    return defaultSiteContent;
  }

  return mergeWithDefaults(data.data as Partial<SiteContent>);
}

export async function updateSiteContent(content: SiteContent) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { error } = await supabase
    .from('site_content')
    .update({ data: content, updated_at: new Date().toISOString() })
    .eq('id', 1);

  if (error) {
    throw new Error(error.message);
  }
}
