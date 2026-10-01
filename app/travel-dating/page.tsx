import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Compass, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/landing/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "What is Travel Dating? Matching by Destination & Dates",
  description:
    "Explore how travel dating works, why conventional dating apps fail travelers, and how matching by destination and travel dates creates genuine connections.",
  alternates: {
    canonical: "/travel-dating",
  },
  openGraph: {
    title: "What is Travel Dating? Matching by Destination & Dates",
    description:
      "Explore how travel dating works, why conventional dating apps fail travelers, and how matching by destination and travel dates creates genuine connections.",
    url: "https://roam.toolmint.cc/travel-dating",
    type: "article",
    siteName: "Roam",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is Travel Dating? Matching by Destination & Dates",
    description:
      "Explore how travel dating works, why conventional dating apps fail travelers, and how matching by destination and travel dates creates genuine connections.",
  },
};

export default function TravelDatingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What is Travel Dating? Matching by Destination & Dates",
    "description":
      "Explore how travel dating works, why conventional dating apps fail travelers, and how matching by destination and travel dates creates genuine connections.",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://roam.toolmint.cc/travel-dating",
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
            {/* Breadcrumb / Back link */}
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back to Roam Home</span>
              </Link>
            </div>

            {/* Article Header */}
            <header className="flex flex-col gap-4 mb-10">
              <Badge variant="neutral" className="w-fit text-xs font-semibold">
                Travel Dating Guide
              </Badge>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
                What is travel dating? Matching by destination and dates
              </h1>
              <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
                Travel dating is the practice of connecting with other travelers or locals based on shared travel dates and destinations, rather than relying on arbitrary GPS radius filters.
              </p>
            </header>

            {/* Content Body */}
            <article className="prose prose-neutral max-w-none space-y-8 text-[var(--foreground)] text-sm sm:text-base leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Why traditional dating apps fail travelers
                </h2>
                <p>
                  Most conventional dating apps were architected around a single assumption: users live permanently in the same metropolitan area. They rely on location radius sliders—connecting you with anyone within 10 to 50 miles right now.
                </p>
                <p>
                  When you travel, this model immediately breaks down:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
                  <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
                    <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                      The departure mismatch
                    </span>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      You match with someone great on Tuesday, only to discover their flight leaves Wednesday morning. Radius apps have no concept of travel duration.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
                    <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                      <Compass className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                      Mismatched travel pacing
                    </span>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      Permanent residents often have busy workweeks and routine commitments, while visiting travelers want to explore markets, cafes, and scenic vistas.
                    </p>
                  </div>
                </div>
                <p>
                  When you change cities, your existing matches are left thousands of miles behind, making ongoing communication frustrating and transient.
                </p>
              </section>

              <section className="space-y-4 pt-4 border-t border-[var(--border)]">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  The date overlap solution
                </h2>
                <p>
                  Project Roam is designed around a fundamentally different insight: <strong>temporal alignment matters as much as geographical alignment</strong>.
                </p>
                <p>
                  Instead of showing you anyone who happens to be in a city right this second, travel dating matches people who share an active overlap in their travel window:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-[var(--foreground)]/90">
                  <li><strong>Destination alignment:</strong> Both travelers are visiting or staying in the same city or region.</li>
                  <li><strong>Date overlap:</strong> Arrival and departure dates intersect, creating a clear, natural window to grab a coffee, share an excursion, or explore an art gallery.</li>
                  <li><strong>Pacing compatibility:</strong> Both participants know up front how many days their trips coincide, setting realistic expectations without false promises.</li>
                </ul>
              </section>

              <section className="space-y-4 pt-4 border-t border-[var(--border)]">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Safety in travel dating
                </h2>
                <p>
                  Exploring a new city with someone new requires higher standards of safety than local dating. Roam is committed to safety-by-design:
                </p>
                <div className="p-5 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] space-y-3 not-prose">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                    Essential safety practices for traveling singles
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted-foreground)] list-disc pl-5">
                    <li>Always meet in open, well-lit public places (cafes, public plazas, museums).</li>
                    <li>Never share your exact hotel room, accommodation address, or private booking confirmation.</li>
                    <li>Arrange your own independent transportation to and from your meetup.</li>
                    <li>Inform a friend or family member of your plans and destination.</li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/safety"
                      className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
                    >
                      Read all Project Roam Trust &amp; Safety Principles &rarr;
                    </Link>
                  </div>
                </div>
              </section>

              {/* Validation Stage Disclosure */}
              <section className="p-4 rounded-xl bg-[var(--travel-accent)]/50 border border-[var(--border)] text-xs text-[var(--muted-foreground)] not-prose flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-[var(--primary)] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-[var(--foreground)] block mb-0.5">Pre-Launch Validation Disclosure</strong>
                  Project Roam is currently conducting early-access research to measure traveler density across global destinations. No public profiles or active matchmaking are currently live. Submitting a trip helps determine where early matching will open first.
                </div>
              </section>

              {/* Conversion CTA */}
              <section className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] text-center space-y-4 not-prose shadow-sm">
                <div className="inline-flex p-3 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-1">
                  <Heart className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--foreground)] tracking-tight">
                  Going somewhere soon?
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
                  Enter your destination and travel dates to see sample traveler profiles and join our early-access list.
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
                    href="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[var(--foreground)] bg-[var(--surface-muted)] hover:bg-[var(--border)]/60 transition-all border border-[var(--border)]"
                  >
                    <span>Search Destinations</span>
                  </Link>
                </div>
              </section>

              {/* Related Content Cluster */}
              <section className="pt-6 border-t border-[var(--border)] not-prose">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
                  Related Travel Guides
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link
                    href="/dating-while-traveling"
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-colors group"
                  >
                    <span className="text-xs font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] block transition-colors">
                      Dating While Traveling
                    </span>
                    <span className="text-[11px] text-[var(--muted-foreground)] mt-1 block">
                      Practical tips for authentic, low-pressure dating on the road.
                    </span>
                  </Link>
                  <Link
                    href="/meet-people-before-your-trip"
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-colors group"
                  >
                    <span className="text-xs font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] block transition-colors">
                      Meet People Before Your Trip
                    </span>
                    <span className="text-[11px] text-[var(--muted-foreground)] mt-1 block">
                      Why connecting 2–4 weeks in advance changes your journey.
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
                      Balancing solitary independence with shared experiences.
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
