-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Artists Table
create table public.artists (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text not null unique,
  bio text,
  avatar_url text,
  banner_url text,
  instagram_handle text,
  twitter_handle text,
  spotify_id text
);

-- 2. Releases Table (Albums/EPs)
create table public.releases (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text not null unique,
  artist_id uuid references public.artists(id) not null,
  cover_url text,
  release_date date,
  type text check (type in ('album', 'ep', 'single')),
  description text,
  is_featured boolean default false,
  spotify_embed_url text,
  link_tree_url text
);

-- 3. Tracks Table
create table public.tracks (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  release_id uuid references public.releases(id) not null,
  artist_id uuid references public.artists(id) not null,
  audio_url text not null, -- Supabase Storage URL
  duration integer, -- seconds
  track_number integer,
  plays integer default 0
);

-- 4. Merch Products
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text not null unique,
  price integer not null, -- in cents
  description text,
  image_urls text[], -- array of strings
  stock_count integer default 0,
  artist_id uuid references public.artists(id) -- Optional relationship
);

-- RLS Policies (Simple Read Public, Write Admin)
alter table public.artists enable row level security;
alter table public.releases enable row level security;
alter table public.tracks enable row level security;
alter table public.products enable row level security;

create policy "Allow public read access" on public.artists for select using (true);
create policy "Allow public read access" on public.releases for select using (true);
create policy "Allow public read access" on public.tracks for select using (true);
create policy "Allow public read access" on public.products for select using (true);

-- Note: Write policies would be restricted to authenticated admin users
