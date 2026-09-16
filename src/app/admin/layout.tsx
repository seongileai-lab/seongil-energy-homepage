import { createClient } from '@/lib/supabase/server';
import LogoutButton from './logout-button';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return children;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="flex h-12 items-center justify-between bg-slate-900 px-5 text-white">
        <h1 className="text-sm font-semibold">홈페이지 통합 관리 어드민</h1>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-300">{user.email}</span>
          <LogoutButton />
        </div>
      </header>
      {children}
    </div>
  );
}
