import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics/posthog-provider";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

function getMetadataBase(): URL {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      return new URL(process.env.NEXT_PUBLIC_SITE_URL);
    } catch {
      // Fall through to Vercel deployment host
    }
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("https://roam.toolmint.cc");
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "Roam — Meet Someone Going Where You're Going",
    template: "%s | Roam",
  },
  description:
    "Travel dating built around destination and travel dates. Connect with compatible travelers before or during a trip. Roam is currently in early access validation.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Roam — Meet Someone Going Where You're Going",
    description:
      "Travel dating built around destination and travel dates. Connect with compatible travelers before or during a trip. Roam is currently in early access validation.",
    url: "https://roam.toolmint.cc",
    type: "website",
    locale: "en_US",
    siteName: "Roam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roam — Meet Someone Going Where You're Going",
    description:
      "Travel dating built around destination and travel dates. Connect with compatible travelers before or during a trip. Roam is currently in early access validation.",
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
  themeColor: "#FAF8F4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-body bg-background text-foreground">
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
