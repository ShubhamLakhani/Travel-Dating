// Project Roam : Privacy Request Route
// File: app/api/privacy-request/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  privacyRequestSchema,
  PRIVACY_REQUEST_LABELS,
} from "@/lib/validation/privacy-request-schema";
import {
  renderPrivacyRequestNotificationHtml,
  renderPrivacyRequestNotificationText,
} from "@/lib/communication/email-formatters";
import { checkRateLimit } from "@/lib/security/rate-limit";

const MAX_BODY_BYTES = 8 * 1024; // 8 KB

/**
 * Validates request origin against allowed hostnames.
 */
function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Direct/same-origin server calls allowed

  try {
    const originUrl = new URL(origin);
    const host = request.headers.get("host");

    // Local development
    if (
      originUrl.hostname === "localhost" ||
      originUrl.hostname === "127.0.0.1" ||
      (host && originUrl.host === host)
    ) {
      return true;
    }

    // Configured public site URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (siteUrl) {
      const siteOrigin = new URL(siteUrl).origin;
      if (origin === siteOrigin) return true;
    }

    // Allowed Roam and Vercel domains
    if (
      originUrl.hostname === "roam.toolmint.cc" ||
      originUrl.hostname.endsWith(".vercel.app")
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  // 1. Origin verification
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { error: "FORBIDDEN", message: "Cross-origin requests are not allowed." },
      { status: 403 }
    );
  }

  // 2. Server-side Rate Limiting (5 requests per minute per client)
  const rateLimitResult = checkRateLimit(request, {
    windowMs: 60 * 1000,
    maxRequests: 5,
    prefix: "privacy-req",
  });

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        error: "TOO_MANY_REQUESTS",
        message: "Too many privacy requests. Please wait a moment before trying again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfterSeconds),
        },
      }
    );
  }

  // 3. Content-Type validation
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "INVALID_CONTENT_TYPE", message: "Content-Type must be application/json." },
      { status: 400 }
    );
  }

  // 4. Body size check
  let rawBodyText: string;
  try {
    rawBodyText = await request.text();
  } catch {
    return NextResponse.json(
      { error: "INVALID_REQUEST", message: "Failed to read request body." },
      { status: 400 }
    );
  }

  if (Buffer.byteLength(rawBodyText, "utf8") > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "PAYLOAD_TOO_LARGE", message: "Request body exceeds maximum size." },
      { status: 413 }
    );
  }

  // 5. Parse JSON
  let body: unknown;
  try {
    body = JSON.parse(rawBodyText);
  } catch {
    return NextResponse.json(
      { error: "INVALID_JSON", message: "Malformed JSON payload." },
      { status: 400 }
    );
  }

  // 6. Bot honeypot verification
  if (
    body &&
    typeof body === "object" &&
    "website" in body &&
    typeof (body as Record<string, unknown>).website === "string" &&
    ((body as Record<string, unknown>).website as string).trim().length > 0
  ) {
    return NextResponse.json(
      { error: "INVALID_REQUEST", message: "Bot honeypot triggered." },
      { status: 400 }
    );
  }

  // 7. Schema validation (Zod)
  const parseResult = privacyRequestSchema.safeParse(body);
  if (!parseResult.success) {
    const firstIssue = parseResult.error.issues[0];
    return NextResponse.json(
      {
        error: "VALIDATION_FAILED",
        message: firstIssue ? firstIssue.message : "Validation failed.",
      },
      { status: 400 }
    );
  }

  const { email, requestType, message } = parseResult.data;
  const humanLabel = PRIVACY_REQUEST_LABELS[requestType] || requestType;

  // 8. Resolve destination email
  const destinationEmail =
    process.env.PRIVACY_NOTIFICATION_EMAIL ||
    process.env.ADMIN_SIGNUP_NOTIFICATION_EMAIL;

  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || "Roam <hello@mail.toolmint.cc>";

  if (!destinationEmail || !resendApiKey) {
    // Service not configured
    console.error("Operational notice: Privacy notification destination or Resend key not configured.");
    return NextResponse.json(
      {
        error: "SERVICE_UNAVAILABLE",
        message: "The privacy request channel is temporarily unavailable. Please try again later.",
      },
      { status: 503 }
    );
  }

  // 9. Dispatch privacy request via Resend
  const nowFormatted = new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC";

  try {
    const resend = new Resend(resendApiKey);
    const privacyHtml = renderPrivacyRequestNotificationHtml({
      requesterEmail: email,
      requestType: humanLabel,
      message: message || undefined,
      submittedAtFormatted: nowFormatted,
    });

    const { error: sendError } = await resend.emails.send({
      from: emailFrom,
      to: destinationEmail.trim(),
      subject: `Triply privacy request: ${humanLabel}`,
      html: privacyHtml,
      text: renderPrivacyRequestNotificationText({
        requesterEmail: email,
        requestType: humanLabel,
        message: message || undefined,
        submittedAtFormatted: nowFormatted,
      }),
    });

    if (sendError) {
      console.error(
        "Operational notice: Resend error delivering privacy request.",
        sendError.name,
        sendError.message
      );
      return NextResponse.json(
        {
          error: "DELIVERY_FAILED",
          message: "We were unable to deliver your request right now. Please try again in a few moments.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Request received",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error(
      "Operational notice: Exception while delivering privacy request.",
      err instanceof Error ? err.message : ""
    );
    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        message: "An unexpected error occurred while processing your privacy request.",
      },
      { status: 500 }
    );
  }
}
