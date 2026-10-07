// Triply: Canonical Site URL and SEO Host Authority
// File: lib/seo/site-url.ts

export const DEFAULT_PRODUCTION_SITE_URL = "https://triply.toolmint.cc";
export const DEFAULT_PRODUCTION_HOST = "triply.toolmint.cc";

/**
 * Returns the validated canonical base URL for Triply.
 * Prioritizes NEXT_PUBLIC_SITE_URL when valid, falling back to https://triply.toolmint.cc.
 * Ensures no trailing slash for consistent URL composition.
 */
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) {
    try {
      const parsed = new URL(envUrl);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.origin;
      }
    } catch {
      // Fall through to default
    }
  }

  return DEFAULT_PRODUCTION_SITE_URL;
}

/**
 * Returns the canonical URL as a URL object for Next.js metadataBase.
 */
export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}

/**
 * Returns the hostname of the canonical site URL (e.g. "triply.toolmint.cc").
 */
export function getSiteHost(): string {
  try {
    return new URL(getSiteUrl()).hostname;
  } catch {
    return DEFAULT_PRODUCTION_HOST;
  }
}

/**
 * Constructs an absolute canonical URL from a pathname.
 * Handles leading slash cleanly.
 */
export function getAbsoluteUrl(path: string = "/"): string {
  const base = getSiteUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return cleanPath === "/" ? `${base}/` : `${base}${cleanPath}`;
}
