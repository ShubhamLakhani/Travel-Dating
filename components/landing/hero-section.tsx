"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TripSearchDraft } from "@/types/trip";
import { TripSearchCard } from "./trip-search-card";
import { TripCrossingTeaser } from "./trip-crossing-teaser";
import { MatchPreview } from "@/components/matching/match-preview";
import {
  getStoredTripDraft,
  subscribeToTripStorage,
  saveTripDraft,
} from "@/lib/validation/trip-storage";
import { trackEvent } from "@/lib/analytics/track";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

interface HeroSectionProps {
  initialSearchDraft?: TripSearchDraft;
}

const EMPTY_DRAFT: TripSearchDraft = {
  destination: null,
  arrivalDate: null,
  departureDate: null,
};

export function HeroSection({ initialSearchDraft }: HeroSectionProps) {
  const storedDraft = React.useSyncExternalStore(
    subscribeToTripStorage,
    getStoredTripDraft,
    () => null
  );

  const [activeDraft, setActiveDraft] = React.useState<TripSearchDraft | null>(
    null
  );
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Track landing_view once on mount
  React.useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.LANDING_VIEW);
  }, []);

  const currentDraft =
    activeDraft || initialSearchDraft || storedDraft || EMPTY_DRAFT;

  if (isSubmitted && currentDraft.destination && currentDraft.arrivalDate && currentDraft.departureDate) {
    return (
      <MatchPreview
        draft={currentDraft}
        onModifyTrip={() => setIsSubmitted(false)}
      />
    );
  }

  return (
    <Section spacing="sm" className="pt-6 sm:pt-10 pb-16">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (55%): Eyebrow, Headline, Copy, Trip Search Card */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <div className="flex flex-col gap-3.5 max-w-xl">
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-[var(--triply-purple)] font-mono">
                Two travelers. One shared destination.
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.1]">
                Meet someone going where you&apos;re going.
              </h1>
              <p className="text-base sm:text-lg text-[var(--foreground)]/75 leading-relaxed font-normal">
                Triply connects people whose trips overlap, so you can discover someone before you arrive or while you&apos;re both there.
              </p>
            </div>

            {/* Trip Search Card Component */}
            <TripSearchCard
              key={`${currentDraft.destination?.id || "empty"}-${currentDraft.arrivalDate || "no-arr"}-${currentDraft.departureDate || "no-dep"}`}
              initialDraft={currentDraft}
              onFindMatches={(completedDraft) => {
                setActiveDraft(completedDraft);
                saveTripDraft(completedDraft);
                setIsSubmitted(true);
              }}
            />
          </div>

          {/* Right Column (45%): Animated Triply Travel Visual */}
          <div className="lg:col-span-5 flex justify-center w-full pt-4 lg:pt-0">
            <TripCrossingTeaser />
          </div>
        </div>
      </Container>
    </Section>
  );
}
