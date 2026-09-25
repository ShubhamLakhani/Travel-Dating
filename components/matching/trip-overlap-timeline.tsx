"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import {
  calculateTripNights,
  calculateTripOverlap,
  formatSingleDateDisplay,
  formatOverlapDaysLabel,
} from "@/lib/validation/trip-dates.ts";

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
        className="w-full bg-[var(--surface-muted)] border border-[var(--border)] rounded-2xl p-3.5 flex flex-col gap-2 relative select-none"
        aria-hidden="true"
      >
        {/* User Trip Track */}
        <div className="flex items-center gap-2 text-xs">
          <span className="w-12 text-[11px] font-semibold text-[var(--foreground)] truncate shrink-0">
            You
          </span>
          <div className="relative flex-1 h-6 bg-[var(--surface)] rounded-md overflow-hidden">
            <div
              style={{ left: `${userLeft}%`, width: `${userWidth}%` }}
              className="absolute top-0 bottom-0 bg-[var(--primary)] rounded-md flex items-center px-1.5 shadow-xs"
            >
              <span className="text-[10px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
                {formatSingleDateDisplay(userArrival)} &ndash; {formatSingleDateDisplay(userDeparture)}
              </span>
            </div>
          </div>
        </div>

        {/* Other Person Track */}
        <div className="flex items-center gap-2 text-xs">
          <span className="w-12 text-[11px] font-semibold text-[var(--foreground)] truncate shrink-0">
            {otherName}
          </span>
          <div className="relative flex-1 h-6 bg-[var(--surface)] rounded-md overflow-hidden">
            <div
              style={{ left: `${otherLeft}%`, width: `${otherWidth}%` }}
              className="absolute top-0 bottom-0 bg-[#1C3F5E] rounded-md flex items-center px-1.5 shadow-xs"
            >
              <span className="text-[10px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
                {formatSingleDateDisplay(otherArrival)} &ndash; {formatSingleDateDisplay(otherDeparture)}
              </span>
            </div>
          </div>
        </div>

        {/* Overlap Indicator Region */}
        {overlap.hasOverlap && (
          <div className="relative flex items-center gap-2 text-xs pt-0.5">
            <span className="w-12 text-[10px] font-bold text-[var(--primary)] shrink-0 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
            </span>
            <div className="relative flex-1 h-2 bg-transparent">
              <div
                style={{ left: `${overlapLeft}%`, width: `${overlapWidth}%` }}
                className="absolute top-0 bottom-0 bg-[var(--primary)]/30 border border-[var(--primary)] rounded-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Overlap Summary Text */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-[var(--primary)] flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{formatOverlapDaysLabel(overlap.overlapDays)}</span>
        </span>
        <span className="text-[11px] text-[var(--muted-foreground)]">
          Arrival-inclusive &middot; departure-exclusive
        </span>
      </div>
    </div>
  );
}
