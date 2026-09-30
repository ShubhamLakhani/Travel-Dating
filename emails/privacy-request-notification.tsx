import * as React from "react";
import {
  type PrivacyRequestNotificationParams as PrivacyRequestNotificationEmailProps,
  renderPrivacyRequestNotificationText,
} from "@/lib/communication/email-formatters";

export { renderPrivacyRequestNotificationText };
export type { PrivacyRequestNotificationEmailProps };

export function PrivacyRequestNotificationEmail({
  requesterEmail,
  requestType,
  message,
  submittedAtFormatted,
}: PrivacyRequestNotificationEmailProps) {
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
            Privacy Action Request
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
          Roam privacy request — {requestType}
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
          <div style={{ marginBottom: "12px" }}>
            <strong style={{ color: "#4B5563" }}>Request Type:</strong>{" "}
            <span style={{ fontWeight: 700, color: "#1A2530" }}>{requestType}</span>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <strong style={{ color: "#4B5563" }}>User Contact Email:</strong>{" "}
            <span style={{ fontFamily: "monospace", color: "#1A2530", fontWeight: 600 }}>
              {requesterEmail}
            </span>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <strong style={{ color: "#4B5563" }}>Submitted:</strong>{" "}
            <span style={{ color: "#6B7280" }}>{submittedAtFormatted}</span>
          </div>

          {message && (
            <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #EDE8E1" }}>
              <strong style={{ color: "#4B5563", display: "block", marginBottom: "6px" }}>
                Optional User Message:
              </strong>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "1px solid #EDE8E1",
                  color: "#1A2530",
                  whiteSpace: "pre-wrap",
                  fontSize: "13px",
                }}
              >
                {message}
              </div>
            </div>
          )}
        </div>

        <p style={{ fontSize: "14px", color: "#4B5563", margin: "0 0 16px 0" }}>
          You can inspect and manage user validation records directly in the Supabase or Roam Admin Console.
        </p>

        <hr style={{ border: "none", borderTop: "1px solid #EDE8E1", margin: "28px 0" }} />

        <p style={{ fontSize: "12px", color: "#9CA3AF", margin: 0 }}>
          Project Roam — Internal Privacy Request Dispatcher<br />
          This communication is delivered solely to the authorized operator contact.
        </p>
      </div>
    </div>
  );
}
