// Triply: IndexNow Safety and Protocol Unit Tests
// File: lib/seo/indexnow.test.ts

import test from "node:test";
import assert from "node:assert/strict";
import { filterIndexablePublicUrls, CANONICAL_PUBLIC_URLS, submitToIndexNow } from "./indexnow.ts";
import { getAbsoluteUrl } from "./site-url.ts";

test("indexnow: filterIndexablePublicUrls defaults to canonical public pages", () => {
  const urls = filterIndexablePublicUrls();
  assert.equal(urls.length, CANONICAL_PUBLIC_URLS.length);
  assert.ok(urls.includes(getAbsoluteUrl("/")));
  assert.ok(urls.includes(getAbsoluteUrl("/travel-dating")));
  assert.ok(urls.includes(getAbsoluteUrl("/dating-while-traveling")));
  assert.ok(urls.includes(getAbsoluteUrl("/meet-people-before-your-trip")));
  assert.ok(urls.includes(getAbsoluteUrl("/solo-travel-dating")));
  assert.ok(urls.includes(getAbsoluteUrl("/safety")));
  assert.ok(urls.includes(getAbsoluteUrl("/privacy")));
  assert.ok(urls.includes(getAbsoluteUrl("/terms")));
});

test("indexnow: filterIndexablePublicUrls strictly excludes private and admin routes", () => {
  const candidate = [
    "https://triply.toolmint.cc/",
    "https://triply.toolmint.cc/join",
    "https://triply.toolmint.cc/success",
    "https://triply.toolmint.cc/privacy/request",
    "https://triply.toolmint.cc/admin",
    "https://triply.toolmint.cc/admin/overview",
    "https://triply.toolmint.cc/api/early-access",
    "https://triply.toolmint.cc/api/admin/density",
    "https://triply.toolmint.cc/travel-dating",
    "https://external-domain.com/travel-dating",
    "invalid-url",
  ];

  const filtered = filterIndexablePublicUrls(candidate);

  assert.deepEqual(filtered, [
    "https://triply.toolmint.cc/",
    "https://triply.toolmint.cc/travel-dating",
  ]);
});

test("indexnow: submitToIndexNow fails safely when INDEXNOW_KEY is absent", async () => {
  const originalKey = process.env.INDEXNOW_KEY;
  try {
    delete process.env.INDEXNOW_KEY;
    const result = await submitToIndexNow(["https://triply.toolmint.cc/travel-dating"]);
    assert.equal(result.success, false);
    assert.ok(result.reason?.includes("not configured"));
    assert.equal(result.submittedUrls.length, 0);
  } finally {
    if (originalKey !== undefined) {
      process.env.INDEXNOW_KEY = originalKey;
    }
  }
});
