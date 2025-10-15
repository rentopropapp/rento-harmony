-- Auth credentials and role-specific tables
-- Requires: public.profiles and enum public.user_role

-- Credentials table (email unique, stores display-only; Supabase Auth stores password)
create table if not exists public.auth_credentials (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.auth_credentials enable row level security;

do $$ begin
  create policy "auth_credentials_self_read" on public.auth_credentials
    for select using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "auth_credentials_self_upsert" on public.auth_credentials
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

-- Role-specific detail tables
create table if not exists public.tenant_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  occupation text,
  how_heard text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.broker_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  license_no text,
  company text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.manager_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  company text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- timestamps trigger
do $$ begin
create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end; $$ language plpgsql;
exception when duplicate_function then null; end $$;

drop trigger if exists tenant_profiles_touch_updated_at on public.tenant_profiles;
create trigger tenant_profiles_touch_updated_at
before update on public.tenant_profiles
for each row execute function public.touch_updated_at();

drop trigger if exists broker_profiles_touch_updated_at on public.broker_profiles;
create trigger broker_profiles_touch_updated_at
before update on public.broker_profiles
for each row execute function public.touch_updated_at();

drop trigger if exists manager_profiles_touch_updated_at on public.manager_profiles;
create trigger manager_profiles_touch_updated_at
before update on public.manager_profiles
for each row execute function public.touch_updated_at();

-- RLS: owner-only by user_id
alter table public.tenant_profiles enable row level security;
alter table public.broker_profiles enable row level security;
alter table public.manager_profiles enable row level security;

do $$ begin
  create policy "tenant_profiles_owner" on public.tenant_profiles
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "broker_profiles_owner" on public.broker_profiles
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "manager_profiles_owner" on public.manager_profiles
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

-- Optional guard: enforce profiles.role matches detail table
do $$ begin
create or replace function public.enforce_role_consistency()
returns trigger as $$
begin
  if TG_TABLE_NAME = 'tenant_profiles' then
    if not exists (select 1 from public.profiles p where p.id = new.user_id and p.role = 'tenant') then
      raise exception 'Profile role must be tenant';
    end if;
  elsif TG_TABLE_NAME = 'broker_profiles' then
    if not exists (select 1 from public.profiles p where p.id = new.user_id and p.role = 'broker') then
      raise exception 'Profile role must be broker';
    end if;
  elsif TG_TABLE_NAME = 'manager_profiles' then
    if not exists (select 1 from public.profiles p where p.id = new.user_id and p.role = 'manager') then
      raise exception 'Profile role must be manager';
    end if;
  end if;
  return new;
end; $$ language plpgsql;
exception when duplicate_function then null; end $$;

drop trigger if exists tenant_profiles_role_check on public.tenant_profiles;
create trigger tenant_profiles_role_check
before insert or update on public.tenant_profiles
for each row execute function public.enforce_role_consistency();

drop trigger if exists broker_profiles_role_check on public.broker_profiles;
create trigger broker_profiles_role_check
before insert or update on public.broker_profiles
for each row execute function public.enforce_role_consistency();

drop trigger if exists manager_profiles_role_check on public.manager_profiles;
create trigger manager_profiles_role_check
before insert or update on public.manager_profiles
for each row execute function public.enforce_role_consistency();


