import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase admin client using the privileged service-role key.
 * 
 * CRITICAL SECURITY INVARIANT:
 * This file contains 'import "server-only"' to guarantee at build time that
 * neither this file nor the SUPABASE_SERVICE_ROLE_KEY can ever be bundled
 * or executed in client/browser code.
 *
 * This client bypasses Row Level Security and must only be used in trusted server
 * contexts (e.g., admin workflows, internal validation webhooks).
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Supabase Admin] SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL is not configured."
      );
    }
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
