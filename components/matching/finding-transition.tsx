"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { DestinationOption } from "@/types/trip";
import {
  calculateTripNights,
  formatDateRangeDisplay,
} from "@/lib/validation/trip-dates";

interface FindingTransitionProps {
  destination: DestinationOption;
  arrivalDate: string;
  departureDate: string;
  onComplete: () => void;
}

export function FindingTransition({
  destination,
  arrivalDate,
  departureDate,
  onComplete,
}: FindingTransitionProps) {
  const shouldReduceMotion = useReducedMotion();
  const nights = calculateTripNights(arrivalDate, departureDate);

  React.useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const duration = isReduced ? 50 : 1100;

    const timer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full max-w-lg mx-auto py-12 px-4 sm:px-6 flex flex-col items-center text-center animate-in fade-in duration-300"
    >
      {/* Central Pulsing Triply Symbol */}
      <div className="relative mb-6">
        <motion.div
          animate={shouldReduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-20 w-20 flex items-center justify-center select-none"
        >
          <Image
            src="/brand/triply/triply-symbol.png"
            alt="Triply loading"
            width={80}
            height={80}
            priority
            className="w-20 h-20 object-contain drop-shadow-md"
          />
        </motion.div>
      </div>

      {/* Selected Trip Details */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] mb-4">
        <span>{destination.label}</span>
        <span className="text-[var(--muted-foreground)]">&middot;</span>
        <span>{formatDateRangeDisplay(arrivalDate, departureDate)}</span>
        {nights > 0 && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--triply-coral)]/10 text-[var(--triply-coral)] font-bold">
            {nights}n
          </span>
        )}
      </div>

      {/* Heading */}
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight max-w-md leading-snug mb-3">
        Finding itineraries that overlap yours...
      </h2>

      <p className="text-sm text-[var(--muted-foreground)] max-w-sm leading-relaxed mb-6">
        Checking traveler dates in {destination.name} during your travel window.
      </p>

      {/* Subtle Progress Bar */}
      <div className="w-full max-w-xs bg-[var(--surface-soft)] border border-[var(--border)] rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-[#FF735D] via-[#E84A8B] to-[#6B5BFF] rounded-full"
        />
      </div>
    </div>
  );
}
