import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Compass, ShieldCheck, MapPin, AlertCircle } from "lucide-react";
import { SeoArticleLayout, type TocItem } from "@/components/seo/seo-article-layout";

import { getAbsoluteUrl, getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "What is Travel Dating? Matching by Destination & Dates",
  description:
    "Explore how travel dating works, why radius-based dating apps fail travelers, and how matching by destination and dates creates stress-free shared adventures.",
  alternates: {
    canonical: "/travel-dating",
  },
  openGraph: {
    title: "What is Travel Dating? Matching by Destination & Dates | Triply",
    description:
      "Explore how travel dating works, why radius-based dating apps fail travelers, and how matching by destination and dates creates stress-free shared adventures.",
    url: "/travel-dating",
    type: "article",
    siteName: "Triply",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is Travel Dating? Matching by Destination & Dates | Triply",
    description:
      "Explore how travel dating works, why radius-based dating apps fail travelers, and how matching by destination and dates creates stress-free shared adventures.",
  },
};

export default function TravelDatingPage() {
  const pageUrl = getAbsoluteUrl("/travel-dating");
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What is Travel Dating? Matching by Destination and Dates",
    "description":
      "Explore how travel dating works, why radius-based dating apps fail travelers, and how matching by destination and dates creates stress-free shared adventures.",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Triply",
      "url": `${siteUrl}/`,
    },
    "inLanguage": "en-US",
  };

  const tocItems: TocItem[] = [
    { id: "why-radius-fails", label: "Why radius apps fail travelers" },
    { id: "departure-mismatch", label: "The departure mismatch dilemma" },
    { id: "temporal-alignment", label: "Matching by dates and destination" },
    { id: "real-world-scenario", label: "Scenario: 4 days in Barcelona" },
    { id: "safety-habits", label: "Essential travel dating safety" },
    { id: "early-access-note", label: "Early-access disclosure" },
  ];

  const heroVisual = (
    <div className="w-full max-w-[380px] bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-5 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--triply-coral)]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--triply-purple)] flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[var(--triply-coral)]" />
          Destination Overlap
        </span>
        <span className="text-[11px] font-semibold text-[var(--muted-foreground)]">Barcelona, Spain</span>
      </div>

      <div className="py-4 space-y-3">
        {/* Traveler 1 */}
        <div className="p-3 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)]/70">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[var(--foreground)]">Sofia (Solo Traveler)</span>
            <span className="text-[11px] font-medium text-[var(--triply-purple)]">Oct 10 to Oct 17</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full bg-[var(--triply-purple)] rounded-full w-[85%]" />
          </div>
        </div>

        {/* Traveler 2 */}
        <div className="p-3 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)]/70">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[var(--foreground)]">Marcus (Visiting Friend)</span>
            <span className="text-[11px] font-medium text-[var(--triply-coral)]">Oct 12 to Oct 16</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden flex justify-end">
            <div className="h-full bg-[var(--triply-coral)] rounded-full w-[70%]" />
          </div>
        </div>

        {/* Overlap Highlight */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-[var(--triply-purple)]/10 via-[var(--triply-magenta)]/10 to-[var(--triply-coral)]/10 border border-[var(--triply-coral)]/30 text-center">
          <div className="text-[11px] font-bold text-[var(--triply-magenta)] uppercase tracking-wide">
            Shared Travel Window
          </div>
          <div className="text-sm font-extrabold text-[var(--foreground)] mt-0.5">
            4 days together in Barcelona
          </div>
          <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
            Oct 12 to Oct 16 &middot; Perfect for an afternoon tapas walk
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeoArticleLayout
        category="Travel Dating Guide"
        title="What is travel dating? Matching by destination and dates"
        intro="Travel dating connects people exploring the same cities during the same dates. Here is how temporal alignment solves the scheduling puzzle that conventional radius apps completely ignore."
        heroVisual={heroVisual}
        tocItems={tocItems}
        currentSlug="travel-dating"
      >
        {/* Section 1 */}
        <section id="why-radius-fails" className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Why traditional dating apps fail travelers
          </h2>
          <p>
            Conventional dating apps were designed around one core assumption: users reside permanently in the same metropolitan area. They rely on GPS radius sliders, showing you anyone within ten to fifty miles at this exact moment.
          </p>
          <p>
            When you travel, that location-first premise quickly falls apart. Your physical coordinates say you are in Lisbon or Tokyo today, but they reveal nothing about how long you plan to stay, when your flight leaves, or what kind of trip you are taking.
          </p>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
              <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[var(--triply-coral)]" aria-hidden="true" />
                The Departure Mismatch
              </span>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                You match with someone interesting on Tuesday, only to find out their flight leaves at dawn on Wednesday. Radius apps do not understand travel duration.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
              <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <Compass className="h-4 w-4 text-[var(--triply-purple)]" aria-hidden="true" />
                Mismatched Daily Rhythms
              </span>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Permanent residents are busy with workday commutes and weekly errands, while visiting travelers want to discover street markets, quiet cafes, and historic lookouts.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="departure-mismatch" className="space-y-4 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            The departure mismatch dilemma
          </h2>
          <p>
            Consider this everyday travel scenario. You land in Barcelona for a seven-day stay. On your third evening, you strike up a lively chat with someone whose profile catches your attention. You share a passion for mid-century architecture and natural wines.
          </p>
          <p>
            After exchanging messages back and forth for twenty-four hours, you suggest meeting for an espresso in the Gothic Quarter. That is when they drop the familiar bad news: their taxi to El Prat Airport picks them up in two hours.
          </p>
          <p>
            When dating apps disregard trip schedules, most travel interactions turn into missed connections. You spend valuable evenings staring at your screen instead of experiencing the neighborhood around you.
          </p>
        </section>

        {/* Section 3 */}
        <section id="temporal-alignment" className="space-y-4 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Matching by dates and destination
          </h2>
          <p>
            Triply is built on a straightforward principle: <strong>when you travel, timing matters just as much as location</strong>.
          </p>
          <p>
            Instead of showing you whoever happens to be near your GPS coordinate right now, travel dating matches people who share an active overlap in their trip calendars.
          </p>

          <div className="p-5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] space-y-3">
            <h3 className="font-bold text-sm text-[var(--foreground)]">The three pillars of itinerary matching:</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--foreground)]/90 list-disc pl-5">
              <li>
                <strong>Destination alignment:</strong> Both travelers plan to visit the same city, island, or region during a specific season.
              </li>
              <li>
                <strong>Date overlap:</strong> Arrival and departure dates intersect, creating a clear, natural window to grab a coffee, share an afternoon excursion, or visit a museum.
              </li>
              <li>
                <strong>Pacing transparency:</strong> Both travelers know beforehand how many days their trips coincide, establishing honest expectations without unnecessary pressure.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section id="real-world-scenario" className="space-y-4 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Scenario: four days in Barcelona
          </h2>
          <p>
            When Sofia registers her upcoming journey from October 10 to October 17, and Marcus registers his trip from October 12 to October 16, Triply calculates a four-day intersection.
          </p>
          <p>
            Because both individuals can see their shared dates weeks before packing their bags, they can say hello before takeoff. They exchange tips on local bakeries, discover they both want to walk up Montjuïc, and schedule a low-pressure afternoon meetup.
          </p>
          <p>
            Nobody has to spend their first evening abroad swiping on a hotel bed. They already know their schedules align, and both can look forward to exploring together.
          </p>
        </section>

        {/* Section 5 */}
        <section id="safety-habits" className="space-y-4 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Essential travel dating safety
          </h2>
          <p>
            Exploring a new city with someone you recently met calls for thoughtful safety precautions. Travel dating should feel exciting, but smart boundaries come first.
          </p>

          <div className="p-6 rounded-2xl bg-[var(--triply-midnight)] text-white space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--triply-coral)]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              Four Safety Rules for Travelers
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-disc pl-5">
              <li>Always meet in open, well-lit public places such as cafes, busy plazas, or gallery spaces.</li>
              <li>Never disclose your hotel room number, private vacation rental address, or flight confirmation details.</li>
              <li>Arrange your own independent transportation to and from your meetup.</li>
              <li>Tell a trusted friend or family member your location and planned return time.</li>
            </ul>
            <div className="pt-2">
              <Link
                href="/safety"
                className="text-xs font-bold text-[var(--triply-lavender)] hover:underline inline-flex items-center gap-1"
              >
                Read Triply Trust &amp; Safety Principles &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section id="early-access-note" className="p-4 rounded-xl bg-[var(--triply-sand)]/60 border border-[var(--border)] text-xs text-[var(--muted-foreground)] flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-[var(--triply-coral)] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="text-[var(--foreground)] block mb-0.5">Pre-Launch Validation Disclosure</strong>
            Triply is currently conducting early-access research to assess traveler density across global destinations. No public profiles or active matchmaking are currently live. Submitting a trip helps decide which cities open first.
          </div>
        </section>
      </SeoArticleLayout>
    </>
  );
}
