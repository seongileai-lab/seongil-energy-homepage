-- Run this once in a new Supabase project's SQL editor to set up everything
-- this template needs: the site content table, the contact form table, and
-- the public media storage bucket. Safe to re-run (uses IF NOT EXISTS / ON CONFLICT).

-- 1. Site content (a single JSONB row holds all editable text/media for the site)
create table if not exists public.site_content (
  id smallint primary key default 1,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_content_singleton check (id = 1)
);

insert into public.site_content (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

alter table public.site_content enable row level security;

drop policy if exists "public can read site content" on public.site_content;
create policy "public can read site content"
  on public.site_content for select
  to anon, authenticated
  using (true);

drop policy if exists "authenticated can update site content" on public.site_content;
create policy "authenticated can update site content"
  on public.site_content for update
  to authenticated
  using (true)
  with check (true);

-- 2. Media storage bucket (logo, hero image/video, product/gallery photos, attachments)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public can read media" on storage.objects;
create policy "public can read media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "authenticated can upload media" on storage.objects;
create policy "authenticated can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "authenticated can update media" on storage.objects;
create policy "authenticated can update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

drop policy if exists "authenticated can delete media" on storage.objects;
create policy "authenticated can delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

-- 3. Contact form submissions
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

drop policy if exists "anyone can submit contact form" on public.contact_submissions;
create policy "anyone can submit contact form"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

drop policy if exists "authenticated can read contact submissions" on public.contact_submissions;
create policy "authenticated can read contact submissions"
  on public.contact_submissions for select
  to authenticated
  using (true);
