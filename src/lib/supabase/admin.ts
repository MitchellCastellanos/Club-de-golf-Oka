import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente con service role, solo para uso en servidor (route handlers /
 * server actions). Nunca importar desde un componente cliente.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  return createSupabaseClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
