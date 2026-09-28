import * as React from "react";

export interface EarlyAccessConfirmationEmailProps {
  destinationName: string;
  arrivalFormatted: string;
  departureFormatted: string;
}

/**
 * Transactional confirmation email component for Project Roam early access.
 *
 * Privacy Invariants:
 * - Excludes gender, dating preferences, relationship intentions, research answers, or marketing flags.
 * - Contains only submitted trip destination and dates, with pre-launch validation disclosure.
 */
export function EarlyAccessConfirmationEmail({
  destinationName,
  arrivalFormatted,
  departureFormatted,
}: EarlyAccessConfirmationEmailProps) {
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
        <div style={{ marginBottom: "24px" }}>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#FF6257",
            }}
          >
            roam
          </span>
        </div>

        <h1
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#1A2530",
            margin: "0 0 16px 0",
            letterSpacing: "-0.02em",
          }}
        >
          You&apos;re on the Project Roam early-access list. ✈️
        </h1>

        <div
          style={{
            backgroundColor: "#F4EFE6",
            borderRadius: "12px",
            padding: "16px 20px",
            margin: "20px 0 24px 0",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#1A2530",
              marginBottom: "4px",
            }}
          >
            {destinationName}
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#6B7280",
              fontWeight: 500,
            }}
          >
            {arrivalFormatted} → {departureFormatted}
          </div>
        </div>

        <p style={{ fontSize: "15px", color: "#374151", margin: "0 0 14px 0" }}>
          Thanks for helping us validate Roam.
        </p>

        <p style={{ fontSize: "14px", color: "#4B5563", margin: "0 0 14px 0" }}>
          Roam is still in pre-launch validation. We&apos;ll use your submission to understand where travelers want the product to launch and let you know as we begin opening early matching around your destination.
        </p>

        <p
          style={{
            fontSize: "13px",
            color: "#6B7280",
            backgroundColor: "#FAF7F2",
            padding: "12px 16px",
            borderRadius: "8px",
            margin: "20px 0",
            borderLeft: "3px solid #2E6B52",
          }}
        >
          <strong>Privacy note:</strong> Your submitted trip does not create a public dating profile. We do not ask for your accommodation or live GPS location.
        </p>

        <hr style={{ border: "none", borderTop: "1px solid #EDE8E1", margin: "28px 0" }} />

        <p style={{ fontSize: "12px", color: "#9CA3AF", margin: 0 }}>
          Project Roam — Meet someone going where you&apos;re going.<br />
          This is a transactional confirmation regarding your early-access submission.
        </p>
      </div>
    </div>
  );
}

export function renderEarlyAccessEmailText({
  destinationName,
  arrivalFormatted,
  departureFormatted,
}: EarlyAccessConfirmationEmailProps): string {
  return `You're on the Project Roam early-access list. ✈️

${destinationName}
${arrivalFormatted} → ${departureFormatted}

Thanks for helping us validate Roam.

Roam is still in pre-launch validation. We'll use your submission to understand where travelers want the product to launch and let you know as we begin opening early matching around your destination.

Privacy note: Your submitted trip does not create a public dating profile. We do not ask for your accommodation or live GPS location.

— Project Roam
Meet someone going where you're going.
`;
}
