import { SupabaseClient } from "@supabase/supabase-js";

export function createSupabaseClient() {
    return new SupabaseClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
    )
}