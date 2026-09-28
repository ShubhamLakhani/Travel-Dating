// Project Roam — Phase 7 Admin Session & Auth Unit Tests
// File: lib/admin/auth.test.ts

import test from "node:test";
import assert from "node:assert/strict";
import {
  createAdminSessionToken,
  verifyAdminSessionToken,
  isEmailAllowedAdmin,
  validateAdminCredentials,
} from "./session.ts";

test("admin-auth: createAdminSessionToken and verifyAdminSessionToken roundtrip", () => {
  const email = "founder@roam.dating";
  const token = createAdminSessionToken(email);

  assert.equal(typeof token, "string");
  assert.equal(token.includes("."), true);

  const verified = verifyAdminSessionToken(token);
  assert.equal(verified.valid, true);
  assert.equal(verified.payload?.email, email);
  assert.equal(verified.payload?.role, "admin");
});

test("admin-auth: rejects tampered token signature", () => {
  const token = createAdminSessionToken("admin@roam.dating");
  const [payloadBase64, signature] = token.split(".");
  // Tamper with signature
  const tamperedSig = signature.slice(0, -3) + "xyz";
  const tamperedToken = `${payloadBase64}.${tamperedSig}`;

  const result = verifyAdminSessionToken(tamperedToken);
  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid session signature");
});

test("admin-auth: rejects malformed token", () => {
  const result1 = verifyAdminSessionToken("invalid-string");
  assert.equal(result1.valid, false);

  const result2 = verifyAdminSessionToken("");
  assert.equal(result2.valid, false);
});

test("admin-auth: validates credentials against server passkey", () => {
  const passkey = process.env.ADMIN_SECRET_KEY || "roam_admin_dev_pass_2026";
  const valid = validateAdminCredentials({
    passkey,
    email: "founder@roam.dating",
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.email, "founder@roam.dating");

  const invalid = validateAdminCredentials({
    passkey: "wrong-password-1234",
  });
  assert.equal(invalid.valid, false);
  assert.equal(invalid.error, "Incorrect admin credentials");
});

test("admin-auth: isEmailAllowedAdmin handles allowlist checking", () => {
  if (process.env.ADMIN_EMAILS) {
    const firstAllowed = process.env.ADMIN_EMAILS.split(",")[0].trim().toLowerCase();
    assert.equal(isEmailAllowedAdmin(firstAllowed), true);
    assert.equal(isEmailAllowedAdmin("stranger@random-domain.org"), false);
  } else {
    assert.equal(isEmailAllowedAdmin("any@roam.dating"), true);
  }
});
