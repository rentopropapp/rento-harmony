/*
  # Create Leads Table

  1. New Tables
    - `leads`
      - `id` (uuid, primary key) - Unique identifier for each lead
      - `tenant_name` (text) - Name of the tenant submitting the request
      - `tenant_email` (text) - Email of the tenant
      - `tenant_phone` (text, nullable) - Phone number of the tenant
      - `property_type` (text) - Type of property requested (apartment, house, etc.)
      - `price_range` (text) - Desired price range
      - `size` (text) - Property size requirement
      - `rooms` (text) - Number of rooms needed
      - `location` (text) - Preferred location
      - `status` (text, default 'new') - Lead status (new, contacted, converted, closed)
      - `created_at` (timestamptz) - When the lead was created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `leads` table
    - Add policy for brokers to read all leads
    - Add policy for authenticated users to create leads
    - Add policy for brokers to update lead status
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_name text NOT NULL,
  tenant_email text NOT NULL,
  tenant_phone text,
  property_type text NOT NULL,
  price_range text NOT NULL,
  size text NOT NULL,
  rooms text NOT NULL,
  location text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create leads"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_location ON leads(location);
