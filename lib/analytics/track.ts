import { posthog, isPostHogInitialized } from "./posthog";
import { type AnalyticsEventName } from "./events";
import { type SafeEventProperties } from "@/types/analytics";

const PROHIBITED_KEYS: readonly string[] = [
  "email",
  "phone",
  "phonenumber",
  "fullname",
  "name",
  "firstname",
  "lastname",
  "birthdate",
  "exactbirthdate",
  "hotel",
  "exactaccommodation",
  "accommodation",
  "preciselocation",
  "latitude",
  "longitude",
  "address",
];

/**
 * Validates that event properties do not contain any PII keys.
 */
function sanitizeProperties(
  props?: SafeEventProperties
): Record<string, string | number | boolean | null> | undefined {
  if (!props) return undefined;

  const sanitized: Record<string, string | number | boolean | null> = {};

  for (const [key, value] of Object.entries(props)) {
    const lowerKey = key.toLowerCase();
    if (PROHIBITED_KEYS.includes(lowerKey)) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          `[Analytics Privacy Violation] Prohibited key "${key}" was passed to trackEvent. Stripping field to protect user privacy.`
        );
      }
      continue;
    }

    if (value !== undefined) {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Standard typed event tracking wrapper for Project Roam.
 * Direct calls to posthog.capture should never be scattered in components.
 */
export function trackEvent(
  name: AnalyticsEventName,
  properties?: SafeEventProperties
): void {
  if (typeof window === "undefined") {
    return;
  }

  const safeProps = sanitizeProperties(properties);

  if (process.env.NODE_ENV === "development") {
    // Development-safe logging for validation verification
    console.debug(`[Analytics Track] ${name}`, safeProps ?? {});
  }

  if (isPostHogInitialized()) {
    try {
      posthog.capture(name, safeProps);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[Analytics Track Error] Failed to capture event "${name}":`, err);
      }
    }
  }
}
