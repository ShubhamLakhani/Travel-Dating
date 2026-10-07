"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { EarlyAccessLink } from "./early-access-link";

export function EarlyAccessCtaSection() {
  return (
    <Section spacing="lg" className="border-t border-[var(--border)] bg-[var(--background)]">
      <Container size="wide">
        <div className="bg-[#0B0F2D] text-white border border-white/10 rounded-[var(--radius-large)] p-8 sm:p-14 lg:p-18 text-center shadow-xl flex flex-col items-center gap-6 relative overflow-hidden">
          {/* Subtle Ambient Brand Glows */}
          <div
            className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#FF735D]/15 pointer-events-none blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#6B5BFF]/15 pointer-events-none blur-3xl"
            aria-hidden="true"
          />

          {/* Triply Official Symbol */}
          <div className="relative mb-2">
            <Image
              src="/brand/triply/triply-symbol.png"
              alt="Triply destination mark"
              width={72}
              height={72}
              className="w-16 h-16 sm:w-18 sm:h-18 object-contain drop-shadow-md"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#A78BFA] text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-[#FF735D]" aria-hidden="true" />
            <span>Early Access Validation</span>
          </div>

          {/* Headline & Body */}
          <div className="max-w-2xl mx-auto flex flex-col gap-3.5">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Going somewhere soon?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
              Tell us your upcoming travel dates and destination. Be the first invited as Triply opens matching in your city.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="pt-2">
            <EarlyAccessLink
              source="landing_bottom_cta"
              variant="primary"
              size="lg"
              className="h-14 px-8 text-base font-bold rounded-full shadow-lg bg-gradient-to-r from-[#FF735D] via-[#E84A8B] to-[#6B5BFF] text-white hover:opacity-95 transition-all cursor-pointer"
              rightIcon={<ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />}
            >
              Add My Next Trip &rarr;
            </EarlyAccessLink>
          </div>

          <p className="text-xs text-slate-400">
            Free early access · 18+ only · Pre-launch validation · No live public profiles
          </p>
        </div>
      </Container>
    </Section>
  );
}
