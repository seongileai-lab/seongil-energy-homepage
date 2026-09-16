import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content';
import HubDetail from '@/components/site/hub-detail';

export default async function GalleryDetailPage({ params }: PageProps<'/gallery/[id]'>) {
  const { id } = await params;
  const { gallery } = await getSiteContent();
  const item = gallery.items.find((i) => i.id === id);
  if (!item) notFound();
  return <HubDetail basePath="/gallery" backLabel="Gallery" item={item} />;
}
