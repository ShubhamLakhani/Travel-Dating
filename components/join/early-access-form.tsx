"use client";

import * as React from "react";
import { EarlyAccessDraft, EarlyAccessTripState, EarlyAccessProfileState, EarlyAccessContactState, RelationshipIntention, TravelInterest } from "@/types/signup";
import { TripSearchDraft } from "@/types/trip";
import {
  createEmptySignupDraft,
  getStoredSignupDraft,
  saveSignupDraft,
  rotateSubmissionId,
} from "@/lib/validation/signup-storage";
import { calculateTripNights, getArrivalMonthKey, getTodayCalendarDate } from "@/lib/validation/trip-dates";
import { trackEvent } from "@/lib/analytics/track";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { JoinProgress } from "./join-progress";
import { StepTrip } from "./step-trip";
import { StepProfile } from "./step-profile";
import { StepIntentions } from "./step-intentions";
import { StepContact } from "./step-contact";
import { StepReview } from "./step-review";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface EarlyAccessFormProps {
  initialTrip?: TripSearchDraft | null;
}

export function EarlyAccessForm({ initialTrip }: EarlyAccessFormProps) {
  const shouldReduceMotion = useReducedMotion();
  const [draft, setDraft] = React.useState<EarlyAccessDraft>(() => {
    if (typeof window !== "undefined") {
      const existing = getStoredSignupDraft();
      if (existing) {
        // If initialTrip is provided from search, sync it if draft trip is empty or if draft has a past date or different destination
        if (initialTrip?.destination) {
          const isPastDate = existing.trip.arrivalDate && existing.trip.arrivalDate < getTodayCalendarDate();
          if (!existing.trip.destination || isPastDate || existing.trip.destination.id !== initialTrip.destination.id) {
            existing.trip.destination = initialTrip.destination;
            existing.trip.arrivalDate = initialTrip.arrivalDate;
            existing.trip.departureDate = initialTrip.departureDate;
          }
        }
        // If draft arrival date is in the past, reset step to 1 so user can pick future dates
        if (existing.trip.arrivalDate && existing.trip.arrivalDate < getTodayCalendarDate()) {
          existing.step = 1;
        }
        return existing;
      }
    }
    return createEmptySignupDraft(initialTrip);
  });

  const formTopRef = React.useRef<HTMLDivElement>(null);

  // Sync draft to sessionStorage whenever it changes
  React.useEffect(() => {
    saveSignupDraft(draft);
  }, [draft]);

  const scrollToTop = () => {
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Step 1: Trip updates & continue
  const handleUpdateTrip = (updated: Partial<EarlyAccessTripState>) => {
    setDraft((prev) => ({
      ...prev,
      trip: { ...prev.trip, ...updated },
    }));
  };

  const handleContinueFromTrip = () => {
    trackEvent(ANALYTICS_EVENTS.EARLY_ACCESS_TRIP_COMPLETED, {
      destination: draft.trip.destination?.name,
      destination_country: draft.trip.destination?.country,
      arrival_month: draft.trip.arrivalDate
        ? getArrivalMonthKey(draft.trip.arrivalDate)
        : undefined,
      trip_duration_days:
        draft.trip.arrivalDate && draft.trip.departureDate
          ? calculateTripNights(draft.trip.arrivalDate, draft.trip.departureDate)
          : undefined,
      traveler_type: draft.trip.travelMode || undefined,
    });

    setDraft((prev) => ({ ...prev, step: 2 }));
    scrollToTop();
  };

  // Step 2: Profile updates & navigation
  const handleUpdateProfile = (updated: Partial<EarlyAccessProfileState>) => {
    setDraft((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updated },
    }));
  };

  const handleContinueFromProfile = () => {
    setDraft((prev) => ({ ...prev, step: 3 }));
    scrollToTop();
  };

  // Step 3: Intentions & interests updates & navigation
  const handleUpdateIntentions = (intentions: RelationshipIntention[]) => {
    setDraft((prev) => ({ ...prev, intentions }));
  };

  const handleUpdateInterests = (interests: TravelInterest[], custom?: string) => {
    setDraft((prev) => ({
      ...prev,
      interests,
      customInterest: custom !== undefined ? custom : prev.customInterest,
    }));
  };

  const handleContinueFromPreferences = () => {
    trackEvent(ANALYTICS_EVENTS.EARLY_ACCESS_PREFERENCES_COMPLETED, {
      traveler_local_preference: draft.profile.meetPreference || undefined,
      relationship_intention: draft.intentions[0] || undefined,
    });

    setDraft((prev) => ({ ...prev, step: 4 }));
    scrollToTop();
  };

  // Step 4: Contact updates & completion
  const handleUpdateContact = (updated: Partial<EarlyAccessContactState>) => {
    setDraft((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...updated },
    }));
  };

  const handleContinueFromContact = () => {
    // Explicitly track non-PII completion event
    trackEvent(ANALYTICS_EVENTS.EARLY_ACCESS_PROFILE_COMPLETED, {
      destination: draft.trip.destination?.name,
      destination_country: draft.trip.destination?.country,
      arrival_month: draft.trip.arrivalDate
        ? getArrivalMonthKey(draft.trip.arrivalDate)
        : undefined,
      trip_duration_days:
        draft.trip.arrivalDate && draft.trip.departureDate
          ? calculateTripNights(draft.trip.arrivalDate, draft.trip.departureDate)
          : undefined,
      age_band: draft.profile.ageBand || undefined,
    });

    setDraft((prev) => ({
      ...prev,
      step: "review",
      completedAt: new Date().toISOString(),
    }));
    scrollToTop();
  };

  // Interview opt-in update
  const handleUpdateInterview = (optIn: boolean) => {
    setDraft((prev) => ({ ...prev, interviewOptIn: optIn }));
  };

  const currentStepKey = String(draft.step);

  return (
    <div ref={formTopRef} className="w-full max-w-xl mx-auto flex flex-col gap-6 scroll-mt-6">
      <JoinProgress currentStep={draft.step} />

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-8 shadow-sm overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStepKey}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 14 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -14 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {draft.step === 1 && (
              <StepTrip
                trip={draft.trip}
                onUpdate={handleUpdateTrip}
                onContinue={handleContinueFromTrip}
              />
            )}

            {draft.step === 2 && (
              <StepProfile
                profile={draft.profile}
                onUpdate={handleUpdateProfile}
                onBack={() => {
                  setDraft((prev) => ({ ...prev, step: 1 }));
                  scrollToTop();
                }}
                onContinue={handleContinueFromProfile}
              />
            )}

            {draft.step === 3 && (
              <StepIntentions
                intentions={draft.intentions}
                interests={draft.interests}
                customInterest={draft.customInterest}
                onUpdateIntentions={handleUpdateIntentions}
                onUpdateInterests={handleUpdateInterests}
                onBack={() => {
                  setDraft((prev) => ({ ...prev, step: 2 }));
                  scrollToTop();
                }}
                onContinue={handleContinueFromPreferences}
              />
            )}

            {draft.step === 4 && (
              <StepContact
                contact={draft.contact}
                onUpdate={handleUpdateContact}
                onBack={() => {
                  setDraft((prev) => ({ ...prev, step: 3 }));
                  scrollToTop();
                }}
                onContinue={handleContinueFromContact}
              />
            )}

            {draft.step === "review" && (
              <StepReview
                draft={draft}
                onUpdateInterviewOptIn={handleUpdateInterview}
                onRotateSubmissionId={() => {
                  setDraft((prev) => rotateSubmissionId(prev));
                }}
                onEditTrip={() => {
                  setDraft((prev) => ({ ...prev, step: 1 }));
                  scrollToTop();
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
