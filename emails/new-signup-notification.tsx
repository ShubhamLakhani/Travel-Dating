import * as React from "react";
import {
  type NewSignupNotificationParams as NewSignupNotificationEmailProps,
  renderNewSignupNotificationText,
} from "@/lib/communication/email-formatters";

export { renderNewSignupNotificationText };
export type { NewSignupNotificationEmailProps };

/**
 * Server-only notification email sent to the operator (ADMIN_SIGNUP_NOTIFICATION_EMAIL)
 * upon a successful early-access signup.
 *
 * Privacy Invariants:
 * - Excludes gender, interested-in values, relationship intentions, detailed dating preferences,
 *   self-described text, custom interests, and participant email.
 * - Details are accessible securely only in the authenticated Roam Admin Dashboard.
 */
export function NewSignupNotificationEmail({
  destinationName,
  arrivalFormatted,
  departureFormatted,
  travelMode,
  interviewOptIn,
  marketingUpdates,
}: NewSignupNotificationEmailProps) {
  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundColor: "#FAF7F2",
        color: "#1A2530",
        padding: "40px 20px",
        lineHeight: 1.6,
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "36px 32px",
          border: "1px solid #EDE8E1",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#FF6257",
            }}
          >
            roam
          </span>
          <span
            style={{
              marginLeft: "10px",
              fontSize: "12px",
              fontWeight: 700,
              color: "#6B7280",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Internal Operator Alert
          </span>
        </div>

        <h1
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#1A2530",
            margin: "0 0 16px 0",
            letterSpacing: "-0.02em",
          }}
        >
          New Roam early-access signup
        </h1>

        <div
          style={{
            backgroundColor: "#F4EFE6",
            borderRadius: "12px",
            padding: "20px",
            margin: "20px 0 24px 0",
            fontSize: "14px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#4B5563" }}>Destination:</strong>{" "}
            <span style={{ fontWeight: 700, color: "#1A2530" }}>{destinationName}</span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#4B5563" }}>Travel dates:</strong>{" "}
            <span style={{ fontWeight: 600, color: "#1A2530" }}>
              {arrivalFormatted} → {departureFormatted}
            </span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#4B5563" }}>Travel mode:</strong>{" "}
            <span style={{ color: "#1A2530", textTransform: "capitalize" }}>{travelMode}</span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#4B5563" }}>Interview opt-in:</strong>{" "}
            <span style={{ color: interviewOptIn ? "#2E6B52" : "#6B7280", fontWeight: 600 }}>
              {interviewOptIn ? "Yes" : "No"}
            </span>
          </div>
          <div>
            <strong style={{ color: "#4B5563" }}>Marketing updates:</strong>{" "}
            <span style={{ color: marketingUpdates ? "#2E6B52" : "#6B7280", fontWeight: 600 }}>
              {marketingUpdates ? "Yes" : "No"}
            </span>
          </div>
        </div>

        <p style={{ fontSize: "14px", color: "#4B5563", margin: "0 0 20px 0" }}>
          Open the Roam admin dashboard for full details.
        </p>

        <a
          href="https://roam.toolmint.cc/admin"
          style={{
            display: "inline-block",
            backgroundColor: "#FF6257",
            color: "#FFFFFF",
            fontSize: "14px",
            fontWeight: 700,
            textDecoration: "none",
            borderRadius: "8px",
            padding: "10px 20px",
          }}
        >
          Open Admin Dashboard
        </a>

        <hr style={{ border: "none", borderTop: "1px solid #EDE8E1", margin: "28px 0" }} />

        <p style={{ fontSize: "12px", color: "#9CA3AF", margin: 0 }}>
          Project Roam — Internal System Notification<br />
          Delivered securely to configured operator inbox.
        </p>
      </div>
    </div>
  );
}
