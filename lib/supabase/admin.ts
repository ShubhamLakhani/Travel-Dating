import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase admin client using privileged secret keys.
 * 
 * CRITICAL SECURITY INVARIANT:
 * This file contains 'import "server-only"' to guarantee at build time that
 * neither this file nor the SUPABASE_SECRET_KEY / SUPABASE_SERVICE_ROLE_KEY
 * can ever be bundled or executed in client/browser code.
 *
 * This client bypasses Row Level Security and must only be used in trusted server
 * contexts (e.g. server-side atomic submission RPCs, admin verification).
 */
export function createAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Prefer newer SUPABASE_SECRET_KEY with legacy SUPABASE_SERVICE_ROLE_KEY fallback
  const secretKey =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Supabase Admin] Privileged credentials not configured (SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY missing)."
      );
    }
    return null;
  }

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Asserts that privileged client is available and returns it, or throws a sanitized Error.
 */
export function getRequiredAdminClient(): SupabaseClient {
  const client = createAdminClient();
  if (!client) {
    throw new Error(
      "Database service unavailable: Privileged database credentials are not configured."
    );
  }
  return client;
}
