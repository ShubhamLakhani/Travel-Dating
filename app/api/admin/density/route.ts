// Project Roam : Phase 7 Admin Density API Route
// File: app/api/admin/density/route.ts

import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin/auth";
import { getDestinationDensitySummaries, getTravelMonthAnalytics } from "@/lib/admin/queries";

export async function GET() {
  const auth = await verifyAdminSession();
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: auth.error || "Admin authorization required." },
      { status: 401 }
    );
  }

  try {
    const [destinations, months] = await Promise.all([
      getDestinationDensitySummaries(),
      getTravelMonthAnalytics(),
    ]);

    return NextResponse.json({
      ok: true,
      destinations,
      months,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load density data";
    return NextResponse.json({ error: "INTERNAL_ERROR", message }, { status: 500 });
  }
}
