// Project Roam — Phase 7 Admin Auth Login Route
// File: app/api/admin/auth/login/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  validateAdminCredentials,
  createAdminSessionToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/admin/session";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const passkey = typeof body.passkey === "string" ? body.passkey : "";
    const email = typeof body.email === "string" ? body.email : "";

    const validation = validateAdminCredentials({ passkey, email });
    if (!validation.valid) {
      return NextResponse.json(
        { error: "UNAUTHORIZED", message: validation.error || "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken(validation.email);

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      ok: true,
      email: validation.email,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Authentication failed";
    return NextResponse.json({ error: "INTERNAL_ERROR", message }, { status: 500 });
  }
}
