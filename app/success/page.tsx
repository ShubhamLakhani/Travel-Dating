import * as React from "react";
import type { Metadata } from "next";
import { JoinHeader } from "@/components/join/join-header";
import { SuccessContent } from "@/components/success/success-content";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Early Access Confirmed",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Minimal Header */}
      <JoinHeader />

      {/* Main Success Container */}
      <main className="flex-1 py-8 sm:py-16 flex flex-col justify-center">
        <Container size="narrow">
          <React.Suspense fallback={<div className="py-12 text-center text-sm text-[var(--muted-foreground)]">Loading...</div>}>
            <SuccessContent />
          </React.Suspense>
        </Container>
      </main>
    </div>
  );
}
