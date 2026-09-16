import { getSiteContent } from '@/lib/content';
import HubList from '@/components/site/hub-list';

export default async function GalleryPage() {
  const { gallery } = await getSiteContent();
  return <HubList basePath="/gallery" hub={gallery} />;
}
