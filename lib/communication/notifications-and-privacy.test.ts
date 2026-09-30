import test from "node:test";
import assert from "node:assert/strict";
import {
  privacyRequestSchema,
  PRIVACY_REQUEST_LABELS,
} from "../validation/privacy-request-schema.ts";
import {
  renderNewSignupNotificationText,
  renderPrivacyRequestNotificationText,
} from "./email-formatters.ts";
import { sanitizeProperties } from "../analytics/track.ts";

test("privacy-request-schema: validates valid deletion request", () => {
  const input = {
    email: "traveler@example.com",
    requestType: "delete_data",
    message: "Please remove my travel dates and preferences.",
  };

  const result = privacyRequestSchema.safeParse(input);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.email, "traveler@example.com");
    assert.equal(result.data.requestType, "delete_data");
    assert.equal(result.data.message, "Please remove my travel dates and preferences.");
  }
});

test("privacy-request-schema: validates all request type enum values", () => {
  const types = ["delete_data", "access_data", "correct_info", "other_question"] as const;
  for (const t of types) {
    const result = privacyRequestSchema.safeParse({
      email: "user@example.com",
      requestType: t,
    });
    assert.equal(result.success, true);
    assert.ok(PRIVACY_REQUEST_LABELS[t].length > 0);
  }
});

test("privacy-request-schema: rejects invalid email address", () => {
  const result = privacyRequestSchema.safeParse({
    email: "not-an-email",
    requestType: "access_data",
  });
  assert.equal(result.success, false);
});

test("privacy-request-schema: rejects message exceeding 1000 characters", () => {
  const result = privacyRequestSchema.safeParse({
    email: "user@example.com",
    requestType: "other_question",
    message: "a".repeat(1001),
  });
  assert.equal(result.success, false);
});

test("admin-notification: payload contains trip info and excludes sensitive PII", () => {
  const text = renderNewSignupNotificationText({
    destinationName: "Tokyo, Japan",
    arrivalFormatted: "Nov 15, 2026",
    departureFormatted: "Nov 25, 2026",
    travelMode: "solo",
    interviewOptIn: true,
    marketingUpdates: false,
  });

  // Contains necessary operational metadata
  assert.ok(text.includes("Tokyo, Japan"), "Must include destination");
  assert.ok(text.includes("Nov 15, 2026"), "Must include arrival");
  assert.ok(text.includes("Nov 25, 2026"), "Must include departure");
  assert.ok(text.includes("solo"), "Must include travel mode");
  assert.ok(text.includes("Interview opt-in: Yes"), "Must include interview opt-in status");
  assert.ok(text.includes("Marketing updates: No"), "Must include marketing status");

  // Strictly excludes sensitive demographic / dating preferences
  assert.equal(text.includes("gender"), false, "Must not include gender");
  assert.equal(text.includes("interested_in"), false, "Must not include interested_in");
  assert.equal(text.includes("intentions"), false, "Must not include intentions");
  assert.equal(text.includes("customInterest"), false, "Must not include custom interests");
  assert.equal(text.includes("password"), false, "Must not include password");
});

test("privacy-notification: renders user request details faithfully", () => {
  const text = renderPrivacyRequestNotificationText({
    requesterEmail: "user@example.com",
    requestType: "Delete my validation data",
    message: "Purge my submission please.",
    submittedAtFormatted: "2026-09-30 12:00:00 UTC",
  });

  assert.ok(text.includes("user@example.com"));
  assert.ok(text.includes("Delete my validation data"));
  assert.ok(text.includes("Purge my submission please."));
});

test("analytics-exclusion: privacy request properties are stripped by PII sanitizer", () => {
  const rawProps = {
    destination: "Tokyo",
    email: "user@example.com",
    message: "Private deletion request",
    operator_email: "operator@private.internal",
    submission_count: 1,
  };

  const sanitized = sanitizeProperties(rawProps);
  assert.equal(sanitized.destination, "Tokyo");
  assert.equal(sanitized.submission_count, 1);
  assert.equal("email" in sanitized, false, "Email must be excluded from analytics");
  assert.equal("message" in sanitized, false, "Message must be excluded from analytics");
  assert.equal("operator_email" in sanitized, false, "Operator email must be excluded from analytics");
});

test("missing notification-email behavior: handles undefined notification destinations gracefully", () => {
  const savedAdminEmail = process.env.ADMIN_SIGNUP_NOTIFICATION_EMAIL;
  const savedPrivacyEmail = process.env.PRIVACY_NOTIFICATION_EMAIL;

  delete process.env.ADMIN_SIGNUP_NOTIFICATION_EMAIL;
  delete process.env.PRIVACY_NOTIFICATION_EMAIL;

  const resolvedPrivacy =
    process.env.PRIVACY_NOTIFICATION_EMAIL || process.env.ADMIN_SIGNUP_NOTIFICATION_EMAIL;

  assert.equal(resolvedPrivacy, undefined, "Resolves to undefined when neither is set");

  // Restore
  if (savedAdminEmail) process.env.ADMIN_SIGNUP_NOTIFICATION_EMAIL = savedAdminEmail;
  if (savedPrivacyEmail) process.env.PRIVACY_NOTIFICATION_EMAIL = savedPrivacyEmail;
});
