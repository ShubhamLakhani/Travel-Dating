// Project Roam : Phase 8 Rate Limiter Unit Tests
// File: lib/security/rate-limit.test.ts

import test from "node:test";
import assert from "node:assert/strict";
import {
  checkRateLimit,
  getClientIdentifier,
  resetRateLimitStore,
} from "./rate-limit.ts";

test("rate-limit: allows requests within threshold", () => {
  resetRateLimitStore();
  const id = "test_user_1";
  const config = { maxRequests: 3, windowSeconds: 60 };

  const res1 = checkRateLimit(id, config);
  assert.equal(res1.allowed, true);
  assert.equal(res1.remaining, 2);

  const res2 = checkRateLimit(id, config);
  assert.equal(res2.allowed, true);
  assert.equal(res2.remaining, 1);

  const res3 = checkRateLimit(id, config);
  assert.equal(res3.allowed, true);
  assert.equal(res3.remaining, 0);

  // 4th request exceeds limit
  const res4 = checkRateLimit(id, config);
  assert.equal(res4.allowed, false);
  assert.equal(res4.remaining, 0);
  assert.equal(res4.retryAfterSeconds > 0, true);
});

test("rate-limit: distinguishes different client identifiers", () => {
  resetRateLimitStore();
  const config = { maxRequests: 2, windowSeconds: 60 };

  checkRateLimit("client_A", config);
  checkRateLimit("client_A", config);
  const blockedA = checkRateLimit("client_A", config);
  assert.equal(blockedA.allowed, false);

  // client_B has not exceeded limit
  const allowedB = checkRateLimit("client_B", config);
  assert.equal(allowedB.allowed, true);
});

test("rate-limit: extracts client identifier from request headers", () => {
  const reqWithForwarded = new Request("http://localhost:3000/api/early-access", {
    headers: { "x-forwarded-for": "203.0.113.195, 70.41.3.18" },
  });
  assert.equal(getClientIdentifier(reqWithForwarded), "203.0.113.195");

  const reqWithRealIp = new Request("http://localhost:3000/api/early-access", {
    headers: { "x-real-ip": "198.51.100.42" },
  });
  assert.equal(getClientIdentifier(reqWithRealIp), "198.51.100.42");

  const reqFallback = new Request("http://localhost:3000/api/early-access", {
    headers: { "user-agent": "Mozilla/5.0 Chrome/120" },
  });
  assert.equal(getClientIdentifier(reqFallback).startsWith("ua_"), true);
});
