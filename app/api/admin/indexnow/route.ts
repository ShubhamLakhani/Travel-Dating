// Project Roam : Phase 11 Admin IndexNow Trigger API
// File: app/api/admin/indexnow/route.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin/auth";
import { submitToIndexNow, CANONICAL_PUBLIC_URLS } from "@/lib/seo/indexnow";
import { getAbsoluteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const auth = await verifyAdminSession();
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: auth.error || "Admin authorization required." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const candidateUrls = Array.isArray(body?.urls) ? body.urls : undefined;

    const result = await submitToIndexNow(candidateUrls);

    return NextResponse.json({
      ok: result.success,
      ...result,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "IndexNow submission failed";
    return NextResponse.json({ error: "INTERNAL_ERROR", message }, { status: 500 });
  }
}

export async function GET() {
  const auth = await verifyAdminSession();
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: auth.error || "Admin authorization required." },
      { status: 401 }
    );
  }

  const configured = Boolean(process.env.INDEXNOW_KEY?.trim());

  return NextResponse.json({
    configured,
    keyLocation: getAbsoluteUrl("/api/indexnow/key"),
    canonicalUrls: CANONICAL_PUBLIC_URLS,
  });
}
