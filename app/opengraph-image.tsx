import { ImageResponse } from "next/og";

export const alt = "Roam — Meet Someone Going Where You're Going";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF8F4",
          padding: "60px 80px",
        }}
      >
        {/* Header with wordmark and validation badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "22px",
                backgroundColor: "#FF6257",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#FFFFFF" />
              </svg>
            </div>
            <span
              style={{
                fontSize: "36px",
                fontWeight: 800,
                color: "#151619",
                letterSpacing: "-0.03em",
              }}
            >
              roam
            </span>
          </div>

          <div
            style={{
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "#E9F1F7",
              color: "#151619",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            Early Access Validation
          </div>
        </div>

        {/* Central Core Value Proposition */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 800,
              color: "#151619",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            Meet someone going where you&apos;re going.
          </div>
          <div style={{ fontSize: "24px", color: "#6B7280", lineHeight: 1.4 }}>
            Travel dating built around destination and travel dates. Shared itineraries, verified overlaps, zero location games.
          </div>
        </div>

        {/* Footer info bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #E8E2D9",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#FF6257", fontSize: "20px", fontWeight: 700 }}>
            <span>roam.toolmint.cc</span>
          </div>
          <div style={{ fontSize: "16px", color: "#6B7280", fontWeight: 600 }}>
            Destination &amp; Date Overlap Engine
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
