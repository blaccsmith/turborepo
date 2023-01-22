import { SupabaseClient } from "@supabase/supabase-js";

export const getEvents = async () => {
  const supabaseClient = new SupabaseClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
  );
  return supabaseClient
    .from('events')
    .select(`id, name, alias`)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};
