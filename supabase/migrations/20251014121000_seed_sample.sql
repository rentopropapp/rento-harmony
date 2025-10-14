-- Seed sample data for properties and images
-- Note: This seed avoids creating auth users; FKs to manager/broker/tenant are left null.

insert into public.properties (
  title, description, address_line1, address_line2, city, state, pincode,
  monthly_rent, security_deposit, bedrooms, bathrooms, area_sqft, available_from, status
) values
  (
    'Sunny 2BHK in Downtown',
    'Bright and airy apartment close to metro and parks.',
    '123 Main Street',
    'Apt 4B',
    'Metropolis',
    'NY',
    '10001',
    1800.00,
    3600.00,
    2,
    2,
    950,
    now()::date + 7,
    'listed'
  ),
  (
    'Cozy Studio near Riverfront',
    'Compact studio ideal for single professional. River views.',
    '45 Riverside Dr',
    null,
    'Metropolis',
    'NY',
    '10002',
    1200.00,
    2400.00,
    0,
    1,
    450,
    now()::date + 14,
    'listed'
  ),
  (
    'Spacious 3BHK Suburban Home',
    'Family-friendly neighborhood with backyard and garage.',
    '789 Oak Lane',
    null,
    'Smallville',
    'KS',
    '66002',
    2100.00,
    4200.00,
    3,
    2,
    1600,
    now()::date + 21,
    'listed'
  )
on conflict do nothing;

-- Attach sample images using the public placeholder
with props as (
  select id, title from public.properties
  where title in (
    'Sunny 2BHK in Downtown',
    'Cozy Studio near Riverfront',
    'Spacious 3BHK Suburban Home'
  )
)
insert into public.property_images (property_id, url, storage_path, is_primary)
select p.id,
       '/placeholder.svg' as url,
       null as storage_path,
       true as is_primary
from props p
on conflict do nothing;


