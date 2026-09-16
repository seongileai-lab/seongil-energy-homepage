import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content';
import HubDetail from '@/components/site/hub-detail';

export default async function AdvisoryDetailPage({ params }: PageProps<'/advisory/[id]'>) {
  const { id } = await params;
  const { advisory } = await getSiteContent();
  const item = advisory.items.find((i) => i.id === id);
  if (!item) notFound();
  return <HubDetail basePath="/advisory" backLabel="Advisory" item={item} />;
}
