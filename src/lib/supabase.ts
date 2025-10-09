import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Lead = {
  id: string;
  tenant_name: string;
  tenant_email: string;
  tenant_phone: string | null;
  property_type: string;
  price_range: string;
  size: string;
  rooms: string;
  location: string;
  status: string;
  created_at: string;
  updated_at: string;
};
