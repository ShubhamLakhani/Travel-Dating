import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * Production health check endpoint.
 * Confirms application liveness and backend reachability without exposing internal secrets.
 */
export async function GET() {
  const startTime = Date.now();
  let dbStatus: "connected" | "unreachable" | "unconfigured" = "unreachable";

  const adminClient = createAdminClient();
  if (!adminClient) {
    dbStatus = "unconfigured";
  } else {
    try {
      // Perform a lightweight probe query to verify database connectivity
      const { error } = await adminClient
        .from("waitlist_users")
        .select("id", { count: "exact", head: true });

      if (!error) {
        dbStatus = "connected";
      } else {
        dbStatus = "unreachable";
      }
    } catch {
      dbStatus = "unreachable";
    }
  }

  const durationMs = Date.now() - startTime;
  const isHealthy = dbStatus === "connected";

  const responseBody = {
    status: isHealthy ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    checks: {
      app: "alive",
      database: dbStatus,
    },
    latencyMs: durationMs,
  };

  return NextResponse.json(responseBody, {
    status: isHealthy ? 200 : 503,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
