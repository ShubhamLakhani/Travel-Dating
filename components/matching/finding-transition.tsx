"use client";

import * as React from "react";
import { Compass, Sparkles } from "lucide-react";
import { DestinationOption } from "@/types/trip";
import {
  calculateTripNights,
  formatDateRangeDisplay,
} from "@/lib/validation/trip-dates.ts";

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
  const nights = calculateTripNights(arrivalDate, departureDate);

  React.useEffect(() => {
    // Check prefers-reduced-motion
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const duration = isReduced ? 50 : 1200;

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
      {/* Central Pulsing Icon */}
      <div className="relative mb-6">
        <div
          className="absolute -inset-4 rounded-full bg-[var(--primary)]/15 animate-ping opacity-75"
          aria-hidden="true"
        />
        <div className="relative h-16 w-16 rounded-full bg-[var(--surface)] border border-[var(--primary)]/30 shadow-lg flex items-center justify-center text-[var(--primary)]">
          <Compass className="h-8 w-8 animate-spin" style={{ animationDuration: "3s" }} aria-hidden="true" />
        </div>
      </div>

      {/* Selected Trip Details */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] mb-4">
        <span>{destination.label}</span>
        <span className="text-[var(--muted-foreground)]">&middot;</span>
        <span>{formatDateRangeDisplay(arrivalDate, departureDate)}</span>
        {nights > 0 && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--travel-accent)] text-[#1C3F5E]">
            {nights}n
          </span>
        )}
      </div>

      {/* Heading */}
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight max-w-md leading-snug mb-3">
        Finding people whose trips could overlap yours…
      </h2>

      <p className="text-sm text-[var(--muted-foreground)] max-w-sm leading-relaxed mb-8">
        Checking traveler itineraries in {destination.name} during your travel dates.
      </p>

      {/* Visual Crossing Lines Animation */}
      <div className="w-full max-w-xs bg-[var(--surface-muted)] border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-3 shadow-inner">
        {/* User bar */}
        <div className="flex items-center justify-between text-[11px] font-medium text-[var(--muted-foreground)]">
          <span>Your dates</span>
          <span className="text-[var(--primary)] font-semibold">Active</span>
        </div>
        <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--primary)] rounded-full w-full animate-pulse" />
        </div>

        {/* Intersection marker */}
        <div className="flex items-center justify-center gap-1.5 py-1 text-xs font-semibold text-[var(--primary)]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Locating overlapping days</span>
        </div>

        {/* Other bar */}
        <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden">
          <div className="h-full bg-[#1C3F5E] rounded-full w-3/4 ml-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}
