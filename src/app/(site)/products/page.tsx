import { getSiteContent } from '@/lib/content';
import HubList from '@/components/site/hub-list';

export default async function ProductsPage() {
  const { products } = await getSiteContent();
  return <HubList basePath="/products" hub={products} />;
}
