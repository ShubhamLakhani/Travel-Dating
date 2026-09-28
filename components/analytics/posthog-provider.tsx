"use client";

import { useEffect } from "react";
import { initPostHog } from "@/lib/analytics/posthog";
import { captureAndStoreAttribution } from "@/lib/analytics/attribution";

/**
 * Initializes PostHog and captures UTM attribution in browser without blocking hydration.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    captureAndStoreAttribution();
    initPostHog();
  }, []);

  return <>{children}</>;
}
