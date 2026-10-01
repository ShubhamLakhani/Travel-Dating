import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, UserCheck, ShieldCheck, Compass, Sparkles } from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/landing/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Solo Travel Dating: Connecting Without Compromising Freedom",
  description:
    "How to date as a solo traveler without losing your independent spirit. Practical tips for finding shared excursions, dinner dates, and romance abroad.",
  alternates: {
    canonical: "/solo-travel-dating",
  },
  openGraph: {
    title: "Solo Travel Dating: Connecting Without Compromising Freedom",
    description:
      "How to date as a solo traveler without losing your independent spirit. Practical tips for finding shared excursions, dinner dates, and romance abroad.",
    url: "https://roam.toolmint.cc/solo-travel-dating",
    type: "article",
    siteName: "Roam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solo Travel Dating: Connecting Without Compromising Freedom",
    description:
      "How to date as a solo traveler without losing your independent spirit. Practical tips for finding shared excursions, dinner dates, and romance abroad.",
  },
};

export default function SoloTravelDatingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Solo Travel Dating: Connecting Without Compromising Freedom",
    "description":
      "How to date as a solo traveler without losing your independent spirit. Practical tips for finding shared excursions, dinner dates, and romance abroad.",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://roam.toolmint.cc/solo-travel-dating",
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
                Solo Travel Insights
              </Badge>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
                Solo travel dating: how to meet people without losing your freedom
              </h1>
              <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
                Traveling alone offers unmatched autonomy, but sharing a memorable meal, a rooftop sunset, or a day trip with someone special elevates the journey.
              </p>
            </header>

            <article className="prose prose-neutral max-w-none space-y-8 text-[var(--foreground)] text-sm sm:text-base leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  The solo traveler&apos;s paradox
                </h2>
                <p>
                  Solo travelers treasure waking up with zero obligations to anyone else. You choose where to eat, when to sleep, and which alleyways to wander.
                </p>
                <p>
                  Yet, even the most independent solo voyager experiences moments where companionship makes an experience richer:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-[var(--foreground)]/90">
                  <li><strong>The dinner barrier:</strong> Sitting alone at high-end dining spots or lively tapas bars can feel isolating.</li>
                  <li><strong>Shared awe:</strong> Watching a sunrise over volcanic peaks or viewing Renaissance art is often more poignant when reflected in someone else&apos;s eyes.</li>
                  <li><strong>Hostel fatigue:</strong> Group tours and rowdy party hostels aren&apos;t for everyone; finding one thoughtful, like-minded traveler who shares your pacing is rare.</li>
                </ul>
              </section>

              <section className="space-y-4 pt-4 border-t border-[var(--border)]">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Connecting without compromising your route
                </h2>
                <p>
                  The key to successful solo travel dating is keeping your core travel plans intact. You are not looking for someone to dictate your vacation—you are looking for natural overlaps:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
                  <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2 mb-1">
                      <Compass className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                      Discrete activity overlap
                    </span>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      Plan a 2-hour morning coffee walk or an afternoon gallery visit together. If you click, extend to dinner; if not, return to your solo adventure guilt-free.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2 mb-1">
                      <UserCheck className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                      Two travelers, two itineraries
                    </span>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      Because both travelers have their own accommodations, pacing, and plans, there is zero codependency. Connection happens by choice, not necessity.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 pt-4 border-t border-[var(--border)]">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Solo safety: non-negotiables
                </h2>
                <p>
                  When traveling solo, personal safety is entirely your responsibility. Never lower your standards for a date:
                </p>
                <div className="p-5 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] space-y-3 not-prose">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                    Crucial safety habits for solo dating
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted-foreground)] list-disc pl-5">
                    <li>Always stay in your own booked accommodation. Do not check into a match&apos;s hotel or rental.</li>
                    <li>Always keep a backup credit card and sufficient local currency in a separate pocket.</li>
                    <li>Share your live phone location with a trusted friend or family member back home before meeting.</li>
                    <li>Never leave food or beverages unattended, and stay alert to your surroundings.</li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/safety"
                      className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
                    >
                      Read full safety guidelines in the Roam Safety Center &rarr;
                    </Link>
                  </div>
                </div>
              </section>

              {/* Validation Stage Disclosure */}
              <section className="p-4 rounded-xl bg-[var(--travel-accent)]/50 border border-[var(--border)] text-xs text-[var(--muted-foreground)] not-prose flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-[var(--primary)] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-[var(--foreground)] block mb-0.5">Pre-Launch Validation Disclosure</strong>
                  Project Roam is currently in pre-launch validation. We are measuring demand for destination-and-date based matching among solo and group travelers. Submitting your trip helps validate where we launch.
                </div>
              </section>

              {/* CTA Section */}
              <section className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] text-center space-y-4 not-prose shadow-sm">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--foreground)] tracking-tight">
                  Taking a solo journey soon?
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
                  Tell us where and when you&apos;re going, and be the first to know when Roam validates your destination.
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
                    <span>How Roam Works</span>
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
                      Why matching by dates changes the game.
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
                      Balancing curiosity and low-pressure connections.
                    </span>
                  </Link>
                  <Link
                    href="/meet-people-before-your-trip"
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-colors group"
                  >
                    <span className="text-xs font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] block transition-colors">
                      Pre-Trip Connections
                    </span>
                    <span className="text-[11px] text-[var(--muted-foreground)] mt-1 block">
                      Planning shared activities 2–4 weeks in advance.
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
