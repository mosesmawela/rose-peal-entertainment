-- Migration: Create FCM Tokens table
-- Creates a table to store Firebase Cloud Messaging tokens for users

create table if not exists public.fcm_tokens (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  token text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for faster lookups by user
create index if not exists idx_fcm_tokens_user_id on public.fcm_tokens(user_id);

-- RLS Policies
alter table public.fcm_tokens enable row level security;

-- Users can read their own tokens
create policy "Users can view their own tokens" on public.fcm_tokens
  for select using (auth.uid() = user_id);

-- Users can insert/upsert their own tokens
create policy "Users can insert their own tokens" on public.fcm_tokens
  for insert with check (auth.uid() = user_id);

-- Users can update their own tokens
create policy "Users can update their own tokens" on public.fcm_tokens
  for update using (auth.uid() = user_id);

-- Users can delete their own tokens
create policy "Users can delete their own tokens" on public.fcm_tokens
  for delete using (auth.uid() = user_id);
