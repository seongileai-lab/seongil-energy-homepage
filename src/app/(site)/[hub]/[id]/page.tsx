import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content';
import HubDetail from '@/components/site/hub-detail';

export default async function HubItemPage({ params }: PageProps<'/[hub]/[id]'>) {
  const { hub: hubSlug, id } = await params;
  const { hubs } = await getSiteContent();
  const hub = hubs.find((h) => h.id === hubSlug);
  if (!hub) notFound();
  const item = hub.items.find((i) => i.id === id);
  if (!item) notFound();
  return <HubDetail basePath={`/${hub.id}`} backLabel={hub.navLabel} item={item} />;
}
