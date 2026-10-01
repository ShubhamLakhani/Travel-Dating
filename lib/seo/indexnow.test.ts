// Project Roam — Phase 11 IndexNow Safety & Protocol Unit Tests
// File: lib/seo/indexnow.test.ts

import test from "node:test";
import assert from "node:assert/strict";
import { filterIndexablePublicUrls, CANONICAL_PUBLIC_URLS, submitToIndexNow } from "./indexnow.ts";

test("indexnow: filterIndexablePublicUrls defaults to canonical public pages", () => {
  const urls = filterIndexablePublicUrls();
  assert.equal(urls.length, CANONICAL_PUBLIC_URLS.length);
  assert.ok(urls.includes("https://roam.toolmint.cc/"));
  assert.ok(urls.includes("https://roam.toolmint.cc/travel-dating"));
  assert.ok(urls.includes("https://roam.toolmint.cc/dating-while-traveling"));
  assert.ok(urls.includes("https://roam.toolmint.cc/meet-people-before-your-trip"));
  assert.ok(urls.includes("https://roam.toolmint.cc/solo-travel-dating"));
  assert.ok(urls.includes("https://roam.toolmint.cc/safety"));
  assert.ok(urls.includes("https://roam.toolmint.cc/privacy"));
  assert.ok(urls.includes("https://roam.toolmint.cc/terms"));
});

test("indexnow: filterIndexablePublicUrls strictly excludes private and admin routes", () => {
  const candidate = [
    "https://roam.toolmint.cc/",
    "https://roam.toolmint.cc/join",
    "https://roam.toolmint.cc/success",
    "https://roam.toolmint.cc/privacy/request",
    "https://roam.toolmint.cc/admin",
    "https://roam.toolmint.cc/admin/overview",
    "https://roam.toolmint.cc/api/early-access",
    "https://roam.toolmint.cc/api/admin/density",
    "https://roam.toolmint.cc/travel-dating",
    "https://external-domain.com/travel-dating",
    "invalid-url",
  ];

  const filtered = filterIndexablePublicUrls(candidate);

  assert.deepEqual(filtered, [
    "https://roam.toolmint.cc/",
    "https://roam.toolmint.cc/travel-dating",
  ]);
});

test("indexnow: submitToIndexNow fails safely when INDEXNOW_KEY is absent", async () => {
  const originalKey = process.env.INDEXNOW_KEY;
  try {
    delete process.env.INDEXNOW_KEY;
    const result = await submitToIndexNow(["https://roam.toolmint.cc/travel-dating"]);
    assert.equal(result.success, false);
    assert.ok(result.reason?.includes("not configured"));
    assert.equal(result.submittedUrls.length, 0);
  } finally {
    if (originalKey !== undefined) {
      process.env.INDEXNOW_KEY = originalKey;
    }
  }
});
