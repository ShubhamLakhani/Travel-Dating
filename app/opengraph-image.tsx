import { ImageResponse } from "next/og";

export const alt = "Triply | Meet Someone Going Where You're Going";
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
          backgroundColor: "#0B0F2D",
          padding: "64px 80px",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top Header: Brand Logo & Mode Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Destination Symbol Graphic */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #FF735D 0%, #E84A8B 50%, #6B5BFF 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
                  fill="#FFFFFF"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: "38px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
              }}
            >
              triply
            </span>
          </div>

          <div
            style={{
              padding: "8px 20px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 115, 93, 0.15)",
              border: "1px solid rgba(255, 115, 93, 0.3)",
              color: "#FF735D",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Early Access Validation
          </div>
        </div>

        {/* Core Value Proposition */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "#A78BFA",
              textTransform: "uppercase",
            }}
          >
            Two travelers. One shared destination.
          </div>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            Meet someone going where you&apos;re going.
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#A78BFA",
              lineHeight: 1.4,
              maxWidth: "900px",
            }}
          >
            Travel dating built around destination and travel dates. Discover people whose trips overlap yours before you arrive.
          </div>
        </div>

        {/* Footer Info Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#FF735D",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            <span>triply.toolmint.cc</span>
          </div>
          <div
            style={{
              fontSize: "15px",
              color: "#A78BFA",
              fontWeight: 600,
            }}
          >
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
