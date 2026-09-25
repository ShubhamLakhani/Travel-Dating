"use client";

import { Heart, ChevronRight, Eye, MapPin, Calendar } from "lucide-react";
import { SampleMatch, INTEREST_LABELS } from "@/lib/validation/sample-profiles.ts";
import { formatSingleDateDisplay } from "@/lib/validation/trip-dates.ts";
import { TripOverlapTimeline } from "./trip-overlap-timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SampleMatchCardProps {
  match: SampleMatch;
  userArrival: string;
  userDeparture: string;
  currentIndex: number;
  totalProfiles: number;
  onNext: () => void;
  onOpenProfile: () => void;
  onInterested: () => void;
}

export function SampleMatchCard({
  match,
  userArrival,
  userDeparture,
  currentIndex,
  totalProfiles,
  onNext,
  onOpenProfile,
  onInterested,
}: SampleMatchCardProps) {
  const { profile, destination, arrivalDate, departureDate } = match;

  return (
    <div className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-5 sm:p-7 shadow-sm flex flex-col gap-5 relative overflow-hidden transition-all">
      {/* Top Header Strip: Example Profile Badge & Step Indicator */}
      <div className="flex items-center justify-between">
        <Badge variant="neutral" className="text-[11px] font-semibold tracking-wide uppercase">
          Example profile
        </Badge>
        <span className="text-xs font-semibold text-[var(--muted-foreground)]">
          {currentIndex + 1} of {totalProfiles}
        </span>
      </div>

      {/* Profile Identity Row */}
      <div
        onClick={onOpenProfile}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenProfile();
          }
        }}
        aria-label={`View expanded profile of ${profile.name}, ${profile.age}`}
        className="flex items-center gap-4 p-3 -mx-3 rounded-2xl hover:bg-[var(--surface-muted)]/60 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
      >
        {/* Polished Editorial Avatar */}
        <div
          style={{ backgroundColor: profile.avatarColor }}
          className="h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-sm shrink-0 select-none"
        >
          {profile.initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-xl font-bold text-[var(--foreground)] truncate">
              {profile.name}, {profile.age}
            </h3>
          </div>
          <div className="text-xs text-[var(--muted-foreground)] flex items-center gap-1.5 mt-0.5">
            <MapPin className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
            <span className="truncate">From {profile.homeCity}, {profile.homeCountry}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenProfile();
          }}
          className="p-2 rounded-full hover:bg-[var(--surface-muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
          aria-label="View profile details"
        >
          <Eye className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Destination & Overlapping Dates Summary */}
      <div className="bg-[var(--surface-muted)]/50 border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground)]">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#1C3F5E]" aria-hidden="true" />
            <span>Also heading to {destination.name}</span>
          </span>
          <span className="text-[var(--muted-foreground)]">
            {formatSingleDateDisplay(arrivalDate)} &ndash; {formatSingleDateDisplay(departureDate)}
          </span>
        </div>

        {/* Timeline Visualization */}
        <TripOverlapTimeline
          userArrival={userArrival}
          userDeparture={userDeparture}
          otherArrival={arrivalDate}
          otherDeparture={departureDate}
          otherName={profile.name}
          destinationName={destination.name}
        />
      </div>

      {/* Interests Summary Pills */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {profile.interests.map((interest) => (
          <span
            key={interest}
            className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)]"
          >
            {INTEREST_LABELS[interest] || interest}
          </span>
        ))}
      </div>

      {/* Card Actions: Next & Interested */}
      <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between gap-3">
        <Button
          variant="secondary"
          size="md"
          onClick={onNext}
          rightIcon={<ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />}
          className="text-sm font-semibold rounded-[var(--radius-button)] px-5"
        >
          Next
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={onInterested}
          rightIcon={<Heart className="h-4 w-4 fill-white ml-1.5" aria-hidden="true" />}
          className="text-sm font-semibold rounded-[var(--radius-button)] px-6 shadow-sm"
        >
          Interested
        </Button>
      </div>
    </div>
  );
}
