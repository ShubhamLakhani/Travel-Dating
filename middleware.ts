// Triply: Phase 7 Admin Defense-in-Depth Middleware Guard
// File: middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = "roam_admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /admin and /api/admin paths
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  // Allow login page and login API endpoint
  if (pathname === "/admin/login" || pathname === "/api/admin/auth/login") {
    return NextResponse.next();
  }

  // Check presence of session cookie or Authorization header
  const authHeader = request.headers.get("authorization");
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME);

  const hasAuthToken =
    (authHeader && authHeader.startsWith("Bearer ") && authHeader.length > 15) ||
    (sessionCookie && sessionCookie.value && sessionCookie.value.includes("."));

  // Fail closed if no token present
  if (!hasAuthToken) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        { error: "UNAUTHORIZED", message: "Admin authorization required." },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If token is present, allow request to proceed to server-side cryptographic verification
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
