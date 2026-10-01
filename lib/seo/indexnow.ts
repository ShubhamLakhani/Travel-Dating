// Project Roam — Phase 11 IndexNow Protocol Support
// File: lib/seo/indexnow.ts

export const CANONICAL_PUBLIC_URLS = [
  "https://roam.toolmint.cc/",
  "https://roam.toolmint.cc/travel-dating",
  "https://roam.toolmint.cc/dating-while-traveling",
  "https://roam.toolmint.cc/meet-people-before-your-trip",
  "https://roam.toolmint.cc/solo-travel-dating",
  "https://roam.toolmint.cc/safety",
  "https://roam.toolmint.cc/privacy",
  "https://roam.toolmint.cc/terms",
] as const;

const FORBIDDEN_SUBSTRINGS = [
  "/join",
  "/success",
  "/privacy/request",
  "/admin",
  "/api",
];

export interface IndexNowResult {
  success: boolean;
  submittedUrls: string[];
  statusCode?: number;
  reason?: string;
}

/**
 * Validates that an array of URLs contains ONLY canonical, indexable public marketing URLs.
 * Strictly filters out any private, user-data, or authenticated administrative routes.
 */
export function filterIndexablePublicUrls(candidateUrls?: string[]): string[] {
  if (!candidateUrls || candidateUrls.length === 0) {
    return [...CANONICAL_PUBLIC_URLS];
  }

  return candidateUrls.filter((url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname !== "roam.toolmint.cc") {
        return false;
      }
      const pathname = parsed.pathname;
      for (const forbidden of FORBIDDEN_SUBSTRINGS) {
        if (pathname === forbidden || pathname.startsWith(`${forbidden}/`)) {
          return false;
        }
      }
      return true;
    } catch {
      return false;
    }
  });
}

/**
 * Submits public URLs to the IndexNow protocol endpoint (api.indexnow.org).
 * If INDEXNOW_KEY is not configured, safely exits without throwing.
 */
export async function submitToIndexNow(urls?: string[]): Promise<IndexNowResult> {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key) {
    return {
      success: false,
      submittedUrls: [],
      reason: "INDEXNOW_KEY environment variable is not configured.",
    };
  }

  const safeUrls = filterIndexablePublicUrls(urls);
  if (safeUrls.length === 0) {
    return {
      success: false,
      submittedUrls: [],
      reason: "No valid canonical public URLs to submit.",
    };
  }

  const payload = {
    host: "roam.toolmint.cc",
    key,
    keyLocation: "https://roam.toolmint.cc/api/indexnow/key",
    urlList: safeUrls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return {
      success: res.ok || res.status === 200 || res.status === 202,
      submittedUrls: safeUrls,
      statusCode: res.status,
      reason: res.ok ? "Success" : `IndexNow responded with status ${res.status}`,
    };
  } catch (err) {
    return {
      success: false,
      submittedUrls: safeUrls,
      reason: err instanceof Error ? err.message : "Network error contacting IndexNow API",
    };
  }
}
