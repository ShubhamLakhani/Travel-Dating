import posthog from "posthog-js";
import { isPostHogAllowedInEnvironment } from "./environment.ts";

let posthogInitialized = false;

/**
 * Initializes PostHog analytics in browser context only when environment variables exist
 * and the current hostname is a permitted production domain.
 *
 * Configured with strict privacy defaults:
 * - Localhost and preview environments strictly excluded from production project
 * - Session recording disabled
 * - Autocapture disabled to prevent accidental form-field data leaks
 * - No PII capture
 * - User identification disabled in this phase
 */
export function initPostHog(): void {
  if (typeof window === "undefined") {
    return;
  }

  if (posthogInitialized) {
    return;
  }

  // Centralized guard: prevent development or preview traffic from contaminating production analytics
  if (!isPostHogAllowedInEnvironment()) {
    if (process.env.NODE_ENV === "development") {
      console.debug(
        `[PostHog] Initialization skipped on hostname "${window.location.hostname}" to isolate production analytics.`
      );
    }
    return;
  }

  const key =
    process.env.NEXT_PUBLIC_POSTHOG_KEY ||
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  if (!key) {
    // PostHog key not configured; safely skip initialization without crashing
    return;
  }

  try {
    posthog.init(key, {
      api_host: host,
      capture_pageview: false, // Custom/controlled pageview tracking only
      capture_pageleave: false,
      autocapture: false, // Prevent accidental DOM/input capturing
      disable_session_recording: true, // Session replay explicitly disabled in Phase 1
      mask_all_element_attributes: true,
      mask_all_text: true,
      persistence: "localStorage+cookie",
      loaded: () => {
        posthogInitialized = true;
      },
    });
    posthogInitialized = true;
  } catch (error) {
    // Avoid crashing the application if network or analytics script fails
    if (process.env.NODE_ENV === "development") {
      console.warn("[PostHog] Skipped initialization due to error:", error);
    }
  }
}

export function isPostHogInitialized(): boolean {
  return posthogInitialized && isPostHogAllowedInEnvironment();
}

export { posthog, isPostHogAllowedInEnvironment };

