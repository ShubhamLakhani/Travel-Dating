// Project Roam : Phase 7 Next.js Server Admin Authentication Guard
// File: lib/admin/auth.ts

import "server-only";
import { cookies, headers } from "next/headers";
import { createAdminClient } from "../supabase/admin.ts";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
  isEmailAllowedAdmin,
} from "./session.ts";

export * from "./session.ts";

export interface AdminAuthResult {
  isAuthorized: boolean;
  email?: string;
  error?: string;
}

/**
 * Server-side authorization guard for Next.js Server Components and Route Handlers.
 * Fails closed by default.
 */
export async function verifyAdminSession(): Promise<AdminAuthResult> {
  try {
    // 1. Check Bearer Authorization header
    const headerList = await headers();
    const authHeader = headerList.get("authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const bearerToken = authHeader.slice(7).trim();

      // Check if it's our signed session token
      const sessionResult = verifyAdminSessionToken(bearerToken);
      if (sessionResult.valid && sessionResult.payload) {
        return { isAuthorized: true, email: sessionResult.payload.email };
      }

      // Check if it's a Supabase Auth access token
      const supabase = createAdminClient();
      if (supabase) {
        try {
          const { data, error } = await supabase.auth.getUser(bearerToken);
          if (!error && data?.user?.email) {
            if (isEmailAllowedAdmin(data.user.email)) {
              return { isAuthorized: true, email: data.user.email };
            } else {
              return {
                isAuthorized: false,
                error: "User is authenticated but not in admin allowlist.",
              };
            }
          }
        } catch {
          // Non-fatal, fallback to cookie check
        }
      }
    }

    // 2. Check HTTP-only signed session cookie
    const cookieStore = await cookies();
    const cookie = cookieStore.get(ADMIN_COOKIE_NAME);

    if (!cookie || !cookie.value) {
      return { isAuthorized: false, error: "No admin session found." };
    }

    const verification = verifyAdminSessionToken(cookie.value);
    if (!verification.valid || !verification.payload) {
      return {
        isAuthorized: false,
        error: verification.error || "Invalid admin session.",
      };
    }

    return {
      isAuthorized: true,
      email: verification.payload.email,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown auth error";
    return { isAuthorized: false, error: message };
  }
}
