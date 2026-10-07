// Project Roam : Phase 8 Attribution, Analytics Sanitization & Hardening Tests
// File: lib/analytics/attribution-and-hardening.test.ts

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseAttributionFromUrl,
  classifyReferrer,
  getOrCreateAnonymousId,
} from "./attribution.ts";
import { sanitizeAnalyticsProperties } from "./track.ts";
import { isPostHogAllowedInEnvironment } from "./environment.ts";
import { checkRateLimit, resetRateLimitStore } from "../security/rate-limit.ts";
import { earlyAccessServerSchema } from "../validation/early-access-schema.ts";

test("attribution: parseAttributionFromUrl extracts standard UTM params safely", () => {
  const url = "https://roam.toolmint.cc/?utm_source=instagram&utm_medium=social&utm_campaign=summer26&utm_content=story1&utm_term=dating";
  const attr = parseAttributionFromUrl(url);

  assert.equal(attr.utm_source, "instagram");
  assert.equal(attr.utm_medium, "social");
  assert.equal(attr.utm_campaign, "summer26");
  assert.equal(attr.utm_content, "story1");
  assert.equal(attr.utm_term, "dating");
});

test("attribution: Phase 11 acquisition test URL parses correctly", () => {
  const url = "https://roam.toolmint.cc/?utm_source=phase11_test&utm_medium=qa&utm_campaign=seo_acquisition";
  const attr = parseAttributionFromUrl(url);

  assert.equal(attr.utm_source, "phase11_test");
  assert.equal(attr.utmSource, "phase11_test");
  assert.equal(attr.utm_medium, "qa");
  assert.equal(attr.utmMedium, "qa");
  assert.equal(attr.utm_campaign, "seo_acquisition");
  assert.equal(attr.utmCampaign, "seo_acquisition");
});

test("attribution: parseAttributionFromUrl handles missing and empty UTMs cleanly", () => {
  const url = "https://roam.toolmint.cc/join?foo=bar";
  const attr = parseAttributionFromUrl(url);

  assert.equal(attr.utm_source, undefined);
  assert.equal(attr.utm_medium, undefined);
  assert.equal(attr.utm_campaign, undefined);
});

test("attribution: classifyReferrer identifies known social & search domains", () => {
  assert.equal(classifyReferrer("https://l.instagram.com/"), "instagram");
  assert.equal(classifyReferrer("https://www.reddit.com/r/solotravel"), "reddit");
  assert.equal(classifyReferrer("https://www.linkedin.com/feed/"), "linkedin");
  assert.equal(classifyReferrer("https://t.co/xyz123"), "twitter");
  assert.equal(classifyReferrer("https://www.google.com/search?q=roam"), "google");
  assert.equal(classifyReferrer("https://randomblog.travel/article"), "randomblog.travel");
  assert.equal(classifyReferrer(null), "direct");
  assert.equal(classifyReferrer(""), "direct");
});

test("attribution: getOrCreateAnonymousId creates persistent non-PII uuid", () => {
  // Mock window & localStorage for node test environment
  const store = new Map<string, string>();
  (globalThis as unknown as { window: unknown }).window = globalThis;
  (globalThis as unknown as { localStorage: Storage }).localStorage = {
    getItem: (k: string) => store.get(k) || null,
    setItem: (k: string, v: string) => store.set(k, v),
    removeItem: (k: string) => store.delete(k),
    clear: () => store.clear(),
    key: () => null,
    length: 0,
  };

  try {
    const id1 = getOrCreateAnonymousId();
    assert.ok(id1.startsWith("anon_"));
    const id2 = getOrCreateAnonymousId();
    assert.equal(id1, id2, "Anonymous ID must persist across calls");
  } finally {
    delete (globalThis as unknown as { window?: unknown }).window;
  }
});

test("analytics-sanitization: strips all prohibited PII keys strictly", () => {
  const dirtyProps = {
    destination: "Tokyo",
    destination_country: "Japan",
    email: "user@example.com",
    name: "John Doe",
    firstName: "John",
    full_name: "John Doe",
    phone: "+1234567890",
    dob: "1995-05-15",
    freeform_text: "My secret notes",
    trip_duration_days: 7,
  };

  const clean = sanitizeAnalyticsProperties(dirtyProps as Record<string, unknown>);

  assert.equal(clean.destination, "Tokyo");
  assert.equal(clean.destination_country, "Japan");
  assert.equal(clean.trip_duration_days, 7);
  assert.equal("email" in clean, false, "email must be stripped");
  assert.equal("name" in clean, false, "name must be stripped");
  assert.equal("firstName" in clean, false, "firstName must be stripped");
  assert.equal("full_name" in clean, false, "full_name must be stripped");
  assert.equal("phone" in clean, false, "phone must be stripped");
  assert.equal("dob" in clean, false, "dob must be stripped");
  assert.equal("freeform_text" in clean, false, "freeform_text must be stripped");
});

test("rate-limiting: sliding window throttles after maxRequests exceeded", () => {
  resetRateLimitStore();
  const req = new Request("http://localhost:3000/api/early-access", {
    headers: { "x-forwarded-for": "198.51.100.1" },
  });

  const config = { windowMs: 1000, maxRequests: 3, prefix: "test-limit" };

  const r1 = checkRateLimit(req, config);
  assert.equal(r1.allowed, true);
  assert.equal(r1.remaining, 2);

  const r2 = checkRateLimit(req, config);
  assert.equal(r2.allowed, true);
  assert.equal(r2.remaining, 1);

  const r3 = checkRateLimit(req, config);
  assert.equal(r3.allowed, true);
  assert.equal(r3.remaining, 0);

  const r4 = checkRateLimit(req, config);
  assert.equal(r4.allowed, false);
  assert.equal(r4.remaining, 0);
  assert.ok(r4.retryAfterSeconds >= 1);
});

test("age-gating: server schema strictly rejects minors (is18Plus false)", () => {
  const invalidPayload = {
    submissionId: "sub_1234567890abcdef",
    trip: {
      destination: {
        id: "dest_tokyo",
        name: "Tokyo",
        country: "Japan",
        marketSlug: "tokyo",
      },
      arrivalDate: "2026-12-01",
      departureDate: "2026-12-10",
      travelMode: "solo",
    },
    profile: {
      ageBand: "18-24",
      gender: "man",
      interestedIn: "women",
      meetPreference: "both",
    },
    intentions: ["dating"],
    interests: ["food"],
    contact: {
      email: "test@example.com",
      homeCountry: "United States",
      is18Plus: false, // Under 18 bypass attempt
    },
  };

  const parsed = earlyAccessServerSchema.safeParse(invalidPayload);
  assert.equal(parsed.success, false, "Schema must reject under-18 submission");
});

test("environment-isolation: strictly excludes localhost and loopbacks", () => {
  assert.equal(isPostHogAllowedInEnvironment("localhost"), false);
  assert.equal(isPostHogAllowedInEnvironment("127.0.0.1"), false);
  assert.equal(isPostHogAllowedInEnvironment("::1"), false);
  assert.equal(isPostHogAllowedInEnvironment("[::1]"), false);
  assert.equal(isPostHogAllowedInEnvironment("test.localhost"), false);
});

test("environment-isolation: excludes Vercel preview hostnames by default", () => {
  const originalPreviewFlag = process.env.NEXT_PUBLIC_ANALYTICS_PREVIEW;
  try {
    delete process.env.NEXT_PUBLIC_ANALYTICS_PREVIEW;
    assert.equal(
      isPostHogAllowedInEnvironment("project-roam-abc123.vercel.app"),
      false
    );
    assert.equal(
      isPostHogAllowedInEnvironment("triply-git-feature-preview.vercel.app"),
      false
    );
  } finally {
    if (originalPreviewFlag !== undefined) {
      process.env.NEXT_PUBLIC_ANALYTICS_PREVIEW = originalPreviewFlag;
    }
  }
});

test("environment-isolation: allows Vercel preview when preview analytics explicitly enabled", () => {
  const originalPreviewFlag = process.env.NEXT_PUBLIC_ANALYTICS_PREVIEW;
  try {
    process.env.NEXT_PUBLIC_ANALYTICS_PREVIEW = "true";
    assert.equal(
      isPostHogAllowedInEnvironment("project-roam-preview.vercel.app"),
      true
    );
  } finally {
    if (originalPreviewFlag !== undefined) {
      process.env.NEXT_PUBLIC_ANALYTICS_PREVIEW = originalPreviewFlag;
    } else {
      delete process.env.NEXT_PUBLIC_ANALYTICS_PREVIEW;
    }
  }
});

test("environment-isolation: allows production hostnames triply.toolmint.cc and roam.toolmint.cc", () => {
  assert.equal(isPostHogAllowedInEnvironment("triply.toolmint.cc"), true);
  assert.equal(isPostHogAllowedInEnvironment("roam.toolmint.cc"), true);
  assert.equal(isPostHogAllowedInEnvironment("TRIPLY.TOOLMINT.CC"), true);
});

test("environment-isolation: rejects arbitrary unauthorized hostnames and LAN IPs", () => {
  assert.equal(isPostHogAllowedInEnvironment("192.168.1.45"), false);
  assert.equal(isPostHogAllowedInEnvironment("10.0.0.1"), false);
  assert.equal(isPostHogAllowedInEnvironment("attacker-site.com"), false);
  assert.equal(isPostHogAllowedInEnvironment(""), false);
});

