// Project Roam — Phase 8 Production Analytics Tracking Wrapper
// File: lib/analytics/track.ts

import { posthog, isPostHogInitialized } from "./posthog.ts";
import { type AnalyticsEventName } from "./events.ts";
import { type SafeEventProperties } from "../../types/analytics.ts";
import { getAnonymousVisitorId, getStoredAttribution } from "./attribution.ts";

export const PROHIBITED_KEYS: readonly string[] = [
  "email",
  "emailaddress",
  "phone",
  "phonenumber",
  "fullname",
  "name",
  "firstname",
  "lastname",
  "birthdate",
  "exactbirthdate",
  "dob",
  "hotel",
  "exactaccommodation",
  "accommodation",
  "preciselocation",
  "latitude",
  "longitude",
  "address",
  "password",
  "passkey",
  "secret",
  "token",
  "freeform",
  "freeformtext",
  "usertext",
];

// Set of already fired one-time events during this page session to prevent reload duplicates
const firedEventsCache = new Set<string>();

/**
 * Validates that event properties do not contain any PII keys.
 * Exported for rigorous unit testing.
 */
export function sanitizeProperties(
  props?: Record<string, unknown> | SafeEventProperties
): Record<string, string | number | boolean | null> {
  const sanitized: Record<string, string | number | boolean | null> = {};
  if (!props) return sanitized;

  for (const [key, value] of Object.entries(props)) {
    const lowerKey = key.toLowerCase().replace(/[_-]/g, "");
    const isProhibited = PROHIBITED_KEYS.some((pk) => lowerKey === pk || lowerKey.includes(pk));

    if (isProhibited) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[Analytics Privacy Violation] Prohibited key "${key}" passed to trackEvent. Stripping field to protect privacy.`
        );
      }
      continue;
    }

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null
    ) {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export const sanitizeAnalyticsProperties = sanitizeProperties;

/**
 * Standard typed event tracking wrapper for Project Roam.
 * Guarantees:
 * 1. Non-PII anonymous visitor ID attached to all events
 * 2. UTM attribution attached to all events
 * 3. Zero PII allowed in payloads
 * 4. Deduplication of idempotent events (e.g. landing_viewed per route, real_trip_submitted per submissionId)
 */
export function trackEvent(
  name: AnalyticsEventName,
  properties?: SafeEventProperties,
  options?: { dedupeKey?: string }
): void {
  if (typeof window === "undefined") {
    return;
  }

  // Deduplication check
  if (options?.dedupeKey) {
    if (firedEventsCache.has(options.dedupeKey)) {
      return; // Already fired
    }
    firedEventsCache.add(options.dedupeKey);
  }

  const anonId = getAnonymousVisitorId();
  const attr = getStoredAttribution();

  const baseProps: Record<string, string | number | boolean | null> = {
    anonymous_id: anonId,
    utm_source: attr.utmSource || "direct",
    utm_medium: attr.utmMedium || "none",
    utm_campaign: attr.utmCampaign || "organic",
  };

  if (attr.utmContent) baseProps.utm_content = attr.utmContent;
  if (attr.utmTerm) baseProps.utm_term = attr.utmTerm;
  if (attr.referrer) baseProps.referrer = attr.referrer;

  const userSafeProps = sanitizeProperties(properties);
  const finalPayload = { ...baseProps, ...userSafeProps };

  if (process.env.NODE_ENV === "development") {
    console.debug(`[Analytics Track] ${name}`, finalPayload);
  }

  if (isPostHogInitialized()) {
    try {
      posthog.capture(name, finalPayload);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[Analytics Track Error] Failed to capture event "${name}":`, err);
      }
    }
  }
}
