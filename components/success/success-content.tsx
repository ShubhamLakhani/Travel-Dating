"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Share2,
  Check,
  ArrowRight,
  Calendar,
  Sparkles,
  AlertCircle,
  MailCheck,
} from "lucide-react";
import {
  getStoredSignupDraft,
  getStoredSubmissionReceipt,
  subscribeToSignupStorage,
  markConversionTracked,
  resetForNewTrip,
} from "@/lib/validation/signup-storage";
import { formatDateRangeDisplay, calculateTripNights, getArrivalMonthKey } from "@/lib/validation/trip-dates";
import { trackEvent } from "@/lib/analytics/track";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreviewParam = searchParams.get("preview") === "1";

  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const receipt = React.useSyncExternalStore(
    subscribeToSignupStorage,
    getStoredSubmissionReceipt,
    () => null
  );

  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    // Track conversion analytics once upon verified durable receipt
    if (receipt && !receipt.conversionTracked) {
      const draft = getStoredSignupDraft();

      trackEvent(ANALYTICS_EVENTS.EARLY_ACCESS_COMPLETED, {
        destination: receipt.destinationName,
        destination_country: draft?.trip.destination?.country,
        arrival_month: receipt.arrivalDate
          ? getArrivalMonthKey(receipt.arrivalDate)
          : undefined,
        trip_duration_days:
          receipt.arrivalDate && receipt.departureDate
            ? calculateTripNights(receipt.arrivalDate, receipt.departureDate)
            : undefined,
        traveler_type: draft?.trip.travelMode || undefined,
        traveler_local_preference: draft?.profile.meetPreference || undefined,
        marketing_consent: draft?.contact.marketingConsent,
        trip_created: receipt.tripCreated,
      });

      if (receipt.tripCreated) {
        trackEvent(ANALYTICS_EVENTS.REAL_TRIP_SUBMITTED, {
          destination: receipt.destinationName,
          destination_country: draft?.trip.destination?.country,
          arrival_month: receipt.arrivalDate
            ? getArrivalMonthKey(receipt.arrivalDate)
            : undefined,
          trip_duration_days:
            receipt.arrivalDate && receipt.departureDate
              ? calculateTripNights(receipt.arrivalDate, receipt.departureDate)
              : undefined,
          traveler_type: draft?.trip.travelMode || undefined,
        });
      }

      markConversionTracked();
    }
  }, [receipt]);

  const handleAddAnotherTrip = () => {
    const draft = getStoredSignupDraft();
    if (draft) {
      resetForNewTrip(draft);
    }
    router.push("/join");
  };

  const handleShare = async () => {
    const shareData = {
      title: "Project Roam",
      text: "Meet someone going where you're going — Project Roam",
      url: typeof window !== "undefined" ? window.location.origin : "https://roam.dating",
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or share failed; fallback to clipboard
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback
      }
    }
  };

  if (!isClient) {
    return (
      <div className="w-full max-w-lg mx-auto py-12 text-center text-sm text-[var(--muted-foreground)]">
        Loading confirmation...
      </div>
    );
  }

  // 1. Protected State: Manual navigation without durable receipt and without preview flag
  if (!receipt && !isPreviewParam) {
    return (
      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center gap-6 py-12">
        <div className="h-14 w-14 rounded-full bg-[var(--surface-muted)] text-[var(--muted-foreground)] flex items-center justify-center border border-[var(--border)]">
          <AlertCircle className="h-7 w-7" aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-display text-2xl font-bold text-[var(--foreground)]">
            No completed early-access submission was found in this session.
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            To reserve priority matching for your upcoming travels, please complete the questionnaire.
          </p>
        </div>

        <Link href="/join">
          <Button variant="primary" size="md" className="rounded-full px-8 font-bold">
            Join Early Access
          </Button>
        </Link>
      </div>
    );
  }

  // Determine display values from receipt or fallback draft (for preview mode)
  const draft = getStoredSignupDraft();
  const destinationName = receipt
    ? receipt.destinationName
    : draft?.trip.destination?.name || "Your destination";

  const datesDisplay = receipt
    ? formatDateRangeDisplay(receipt.arrivalDate, receipt.departureDate)
    : draft?.trip.arrivalDate && draft?.trip.departureDate
    ? formatDateRangeDisplay(draft.trip.arrivalDate, draft.trip.departureDate)
    : "Travel dates recorded";

  const isDurable = Boolean(receipt);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center gap-6 py-8">
      {/* Route Path Graphic Motif */}
      <div className="relative mb-2">
        <div className="h-16 w-16 rounded-full bg-[var(--travel-accent)] text-[#1C3F5E] flex items-center justify-center border-2 border-[var(--border)] shadow-md">
          <Sparkles className="h-8 w-8 text-[var(--primary)]" aria-hidden="true" />
        </div>
        <div
          className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold shadow-xs"
          aria-hidden="true"
        >
          ✓
        </div>
      </div>

      {/* Mode Badge */}
      {isDurable ? (
        <Badge variant="primary" className="text-[11px] font-bold tracking-wide uppercase">
          Early Access Confirmed
        </Badge>
      ) : (
        <Badge variant="neutral" className="text-[11px] font-semibold tracking-wide uppercase">
          Development Submission Preview
        </Badge>
      )}

      {/* Main Success Card */}
      <div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-8 shadow-sm flex flex-col gap-5 text-center">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            {isDurable ? "You're on the list. ✈️" : `${destinationName} added.`}
          </h1>

          {isDurable && (
            <div className="text-lg font-bold text-[var(--foreground)] pt-1">
              {destinationName}
            </div>
          )}

          <div className="text-xs sm:text-sm font-semibold text-[var(--primary)] flex items-center justify-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>{datesDisplay}</span>
          </div>
        </div>

        {/* Informative Subcopy */}
        {isDurable ? (
          <div className="p-4 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] text-xs text-[var(--muted-foreground)] leading-relaxed flex flex-col gap-2">
            <span>
              We&apos;ll let you know as Roam begins validating early matching around destinations like {destinationName}.
            </span>
            {receipt?.confirmationEmail === "sent" && (
              <span className="flex items-center justify-center gap-1.5 font-semibold text-[#1B4332] pt-1">
                <MailCheck className="h-4 w-4 text-[#1B4332]" aria-hidden="true" />
                We&apos;ve also sent you a confirmation email.
              </span>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] text-xs text-[var(--muted-foreground)] leading-relaxed flex flex-col gap-1">
            <strong className="text-[var(--foreground)] font-semibold">
              Submission preview — database registration is connected in the next build phase.
            </strong>
            <span>
              You&apos;re almost ready for early access. Once durable database storage is enabled, submissions will receive confirmation and priority invites.
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-3 border-t border-[var(--border)]">
          {/* Add Another Trip Action */}
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleAddAnotherTrip}
            leftIcon={<Plus className="h-4 w-4 mr-1.5" aria-hidden="true" />}
            className="w-full text-xs sm:text-sm font-semibold rounded-full"
          >
            Add another trip
          </Button>

          {/* Share Action */}
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleShare}
            leftIcon={
              copied ? (
                <Check className="h-4 w-4 mr-1.5 text-green-600 stroke-[3]" aria-hidden="true" />
              ) : (
                <Share2 className="h-4 w-4 mr-1.5" aria-hidden="true" />
              )
            }
            className="w-full text-xs sm:text-sm font-semibold rounded-full"
          >
            {copied ? "Link copied to clipboard!" : "Share Roam with friends"}
          </Button>
        </div>
      </div>

      {/* Return to Home Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mt-2"
      >
        <span>Back to homepage</span>
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  );
}
