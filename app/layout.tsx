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

export const metadata: Metadata = {
  title: "Roam — Meet Someone Going Where You're Going",
  description:
    "Connect with compatible singles before or during your next trip based on destination, travel dates, and how you like to travel. Join Project Roam early access.",
  openGraph: {
    title: "Roam — Meet Someone Going Where You're Going",
    description:
      "Connect with compatible singles before or during your next trip based on destination, travel dates, and how you like to travel. Join Project Roam early access.",
    type: "website",
    locale: "en_US",
    siteName: "Roam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roam — Meet Someone Going Where You're Going",
    description:
      "Connect with compatible singles before or during your next trip based on destination, travel dates, and how you like to travel. Join Project Roam early access.",
  },
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
