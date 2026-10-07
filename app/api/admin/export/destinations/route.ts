// Project Roam : Phase 7 Admin Export Destinations CSV Route
// File: app/api/admin/export/destinations/route.ts

import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin/auth";
import { getDestinationDensitySummaries } from "@/lib/admin/queries";

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
    const destinations = await getDestinationDensitySummaries();

    const headers = [
      "Destination ID",
      "Destination Name",
      "Country",
      "Market Slug",
      "Total Trips",
      "Unique Travellers",
      "Upcoming Trips",
      "Past Trips",
      "Earliest Arrival",
      "Latest Departure",
      "Travellers With Overlap",
      "Overlapping Pairs",
      "Max Simultaneous Concurrency",
      "Peak Date",
      "Density %",
      "Density Bucket",
      "Compatible Travellers",
      "Compatible Pairs",
      "Readiness",
    ];

    const rows = destinations.map((d) => [
      escapeCsv(d.destinationId),
      escapeCsv(d.destinationName),
      escapeCsv(d.destinationCountry),
      escapeCsv(d.marketSlug),
      d.totalTrips,
      d.uniqueTravellers,
      d.upcomingTrips,
      d.pastTrips,
      escapeCsv(d.earliestArrival),
      escapeCsv(d.latestDeparture),
      d.travellersWithOverlap,
      d.overlappingPairsCount,
      d.maxConcurrency,
      escapeCsv(d.peakDate),
      `${d.densityPercentage}%`,
      escapeCsv(d.densityBucket),
      d.compatibleTravellersCount,
      d.compatiblePairsCount,
      escapeCsv(d.readiness),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="roam-destinations-density.csv"',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Export failed";
    return NextResponse.json({ error: "INTERNAL_ERROR", message }, { status: 500 });
  }
}
