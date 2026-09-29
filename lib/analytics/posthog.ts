import posthog from "posthog-js";

let posthogInitialized = false;

/**
 * Initializes PostHog analytics in browser context only when environment variables exist.
 * Configured with strict privacy defaults:
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
  return posthogInitialized;
}

export { posthog };
