"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface TocItem {
  id: string;
  label: string;
}

export interface RelatedGuideItem {
  slug: string;
  category: string;
  title: string;
  description: string;
  accentColor: string;
}

interface SeoArticleLayoutProps {
  category: string;
  title: string;
  intro: string;
  heroVisual: React.ReactNode;
  tocItems: TocItem[];
  currentSlug: string;
  children: React.ReactNode;
}

const ALL_GUIDES: RelatedGuideItem[] = [
  {
    slug: "travel-dating",
    category: "Concepts",
    title: "What is Travel Dating?",
    description: "Why radius-based apps fail travelers and how matching by destination dates solves the schedule puzzle.",
    accentColor: "#6B5BFF",
  },
  {
    slug: "dating-while-traveling",
    category: "Safety & Advice",
    title: "Dating While Traveling",
    description: "Practical advice on pacing, safety, communication, and avoiding holiday burnout.",
    accentColor: "#FF735D",
  },
  {
    slug: "meet-people-before-your-trip",
    category: "Planning",
    title: "Meet People Before Your Trip",
    description: "How to connect before touching down so you spend less time swiping and more time exploring.",
    accentColor: "#E84A8B",
  },
  {
    slug: "solo-travel-dating",
    category: "Solo Travel",
    title: "Solo Travel Dating",
    description: "Balancing independent freedom with genuine romantic connections on the road.",
    accentColor: "#A78BFA",
  },
];

export function SeoArticleLayout({
  category,
  title,
  intro,
  heroVisual,
  tocItems,
  currentSlug,
  children,
}: SeoArticleLayoutProps) {
  const relatedGuides = ALL_GUIDES.filter((g) => g.slug !== currentSlug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <LandingHeader />

      <main className="flex-1 flex flex-col pt-6 pb-20">
        {/* Top Breadcrumb & Hero */}
        <section className="border-b border-[var(--border)] pb-12 sm:pb-16 bg-[var(--surface-soft)]">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Back Link */}
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back to Triply Home</span>
              </Link>
            </div>

            {/* Editorial Desktop Hero Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Article Details */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <Badge variant="travel" className="w-fit text-xs font-semibold">
                  {category}
                </Badge>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.14]">
                  {title}
                </h1>
                <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
                  {intro}
                </p>
                <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)] pt-2 border-t border-[var(--border)]/70">
                  <span className="font-semibold text-[var(--foreground)]">Triply Editorial</span>
                  <span>&middot;</span>
                  <span>6 min read</span>
                  <span>&middot;</span>
                  <span>Updated for 2026</span>
                </div>
              </div>

              {/* Right: Topic-Specific Visual */}
              <div className="lg:col-span-5 flex justify-center w-full">
                {heroVisual}
              </div>
            </div>
          </div>
        </section>

        {/* 2-Column Content + Desktop Side Rail */}
        <section className="pt-10 sm:pt-14">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
              {/* Main Reading Column (680–720px measure for optimal typography) */}
              <article className="w-full lg:max-w-[720px] flex-1 flex flex-col gap-10 text-[var(--foreground)] leading-relaxed">
                {children}
              </article>

              {/* Desktop Side Rail (300–320px, Sticky) */}
              <aside className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6 lg:sticky lg:top-24">
                {/* On This Page / Table of Contents */}
                {tocItems.length > 0 && (
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 shadow-xs flex flex-col gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                      On this page
                    </span>
                    <nav className="flex flex-col gap-2 text-xs sm:text-sm">
                      {tocItems.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors py-0.5"
                        >
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Triply Early Access Card */}
                <div className="bg-[#0B0F2D] text-white border border-white/10 rounded-2xl p-5 shadow-md flex flex-col gap-3.5 relative overflow-hidden">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/brand/triply/triply-symbol.png"
                      alt="Triply"
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A78BFA]">
                      Triply Early Access
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold leading-snug">
                    Traveling soon? See who will be there.
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Add your destination and dates to discover overlapping traveler schedules before you land.
                  </p>

                  <Link href="/join">
                    <Button
                      variant="gradient"
                      size="sm"
                      className="w-full text-xs font-semibold rounded-full mt-1"
                    >
                      Join Early Access &rarr;
                    </Button>
                  </Link>
                </div>

                {/* Safety Link Card */}
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 shadow-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[var(--triply-purple)]/10 text-[var(--triply-purple)] flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[var(--foreground)]">
                        Safety Principles
                      </span>
                      <span className="text-[11px] text-[var(--muted-foreground)]">
                        How Triply protects traveler privacy
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/safety"
                    className="text-xs font-bold text-[var(--primary)] hover:underline shrink-0"
                  >
                    View &rarr;
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Wide Desktop Bottom Conversion CTA */}
        <section className="pt-16 sm:pt-20">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0B0F2D] text-white border border-white/10 rounded-[var(--radius-large)] p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div
                className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#6B5BFF]/15 blur-3xl pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[#FF735D]/15 blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-3 max-w-xl text-center md:text-left relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#A78BFA] text-xs font-semibold w-fit mx-auto md:mx-0">
                  <Sparkles className="h-3.5 w-3.5 text-[#FF735D]" aria-hidden="true" />
                  <span>Next Trip Matching</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                  Going somewhere soon?
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Add your destination and travel dates to see how Triply connects people visiting at the same time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto relative z-10">
                <Link href="/join" className="w-full sm:w-auto">
                  <Button
                    variant="gradient"
                    size="md"
                    className="w-full sm:w-auto px-6 font-bold rounded-full shadow-md"
                  >
                    Join Early Access &rarr;
                  </Button>
                </Link>
                <Link href="/" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full sm:w-auto px-6 font-semibold rounded-full bg-white/10 text-white border-white/20 hover:bg-white/15"
                  >
                    Search Destinations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Column Related Guides Grid */}
        <section className="pt-16">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                  Related Travel Guides
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-0.5">
                  Explore how travel dating works across destinations and styles.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/${guide.slug}`}
                  className="group bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 shadow-xs hover:shadow-md hover:border-[var(--primary)]/30 transition-all flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-2.5">
                    <span
                      style={{ color: guide.accentColor }}
                      className="text-xs font-bold uppercase tracking-wider"
                    >
                      {guide.category}
                    </span>
                    <h4 className="font-display text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                      {guide.title}
                    </h4>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      {guide.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] pt-3 border-t border-[var(--border)]">
                    <span>Read guide</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
