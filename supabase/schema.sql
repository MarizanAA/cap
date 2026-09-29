-- Cap Lab: tabla del catálogo, control de acceso y bucket de imágenes.
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
revoke all on table public.admin_users from anon, authenticated;
grant select on table public.admin_users to authenticated;
drop policy if exists "Admins can read their own access" on public.admin_users;
create policy "Admins can read their own access"
  on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()));

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  category text not null check (category in ('gorras', 'pines')),
  product_type text not null default 'cap',
  style text not null default 'Básico',
  description text not null default '',
  badge text not null default 'NUEVO',
  price numeric(10,2) not null default 0.99 check (price >= 0),
  currency text not null default 'USD',
  price_is_sample boolean not null default true,
  availability text not null default 'disponible' check (availability in ('disponible', 'agotado')),
  published boolean not null default true,
  images jsonb not null default '[]'::jsonb check (jsonb_typeof(images) = 'array'),
  image_position text,
  image_positions jsonb not null default '[]'::jsonb,
  reference boolean not null default false,
  video_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;
revoke all on table public.products from anon, authenticated;
grant select on table public.products to anon, authenticated;
grant insert, update, delete on table public.products to authenticated;

drop policy if exists "Visitors can read published products" on public.products;
create policy "Visitors can read published products"
  on public.products for select to anon, authenticated
  using (published = true);

drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products"
  on public.products for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 8388608, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can view product image objects" on storage.objects;
create policy "Admins can view product image objects"
  on storage.objects for select to authenticated
  using (bucket_id = 'product-images' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));

drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));

drop policy if exists "Admins can update product images" on storage.objects;
create policy "Admins can update product images"
  on storage.objects for update to authenticated
  using (bucket_id = 'product-images' and exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (bucket_id = 'product-images' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));

drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Admins can delete product images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'product-images' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));
