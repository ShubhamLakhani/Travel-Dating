"use client";

import { ShieldCheck, MapPinOff, Share2, Clock, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function SafetyPreviewSection() {
  const safetyFeatures = [
    {
      icon: ShieldCheck,
      title: "Selfie verification",
      description: "Planned selfie check before profiles can message, helping keep interactions genuine.",
      badge: "Planned verification",
      accent: "#FF735D",
    },
    {
      icon: MapPinOff,
      title: "Approximate location only",
      description: "Your exact accommodation, villa, or live GPS is never tracked or shared. You choose where to meet.",
      badge: "Privacy by design",
      accent: "#A78BFA",
    },
    {
      icon: Share2,
      title: "Share your date details",
      description: "Easily send meet details, venue, and timing to a trusted friend or family member before you go.",
      badge: "Planned safety feature",
      accent: "#6B5BFF",
    },
    {
      icon: Clock,
      title: "Comfort check-ins",
      description: "Automated prompts to verify your date is going well and remind you of safe departure options.",
      badge: "Product concept",
      accent: "#E84A8B",
    },
  ];

  return (
    <Section
      id="safety"
      spacing="default"
      className="border-t border-[var(--border)] bg-[#0B0F2D] text-white scroll-mt-20 relative overflow-hidden"
    >
      {/* Background brand ambient glows */}
      <div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#6B5BFF]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#FF735D]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container size="wide">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-3.5 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#A78BFA] text-xs font-semibold uppercase tracking-wider mx-auto border border-white/15">
            <ShieldCheck className="h-3.5 w-3.5 text-[#FF735D]" aria-hidden="true" />
            <span>Trust &amp; Safety by Design</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Travel dating should feel calm and safe.
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            Meeting someone new in an unfamiliar city requires higher standards. Triply is being designed from day one with thoughtful travel safeguards.
          </p>
        </div>

        {/* 2-Column Layout: 4 Features on Left, Preview Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left: 4 Planned Features */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {safetyFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-[var(--radius-card)] p-5 sm:p-6 shadow-sm flex flex-col justify-between transition-all backdrop-blur-xs"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div
                        style={{ color: feat.accent, backgroundColor: `${feat.accent}15` }}
                        className="h-10 w-10 rounded-xl flex items-center justify-center"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="text-[10px] font-semibold text-[#A78BFA] bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full">
                        {feat.badge}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-base sm:text-lg font-bold text-white">
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Planned Safety Experience Preview Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-sm bg-white/[0.05] border border-white/15 rounded-[var(--radius-large)] p-6 shadow-xl flex flex-col gap-5 relative backdrop-blur-md">
              {/* Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A78BFA]">
                  Safety Feature Preview
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white">
                  Concept
                </span>
              </div>

              {/* Verified Badge Mock */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Selfie Verified Profile</span>
                  <span className="text-[11px] text-slate-300">Identity checked before matching</span>
                </div>
              </div>

              {/* Approximate Location Notice */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="h-10 w-10 rounded-full bg-[#A78BFA]/20 text-[#A78BFA] flex items-center justify-center shrink-0">
                  <MapPinOff className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Zero Live Location Tracking</span>
                  <span className="text-[11px] text-slate-300">Hotels and real-time GPS stay private</span>
                </div>
              </div>

              {/* Public Meetup Reassurance */}
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Triply always recommends meeting in busy, well-lit public spots like museums, bakeries, or central piazzas.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
