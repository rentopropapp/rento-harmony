-- Core schema for Rento Harmony: users/profiles, properties, images, messages, calendar, leases
-- Requires: Supabase (auth.users), pgcrypto for gen_random_uuid()

-- Extensions
create extension if not exists pgcrypto;

-- Enums
do $$ begin
  create type public.user_role as enum ('tenant', 'manager', 'broker', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.property_status as enum ('draft', 'listed', 'rented', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.lease_status as enum ('pending', 'active', 'terminated', 'completed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.event_type as enum ('visit', 'maintenance', 'payment', 'other');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.event_status as enum ('scheduled', 'completed', 'cancelled');
exception when duplicate_object then null; end $$;

-- Profiles: 1-1 with auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'tenant',
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

-- Policies for profiles
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

-- Properties
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  manager_id uuid references public.profiles(id) on delete set null,
  broker_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  pincode text,
  monthly_rent numeric(12,2),
  security_deposit numeric(12,2),
  bedrooms int,
  bathrooms int,
  area_sqft int,
  available_from date,
  status public.property_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists properties_set_updated_at on public.properties;
create trigger properties_set_updated_at
before update on public.properties
for each row execute function public.set_updated_at();

alter table public.properties enable row level security;

-- Property Images
create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  url text not null,
  storage_path text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.property_images enable row level security;

-- Leases (tenant agreements)
create table if not exists public.leases (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  tenant_id uuid not null references public.profiles(id) on delete cascade,
  start_date date not null,
  end_date date,
  monthly_rent numeric(12,2) not null,
  security_deposit numeric(12,2),
  status public.lease_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists leases_set_updated_at on public.leases;
create trigger leases_set_updated_at
before update on public.leases
for each row execute function public.set_updated_at();

alter table public.leases enable row level security;

-- Messages (direct messages, optionally tied to a property)
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid references public.properties(id) on delete set null,
  content text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists messages_recipient_id_idx on public.messages(recipient_id);
create index if not exists messages_property_id_idx on public.messages(property_id);

alter table public.messages enable row level security;

-- Calendar Events
create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references public.profiles(id) on delete cascade,
  participant_id uuid references public.profiles(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  title text not null,
  description text,
  start_time timestamptz not null,
  end_time timestamptz not null,
  type public.event_type not null default 'visit',
  status public.event_status not null default 'scheduled',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists calendar_events_set_updated_at on public.calendar_events;
create trigger calendar_events_set_updated_at
before update on public.calendar_events
for each row execute function public.set_updated_at();

alter table public.calendar_events enable row level security;

-- =============== RLS POLICIES ===============

-- Helper predicates via views are not strictly necessary; inline checks below.

-- Properties policies
do $$ begin
  create policy "properties_select_visible"
  on public.properties for select
  using (
    status = 'listed'
    or auth.uid() = manager_id
    or auth.uid() = broker_id
    or exists (
      select 1 from public.leases l
      where l.property_id = properties.id and l.tenant_id = auth.uid()
    )
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "properties_insert_owner"
  on public.properties for insert
  with check (auth.uid() = manager_id or auth.uid() = broker_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "properties_update_owner"
  on public.properties for update
  using (auth.uid() = manager_id or auth.uid() = broker_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "properties_delete_owner"
  on public.properties for delete
  using (auth.uid() = manager_id or auth.uid() = broker_id);
exception when duplicate_object then null; end $$;

-- Property Images policies (inherit property access)
do $$ begin
  create policy "property_images_select_linked"
  on public.property_images for select
  using (
    exists (
      select 1 from public.properties p
      where p.id = property_images.property_id and (
        p.status = 'listed' or auth.uid() = p.manager_id or auth.uid() = p.broker_id or
        exists (select 1 from public.leases l where l.property_id = p.id and l.tenant_id = auth.uid())
      )
    )
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "property_images_cud_owner"
  on public.property_images for all
  using (
    exists (
      select 1 from public.properties p
      where p.id = property_images.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id)
    )
  ) with check (
    exists (
      select 1 from public.properties p
      where p.id = property_images.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id)
    )
  );
exception when duplicate_object then null; end $$;

-- Leases policies
do $$ begin
  create policy "leases_select_related"
  on public.leases for select
  using (
    auth.uid() = tenant_id or
    exists (
      select 1 from public.properties p
      where p.id = leases.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id)
    )
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "leases_cud_manager_broker"
  on public.leases for all
  using (
    exists (
      select 1 from public.properties p
      where p.id = leases.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id)
    )
  ) with check (
    exists (
      select 1 from public.properties p
      where p.id = leases.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id)
    )
  );
exception when duplicate_object then null; end $$;

-- Messages policies
do $$ begin
  create policy "messages_select_own"
  on public.messages for select
  using (auth.uid() = sender_id or auth.uid() = recipient_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "messages_insert_sender"
  on public.messages for insert
  with check (auth.uid() = sender_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "messages_update_recipient_read"
  on public.messages for update
  using (auth.uid() = recipient_id) with check (auth.uid() = recipient_id);
exception when duplicate_object then null; end $$;

-- Calendar events policies
do $$ begin
  create policy "calendar_select_related"
  on public.calendar_events for select
  using (
    auth.uid() = created_by or
    auth.uid() = participant_id
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "calendar_insert_creator"
  on public.calendar_events for insert
  with check (auth.uid() = created_by);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "calendar_update_creator"
  on public.calendar_events for update
  using (auth.uid() = created_by) with check (auth.uid() = created_by);
exception when duplicate_object then null; end $$;

-- Grants (typical Supabase defaults apply; explicit grants for clarity if needed)
-- Note: anon and authenticated roles are managed by Supabase; policies above govern access.


