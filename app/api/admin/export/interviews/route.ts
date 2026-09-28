// Project Roam — Phase 7 Admin Export Interview Volunteers CSV Route
// File: app/api/admin/export/interviews/route.ts

import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin/auth";
import { getInterviewVolunteersList } from "@/lib/admin/queries";

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
    const volunteers = await getInterviewVolunteersList();

    const headers = [
      "Opt-In ID",
      "Masked User ID",
      "Outreach Email",
      "Country",
      "Age Band",
      "Gender",
      "Destinations",
      "Upcoming Dates",
      "Interview Status",
      "Opted-In At",
      "Contacted At",
      "Completed At",
    ];

    const rows = volunteers.map((v) => {
      const datesSummary = v.upcomingTrips
        .map((t) => `${t.destinationName} (${t.arrivalDate} to ${t.departureDate})`)
        .join("; ");

      return [
        escapeCsv(v.id),
        escapeCsv(v.maskedUserId),
        escapeCsv(v.email),
        escapeCsv(v.homeCountry),
        escapeCsv(v.ageBand),
        escapeCsv(v.gender),
        escapeCsv(v.destinations.join(", ")),
        escapeCsv(datesSummary),
        escapeCsv(v.status),
        escapeCsv(v.createdAt),
        escapeCsv(v.contactedAt),
        escapeCsv(v.completedAt),
      ];
    });

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="roam-interview-volunteers.csv"',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Export failed";
    return NextResponse.json({ error: "INTERNAL_ERROR", message }, { status: 500 });
  }
}
