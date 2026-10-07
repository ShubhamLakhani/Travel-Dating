// Triply: Production Analytics Environment Isolation Guard
// File: lib/analytics/environment.ts

/**
 * Known legitimate production hostnames for Triply.
 */
const ALLOWED_PRODUCTION_HOSTNAMES: ReadonlySet<string> = new Set([
  "triply.toolmint.cc",
  "roam.toolmint.cc",
]);

/**
 * Centralized guard evaluating whether PostHog tracking is permitted
 * in the current runtime environment.
 *
 * Rules:
 * 1. Excludes localhost and loopback hostnames (localhost, 127.0.0.1, ::1).
 * 2. Excludes Vercel preview deployments (*.vercel.app) unless explicitly
 *    enabled via NEXT_PUBLIC_ANALYTICS_PREVIEW="true" or NEXT_PUBLIC_ENABLE_PREVIEW_ANALYTICS="true".
 * 3. Allows production domain triply.toolmint.cc, canonical roam.toolmint.cc,
 *    and any configured NEXT_PUBLIC_SITE_URL hostname.
 *
 * @param explicitHostname Optional hostname override for testing or server evaluation.
 */
export function isPostHogAllowedInEnvironment(explicitHostname?: string): boolean {
  let hostname = explicitHostname;

  if (!hostname) {
    if (typeof window === "undefined" || !window.location) {
      return false;
    }
    hostname = window.location.hostname;
  }

  if (!hostname || typeof hostname !== "string") {
    return false;
  }

  const normalized = hostname.toLowerCase().trim();

  // 1. Exclude localhost and loopback addresses
  if (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1" ||
    normalized === "[::1]" ||
    normalized.endsWith(".localhost")
  ) {
    return false;
  }

  // 2. Exclude Vercel preview deployments (*.vercel.app) unless preview analytics is enabled
  if (normalized.endsWith(".vercel.app")) {
    const isPreviewAnalyticsEnabled =
      process.env.NEXT_PUBLIC_ANALYTICS_PREVIEW === "true" ||
      process.env.NEXT_PUBLIC_ENABLE_PREVIEW_ANALYTICS === "true";

    return isPreviewAnalyticsEnabled;
  }

  // 3. Allow trusted production hostnames
  if (ALLOWED_PRODUCTION_HOSTNAMES.has(normalized)) {
    return true;
  }

  // 4. Allow configured NEXT_PUBLIC_SITE_URL hostname if valid
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      const siteHostname = new URL(siteUrl).hostname.toLowerCase().trim();
      if (siteHostname && siteHostname === normalized) {
        return true;
      }
    } catch {
      // Ignore URL parsing errors
    }
  }

  // 5. Allow optional comma-separated NEXT_PUBLIC_ALLOWED_ANALYTICS_HOSTNAMES override
  const customAllowed = process.env.NEXT_PUBLIC_ALLOWED_ANALYTICS_HOSTNAMES;
  if (customAllowed) {
    const hostnames = customAllowed.split(",").map((h) => h.toLowerCase().trim());
    if (hostnames.includes(normalized)) {
      return true;
    }
  }

  // All other unapproved or private LAN hostnames are excluded
  return false;
}
