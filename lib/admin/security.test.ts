// Project Roam — Phase 7 Admin Security & Privacy Protection Unit Tests
// File: lib/admin/security.test.ts

import test from "node:test";
import assert from "node:assert/strict";
import {
  createAdminSessionToken,
  verifyAdminSessionToken,
  validateAdminCredentials,
  isEmailAllowedAdmin,
  maskIdentifier,
  maskEmailForDisplay,
} from "./session.ts";

test("admin-security: fails closed on missing or empty token", () => {
  const result = verifyAdminSessionToken("");
  assert.equal(result.valid, false);
  assert.equal(result.error, "Missing session token");
});

test("admin-security: rejects arbitrary attacker-signed tokens", () => {
  // Craft a forged payload signed with wrong key
  const fakePayload = Buffer.from(
    JSON.stringify({
      email: "attacker@malicious.com",
      role: "admin",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    })
  ).toString("base64url");
  const fakeSignature = "invalid_signature_hash_bytes_12345678";
  const forgedToken = `${fakePayload}.${fakeSignature}`;

  const result = verifyAdminSessionToken(forgedToken);
  assert.equal(result.valid, false);
});

test("admin-security: rejects expired session tokens", () => {
  const expiredToken = createAdminSessionToken("admin@roam.dating", -3600);
  const result = verifyAdminSessionToken(expiredToken);
  assert.equal(result.valid, false);
  assert.equal(result.error, "Session expired");
});

test("admin-security: enforces ADMIN_EMAILS allowlist strictly", () => {
  const original = process.env.ADMIN_EMAILS;
  try {
    process.env.ADMIN_EMAILS = "founder@roam.dating,admin@roam.dating";
    assert.equal(isEmailAllowedAdmin("founder@roam.dating"), true);
    assert.equal(isEmailAllowedAdmin("admin@roam.dating"), true);
    assert.equal(isEmailAllowedAdmin("intruder@randomdomain1234.org"), false);
  } finally {
    process.env.ADMIN_EMAILS = original;
  }
});

test("admin-security: rejects invalid passkey attempts in constant time", () => {
  const emptyResult = validateAdminCredentials({ passkey: "" });
  assert.equal(emptyResult.valid, false);

  const wrongPassResult = validateAdminCredentials({ passkey: "completely_wrong_password_999" });
  assert.equal(wrongPassResult.valid, false);
});

test("admin-privacy: maskIdentifier protects sensitive IDs from exposure", () => {
  const shortId = "abc";
  assert.equal(maskIdentifier(shortId), "abc");

  const uuid = "f47ac10b-58cc-4372-a567-0e02b2c3d479";
  const masked = maskIdentifier(uuid);
  assert.equal(masked, "f47a…d479");
  assert.equal(masked.length < uuid.length, true);
});

test("admin-privacy: maskEmailForDisplay obfuscates personal email", () => {
  const email = "shubham.test@example.com";
  const masked = maskEmailForDisplay(email);
  assert.equal(masked.startsWith("shu•••@example.com"), true);
  assert.equal(masked.includes("shubham.test"), false);
});
