-- Lead messages table to track conversations about a lead between tenant and broker/manager

create table if not exists public.lead_messages (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete set null,
  sender_email text,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists lead_messages_lead_id_idx on public.lead_messages(lead_id);

alter table public.lead_messages enable row level security;

-- Policies: keep simple like leads (allow authenticated to read/insert)
do $$ begin
  create policy "lead_messages_select_all_auth"
  on public.lead_messages for select to authenticated using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "lead_messages_insert_auth"
  on public.lead_messages for insert to authenticated with check (true);
exception when duplicate_object then null; end $$;


