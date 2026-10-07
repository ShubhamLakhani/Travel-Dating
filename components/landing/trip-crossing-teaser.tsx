"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { MapPin, Sparkles, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TripCrossingTeaser() {
  const shouldReduceMotion = useReducedMotion();

  // Motion variants
  const pinVariants: Variants = {
    hidden: { opacity: 0, y: -12, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const pathLeftVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const pathRightVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const convergeBadgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85, y: 8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const cardsContainerVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 1.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-7 shadow-sm flex flex-col gap-5 relative overflow-hidden transition-all">
      {/* Subtle brand ambient glow */}
      <div
        className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-[var(--triply-purple)]/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-[var(--triply-coral)]/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Header Context Strip */}
      <div className="flex items-center justify-between border-b border-[var(--border)]/70 pb-3.5">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-[var(--triply-purple)]/10 text-[var(--triply-purple)] flex items-center justify-center">
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
          </div>
          <span className="font-semibold text-xs text-[var(--foreground)] tracking-wide">
            Two travelers. One destination.
          </span>
        </div>
        <Badge variant="neutral" className="text-[10px] tracking-normal font-medium">
          Planned matching preview
        </Badge>
      </div>

      {/* Visual Convergence Stage */}
      <div className="relative w-full h-44 sm:h-48 bg-[var(--surface-soft)] border border-[var(--border)]/60 rounded-2xl flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Animated Destination Pin */}
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
          variants={pinVariants}
          className="relative z-20 flex flex-col items-center mb-1"
        >
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#FF735D] via-[#E84A8B] to-[#6B5BFF] p-0.5 shadow-md flex items-center justify-center">
            <div className="h-full w-full rounded-full bg-[var(--surface)] flex items-center justify-center text-[#FF735D]">
              <MapPin className="h-4 w-4" fill="#FF735D" aria-hidden="true" />
            </div>
          </div>
          <span className="text-[11px] font-bold text-[var(--foreground)] mt-1 tracking-tight">
            Bali, Indonesia
          </span>
        </motion.div>

        {/* Converging Paths SVG */}
        <svg
          viewBox="0 0 340 100"
          className="w-full h-24 absolute inset-x-0 bottom-6 pointer-events-none"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Subtle background route grid */}
          <line
            x1="20"
            y1="80"
            x2="320"
            y2="80"
            stroke="var(--border)"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />

          {/* Dream Purple Left Traveler Path */}
          <motion.path
            d="M 24 80 Q 90 80 170 25"
            stroke="#6B5BFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            variants={pathLeftVariants}
          />

          {/* Sunset Coral Right Traveler Path */}
          <motion.path
            d="M 316 80 Q 250 80 170 25"
            stroke="#FF735D"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            variants={pathRightVariants}
          />

          {/* Node dots at departure points */}
          <circle cx="24" cy="80" r="4.5" fill="#6B5BFF" />
          <circle cx="316" cy="80" r="4.5" fill="#FF735D" />

          {/* Convergence Node Glow */}
          <motion.circle
            cx="170"
            cy="25"
            r="6"
            fill="url(#triply-grad)"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            variants={convergeBadgeVariants}
          />

          <defs>
            <linearGradient id="triply-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF735D" />
              <stop offset="50%" stopColor="#E84A8B" />
              <stop offset="100%" stopColor="#6B5BFF" />
            </linearGradient>
          </defs>
        </svg>

        {/* Convergence Overlap Pill */}
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
          variants={convergeBadgeVariants}
          className="relative z-20 mt-auto mb-2"
        >
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FF735D] via-[#E84A8B] to-[#6B5BFF] p-[1px] shadow-sm">
            <div className="px-3 py-1 rounded-full bg-[var(--surface)] flex items-center gap-1.5 text-xs font-bold text-[var(--triply-midnight)]">
              <Sparkles className="h-3 w-3 text-[#FF735D]" aria-hidden="true" />
              <span>5 days overlapping in Bali</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Itinerary Crossing Cards */}
      <motion.div
        initial={shouldReduceMotion ? "visible" : "hidden"}
        animate="visible"
        variants={cardsContainerVariants}
        className="flex flex-col gap-3"
      >
        {/* Traveler A: Purple */}
        <div className="bg-[var(--surface-soft)] border border-[var(--border)] rounded-2xl p-3.5 flex flex-col gap-2 transition-all hover:border-[var(--triply-purple)]/40">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#6B5BFF] text-white text-[10px] font-bold flex items-center justify-center">
                A
              </div>
              <span className="font-semibold text-[var(--foreground)]">Your trip</span>
            </div>
            <span className="font-medium text-[var(--muted-foreground)]">Dec 04 to Dec 12</span>
          </div>
          {/* Overlap timeline bar */}
          <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden flex">
            <div className="w-[72%] bg-[#6B5BFF] h-full rounded-full" />
          </div>
        </div>

        {/* Traveler B: Coral */}
        <div className="bg-[var(--surface-soft)] border border-[var(--border)] rounded-2xl p-3.5 flex flex-col gap-2 transition-all hover:border-[var(--triply-coral)]/40">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#FF735D] text-white text-[10px] font-bold flex items-center justify-center">
                B
              </div>
              <span className="font-semibold text-[var(--foreground)]">Compatible traveler</span>
            </div>
            <span className="font-medium text-[var(--muted-foreground)]">Dec 07 to Dec 16</span>
          </div>
          {/* Overlap timeline bar shifted */}
          <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden flex">
            <div className="w-[28%] bg-transparent h-full" />
            <div className="w-[66%] bg-[#FF735D] h-full rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Reassurance note */}
      <div className="text-xs text-[var(--muted-foreground)] text-center leading-relaxed pt-1">
        Triply helps you discover people whose trips overlap yours, so you can connect before you land.
      </div>
    </div>
  );
}
