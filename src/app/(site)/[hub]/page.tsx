import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content';
import HubList from '@/components/site/hub-list';

export default async function HubPage({ params }: PageProps<'/[hub]'>) {
  const { hub: hubSlug } = await params;
  const { hubs } = await getSiteContent();
  const hub = hubs.find((h) => h.id === hubSlug);
  if (!hub) notFound();
  return <HubList basePath={`/${hub.id}`} hub={hub} />;
}
