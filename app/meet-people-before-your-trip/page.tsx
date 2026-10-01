import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/landing/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Meet People Before Your Trip: Advance Itinerary Matching",
  description:
    "Connect with compatible travelers 2 to 4 weeks before departure. Learn how advance destination and date matching creates stress-free shared adventures.",
  alternates: {
    canonical: "/meet-people-before-your-trip",
  },
  openGraph: {
    title: "Meet People Before Your Trip: Advance Itinerary Matching",
    description:
      "Connect with compatible travelers 2 to 4 weeks before departure. Learn how advance destination and date matching creates stress-free shared adventures.",
    url: "https://roam.toolmint.cc/meet-people-before-your-trip",
    type: "article",
    siteName: "Roam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet People Before Your Trip: Advance Itinerary Matching",
    description:
      "Connect with compatible travelers 2 to 4 weeks before departure. Learn how advance destination and date matching creates stress-free shared adventures.",
  },
};

export default function MeetPeopleBeforeTripPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Meet People Before Your Trip: Advance Itinerary Matching",
    "description":
      "Connect with compatible travelers 2 to 4 weeks before departure. Learn how advance destination and date matching creates stress-free shared adventures.",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://roam.toolmint.cc/meet-people-before-your-trip",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Roam",
      "url": "https://roam.toolmint.cc/",
    },
    "inLanguage": "en-US",
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingHeader />

      <main className="flex-1 flex flex-col">
        <Section spacing="default">
          <Container size="narrow">
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back to Roam Home</span>
              </Link>
            </div>

            <header className="flex flex-col gap-4 mb-10">
              <Badge variant="travel" className="w-fit text-xs font-semibold">
                Pre-Trip Coordination
              </Badge>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
                How to meet people before your trip starts
              </h1>
              <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
                Why swiping from your hotel room on night one is exhausting, and how coordinating dates 2 to 4 weeks in advance changes your travel experience.
              </p>
            </header>

            <article className="prose prose-neutral max-w-none space-y-8 text-[var(--foreground)] text-sm sm:text-base leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  The in-destination swiping dilemma
                </h2>
                <p>
                  Most travelers don&apos;t think about meeting someone until they touch down, unpack their bags, and open a dating app at 9:00 PM. But matching in real-time while traveling comes with steep friction:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-[var(--foreground)]/90">
                  <li><strong>Wasted vacation hours:</strong> You spend precious evenings staring at a phone screen filtering profiles rather than soaking up the city.</li>
                  <li><strong>Slow conversational momentum:</strong> In typical dating apps, it takes several days of messaging to establish rapport—by which time your trip is half over.</li>
                  <li><strong>Last-minute coordination stress:</strong> Figuring out where to meet in an unfamiliar neighborhood on 30 minutes&apos; notice frequently leads to crossed wires and cancellations.</li>
                </ul>
              </section>

              <section className="space-y-4 pt-4 border-t border-[var(--border)]">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  The pre-trip matching advantage
                </h2>
                <p>
                  Connecting 2 to 4 weeks before your flight departs creates a relaxed, thoughtful runway. You have time to establish real conversational compatibility without the clock ticking down on your vacation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
                  <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                      Plan shared excursions
                    </span>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      Book tickets for museum exhibitions, culinary food tours, or day hikes in advance together, knowing your schedules line up.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2 mb-1">
                      <MessageSquare className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                      Vet chemistry at leisure
                    </span>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      Exchange recommendations and travel playlists over several days. You arrive knowing who you&apos;re excited to see.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 pt-4 border-t border-[var(--border)]">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Safe pre-trip communication guidelines
                </h2>
                <p>
                  Communicating before arrival requires healthy digital boundaries:
                </p>
                <div className="p-5 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] space-y-3 not-prose">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                    Recommended ground rules before you arrive
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted-foreground)] list-disc pl-5">
                    <li>Keep conversations on the app or safe messaging platforms until you meet in person.</li>
                    <li>Never share your exact hotel address or room number. A general neighborhood is sufficient for planning.</li>
                    <li>Schedule a brief 5-minute video call prior to departure to verify identity and ease first-date nerves.</li>
                    <li>Agree on a specific, vibrant public venue for your first in-person meetup.</li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/safety"
                      className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
                    >
                      Learn more in Roam&apos;s Safety Center &rarr;
                    </Link>
                  </div>
                </div>
              </section>

              {/* Validation Stage Disclosure */}
              <section className="p-4 rounded-xl bg-[var(--travel-accent)]/50 border border-[var(--border)] text-xs text-[var(--muted-foreground)] not-prose flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-[var(--primary)] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-[var(--foreground)] block mb-0.5">Pre-Launch Validation Disclosure</strong>
                  Project Roam is currently in private pre-launch validation. Live matchmaking is not active. Submitting your upcoming trip dates helps us test and prove demand for pre-trip matching in your destination.
                </div>
              </section>

              {/* CTA Section */}
              <section className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] text-center space-y-4 not-prose shadow-sm">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--foreground)] tracking-tight">
                  Where are you headed next?
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
                  See how Roam plans to connect travelers whose trip dates overlap yours.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/join"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-[var(--primary)] hover:opacity-95 transition-all shadow-xs"
                  >
                    <span>Join Early Access</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/travel-dating"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[var(--foreground)] bg-[var(--surface-muted)] hover:bg-[var(--border)]/60 transition-all border border-[var(--border)]"
                  >
                    <span>How Travel Dating Works</span>
                  </Link>
                </div>
              </section>

              {/* Related Guides */}
              <section className="pt-6 border-t border-[var(--border)] not-prose">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
                  Related Travel Dating Guides
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link
                    href="/travel-dating"
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-colors group"
                  >
                    <span className="text-xs font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] block transition-colors">
                      The Travel Dating Concept
                    </span>
                    <span className="text-[11px] text-[var(--muted-foreground)] mt-1 block">
                      Why destination and dates beat radius matching.
                    </span>
                  </Link>
                  <Link
                    href="/dating-while-traveling"
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-colors group"
                  >
                    <span className="text-xs font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] block transition-colors">
                      Dating While Traveling
                    </span>
                    <span className="text-[11px] text-[var(--muted-foreground)] mt-1 block">
                      Authentic dates without the pressure-cooker feeling.
                    </span>
                  </Link>
                  <Link
                    href="/solo-travel-dating"
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-colors group"
                  >
                    <span className="text-xs font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] block transition-colors">
                      Solo Travel Dating
                    </span>
                    <span className="text-[11px] text-[var(--muted-foreground)] mt-1 block">
                      Sharing experiences while maintaining independence.
                    </span>
                  </Link>
                </div>
              </section>
            </article>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
