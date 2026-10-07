"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import {
  calculateTripNights,
  calculateTripOverlap,
  formatSingleDateDisplay,
  formatOverlapDaysLabel,
} from "@/lib/validation/trip-dates";

interface TripOverlapTimelineProps {
  userArrival: string;
  userDeparture: string;
  otherArrival: string;
  otherDeparture: string;
  otherName: string;
  destinationName?: string;
  className?: string;
}

export function TripOverlapTimeline({
  userArrival,
  userDeparture,
  otherArrival,
  otherDeparture,
  otherName,
  destinationName = "destination",
  className = "",
}: TripOverlapTimelineProps) {
  const shouldReduceMotion = useReducedMotion();

  const overlap = React.useMemo(() => {
    return calculateTripOverlap(userArrival, userDeparture, otherArrival, otherDeparture);
  }, [userArrival, userDeparture, otherArrival, otherDeparture]);

  // Overall window: from earliest arrival to latest departure
  const windowStart = userArrival < otherArrival ? userArrival : otherArrival;
  const windowEnd = userDeparture > otherDeparture ? userDeparture : otherDeparture;
  const totalWindowDays = Math.max(1, calculateTripNights(windowStart, windowEnd));

  const getPositionPercent = (dateStr: string) => {
    const daysFromStart = calculateTripNights(windowStart, dateStr);
    return Math.min(100, Math.max(0, (daysFromStart / totalWindowDays) * 100));
  };

  const userLeft = getPositionPercent(userArrival);
  const userWidth = Math.max(8, getPositionPercent(userDeparture) - userLeft);

  const otherLeft = getPositionPercent(otherArrival);
  const otherWidth = Math.max(8, getPositionPercent(otherDeparture) - otherLeft);

  const overlapLeft = overlap.overlapStart ? getPositionPercent(overlap.overlapStart) : 0;
  const overlapWidth =
    overlap.overlapStart && overlap.overlapEnd
      ? Math.max(6, getPositionPercent(overlap.overlapEnd) - overlapLeft)
      : 0;

  const accessibleDescription = `Your ${destinationName} trip is ${formatSingleDateDisplay(
    userArrival
  )} to ${formatSingleDateDisplay(userDeparture)}. ${otherName}'s example trip is ${formatSingleDateDisplay(
    otherArrival
  )} to ${formatSingleDateDisplay(otherDeparture)}. The trips overlap for ${
    overlap.overlapDays
  } days.`;

  return (
    <div className={`w-full flex flex-col gap-2.5 ${className}`}>
      {/* Screen Reader Description */}
      <span className="sr-only">{accessibleDescription}</span>

      {/* Visual Timeline Bar Container */}
      <div
        className="w-full bg-[var(--surface-soft)] border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-2.5 relative select-none"
        aria-hidden="true"
      >
        {/* User Trip Track (Dream Purple #6B5BFF) */}
        <div className="flex items-center gap-2 text-xs">
          <span className="w-12 text-[11px] font-semibold text-[var(--foreground)] truncate shrink-0">
            You
          </span>
          <div className="relative flex-1 h-6 bg-[var(--surface)] rounded-md overflow-hidden border border-[var(--border)]/50">
            <motion.div
              style={{ left: `${userLeft}%`, width: `${userWidth}%` }}
              initial={shouldReduceMotion ? false : { x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 bottom-0 bg-[#6B5BFF] rounded-md flex items-center px-2 shadow-xs"
            >
              <span className="text-[10px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
                {formatSingleDateDisplay(userArrival)} to {formatSingleDateDisplay(userDeparture)}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Other Person Track (Sunset Coral #FF735D) */}
        <div className="flex items-center gap-2 text-xs">
          <span className="w-12 text-[11px] font-semibold text-[var(--foreground)] truncate shrink-0">
            {otherName}
          </span>
          <div className="relative flex-1 h-6 bg-[var(--surface)] rounded-md overflow-hidden border border-[var(--border)]/50">
            <motion.div
              style={{ left: `${otherLeft}%`, width: `${otherWidth}%` }}
              initial={shouldReduceMotion ? false : { x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 bottom-0 bg-[#FF735D] rounded-md flex items-center px-2 shadow-xs"
            >
              <span className="text-[10px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
                {formatSingleDateDisplay(otherArrival)} to {formatSingleDateDisplay(otherDeparture)}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Overlap Range Highlight (Signature Gradient) */}
        {overlap.hasOverlap && overlapWidth > 0 && (
          <div className="flex items-center gap-2 text-xs pt-1">
            <span className="w-12 text-[11px] font-bold text-[var(--triply-midnight)] truncate shrink-0">
              Overlap
            </span>
            <div className="relative flex-1 h-3 rounded-md overflow-hidden bg-transparent">
              <motion.div
                style={{ left: `${overlapLeft}%`, width: `${overlapWidth}%` }}
                initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 bottom-0 bg-gradient-to-r from-[#FF735D] via-[#E84A8B] to-[#6B5BFF] rounded-md shadow-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* Overlap Summary Badge ("X days together") */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="flex items-center justify-between px-1"
      >
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground)]">
          <Sparkles className="h-3.5 w-3.5 text-[#FF735D]" aria-hidden="true" />
          <span>{formatOverlapDaysLabel(overlap.overlapDays)}</span>
        </div>

        <span className="text-[11px] text-[var(--muted-foreground)]">
          {overlap.overlapStart && overlap.overlapEnd
            ? `${formatSingleDateDisplay(overlap.overlapStart)} to ${formatSingleDateDisplay(overlap.overlapEnd)}`
            : "No overlapping days"}
        </span>
      </motion.div>
    </div>
  );
}
