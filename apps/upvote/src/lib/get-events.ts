import {createSupabaseClient} from "@/lib/supabaseUtils";

export const getEvents = async () => {
  const supabaseClient = createSupabaseClient();
  return supabaseClient
    .from('events')
    .select(`name, alias, position`)
    .order('position', { ascending: true })
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
};
