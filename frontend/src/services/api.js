import { createClient } from '@supabase/supabase-js'

let supabaseClient = null;
let hasWarnedMissingConfig = false;

function getSupabaseClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (!hasWarnedMissingConfig) {
      console.warn(
        'Supabase env vars are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in frontend/.env to enable API data.'
      );
      hasWarnedMissingConfig = true;
    }
    return null;
  }

  if (!supabaseClient) {
    try {
      supabaseClient = createClient(supabaseUrl, supabaseKey);
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error);
      return null;
    }
  }

  return supabaseClient;
}


 export async function fetchExecom(year) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("execom")
    .select("*")
    .eq("year", year)
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

