import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics/posthog-provider";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

import { getMetadataBase } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "Triply | Meet Someone Going Where You're Going",
    template: "%s | Triply",
  },
  description:
    "Travel dating built around destination and travel dates. Connect with compatible travelers before or during your trip. Triply is currently in early-access validation.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Triply | Meet Someone Going Where You're Going",
    description:
      "Travel dating built around destination and travel dates. Connect with compatible travelers before or during your trip. Triply is currently in early-access validation.",
    url: "/",
    type: "website",
    locale: "en_US",
    siteName: "Triply",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triply | Meet Someone Going Where You're Going",
    description:
      "Travel dating built around destination and travel dates. Connect with compatible travelers before or during your trip. Triply is currently in early-access validation.",
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F2D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground">
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
