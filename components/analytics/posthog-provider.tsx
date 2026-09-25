"use client";

import { useEffect } from "react";
import { initPostHog } from "@/lib/analytics/posthog";

/**
 * Initializes PostHog in the browser environment without blocking SSR or hydration.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  return <>{children}</>;
}
