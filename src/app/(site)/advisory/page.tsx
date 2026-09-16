import { getSiteContent } from '@/lib/content';
import HubList from '@/components/site/hub-list';

export default async function AdvisoryPage() {
  const { advisory } = await getSiteContent();
  return <HubList basePath="/advisory" hub={advisory} />;
}
