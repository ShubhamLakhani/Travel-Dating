"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TripSearchDraft } from "@/types/trip";
import { generateSampleMatches, SampleMatch } from "@/lib/validation/sample-profiles.ts";
import {
  calculateTripNights,
  formatDateRangeDisplay,
  getArrivalMonthKey,
} from "@/lib/validation/trip-dates.ts";
import { FindingTransition } from "./finding-transition";
import { SampleMatchCard } from "./sample-match-card";
import { SampleProfileDialog } from "./sample-profile-dialog";
import { InterestedPreviewDialog } from "./interested-preview-dialog";
import { trackEvent } from "@/lib/analytics/track";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { Container } from "@/components/ui/container";

interface MatchPreviewProps {
  draft: TripSearchDraft;
  onModifyTrip: () => void;
}

export function MatchPreview({ draft, onModifyTrip }: MatchPreviewProps) {
  const [isFinding, setIsFinding] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const [isInterestedModalOpen, setIsInterestedModalOpen] = React.useState(false);
  const [activeInterestMatch, setActiveInterestMatch] = React.useState<SampleMatch | null>(null);

  const destination = draft.destination!;
  const userArrival = draft.arrivalDate!;
  const userDeparture = draft.departureDate!;

  // Deterministically generate sample matches relative to user's selected trip
  const sampleMatches = React.useMemo(() => {
    return generateSampleMatches(draft);
  }, [draft]);

  const currentMatch = sampleMatches[currentIndex] || sampleMatches[0];

  const handleFindingComplete = React.useCallback(() => {
    setIsFinding(false);

    // Track sample_matches_viewed once preview is revealed
    trackEvent(ANALYTICS_EVENTS.SAMPLE_MATCHES_VIEWED, {
      destination: destination.name,
      destination_country: destination.country,
      arrival_month: getArrivalMonthKey(userArrival),
      trip_duration_days: calculateTripNights(userArrival, userDeparture),
    });
  }, [destination, userArrival, userDeparture]);

  const handleNextProfile = () => {
    setCurrentIndex((prev) => (prev + 1) % sampleMatches.length);
  };

  const handleOpenProfile = () => {
    trackEvent(ANALYTICS_EVENTS.SAMPLE_PROFILE_OPENED, {
      sample_profile_id: currentMatch.profile.id,
      destination: destination.name,
      overlap_days: currentMatch.overlap.overlapDays,
    });
    setIsProfileModalOpen(true);
  };

  const handleInterested = (matchToInterest: SampleMatch = currentMatch) => {
    trackEvent(ANALYTICS_EVENTS.SAMPLE_PROFILE_INTEREST_CLICKED, {
      sample_profile_id: matchToInterest.profile.id,
      destination: destination.name,
      arrival_month: getArrivalMonthKey(userArrival),
      trip_duration_days: calculateTripNights(userArrival, userDeparture),
      overlap_days: matchToInterest.overlap.overlapDays,
    });

    setActiveInterestMatch(matchToInterest);
    setIsInterestedModalOpen(true);
  };

  if (isFinding) {
    return (
      <FindingTransition
        destination={destination}
        arrivalDate={userArrival}
        departureDate={userDeparture}
        onComplete={handleFindingComplete}
      />
    );
  }

  return (
    <div className="w-full py-6 sm:py-10 animate-in fade-in duration-300">
      <Container size="default" className="flex flex-col items-center">
        {/* Top Navigation & Context Bar */}
        <div className="w-full max-w-lg flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={onModifyTrip}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)] rounded-md px-1.5 py-1"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Modify Trip</span>
          </button>

          <div className="text-xs font-semibold text-[var(--muted-foreground)] bg-[var(--surface-muted)] border border-[var(--border)] px-3 py-1 rounded-full truncate max-w-[200px] sm:max-w-none">
            {destination.name} &middot; {formatDateRangeDisplay(userArrival, userDeparture)}
          </div>
        </div>

        {/* Section Headline */}
        <div className="text-center max-w-md mx-auto mb-6 flex flex-col gap-2">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Your trip could cross paths with…
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
            People traveling to {destination.name} during overlapping dates.
          </p>
        </div>

        {/* Match Card */}
        {currentMatch && (
          <SampleMatchCard
            match={currentMatch}
            userArrival={userArrival}
            userDeparture={userDeparture}
            currentIndex={currentIndex}
            totalProfiles={sampleMatches.length}
            onNext={handleNextProfile}
            onOpenProfile={handleOpenProfile}
            onInterested={() => handleInterested(currentMatch)}
          />
        )}

        {/* Secondary Early Access Link */}
        <div className="mt-8 text-center">
          <Link
            href="/join"
            className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] underline underline-offset-4 transition-colors"
          >
            Join early access to connect with real travelers
          </Link>
        </div>

        {/* Expanded Profile Dialog */}
        {currentMatch && (
          <SampleProfileDialog
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            match={currentMatch}
            userArrival={userArrival}
            userDeparture={userDeparture}
            onInterested={(m) => handleInterested(m)}
          />
        )}

        {/* Interested Disclosure Modal */}
        <InterestedPreviewDialog
          isOpen={isInterestedModalOpen}
          onClose={() => setIsInterestedModalOpen(false)}
          match={activeInterestMatch}
          userArrival={userArrival}
          userDeparture={userDeparture}
        />
      </Container>
    </div>
  );
}
