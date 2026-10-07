import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Coffee, Clock, Heart, ShieldCheck, AlertCircle, Compass } from "lucide-react";
import { SeoArticleLayout, type TocItem } from "@/components/seo/seo-article-layout";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Dating While Traveling: Advice, Tips & Safety",
  description:
    "Discover how to date while traveling without holiday pressure. Practical advice on pacing, safety, communication, and exploring new cities together.",
  alternates: {
    canonical: "/dating-while-traveling",
  },
  openGraph: {
    title: "Dating While Traveling: Advice, Tips & Safety | Triply",
    description:
      "Discover how to date while traveling without holiday pressure. Practical advice on pacing, safety, communication, and exploring new cities together.",
    url: "/dating-while-traveling",
    type: "article",
    siteName: "Triply",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dating While Traveling: Advice, Tips & Safety | Triply",
    description:
      "Discover how to date while traveling without holiday pressure. Practical advice on pacing, safety, communication, and exploring new cities together.",
  },
};

export default function DatingWhileTravelingPage() {
  const pageUrl = getAbsoluteUrl("/dating-while-traveling");
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Dating While Traveling: Advice, Tips and Safety for Single Travelers",
    "description":
      "Discover how to date while traveling without holiday pressure. Practical advice on pacing, safety, communication, and exploring new cities together.",
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
    { id: "reality-check", label: "The reality of on-the-road dating" },
    { id: "four-rules", label: "Four rules for low-stress meetups" },
    { id: "short-overlaps", label: "When trips overlap for only two days" },
    { id: "unfamiliar-cities", label: "Safety in unfamiliar destinations" },
    { id: "early-access-note", label: "Early-access disclosure" },
  ];

  const heroVisual = (
    <div className="w-full max-w-[380px] bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-4 shadow-lg relative overflow-hidden">
      <div className="relative h-44 rounded-2xl overflow-hidden mb-3">
        <Image
          src="/images/editorial/travel-cafe.jpg"
          alt="Two travelers enjoying a quiet coffee conversation at a corner cafe"
          fill
          sizes="(max-width: 640px) 100vw, 360px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--triply-midnight)]/80 via-transparent to-transparent" />
        <div className="absolute bottom-2.5 left-3 right-3 text-white">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--triply-coral)] block">
            Low-Pressure Pacing
          </span>
          <span className="text-xs font-semibold">Gràcia Espresso Bar &middot; 45-minute casual hello</span>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)]/70 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[var(--foreground)]">
          <span>Planned Itinerary Rhythm</span>
          <span className="text-[11px] text-[var(--triply-purple)] font-medium">Independent Pacing</span>
        </div>
        <div className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
          Morning: Solo gallery wander &middot; Afternoon: Shared cafe &middot; Evening: Sunset walk
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
        category="Traveler Advice"
        title="Dating while traveling: how to connect authentically on the road"
        intro="Traveling opens fresh horizons and spontaneous encounters, but dating on a trip works best with balanced pacing, honest intentions, and solid safety habits."
        heroVisual={heroVisual}
        tocItems={tocItems}
        currentSlug="dating-while-traveling"
      >
        {/* Section 1 */}
        <section id="reality-check" className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            The reality of on-the-road dating
          </h2>
          <p>
            Dating while on a trip is completely different from dating in your hometown. Your daily routine is suspended, your curiosity is heightened, and your stay in any given city has a definite end date.
          </p>
          <p>
            While movies portray effortless holiday romance, realistic travel dating encounters common friction points:
          </p>

          <ul className="space-y-2.5 text-sm sm:text-base text-[var(--foreground)]/90 list-disc pl-5">
            <li>
              <strong>The pressure cooker effect:</strong> With only a weekend or four days in town, people often rush into high-stakes plans instead of enjoying casual company.
            </li>
            <li>
              <strong>Mismatched intentions:</strong> One traveler may seek a fellow museum buddy, while another wants a whirlwind holiday romance. Without upfront honesty, expectations quickly clash.
            </li>
            <li>
              <strong>Local tour guide fatigue:</strong> Residents on traditional dating apps often get tired of showing visitors the same tourist landmarks. Travelers, meanwhile, want to explore with someone who shares their excitement.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section id="four-rules" className="space-y-4 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Four rules for low-stress meetups
          </h2>
          <p>
            To avoid awkward encounters and protect your travel schedule, follow four simple guidelines:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
              <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <Coffee className="h-4 w-4 text-[var(--triply-coral)]" aria-hidden="true" />
                1. Keep first dates low-commitment
              </span>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Choose a neighborhood cafe, an outdoor street food market, or a public sculpture park. Never commit to a four-course dinner before you know if you enjoy each other&apos;s company.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
              <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--triply-purple)]" aria-hidden="true" />
                2. State your trip window early
              </span>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Be clear about your arrival and departure dates from your very first conversation. Knowing how much time you have avoids misunderstandings and prevents rush.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
              <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <Heart className="h-4 w-4 text-[var(--triply-magenta)]" aria-hidden="true" />
                3. Pick activities you already love
              </span>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                If you love contemporary art or vintage bookshops, suggest browsing those spots together. If chemistry is friendly rather than romantic, you still had a great afternoon.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-2">
              <span className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
                <Compass className="h-4 w-4 text-[var(--triply-lavender)]" aria-hidden="true" />
                4. Protect your independence
              </span>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Never depend on a date for your transport, hotel key, or phone charger. Maintain your own itinerary so you can comfortably say goodbye whenever you wish.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="short-overlaps" className="space-y-4 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            When trips overlap for only two days
          </h2>
          <p>
            What happens when your travel calendars overlap for just forty-eight hours? In conventional dating apps, this is usually a deal-breaker because users expect long-term local availability.
          </p>
          <p>
            In travel dating, a two-day window can be delightful if approached with realistic expectations. A shared hike along coastal cliffs, a visit to a morning fish market, or drinks on a rooftop terrace can turn into the highlight of your journey without any burden of future demands.
          </p>
          <div className="p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] text-xs text-[var(--muted-foreground)] leading-relaxed">
            <strong className="text-[var(--foreground)] block mb-1">Key Tip for Short Overlaps</strong>
            Agree in advance on the scope of your time together. A ninety-minute coffee and walking conversation leaves both of you plenty of time for independent sightseeing.
          </div>
        </section>

        {/* Section 4 */}
        <section id="unfamiliar-cities" className="space-y-4 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Safety in unfamiliar destinations
          </h2>
          <p>
            Meeting someone in an unfamiliar city requires steady common sense. Research local neighborhood customs, stay alert, and use licensed public transportation or verified ride-hailing apps.
          </p>

          <div className="p-6 rounded-2xl bg-[var(--triply-midnight)] text-white space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--triply-coral)]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              Safety Fundamentals
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Triply is committed to safety by design. We will never collect or broadcast your live GPS tracking data, and we will never ask for your hotel room number or private booking vouchers.
            </p>
            <div className="pt-2">
              <Link
                href="/safety"
                className="text-xs font-bold text-[var(--triply-lavender)] hover:underline inline-flex items-center gap-1"
              >
                Learn more about Triply Trust &amp; Safety Principles &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="early-access-note" className="p-4 rounded-xl bg-[var(--triply-sand)]/60 border border-[var(--border)] text-xs text-[var(--muted-foreground)] flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-[var(--triply-coral)] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="text-[var(--foreground)] block mb-0.5">Pre-Launch Validation Disclosure</strong>
            Triply is currently in early-access research mode. We do not have active public matching. By sharing your upcoming travel dates, you help us see which destinations have sufficient traveler density to launch.
          </div>
        </section>
      </SeoArticleLayout>
    </>
  );
}
