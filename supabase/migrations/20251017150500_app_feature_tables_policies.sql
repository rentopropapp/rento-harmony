-- Cleanup potentially conflicting legacy table
drop table if exists public.profile cascade;

-- Tenants: complaints
create table if not exists public.tenant_complaints (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid references public.properties(id) on delete set null,
  topic text not null,
  urgency text check (urgency in ('low','medium','high')) not null default 'low',
  details text not null,
  status text check (status in ('open','resolved')) not null default 'open',
  created_at timestamptz not null default now()
);
alter table public.tenant_complaints enable row level security;

do $$ begin
  create policy tenant_complaints_tenant_cud on public.tenant_complaints for all
    using (auth.uid() = tenant_id) with check (auth.uid() = tenant_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy tenant_complaints_staff_read on public.tenant_complaints for select
    using (
      exists (
        select 1 from public.properties p
        where p.id = tenant_complaints.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id)
      )
    );
exception when duplicate_object then null; end $$;

-- Tenants: expenses (personal)
create table if not exists public.tenant_expenses (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.profiles(id) on delete cascade,
  category text not null,
  details text,
  amount numeric(12,2) not null,
  incurred_on date not null default now()::date,
  created_at timestamptz not null default now()
);
alter table public.tenant_expenses enable row level security;

do $$ begin
  create policy tenant_expenses_owner on public.tenant_expenses for all
    using (auth.uid() = tenant_id) with check (auth.uid() = tenant_id);
exception when duplicate_object then null; end $$;

-- Tenants: payments
create table if not exists public.tenant_payments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid references public.properties(id) on delete set null,
  amount numeric(12,2) not null,
  paid_on date not null default now()::date,
  method text,
  notes text,
  created_at timestamptz not null default now()
);
alter table public.tenant_payments enable row level security;

do $$ begin
  create policy tenant_payments_owner on public.tenant_payments for all
    using (auth.uid() = tenant_id) with check (auth.uid() = tenant_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy tenant_payments_property_staff_read on public.tenant_payments for select
    using (
      exists (
        select 1 from public.properties p
        where p.id = tenant_payments.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id)
      )
    );
exception when duplicate_object then null; end $$;

-- Tenant search requests (leads)
create table if not exists public.tenant_search_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.profiles(id) on delete cascade,
  city text,
  min_rent numeric(12,2),
  max_rent numeric(12,2),
  bedrooms int,
  notes text,
  created_at timestamptz not null default now()
);
alter table public.tenant_search_requests enable row level security;

do $$ begin
  create policy tenant_search_owner on public.tenant_search_requests for all
    using (auth.uid() = tenant_id) with check (auth.uid() = tenant_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy tenant_search_broker_read on public.tenant_search_requests for select
    using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'broker'));
exception when duplicate_object then null; end $$;

-- Property viewings
create table if not exists public.property_viewings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  tenant_id uuid references public.profiles(id) on delete set null,
  broker_id uuid references public.profiles(id) on delete set null,
  scheduled_at timestamptz not null,
  status text check (status in ('scheduled','completed','cancelled')) not null default 'scheduled',
  notes text,
  created_at timestamptz not null default now()
);
alter table public.property_viewings enable row level security;

do $$ begin
  create policy property_viewings_tenant_cud on public.property_viewings for all
    using (auth.uid() = tenant_id) with check (auth.uid() = tenant_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy property_viewings_staff_all on public.property_viewings for all
    using (
      exists (
        select 1 from public.properties p where p.id = property_viewings.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id)
      )
    ) with check (
      exists (
        select 1 from public.properties p where p.id = property_viewings.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id)
      )
    );
exception when duplicate_object then null; end $$;

-- Broker wallet transactions
create table if not exists public.broker_wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  broker_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric(12,2) not null,
  type text check (type in ('credit','debit')) not null,
  description text,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
alter table public.broker_wallet_transactions enable row level security;

do $$ begin
  create policy broker_wallet_owner on public.broker_wallet_transactions for all
    using (auth.uid() = broker_id) with check (auth.uid() = broker_id);
exception when duplicate_object then null; end $$;

-- Manager property tenants
create table if not exists public.manager_property_tenants (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  tenant_id uuid not null references public.profiles(id) on delete cascade,
  unit text,
  rent numeric(12,2),
  created_at timestamptz not null default now()
);
alter table public.manager_property_tenants enable row level security;

do $$ begin
  create policy manager_property_tenants_staff_all on public.manager_property_tenants for all
    using (
      exists (select 1 from public.properties p where p.id = manager_property_tenants.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id))
    ) with check (
      exists (select 1 from public.properties p where p.id = manager_property_tenants.property_id and (auth.uid() = p.manager_id))
    );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy manager_property_tenants_tenant_read on public.manager_property_tenants for select
    using (auth.uid() = tenant_id);
exception when duplicate_object then null; end $$;

-- Manager payments
create table if not exists public.manager_payments (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties(id) on delete set null,
  tenant_id uuid references public.profiles(id) on delete set null,
  amount numeric(12,2) not null,
  received_on date not null default now()::date,
  method text,
  notes text,
  created_at timestamptz not null default now()
);
alter table public.manager_payments enable row level security;

do $$ begin
  create policy manager_payments_staff_all on public.manager_payments for all
    using (
      exists (select 1 from public.properties p where p.id = manager_payments.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id))
    ) with check (
      exists (select 1 from public.properties p where p.id = manager_payments.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id))
    );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy manager_payments_tenant_read on public.manager_payments for select
    using (auth.uid() = tenant_id);
exception when duplicate_object then null; end $$;

-- Manager property expenses
create table if not exists public.manager_property_expenses (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  type text not null,
  details text,
  cost numeric(12,2) not null,
  incurred_on date not null default now()::date,
  created_at timestamptz not null default now()
);
alter table public.manager_property_expenses enable row level security;

do $$ begin
  create policy manager_expenses_staff_all on public.manager_property_expenses for all
    using (
      exists (select 1 from public.properties p where p.id = manager_property_expenses.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id))
    ) with check (
      exists (select 1 from public.properties p where p.id = manager_property_expenses.property_id and (auth.uid() = p.manager_id or auth.uid() = p.broker_id))
    );
exception when duplicate_object then null; end $$;

-- Manager service users
create table if not exists public.manager_service_users (
  id uuid primary key default gen_random_uuid(),
  manager_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid references public.properties(id) on delete set null,
  name text not null,
  email text,
  phone text,
  role text not null,
  description text,
  created_at timestamptz not null default now()
);
alter table public.manager_service_users enable row level security;

do $$ begin
  create policy manager_service_users_owner on public.manager_service_users for all
    using (auth.uid() = manager_id) with check (auth.uid() = manager_id);
exception when duplicate_object then null; end $$;

-- Manager to tenant messages (defensive)
create table if not exists public.manager_tenant_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  tenant_id uuid references public.profiles(id) on delete set null,
  title text,
  content text not null,
  created_at timestamptz not null default now()
);
alter table public.manager_tenant_messages enable row level security;

do $$ begin
  create policy manager_tenant_messages_sender on public.manager_tenant_messages for insert
    with check (auth.uid() = sender_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy manager_tenant_messages_select on public.manager_tenant_messages for select
    using (tenant_id is null or auth.uid() = tenant_id or auth.uid() = sender_id);
exception when duplicate_object then null; end $$;

-- Storage buckets
insert into storage.buckets (id, name, public)
values ('profile-photos', 'profile-photos', true)
on conflict (id) do nothing;
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

-- Storage policies
do $$ begin
  create policy "Profile photos read" on storage.objects for select
    using (bucket_id = 'profile-photos');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Profile photos insert" on storage.objects for insert to authenticated
    with check (bucket_id = 'profile-photos');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Profile photos update" on storage.objects for update to authenticated
    using (bucket_id = 'profile-photos') with check (bucket_id = 'profile-photos');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Property images read" on storage.objects for select
    using (bucket_id = 'property-images');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Property images insert" on storage.objects for insert to authenticated
    with check (bucket_id = 'property-images');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Property images update" on storage.objects for update to authenticated
    using (bucket_id = 'property-images') with check (bucket_id = 'property-images');
exception when duplicate_object then null; end $$;


