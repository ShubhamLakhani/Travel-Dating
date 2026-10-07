// Project Roam : Phase 8 UTM Attribution & Anonymous Identity Engine
// File: lib/analytics/attribution.ts

export interface AttributionData {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landingPath?: string;
  landing_path?: string;
  capturedAt?: string;
}

const ATTRIBUTION_STORAGE_KEY = "roam_attribution_v1";
const ANONYMOUS_ID_STORAGE_KEY = "roam_anon_id_v1";

/**
 * Determines a friendly source name from referrer URL if utm_source is not explicitly set.
 */
export function deriveSourceFromReferrer(referrerUrl: string): string | undefined {
  if (!referrerUrl) return undefined;
  try {
    const url = new URL(referrerUrl);
    const host = url.hostname.toLowerCase();

    if (host.includes("instagram.com")) return "instagram";
    if (host.includes("reddit.com")) return "reddit";
    if (host.includes("linkedin.com")) return "linkedin";
    if (host.includes("tiktok.com")) return "tiktok";
    if (host.includes("twitter.com") || host.includes("x.com") || host === "t.co" || host.endsWith(".t.co")) return "twitter";
    if (host.includes("facebook.com")) return "facebook";
    if (host.includes("google.com")) return "google";
    if (host.includes("bing.com")) return "bing";

    return host.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

/**
 * Generates or retrieves a persistent, non-PII anonymous visitor ID.
 */
export function getAnonymousVisitorId(): string {
  if (typeof window === "undefined") {
    return "srv_anon_visitor";
  }

  try {
    let id = localStorage.getItem(ANONYMOUS_ID_STORAGE_KEY);
    if (!id) {
      id = `anon_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
      localStorage.setItem(ANONYMOUS_ID_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return `session_${Math.random().toString(36).slice(2, 9)}`;
  }
}

/**
 * Captures UTM parameters and referrer from browser context and stores them for attribution.
 */
export function captureAndStoreAttribution(): AttributionData {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const utmSource = searchParams.get("utm_source") || undefined;
    const utmMedium = searchParams.get("utm_medium") || undefined;
    const utmCampaign = searchParams.get("utm_campaign") || undefined;
    const utmContent = searchParams.get("utm_content") || undefined;
    const utmTerm = searchParams.get("utm_term") || undefined;

    let referrer = document.referrer || undefined;
    // Discard same-origin referrers
    if (referrer) {
      try {
        if (new URL(referrer).origin === window.location.origin) {
          referrer = undefined;
        }
      } catch {
        referrer = undefined;
      }
    }

    const naturalSource = !utmSource && referrer ? deriveSourceFromReferrer(referrer) : undefined;
    const effectiveSource = utmSource || naturalSource;

    const existingStr = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    const existing: AttributionData = existingStr ? JSON.parse(existingStr) : {};

    // First touch attribution model: preserve original landing UTMs if already present, but update if new ones arrive
    const s = effectiveSource || existing.utmSource || existing.utm_source || "direct";
    const m = utmMedium || existing.utmMedium || existing.utm_medium || (effectiveSource && !utmMedium ? "referral" : "none");
    const c = utmCampaign || existing.utmCampaign || existing.utm_campaign || "organic";
    const cnt = utmContent || existing.utmContent || existing.utm_content;
    const trm = utmTerm || existing.utmTerm || existing.utm_term;
    const ref = referrer || existing.referrer;
    const lp = existing.landingPath || existing.landing_path || window.location.pathname;

    const updated: AttributionData = {
      utmSource: s,
      utmMedium: m,
      utmCampaign: c,
      utmContent: cnt,
      utmTerm: trm,
      utm_source: s,
      utm_medium: m,
      utm_campaign: c,
      utm_content: cnt,
      utm_term: trm,
      referrer: ref,
      landingPath: lp,
      landing_path: lp,
      capturedAt: existing.capturedAt || new Date().toISOString(),
    };

    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return { utmSource: "direct", utmMedium: "none", utmCampaign: "organic" };
  }
}

/**
 * Returns currently stored attribution data.
 */
export function getStoredAttribution(): AttributionData {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Fall back to capture
  }

  return captureAndStoreAttribution();
}

/**
 * Safely parses UTM parameters from any URL string.
 */
export function parseAttributionFromUrl(urlStr: string): AttributionData {
  try {
    const url = new URL(urlStr);
    const src = url.searchParams.get("utm_source") || undefined;
    const med = url.searchParams.get("utm_medium") || undefined;
    const cmp = url.searchParams.get("utm_campaign") || undefined;
    const cnt = url.searchParams.get("utm_content") || undefined;
    const trm = url.searchParams.get("utm_term") || undefined;
    return {
      utmSource: src,
      utmMedium: med,
      utmCampaign: cmp,
      utmContent: cnt,
      utmTerm: trm,
      utm_source: src,
      utm_medium: med,
      utm_campaign: cmp,
      utm_content: cnt,
      utm_term: trm,
    };
  } catch {
    return {};
  }
}

export function classifyReferrer(referrerUrl: string | null | undefined): string {
  if (!referrerUrl) return "direct";
  return deriveSourceFromReferrer(referrerUrl) || "referral";
}

export const getOrCreateAnonymousId = getAnonymousVisitorId;

