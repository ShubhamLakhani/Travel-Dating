import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, MapPinOff, Share2, Clock, ArrowLeft, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Trust & Safety Principles",
  description:
    "Learn about Roam's core trust and safety principles, privacy by design, and travel meetup precautions.",
  alternates: {
    canonical: "/safety",
  },
  openGraph: {
    title: "Trust & Safety Principles",
    description:
      "Learn about Roam's core trust and safety principles, privacy by design, and travel meetup precautions.",
    url: "https://roam.toolmint.cc/safety",
  },
};

export default function SafetyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <LandingHeader />

      <main className="flex-1 flex flex-col">
        <Section spacing="default">
          <Container size="narrow">
            {/* Back link */}
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back to Roam</span>
              </Link>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-3 mb-10">
              <Badge variant="safety" className="w-fit text-xs font-semibold">
                Trust &amp; Safety Principles
              </Badge>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
                Safety by design for travel dating
              </h1>
              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                Meeting someone new in an unfamiliar city requires higher standards of safety, privacy, and accountability. Here is how Roam is being planned.
              </p>
            </div>

            {/* Validation Stage Callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] flex items-start gap-3 mb-10 text-xs sm:text-sm text-[var(--foreground)]/90 leading-relaxed">
              <AlertCircle className="h-5 w-5 text-[var(--primary)] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="font-semibold text-[var(--foreground)]">Pre-Launch Validation Notice:</strong>{" "}
                Project Roam is currently in pre-launch validation. No real dating marketplace or user accounts are currently active. Profiles shown across the preview are fictional demonstrations. Safety features described here reflect our planned architecture.
              </div>
            </div>

            {/* Detailed Safety Principles */}
            <div className="flex flex-col gap-8 text-sm sm:text-base leading-relaxed text-[var(--foreground)]/90">
              <section className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-[var(--safety-accent)] text-[#1B4332] flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-[var(--foreground)]">
                    1. Verified Identity (Planned)
                  </h2>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Catfishing and fake profiles are common concerns on social apps. When Roam opens live matching, we plan to implement selfie verification before profiles are permitted to message other travelers.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-[var(--safety-accent)] text-[#1B4332] flex items-center justify-center shrink-0">
                    <MapPinOff className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-[var(--foreground)]">
                    2. Location Privacy: Never Live GPS
                  </h2>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Roam is designed around trip dates and destination cities, not real-time proximity meters. Your hotel, villa, or live GPS coordinates will never be collected or shown. You choose where and when to meet in public settings.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-[var(--safety-accent)] text-[#1B4332] flex items-center justify-center shrink-0">
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-[var(--foreground)]">
                    3. Date Sharing with Trusted Contacts
                  </h2>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  When meeting someone in a foreign country, letting friends or family know where you are is critical. We are building one-tap date sharing so a trusted contact receives who you are meeting and where you plan to go.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-[var(--safety-accent)] text-[#1B4332] flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-[var(--foreground)]">
                    4. Safety Check-Ins &amp; Reporting
                  </h2>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  In-app check-ins will prompt you at a pre-set time to confirm your date is going well. Uncompromising block and report mechanisms will ensure bad actors are permanently removed.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="font-display text-xl font-bold text-[var(--foreground)]">
                  5. Age Requirement: 18+ Only
                </h2>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Project Roam is strictly for adults aged 18 and older. Minor accounts will not be permitted.
                </p>
              </section>

              <section className="p-5 rounded-2xl bg-[var(--safety-accent)]/50 border border-[#1B4332]/20">
                <h3 className="font-display text-base font-bold text-[#1B4332] mb-1">
                  Our Safety Principle
                </h3>
                <p className="text-xs sm:text-sm text-[#1B4332] leading-relaxed">
                  Core safety tools shouldn&apos;t sit behind a premium subscription. Verification, trusted contacts, and safety check-ins will be fundamental features for all travelers on Roam.
                </p>
              </section>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
