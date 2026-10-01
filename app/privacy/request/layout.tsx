import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Request | Roam",
  description: "Submit a privacy request regarding your early-access data.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function PrivacyRequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
