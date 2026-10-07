import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service, early-access rules, age restrictions (18+ only), and platform expectations for Triply.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | Triply",
    description:
      "Terms of service, early-access rules, age restrictions (18+ only), and platform expectations for Triply.",
    url: "/terms",
    siteName: "Triply",
  },
};

export default function TermsPage() {
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
                <span>Back to Triply</span>
              </Link>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-3 mb-10">
              <Badge variant="neutral" className="w-fit text-xs font-semibold">
                Terms of Use
              </Badge>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
                Pre-Launch Validation Terms
              </h1>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                Last updated: October 2026 &middot; Pre-launch validation stage
              </p>
            </div>

            {/* Legal Notice */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-start gap-3 mb-10 text-xs sm:text-sm text-[var(--foreground)]/90 leading-relaxed">
              <AlertCircle className="h-5 w-5 text-[var(--triply-coral)] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="font-semibold text-[var(--foreground)]">Pre-Launch Notice:</strong>{" "}
                Triply is currently in concept validation. Formal legal terms and conditions will be established prior to public commercial launch.
              </div>
            </div>

            {/* Terms Sections */}
            <div className="flex flex-col gap-8 text-sm text-[var(--foreground)]/90 leading-relaxed">
              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  1. Early-Access Validation Stage &amp; Stored Submissions
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  The Triply website is currently operating as an early-access demand validation platform. When you complete the questionnaire, your travel dates and preferences are durably stored to assess market density. Submitting your details does not create an active dating profile or guarantee admission to any future beta testing cohort.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  2. Age Requirement: 18+ Only
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  You must be at least 18 years of age to access this website, interact with previews, or join the early-access waitlist. By using the site, you confirm that you meet this requirement.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  3. Fictional Example Profiles
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  All profiles, photos, itineraries, dates, and chat previews displayed on this website are fictional demonstrations. They do not represent real users, active members, or individuals currently present in any destination. Interacting with preview profiles (such as clicking &ldquo;Interested&rdquo;) does not establish any real-world match or communication.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  4. No Guarantee of Launch or Availability
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  Submitting an early-access request or trip details does not guarantee that Triply will launch, operate, or provide matching services in your destination or during your travel dates. Launch decisions depend on traveler density and validation findings.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  5. Truthful Information &amp; Acceptable Use
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  If you participate in our early-access waitlist, you agree to provide truthful and accurate information regarding your age, travel plans, and intentions. Automated scraping, malicious submissions, abuse, or spam are strictly prohibited.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  6. Intellectual Property
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  All trademarks, wordmarks, UI designs, graphics, and source code associated with Triply are the proprietary intellectual property of Triply. You may not copy, reproduce, or repurpose any part of the site without explicit written authorization.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  7. Modifications to the Service
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  We reserve the right to modify, suspend, or terminate any aspect of the validation website at any time without prior notice. These terms may be updated prior to public beta.
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
