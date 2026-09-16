import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content';
import HubDetail from '@/components/site/hub-detail';

export default async function ProductDetailPage({ params }: PageProps<'/products/[id]'>) {
  const { id } = await params;
  const { products } = await getSiteContent();
  const item = products.items.find((i) => i.id === id);
  if (!item) notFound();
  return <HubDetail basePath="/products" backLabel="Products" item={item} />;
}
