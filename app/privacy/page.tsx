import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/landing/footer";

export default function PrivacyPage() {
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
              <Badge variant="neutral" className="w-fit text-xs font-semibold">
                Privacy Notice
              </Badge>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
                Pre-Launch Validation Privacy Notice
              </h1>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                Last updated: September 2026 &middot; Pre-launch validation stage
              </p>
            </div>

            {/* Validation Notice Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] flex items-start gap-3 mb-10 text-xs sm:text-sm text-[var(--foreground)]/90 leading-relaxed">
              <AlertCircle className="h-5 w-5 text-[var(--primary)] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="font-semibold text-[var(--foreground)]">Validation Notice:</strong>{" "}
                Project Roam is an early-stage startup validating travel-dating demand. This notice explains what information we collect during our pre-launch testing and early-access waitlist phases.
              </div>
            </div>

            {/* 10 Sections */}
            <div className="flex flex-col gap-8 text-sm text-[var(--foreground)]/90 leading-relaxed">
              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  1. Current Product Stage
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  Roam is currently in pre-launch validation. The matching profiles shown on the public landing page are fictional examples created to illustrate the concept of overlapping trip discovery. No public marketplace or social search is currently live.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  2. Information We Collect
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  When you submit the early-access questionnaire, Project Roam collects:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
                  <li>Contact information: email address and home country</li>
                  <li>Demographics: age band, gender option (and optional self-description), and dating interest (who you want to meet)</li>
                  <li>Travel plans: upcoming destination, planned calendar arrival and departure dates, and travel mode (solo, with friends, group, other)</li>
                  <li>Preferences &amp; intentions: relationship intentions, travel interests (up to 5), and traveler vs. local preference</li>
                  <li>Optional validation research answers: travel frequency and previous dating app usage while traveling</li>
                  <li>Interview opt-in: optional willingness to participate in a short product research conversation</li>
                  <li>Optional marketing consent: optional preference to receive product news and research updates</li>
                  <li>Privacy-safe operational metadata: submission identifiers and non-PII analytics events</li>
                </ul>
                <p className="text-xs text-[var(--muted-foreground)] mt-1 font-semibold text-[#1B4332]">
                  We do NOT request your hotel or accommodation address, nor do we request or track live GPS location.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  3. Why We Collect It
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  Information is collected solely to:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
                  <li>Validate genuine demand for date-overlapping travel dating</li>
                  <li>Identify which destinations have sufficient travel density to justify opening initial matching cohorts</li>
                  <li>Invite selected participants to user research and early test groups</li>
                  <li>Notify you when Roam begins matching in your travel destination</li>
                </ul>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  4. Analytics
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  We use privacy-friendly product analytics to understand site performance, page engagement, and conversion drop-offs. Under our strict privacy policy, personal information such as your email address, full name, or exact accommodation is NEVER transmitted to analytics platforms.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  5. Email Communication
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  When you submit an early-access request, we send a transactional confirmation email regarding your submission. If you explicitly opt in to marketing news, we may send occasional product updates. You can opt out at any time. We do not sell or rent email lists to third parties.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  6. Public Visibility
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  Information submitted during early access is completely private and will NEVER automatically become a public profile on any live platform without your explicit consent and separate profile setup. Homepage sample profiles remain fictional demonstrations.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  7. Data Retention
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  We retain validation information only for as long as needed for product validation, early-access operations, and related legal or security needs.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  8. Contact Us About Your Data
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  You have the right to request access to, correction of, or permanent deletion of your early-access submission at any time. For access, correction, or deletion requests, use our secure privacy request form.
                </p>
                <div className="pt-1">
                  <Link
                    href="/privacy/request"
                    className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
                  >
                    Submit a privacy request
                  </Link>
                </div>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  9. Adults Only (18+)
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  Project Roam is designed strictly for individuals aged 18 years and older. We do not knowingly collect information from anyone under the age of 18.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  10. Changes to This Notice
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  As Project Roam evolves from validation to public beta, this notice will be updated and replaced with a comprehensive production privacy policy before live matching launches.
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
