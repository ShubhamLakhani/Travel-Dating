import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Compass, UserCheck, ShieldCheck, AlertCircle } from "lucide-react";
import { SeoArticleLayout, type TocItem } from "@/components/seo/seo-article-layout";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Solo Travel Dating: Connecting Without Compromising Freedom",
  description:
    "How to date as a solo traveler without losing your independent spirit. Practical tips for finding shared excursions, dinner dates, and romance abroad.",
  alternates: {
    canonical: "/solo-travel-dating",
  },
  openGraph: {
    title: "Solo Travel Dating: Connecting Without Compromising Freedom | Triply",
    description:
      "How to date as a solo traveler without losing your independent spirit. Practical tips for finding shared excursions, dinner dates, and romance abroad.",
    url: "/solo-travel-dating",
    type: "article",
    siteName: "Triply",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solo Travel Dating: Connecting Without Compromising Freedom | Triply",
    description:
      "How to date as a solo traveler without losing your independent spirit. Practical tips for finding shared excursions, dinner dates, and romance abroad.",
  },
};

export default function SoloTravelDatingPage() {
  const pageUrl = getAbsoluteUrl("/solo-travel-dating");
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Solo Travel Dating: Connecting Without Compromising Freedom",
    "description":
      "How to date as a solo traveler without losing your independent spirit. Practical tips for finding shared excursions, dinner dates, and romance abroad.",
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
    { id: "solo-paradox", label: "The solo traveler's paradox" },
    { id: "protecting-freedom", label: "Connecting without compromising your route" },
    { id: "coastal-train", label: "Scenario: The coastal train day trip" },
    { id: "solo-safety", label: "Solo safety: non-negotiables" },
    { id: "early-access-note", label: "Early-access disclosure" },
  ];

  const heroVisual = (
    <div className="w-full max-w-[380px] bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-4 shadow-lg relative overflow-hidden">
      <div className="relative h-44 rounded-2xl overflow-hidden mb-3">
        <Image
          src="/images/editorial/coastal-sunset.jpg"
          alt="A solo traveler standing on a scenic seaside overlook during golden hour"
          fill
          sizes="(max-width: 640px) 100vw, 360px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--triply-midnight)]/80 via-transparent to-transparent" />
        <div className="absolute bottom-2.5 left-3 right-3 text-white">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--triply-coral)] block">
            Independent Freedom
          </span>
          <span className="text-xs font-semibold">Cinque Terre Overlook &middot; Shared afternoon hike</span>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)]/70 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[var(--foreground)]">
          <span>Solo Balance Principle</span>
          <span className="text-[11px] text-[var(--triply-purple)] font-medium">Zero Codependency</span>
        </div>
        <div className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
          Two travelers, two independent bookings, one memorable afternoon.
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
        category="Solo Travel Insights"
        title="Solo travel dating: how to meet people without losing your freedom"
        intro="Traveling solo offers complete autonomy, but sharing a memorable dinner, a coastal train ride, or an afternoon hike with someone special elevates the journey."
        heroVisual={heroVisual}
        tocItems={tocItems}
        currentSlug="solo-travel-dating"
      >
        {/* Section 1 */}
        <section id="solo-paradox" className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            The solo traveler&apos;s paradox
          </h2>
          <p>
            Solo travelers treasure waking up without obligations to anyone else. You choose where to eat, when to sleep, which cobblestone alleyways to explore, and when to sit quietly with a book for three hours.
          </p>
          <p>
            Yet even the most self-sufficient traveler encounters moments where companionship makes an experience significantly richer:
          </p>

          <ul className="space-y-2.5 text-sm sm:text-base text-[var(--foreground)]/90 list-disc pl-5">
            <li>
              <strong>The dinner barrier:</strong> Sitting alone at lively tapas counters or celebrated bistros can sometimes feel isolated. Having someone across the table to share small plates transforms the meal.
            </li>
            <li>
              <strong>Shared awe:</strong> Watching the sun sink into the sea from a cliffside trail is often more poignant when reflected in someone else&apos;s eyes.
            </li>
            <li>
              <strong>Hostel fatigue:</strong> Loud group tours and party hostels are not for everyone. Finding one thoughtful, like-minded traveler who respects your tempo is deeply refreshing.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section id="protecting-freedom" className="space-y-4 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Connecting without compromising your route
          </h2>
          <p>
            The secret to rewarding solo travel dating is keeping your itinerary intact. You are not looking for someone to rewrite your travel map. You are looking for natural, unforced intersections:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
              <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <Compass className="h-4 w-4 text-[var(--triply-coral)]" aria-hidden="true" />
                Discrete Activity Overlap
              </span>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Plan a two-hour morning coffee walk or an afternoon modern art gallery visit. If you click, continue to dinner. If not, return to your solo journey with zero guilt.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
              <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-[var(--triply-purple)]" aria-hidden="true" />
                Two Travelers, Two Itineraries
              </span>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Because both individuals have their own rooms, transport, and plans, there is no codependency. You connect purely by choice, not out of convenience.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="coastal-train" className="space-y-4 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Scenario: the coastal train day trip
          </h2>
          <p>
            Imagine you are traveling through northern Italy. You want to take the regional train to the coast for an afternoon walk along the seaside footpaths, followed by seafood risotto at a harbor trattoria.
          </p>
          <p>
            Through Triply, you connect with another solo traveler who is also based in Florence and planning a day trip to the same coastal village on Thursday. You meet at the central railway station platform, share the scenic ride, walk the clifftop trails together, and head back on the evening train.
          </p>
          <p>
            You both experienced a wonderful shared day in the Italian sun without either of you having to change your weekly hotel reservations or sacrifice personal space.
          </p>
        </section>

        {/* Section 4 */}
        <section id="solo-safety" className="space-y-4 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Solo safety: non-negotiables
          </h2>
          <p>
            When traveling solo, personal safety is your top responsibility. Never lower your personal standards for a date:
          </p>

          <div className="p-6 rounded-2xl bg-[var(--triply-midnight)] text-white space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--triply-coral)]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              Four Safety Essentials for Solo Travelers
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc pl-5">
              <li>Always maintain your own private accommodation. Never stay in a date&apos;s rental or hotel room.</li>
              <li>Always carry backup payment methods and emergency local cash in a separate secure pocket.</li>
              <li>Share your meetup spot with a trusted contact back home before heading out.</li>
              <li>Never leave food or beverages unattended, and trust your instincts if any situation feels uncomfortable.</li>
            </ul>
            <div className="pt-2">
              <Link
                href="/safety"
                className="text-xs font-bold text-[var(--triply-lavender)] hover:underline inline-flex items-center gap-1"
              >
                Read full guidelines in the Triply Safety Center &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="early-access-note" className="p-4 rounded-xl bg-[var(--triply-sand)]/60 border border-[var(--border)] text-xs text-[var(--muted-foreground)] flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-[var(--triply-coral)] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="text-[var(--foreground)] block mb-0.5">Pre-Launch Validation Disclosure</strong>
            Triply is currently in pre-launch validation. We are measuring demand for destination-and-date based matching among solo and group travelers. Submitting your trip helps validate where we open first.
          </div>
        </section>
      </SeoArticleLayout>
    </>
  );
}
