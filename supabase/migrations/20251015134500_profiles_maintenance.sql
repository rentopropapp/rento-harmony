-- Maintenance for public.profiles to ensure PostgREST schema cache refresh and performance

-- No-op comment to bump table DDL timestamp
comment on table public.profiles is 'User profiles with role and basic info';

-- Helpful index on role for quicker redirects/queries
create index if not exists profiles_role_idx on public.profiles(role);

-- Re-assert RLS enabled and policies (idempotent)
alter table public.profiles enable row level security;

do $$ begin
  create policy "profiles_read_own_or_admin" on public.profiles
    for select using (
      auth.uid() = id or
      exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
    );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "profiles_insert_self" on public.profiles
    for insert with check (auth.uid() = id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "profiles_update_self_or_admin" on public.profiles
    for update using (
      auth.uid() = id or
      exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
    );
exception when duplicate_object then null; end $$;


