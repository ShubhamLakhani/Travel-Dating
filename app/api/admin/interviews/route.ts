// Project Roam — Phase 7 Admin Interviews API Route
// File: app/api/admin/interviews/route.ts

import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin/auth";
import { getInterviewVolunteersList, updateInterviewStatus } from "@/lib/admin/queries";
import type { InterviewStatus } from "@/types/admin";

export async function GET() {
  const auth = await verifyAdminSession();
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: auth.error || "Admin authorization required." },
      { status: 401 }
    );
  }

  try {
    const volunteers = await getInterviewVolunteersList();
    return NextResponse.json({ ok: true, volunteers });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load volunteers";
    return NextResponse.json({ error: "INTERNAL_ERROR", message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = await verifyAdminSession();
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: auth.error || "Admin authorization required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const optInId = typeof body.optInId === "string" ? body.optInId : "";
    const status = typeof body.status === "string" ? (body.status as InterviewStatus) : null;

    if (!optInId || !status) {
      return NextResponse.json(
        { error: "INVALID_REQUEST", message: "optInId and status are required." },
        { status: 400 }
      );
    }

    const validStatuses: InterviewStatus[] = [
      "opted_in",
      "contacted",
      "scheduled",
      "completed",
      "declined",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "INVALID_STATUS", message: `Invalid status: ${status}` },
        { status: 400 }
      );
    }

    const result = await updateInterviewStatus(optInId, status);
    if (!result.ok) {
      return NextResponse.json(
        { error: "UPDATE_FAILED", message: result.error || "Failed to update status." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, optInId, status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update volunteer";
    return NextResponse.json({ error: "INTERNAL_ERROR", message }, { status: 500 });
  }
}
