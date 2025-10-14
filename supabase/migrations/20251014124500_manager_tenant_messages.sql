-- Messages from manager to tenants (announcements or direct messages)

create table if not exists public.manager_tenant_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  tenant_id uuid references public.profiles(id) on delete set null,
  -- null tenant_id means broadcast to all tenants
  title text,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists manager_tenant_messages_tenant_id_idx on public.manager_tenant_messages(tenant_id);

alter table public.manager_tenant_messages enable row level security;

-- Policies
do $$ begin
  create policy "mtm_select_visible"
  on public.manager_tenant_messages for select
  using (
    -- a message is visible if addressed to me or broadcast (tenant_id is null)
    (tenant_id is null) or (tenant_id = auth.uid()) or (sender_id = auth.uid())
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "mtm_insert_manager"
  on public.manager_tenant_messages for insert
  with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('manager','admin'))
  );
exception when duplicate_object then null; end $$;


