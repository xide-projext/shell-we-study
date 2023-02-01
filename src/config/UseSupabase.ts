import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://xxx.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ''

// setup client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// expose supabase client
export default function useSupabase() {
  return { supabase }
}
