-- Seed profiles (requires corresponding users exist in auth.users).
-- Adjust the UUIDs below to match your project's test users if needed.

-- Create three profiles if their auth user ids exist.
with u as (
  select id from auth.users order by created_at asc limit 3
)
insert into public.profiles (id, role, full_name, phone, avatar_url)
select
  (select id from u limit 1 offset 0) as id,
  'manager'::public.user_role,
  'Property Manager',
  '+1-555-1000',
  null
where exists (select 1 from u limit 1 offset 0)
on conflict (id) do update set role = excluded.role;

with u as (
  select id from auth.users order by created_at asc limit 3
)
insert into public.profiles (id, role, full_name, phone, avatar_url)
select
  (select id from u limit 1 offset 1) as id,
  'broker'::public.user_role,
  'City Broker',
  '+1-555-2000',
  null
where exists (select 1 from u limit 1 offset 1)
on conflict (id) do update set role = excluded.role;

with u as (
  select id from auth.users order by created_at asc limit 3
)
insert into public.profiles (id, role, full_name, phone, avatar_url)
select
  (select id from u limit 1 offset 2) as id,
  'tenant'::public.user_role,
  'Sample Tenant',
  '+1-555-3000',
  null
where exists (select 1 from u limit 1 offset 2)
on conflict (id) do update set role = excluded.role;

-- Assign a manager/broker to an existing property if available
with mgr as (
  select id from public.profiles where role = 'manager' limit 1
), brk as (
  select id from public.profiles where role = 'broker' limit 1
), prop as (
  select id from public.properties order by created_at asc limit 1
)
update public.properties p
set manager_id = (select id from mgr),
    broker_id = (select id from brk)
where p.id = (select id from prop);

-- Create a sample lease for the tenant on that property
with t as (
  select id from public.profiles where role = 'tenant' limit 1
), prop as (
  select id, monthly_rent from public.properties order by created_at asc limit 1
)
insert into public.leases (property_id, tenant_id, start_date, end_date, monthly_rent, security_deposit, status)
select p.id, t.id, (now()::date + 30), (now()::date + 365), coalesce(p.monthly_rent, 1500), coalesce(p.monthly_rent, 1500) * 2, 'pending'
from prop p cross join t
on conflict do nothing;

-- Create a calendar visit between tenant and manager for the same property
with creator as (
  select id from public.profiles where role = 'manager' limit 1
), participant as (
  select id from public.profiles where role = 'tenant' limit 1
), prop as (
  select id from public.properties order by created_at asc limit 1
)
insert into public.calendar_events (
  created_by, participant_id, property_id, title, description, start_time, end_time, type, status
) select
  (select id from creator),
  (select id from participant),
  (select id from prop),
  'Property Visit',
  'Walkthrough and Q&A with tenant',
  (now() + interval '2 days')::timestamptz,
  (now() + interval '2 days 1 hour')::timestamptz,
  'visit',
  'scheduled'
where exists (select 1 from creator)
  and exists (select 1 from participant)
  and exists (select 1 from prop)
on conflict do nothing;


