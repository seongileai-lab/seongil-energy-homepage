import { getSiteContent } from '@/lib/content';
import AdminEditor from './admin-editor';

export default async function AdminHomePage() {
  const content = await getSiteContent();
  return <AdminEditor initialContent={content} />;
}
