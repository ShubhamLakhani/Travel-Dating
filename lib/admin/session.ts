// Project Roam : Phase 7 Admin Session Token & Authorization Logic
// File: lib/admin/session.ts

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "roam_admin_session";
const SESSION_EXPIRY_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface AdminSessionPayload {
  email: string;
  role: "admin";
  iat: number;
  exp: number;
}

function getHmacSecret(): string {
  const secret =
    process.env.ADMIN_SECRET_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    "roam-internal-fallback-secret-2026";
  return secret;
}

/**
 * Returns list of allowed admin emails from environment.
 * If empty/undefined, any verified admin credential is accepted.
 */
export function getAllowedAdminEmails(): string[] {
  const envEmails = process.env.ADMIN_EMAILS;
  if (!envEmails) return [];
  return envEmails
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.length > 0);
}

/**
 * Checks if a given email is permitted under ADMIN_EMAILS allowlist.
 * If allowlist is not configured, returns true.
 */
export function isEmailAllowedAdmin(email: string): boolean {
  const allowed = getAllowedAdminEmails();
  if (allowed.length === 0) return true;
  return allowed.includes(email.trim().toLowerCase());
}

/**
 * Signs an admin session payload using HMAC-SHA256.
 */
export function createAdminSessionToken(email: string, customTtlSeconds?: number): string {
  const now = Math.floor(Date.now() / 1000);
  const ttl = customTtlSeconds !== undefined ? customTtlSeconds : SESSION_EXPIRY_SECONDS;
  const payload: AdminSessionPayload = {
    email: email.trim().toLowerCase(),
    role: "admin",
    iat: now,
    exp: now + ttl,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const hmac = createHmac("sha256", getHmacSecret());
  hmac.update(payloadBase64);
  const signatureBase64 = hmac.digest("base64url");

  return `${payloadBase64}.${signatureBase64}`;
}

/**
 * Verifies HMAC signature, timestamp expiration, and allowlist.
 */
export function verifyAdminSessionToken(token: string): {
  valid: boolean;
  payload?: AdminSessionPayload;
  error?: string;
} {
  if (!token) {
    return { valid: false, error: "Missing session token" };
  }
  if (!token.includes(".")) {
    return { valid: false, error: "Malformed session token" };
  }

  const [payloadBase64, signatureBase64] = token.split(".");
  if (!payloadBase64 || !signatureBase64) {
    return { valid: false, error: "Invalid token segments" };
  }

  // 1. Verify HMAC signature in constant time
  const hmac = createHmac("sha256", getHmacSecret());
  hmac.update(payloadBase64);
  const expectedSignature = hmac.digest("base64url");

  const sigBuffer = Buffer.from(signatureBase64);
  const expBuffer = Buffer.from(expectedSignature);

  if (
    sigBuffer.length !== expBuffer.length ||
    !timingSafeEqual(sigBuffer, expBuffer)
  ) {
    return { valid: false, error: "Invalid session signature" };
  }

  // 2. Parse payload
  let payload: AdminSessionPayload;
  try {
    payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf8"));
  } catch {
    return { valid: false, error: "Corrupted session payload" };
  }

  // 3. Verify expiration
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) {
    return { valid: false, error: "Session expired" };
  }

  // 4. Verify admin email allowlist
  if (!isEmailAllowedAdmin(payload.email)) {
    return { valid: false, error: "Email not authorized in admin allowlist" };
  }

  return { valid: true, payload };
}

/**
 * Validates founder passkey or admin credentials.
 */
export function validateAdminCredentials(input: {
  passkey?: string;
  email?: string;
}): { valid: boolean; email: string; error?: string } {
  const serverPasskey = process.env.ADMIN_SECRET_KEY || "roam_admin_dev_pass_2026";
  const providedPasskey = (input.passkey || "").trim();

  // 1. Constant-time passkey verification
  if (!providedPasskey) {
    return { valid: false, email: "", error: "Admin passkey is required" };
  }

  const passBuffer = Buffer.from(providedPasskey);
  const serverBuffer = Buffer.from(serverPasskey);

  const isPasskeyCorrect =
    passBuffer.length === serverBuffer.length &&
    timingSafeEqual(passBuffer, serverBuffer);

  if (!isPasskeyCorrect) {
    return { valid: false, email: "", error: "Incorrect admin credentials" };
  }

  // 2. Email determination
  const allowedEmails = getAllowedAdminEmails();
  let finalEmail = (input.email || "").trim().toLowerCase();

  if (!finalEmail) {
    finalEmail = allowedEmails.length > 0 ? allowedEmails[0] : "admin@mail.toolmint.cc";
  } else if (!isEmailAllowedAdmin(finalEmail)) {
    return {
      valid: false,
      email: "",
      error: `Email ${finalEmail} is not in the authorized admin allowlist.`,
    };
  }

  return { valid: true, email: finalEmail };
}

/**
 * Mask internal IDs or emails for privacy-first admin screens.
 */
export function maskIdentifier(id: string): string {
  if (id.length <= 8) return id;
  return `${id.slice(0, 4)}…${id.slice(-4)}`;
}

export function maskEmailForDisplay(email: string): string {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const visible = user.slice(0, Math.min(3, user.length));
  return `${visible}•••@${domain}`;
}
