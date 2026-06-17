-- Run this once in your Supabase project: SQL Editor → paste → Run.
-- Stores each user's device push tokens so the server can send notifications.

create table if not exists public.device_tokens (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  token      text not null unique,
  platform   text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists device_tokens_user_id_idx on public.device_tokens(user_id);

-- Access is only through server-side API functions (service role), so RLS stays
-- on with no public policies.
alter table public.device_tokens enable row level security;
