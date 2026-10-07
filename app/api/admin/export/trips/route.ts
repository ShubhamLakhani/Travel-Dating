// Project Roam : Phase 7 Admin Export Trips CSV Route
// File: app/api/admin/export/trips/route.ts

import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin/auth";
import { getRequiredAdminClient } from "@/lib/supabase/admin";
import { maskIdentifier } from "@/lib/admin/queries";

function escapeCsv(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const auth = await verifyAdminSession();
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Admin authorization required." },
      { status: 401 }
    );
  }

  try {
    const supabase = getRequiredAdminClient();
    const { data: trips, error } = await supabase
      .from("trips")
      .select("id, waitlist_user_id, destination_name, destination_country, market_slug, arrival_date, departure_date, travel_mode, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    const headers = [
      "Trip ID",
      "Masked User ID",
      "Destination",
      "Country",
      "Market Slug",
      "Arrival Date",
      "Departure Date",
      "Travel Mode",
      "Created At",
    ];

    const rows = (trips || []).map((t) => [
      escapeCsv(t.id),
      escapeCsv(maskIdentifier(t.waitlist_user_id)),
      escapeCsv(t.destination_name),
      escapeCsv(t.destination_country),
      escapeCsv(t.market_slug),
      escapeCsv(t.arrival_date),
      escapeCsv(t.departure_date),
      escapeCsv(t.travel_mode),
      escapeCsv(t.created_at),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="roam-trips-summary.csv"',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Export failed";
    return NextResponse.json({ error: "INTERNAL_ERROR", message }, { status: 500 });
  }
}
