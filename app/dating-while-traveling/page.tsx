import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Coffee, Clock, Heart, Sparkles } from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/landing/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Dating While Traveling: Advice, Tips & Safety",
  description:
    "Discover how to date while traveling without holiday pressure. Practical advice on communication, setting expectations, and exploring new cities safely.",
  alternates: {
    canonical: "/dating-while-traveling",
  },
  openGraph: {
    title: "Dating While Traveling: Advice, Tips & Safety",
    description:
      "Discover how to date while traveling without holiday pressure. Practical advice on communication, setting expectations, and exploring new cities safely.",
    url: "https://roam.toolmint.cc/dating-while-traveling",
    type: "article",
    siteName: "Roam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dating While Traveling: Advice, Tips & Safety",
    description:
      "Discover how to date while traveling without holiday pressure. Practical advice on communication, setting expectations, and exploring new cities safely.",
  },
};

export default function DatingWhileTravelingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Dating While Traveling: Advice, Tips & Safety for Single Travelers",
    "description":
      "Discover how to date while traveling without holiday pressure. Practical advice on communication, setting expectations, and exploring new cities safely.",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://roam.toolmint.cc/dating-while-traveling",
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
                Traveler Advice
              </Badge>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
                Dating while traveling: how to connect authentically on the road
              </h1>
              <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
                Traveling opens up new perspectives and spontaneous adventures, but dating on a trip requires balance, clear intentions, and smart safety habits.
              </p>
            </header>

            <article className="prose prose-neutral max-w-none space-y-8 text-[var(--foreground)] text-sm sm:text-base leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  The reality of on-the-road romance
                </h2>
                <p>
                  Dating during a journey is unlike dating in your hometown. Your routine is suspended, your curiosity is heightened, and your time in any one destination is strictly limited.
                </p>
                <p>
                  While movie portrayals suggest effortless holiday romance, realistic travel dating faces common hurdles:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-[var(--foreground)]/90">
                  <li><strong>The pressure cooker effect:</strong> With only a weekend or a few days in town, travelers often feel rushed into high-stakes plans rather than relaxed exploration.</li>
                  <li><strong>Ambiguous intentions:</strong> Is this a sightseeing companion, a casual holiday romance, or someone open to ongoing connection after you fly home?</li>
                  <li><strong>Local fatigue:</strong> Locals on dating apps often grow tired of touring travelers through the same monuments, while travelers want fresh discoveries.</li>
                </ul>
              </section>

              <section className="space-y-4 pt-4 border-t border-[var(--border)]">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Four rules for low-stress travel dates
                </h2>

                <div className="space-y-4 my-4 not-prose">
                  <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2 mb-1">
                      <Coffee className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                      1. Keep first meetups low-commitment
                    </span>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      Choose a neighborhood coffee shop, an outdoor market, or a public museum exhibition. Avoid locking yourself into a 4-hour seated tasting menu before you verify chemistry.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                      2. State your trip window early
                    </span>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      Be transparent about when you arrive and when you leave. Setting expectations avoids disappointment and helps you prioritize activities that fit both schedules.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2 mb-1">
                      <Heart className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                      3. Share activities you actually enjoy
                    </span>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      If you love contemporary architecture, propose walking a historic design district together. Shared activities relieve conversational pressure and make memories even if romantic spark is muted.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2 mb-1">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                      4. Protect your independence
                    </span>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      Never depend on your date for your only way home, your room key, or your cellular connectivity. Maintain your own itinerary so you can comfortably exit if boundaries are crossed.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 pt-4 border-t border-[var(--border)]">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Safety in unfamiliar cities
                </h2>
                <p>
                  Meeting someone abroad requires heightened common sense. Read local safety customs, drink responsibly, and use authorized ride-hailing or official public transit.
                </p>
                <p>
                  For a detailed breakdown of Roam&apos;s planned privacy protections—such as never collecting live GPS location or hotel details—visit our{" "}
                  <Link href="/safety" className="text-[var(--primary)] font-semibold hover:underline">
                    Trust &amp; Safety Principles
                  </Link>
                  .
                </p>
              </section>

              {/* Validation Stage Disclosure */}
              <section className="p-4 rounded-xl bg-[var(--travel-accent)]/50 border border-[var(--border)] text-xs text-[var(--muted-foreground)] not-prose flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-[var(--primary)] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-[var(--foreground)] block mb-0.5">Pre-Launch Validation Disclosure</strong>
                  Project Roam is currently in early-access validation. We do not have active public matching. By sharing your upcoming travel dates, you help us determine which destinations have sufficient traveler density to launch.
                </div>
              </section>

              {/* CTA Section */}
              <section className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] text-center space-y-4 not-prose shadow-sm">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--foreground)] tracking-tight">
                  Have a trip planned?
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
                  Find out who else might be in the same city during your dates.
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
                    <span>What is Travel Dating?</span>
                  </Link>
                </div>
              </section>

              {/* Related Guides */}
              <section className="pt-6 border-t border-[var(--border)] not-prose">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
                  Explore More Guides
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
                      Why date overlaps replace radius searches.
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
                      How coordinating 2–4 weeks in advance works.
                    </span>
                  </Link>
                  <Link
                    href="/solo-travel-dating"
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-colors group"
                  >
                    <span className="text-xs font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] block transition-colors">
                      Solo Traveler Insights
                    </span>
                    <span className="text-[11px] text-[var(--muted-foreground)] mt-1 block">
                      Meeting companions without losing solo freedom.
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
