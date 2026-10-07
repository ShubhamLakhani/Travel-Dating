// Triply: IndexNow Protocol Support
// File: lib/seo/indexnow.ts

import { getAbsoluteUrl, getSiteHost, getSiteUrl } from "./site-url";

export const CANONICAL_PUBLIC_PATHS = [
  "/",
  "/travel-dating",
  "/dating-while-traveling",
  "/meet-people-before-your-trip",
  "/solo-travel-dating",
  "/safety",
  "/privacy",
  "/terms",
] as const;

export const CANONICAL_PUBLIC_URLS: string[] = CANONICAL_PUBLIC_PATHS.map((p) =>
  getAbsoluteUrl(p)
);

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
    return CANONICAL_PUBLIC_PATHS.map((p) => getAbsoluteUrl(p));
  }

  const allowedHosts = new Set(["triply.toolmint.cc", "roam.toolmint.cc", getSiteHost()]);

  return candidateUrls.filter((url) => {
    try {
      const parsed = new URL(url);
      if (!allowedHosts.has(parsed.hostname.toLowerCase())) {
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

  const siteHost = getSiteHost();
  const siteUrl = getSiteUrl();

  const payload = {
    host: siteHost,
    key,
    keyLocation: `${siteUrl}/api/indexnow/key`,
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
