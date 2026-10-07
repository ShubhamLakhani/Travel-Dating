import { NextResponse } from "next/server";
import { earlyAccessServerSchema } from "@/lib/validation/early-access-schema";
import {
  submitEarlyAccess,
  IdempotencyConflictError,
} from "@/lib/early-access/submit-early-access";
import { checkRateLimit } from "@/lib/security/rate-limit";

const MAX_BODY_BYTES = 32 * 1024; // 32 KB

/**
 * Validates request origin against allowed hostnames.
 */
function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Direct/same-origin server calls without origin header are allowed

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

    // Vercel deployment domains
    if (originUrl.hostname.endsWith(".vercel.app")) {
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

  // 2. Server-side Rate Limiting (10 requests per minute per client)
  const rateLimitResult = checkRateLimit(request, {
    windowMs: 60 * 1000,
    maxRequests: 10,
    prefix: "early-access",
  });

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        error: "TOO_MANY_REQUESTS",
        message: "Too many submission attempts. Please wait a moment before trying again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfterSeconds),
        },
      }
    );
  }

  // 3. Content-Type check
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "INVALID_CONTENT_TYPE", message: "Content-Type must be application/json." },
      { status: 400 }
    );
  }

  // 3. Body size check
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "PAYLOAD_TOO_LARGE", message: "Request body exceeds maximum size." },
      { status: 413 }
    );
  }

  // 4. Parse JSON
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

  let body: unknown;
  try {
    body = JSON.parse(rawBodyText);
  } catch {
    return NextResponse.json(
      { error: "INVALID_JSON", message: "Malformed JSON payload." },
      { status: 400 }
    );
  }

  // 5. Bot honeypot verification
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

  // 6. Schema validation (Zod)
  const parseResult = earlyAccessServerSchema.safeParse(body);
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

  const data = parseResult.data;

  // 7. Execute atomic submission via server persistence service
  try {
    const result = await submitEarlyAccess({
      submissionId: data.submissionId,
      email: data.contact.email,
      homeCountry: data.contact.homeCountry,
      ageBand: data.profile.ageBand,
      gender: data.profile.gender,
      genderSelfDescribe: data.profile.genderSelfDescribe,
      interestedIn: data.profile.interestedIn,
      usedDatingAppsWhileTraveling: data.contact.usedDatingAppsWhileTraveling,
      travelFrequency: data.contact.travelFrequency,
      is18Plus: data.contact.is18Plus,
      marketingConsent: data.contact.marketingConsent,
      meetPreference: data.profile.meetPreference,
      intentions: data.intentions,
      interests: data.interests,
      customInterest: data.customInterest,
      destination: {
        id: data.trip.destination.id,
        name: data.trip.destination.name,
        country: data.trip.destination.country,
        countryCode: data.trip.destination.countryCode,
        marketSlug: data.trip.destination.marketSlug,
      },
      arrivalDate: data.trip.arrivalDate,
      departureDate: data.trip.departureDate,
      travelMode: data.trip.travelMode,
      interviewOptIn: data.interviewOptIn,
      attribution: data.attribution
        ? {
            utmSource: data.attribution.utmSource || null,
            utmMedium: data.attribution.utmMedium || null,
            utmCampaign: data.attribution.utmCampaign || null,
            utmContent: data.attribution.utmContent || null,
            utmTerm: data.attribution.utmTerm || null,
            referrer: data.attribution.referrer || null,
          }
        : null,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    if (err instanceof IdempotencyConflictError) {
      return NextResponse.json(
        {
          error: "IDEMPOTENCY_CONFLICT",
          message: "Your form changed after an earlier submission attempt. Please try again.",
        },
        { status: 409 }
      );
    }

    const message =
      err instanceof Error && err.message.includes("Database service unavailable")
        ? "Database persistence is not yet connected in this environment."
        : "We couldn't save your early-access request. Your answers are still here, so please try again.";

    return NextResponse.json(
      {
        error: "SUBMISSION_FAILED",
        message,
      },
      { status: 500 }
    );
  }
}
