import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MessageSquare, ShieldCheck, AlertCircle } from "lucide-react";
import { SeoArticleLayout, type TocItem } from "@/components/seo/seo-article-layout";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Meet People Before Your Trip: Advance Itinerary Matching",
  description:
    "Connect with compatible travelers two to four weeks before departure. Learn how advance destination and date matching creates stress-free shared adventures.",
  alternates: {
    canonical: "/meet-people-before-your-trip",
  },
  openGraph: {
    title: "Meet People Before Your Trip: Advance Itinerary Matching | Triply",
    description:
      "Connect with compatible travelers two to four weeks before departure. Learn how advance destination and date matching creates stress-free shared adventures.",
    url: "/meet-people-before-your-trip",
    type: "article",
    siteName: "Triply",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet People Before Your Trip: Advance Itinerary Matching | Triply",
    description:
      "Connect with compatible travelers two to four weeks before departure. Learn how advance destination and date matching creates stress-free shared adventures.",
  },
};

export default function MeetPeopleBeforeTripPage() {
  const pageUrl = getAbsoluteUrl("/meet-people-before-your-trip");
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Meet People Before Your Trip: Advance Itinerary Matching",
    "description":
      "Connect with compatible travelers two to four weeks before departure. Learn how advance destination and date matching creates stress-free shared adventures.",
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
    { id: "swiping-dilemma", label: "The in-destination swiping dilemma" },
    { id: "advance-advantage", label: "The pre-trip matching advantage" },
    { id: "timeline-runway", label: "The three-week planning runway" },
    { id: "safe-communication", label: "Safe pre-arrival communication" },
    { id: "early-access-note", label: "Early-access disclosure" },
  ];

  const heroVisual = (
    <div className="w-full max-w-[380px] bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-4 shadow-lg relative overflow-hidden">
      <div className="relative h-44 rounded-2xl overflow-hidden mb-3">
        <Image
          src="/images/editorial/tokyo-evening.jpg"
          alt="Travelers walking through a vibrant evening city street"
          fill
          sizes="(max-width: 640px) 100vw, 360px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--triply-midnight)]/80 via-transparent to-transparent" />
        <div className="absolute bottom-2.5 left-3 right-3 text-white">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--triply-coral)] block">
            Coordinated Ahead
          </span>
          <span className="text-xs font-semibold">Tokyo Evening Walk &middot; Matched 3 weeks before landing</span>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)]/70 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[var(--foreground)]">
          <span>Pre-Departure Timeline</span>
          <span className="text-[11px] text-[var(--triply-purple)] font-medium">3 Weeks Prior</span>
        </div>
        <div className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
          Say hello &rarr; Swap favorite neighborhoods &rarr; Plan coffee for Day 2
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
        category="Pre-Trip Coordination"
        title="How to meet people before your trip starts"
        intro="Why swiping from your hotel bed on night one is exhausting, and how coordinating dates two to four weeks in advance completely transforms your travel experience."
        heroVisual={heroVisual}
        tocItems={tocItems}
        currentSlug="meet-people-before-your-trip"
      >
        {/* Section 1 */}
        <section id="swiping-dilemma" className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            The in-destination swiping dilemma
          </h2>
          <p>
            Most travelers do not think about meeting anyone until they touch down, unpack their luggage, and open a dating app at 10:00 PM. But matching in real time while already traveling comes with heavy friction:
          </p>

          <ul className="space-y-2.5 text-sm sm:text-base text-[var(--foreground)]/90 list-disc pl-5">
            <li>
              <strong>Wasted vacation hours:</strong> You spend precious evenings staring into a phone screen, reading bios and filtering radius options instead of enjoying the city.
            </li>
            <li>
              <strong>Slow conversational momentum:</strong> On traditional dating apps, it takes several days of small talk to build rapport. By the time you feel comfortable meeting, your trip is already half over.
            </li>
            <li>
              <strong>Last-minute coordination stress:</strong> Figuring out where to meet in an unfamiliar neighborhood on thirty minutes of notice frequently leads to missed buses and cancellations.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section id="advance-advantage" className="space-y-4 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            The pre-trip matching advantage
          </h2>
          <p>
            Connecting two to four weeks before your flight departs creates a relaxed, thoughtful runway. You have plenty of time to establish conversational compatibility without a ticking clock hanging over your head.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
              <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[var(--triply-coral)]" aria-hidden="true" />
                Plan Shared Excursions
              </span>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Book tickets for popular exhibitions, artisan cooking classes, or coastal hikes in advance together, knowing your schedules line up perfectly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
              <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[var(--triply-purple)]" aria-hidden="true" />
                Vet Chemistry at Leisure
              </span>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Exchange neighborhood recommendations and travel playlists over a fortnight. You touch down already knowing someone you are excited to meet.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="timeline-runway" className="space-y-4 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            The three-week planning runway
          </h2>
          <p>
            Here is how a calm pre-trip coordination flow works in practice:
          </p>

          <div className="space-y-3 my-4">
            <div className="p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[var(--triply-purple)]/10 text-[var(--triply-purple)] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-[var(--foreground)]">3 Weeks Out: Discover Date Overlap</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Both travelers enter their upcoming destination and trip dates. You see each other&apos;s travel style, preferred pace, and the exact days you will both be in the same city.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[var(--triply-magenta)]/10 text-[var(--triply-magenta)] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-[var(--foreground)]">2 Weeks Out: Casual Conversation</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  You chat about places on your wishlist. Perhaps one of you knows a quiet courtyard bakery, while the other knows the best spot for sunset photos.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[var(--triply-coral)]/10 text-[var(--triply-coral)] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-[var(--foreground)]">Day 2 of Your Trip: Stress-Free Coffee</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Having had Day 1 to unpack and adjust to the time zone, you meet for forty-five minutes of coffee at a bright central cafe. Zero pressure, pure enjoyment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="safe-communication" className="space-y-4 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Safe pre-arrival communication
          </h2>
          <p>
            Communicating before arrival requires healthy digital boundaries:
          </p>

          <div className="p-6 rounded-2xl bg-[var(--triply-midnight)] text-white space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--triply-coral)]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              Recommended Ground Rules Before You Land
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc pl-5">
              <li>Keep conversations inside the app until you have met in person and feel comfortable.</li>
              <li>Never share your exact hotel address or room number. Mentioning a general district is plenty for coordination.</li>
              <li>Optionally arrange a brief five-minute video call prior to departure to verify identity and ease nerves.</li>
              <li>Always agree on a well-trafficked public cafe or museum entrance for your first meetup.</li>
            </ul>
            <div className="pt-2">
              <Link
                href="/safety"
                className="text-xs font-bold text-[var(--triply-lavender)] hover:underline inline-flex items-center gap-1"
              >
                Learn more in Triply Safety Principles &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="early-access-note" className="p-4 rounded-xl bg-[var(--triply-sand)]/60 border border-[var(--border)] text-xs text-[var(--muted-foreground)] flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-[var(--triply-coral)] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="text-[var(--foreground)] block mb-0.5">Pre-Launch Validation Disclosure</strong>
            Triply is currently in private pre-launch validation. Live matchmaking is not active. Submitting your upcoming trip dates helps test and measure demand for pre-trip matching in your destination.
          </div>
        </section>
      </SeoArticleLayout>
    </>
  );
}
