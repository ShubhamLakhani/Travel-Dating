"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { MessageSquare, Sparkles, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function PreTripSection() {
  const shouldReduceMotion = useReducedMotion();

  const timelineBarVariants: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const messageVariants: Variants = {
    hidden: { opacity: 0, y: 14, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <Section spacing="default" className="border-t border-[var(--border)] bg-[var(--surface-soft)]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
            <Badge variant="travel" className="w-fit text-xs font-semibold">
              Pre-Trip Discovery
            </Badge>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              Don&apos;t wait until you land.
            </h2>

            <p className="text-base text-[var(--muted-foreground)] leading-relaxed max-w-xl">
              Most travelers open dating apps the first evening in their hotel, only to spend days exchanging slow replies before anyone is free. Triply lets you discover people with overlapping dates weeks in advance.
            </p>

            <div className="pt-2 flex flex-col gap-3.5 text-sm text-[var(--foreground)]/85 max-w-md">
              <div className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-[var(--triply-coral)]/10 text-[var(--triply-coral)] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  1
                </span>
                <span>Discover who will be visiting your destination during the same travel window.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-[var(--triply-purple)]/10 text-[var(--triply-purple)] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  2
                </span>
                <span>Compare travel styles and pick a favorite neighborhood café or museum together.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-[var(--triply-magenta)]/10 text-[var(--triply-magenta)] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  3
                </span>
                <span>Touch down with plans already in motion instead of starting from scratch.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Card + Drawing Timeline + Message Entrance */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-large)] p-6 sm:p-7 shadow-sm flex flex-col gap-5 relative overflow-hidden">
              {/* Top Context Bar */}
              <div className="flex items-center justify-between border-b border-[var(--border)]/70 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[var(--triply-purple)]/10 text-[var(--triply-purple)] flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-[var(--foreground)]">
                    Itinerary Crossing Concept
                  </span>
                </div>
                <Badge variant="neutral" className="text-[10px] uppercase font-bold tracking-wider">
                  Florence &middot; 5 Days
                </Badge>
              </div>

              {/* Editorial Photography Accent */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-[var(--border)]">
                <Image
                  src="/images/editorial/travel-cafe.jpg"
                  alt="Traveler enjoying a quiet moment at a Florence outdoor cafe"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--triply-midnight)]/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="text-xs font-semibold text-white drop-shadow-sm flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#FF735D]" aria-hidden="true" />
                    Piazza del Duomo &middot; Morning coffee &amp; notes
                  </span>
                </div>
              </div>

              {/* Animated Overlap Timeline */}
              <div className="bg-[var(--surface-soft)] border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground)]">
                  <span>Itinerary Alignment</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FF735D]/15 to-[#6B5BFF]/15 text-[var(--triply-midnight)] border border-[var(--triply-coral)]/30">
                    5 days overlapping
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-1 text-xs">
                  {/* Your Trip */}
                  <div className="flex items-center justify-between text-[var(--muted-foreground)]">
                    <span className="font-semibold text-[var(--foreground)]">Your trip</span>
                    <span>Nov 10 to Nov 17</span>
                  </div>
                  <div className="w-full bg-[var(--surface)] h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      variants={timelineBarVariants}
                      initial={shouldReduceMotion ? "visible" : "hidden"}
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="h-full bg-[#6B5BFF] rounded-full w-4/5"
                    />
                  </div>

                  {/* Elena's Trip */}
                  <div className="flex items-center justify-between text-[var(--muted-foreground)] pt-1">
                    <span className="font-semibold text-[var(--foreground)]">Elena&apos;s trip</span>
                    <span>Nov 12 to Nov 18</span>
                  </div>
                  <div className="w-full bg-[var(--surface)] h-2.5 rounded-full overflow-hidden flex justify-end">
                    <motion.div
                      variants={timelineBarVariants}
                      initial={shouldReduceMotion ? "visible" : "hidden"}
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="h-full bg-[#FF735D] rounded-full w-4/5"
                    />
                  </div>
                </div>
              </div>

              {/* Sample Message Gentle Entrance */}
              <motion.div
                variants={messageVariants}
                initial={shouldReduceMotion ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true }}
                className="border border-[var(--border)] rounded-2xl p-4 bg-[var(--surface-soft)] flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--muted-foreground)]">
                  <MessageSquare className="h-3.5 w-3.5 text-[var(--triply-coral)]" aria-hidden="true" />
                  <span>Example connection note</span>
                </div>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl rounded-tl-sm p-3.5 shadow-xs">
                  <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
                    &ldquo;Looks like our Florence dates overlap next week. I&apos;m planning a morning photography walk around San Miniato if you&apos;d like to join.&rdquo;
                  </p>
                  <span className="text-[10px] text-[var(--muted-foreground)] mt-1.5 block">
                    Planned connection concept · No live messaging simulation
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
