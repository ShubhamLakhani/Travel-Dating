"use client";

import { motion, useReducedMotion } from "motion/react";
import { Sparkles, Camera, Utensils, Coffee, Music, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function CompatibilitySection() {
  const shouldReduceMotion = useReducedMotion();

  const sharedSignals = [
    {
      label: "Photography",
      detail: "Early morning city walks with a camera",
      icon: Camera,
      color: "#6B5BFF",
    },
    {
      label: "Local food",
      detail: "Neighborhood bakeries, street food, and trattorias",
      icon: Utensils,
      color: "#FF735D",
    },
    {
      label: "Slow mornings",
      detail: "No 7 AM alarms or packed tour buses",
      icon: Coffee,
      color: "#E84A8B",
    },
    {
      label: "Live music",
      detail: "Discovering small acoustic and jazz spots",
      icon: Music,
      color: "#6B5BFF",
    },
    {
      label: "Similar intention",
      detail: "Both open to genuine romance while exploring",
      icon: HeartHandshake,
      color: "#FF735D",
    },
  ];

  return (
    <Section spacing="default" className="border-t border-[var(--border)] bg-[var(--background)]">
      <Container size="wide">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 mb-12 sm:mb-16">
          <Badge variant="travel" className="w-fit mx-auto text-xs font-semibold">
            Travel Compatibility
          </Badge>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            More than a location pin.
          </h2>

          <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
            Finding someone in the same city is only the first step. Triply focuses on concrete travel habits, so you can see whether you would actually enjoy spending an afternoon together.
          </p>
        </div>

        {/* Visual Converging Tags Showcase */}
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Top Traveler Badges: Traveler A & Traveler B */}
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
              <div className="h-6 w-6 rounded-full bg-[#6B5BFF] text-white flex items-center justify-center text-[10px] font-bold">
                A
              </div>
              <span className="text-[var(--foreground)]">Your Travel Style</span>
            </div>
            <div className="flex items-center justify-end gap-2 p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs text-right">
              <span className="text-[var(--foreground)]">Match&apos;s Travel Style</span>
              <div className="h-6 w-6 rounded-full bg-[#FF735D] text-white flex items-center justify-center text-[10px] font-bold">
                B
              </div>
            </div>
          </div>

          {/* Central Converging Card */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-large)] p-6 sm:p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[var(--border)]/70 pb-4">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-r from-[#FF735D] to-[#6B5BFF] flex items-center justify-center text-white">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
                <span className="font-display font-bold text-sm sm:text-base text-[var(--foreground)]">
                  Converging Travel Signals
                </span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-[#FF735D]/10 via-[#E84A8B]/10 to-[#6B5BFF]/10 text-[var(--triply-midnight)] border border-[#E84A8B]/20">
                Shared habits
              </span>
            </div>

            {/* List of Converging Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sharedSignals.map((signal, index) => {
                const Icon = signal.icon;
                return (
                  <motion.div
                    key={signal.label}
                    initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-start gap-3.5 hover:border-[var(--primary)]/30 hover:shadow-xs transition-all"
                  >
                    <div
                      style={{ color: signal.color }}
                      className="h-10 w-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0 shadow-xs"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-[var(--foreground)]">
                          {signal.label}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                        {signal.detail}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-2 text-xs text-[var(--muted-foreground)] text-center">
              Clear, tangible compatibility signals rather than misleading percentage scores.
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
