"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Heart,
  Compass,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { EarlyAccessDraft } from "@/types/signup";
import { formatDateRangeDisplay, getArrivalMonthKey } from "@/lib/validation/trip-dates";
import { trackEvent } from "@/lib/analytics/track";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { saveStoredSubmissionReceipt, DURABLE_SIGNUP_ENABLED } from "@/lib/validation/signup-storage";
import { getStoredAttribution } from "@/lib/analytics/attribution";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StepReviewProps {
  draft: EarlyAccessDraft;
  onUpdateInterviewOptIn: (optIn: boolean) => void;
  onRotateSubmissionId: () => void;
  onEditTrip?: () => void;
}

function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const visible = user.slice(0, Math.min(3, user.length));
  return `${visible}•••@${domain}`;
}

const INTENTION_DISPLAY_NAMES: Record<string, string> = {
  casual_dating: "Casual dating",
  romantic_connection: "Romantic connection",
  potential_relationship: "Potential relationship",
  see_where_it_goes: "Open to seeing where it goes",
  dating: "Dating",
  travel_companion: "Travel companion",
  open_to_possibilities: "Open to possibilities",
  activity_partner: "Activity partner",
};

export function StepReview({
  draft,
  onUpdateInterviewOptIn,
  onRotateSubmissionId,
  onEditTrip,
}: StepReviewProps) {
  const router = useRouter();
  const [hasOptedIn, setHasOptedIn] = React.useState<boolean | null>(
    draft.interviewOptIn ?? null
  );

  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleInterviewChoice = (optIn: boolean) => {
    setHasOptedIn(optIn);
    onUpdateInterviewOptIn(optIn);

    if (optIn) {
      trackEvent(ANALYTICS_EVENTS.INTERVIEW_OPT_IN, {
        destination: draft.trip.destination?.name,
        destination_country: draft.trip.destination?.country,
        arrival_month: draft.trip.arrivalDate
          ? getArrivalMonthKey(draft.trip.arrivalDate)
          : undefined,
        travel_frequency: draft.contact.travelFrequency || undefined,
      });
    }
  };

  const handleSubmit = async () => {
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const storedAttribution = getStoredAttribution();
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionId: draft.submissionId,
          trip: draft.trip,
          profile: draft.profile,
          intentions: draft.intentions,
          interests: draft.interests,
          customInterest: draft.customInterest,
          contact: draft.contact,
          interviewOptIn: Boolean(draft.interviewOptIn),
          attribution: storedAttribution
            ? {
                utmSource: storedAttribution.utmSource || storedAttribution.utm_source,
                utmMedium: storedAttribution.utmMedium || storedAttribution.utm_medium,
                utmCampaign: storedAttribution.utmCampaign || storedAttribution.utm_campaign,
                utmContent: storedAttribution.utmContent || storedAttribution.utm_content,
                utmTerm: storedAttribution.utmTerm || storedAttribution.utm_term,
                referrer: storedAttribution.referrer,
                landingPath: storedAttribution.landingPath || storedAttribution.landing_path,
              }
            : undefined,
        }),
      });

      if (response.status === 409) {
        setStatus("error");
        setErrorMessage(
          "Your form changed after an earlier submission attempt. Please try again."
        );
        // Safely rotate submissionId once to resolve conflict
        onRotateSubmissionId();
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(
          data.message ||
            "We couldn't save your early-access request. Your answers are still here — please try again."
        );
        return;
      }

      // 1. Store durable non-PII submission receipt
      saveStoredSubmissionReceipt({
        submissionId: data.submissionId,
        destinationName: draft.trip.destination?.name || "Your destination",
        arrivalDate: draft.trip.arrivalDate || "",
        departureDate: draft.trip.departureDate || "",
        tripCreated: Boolean(data.tripCreated),
        confirmationEmail: data.confirmationEmail || "skipped",
        submittedAt: new Date().toISOString(),
        conversionTracked: false,
      });

      setStatus("success");

      // 2. Navigate to real success screen
      router.push("/success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't save your early-access request. Your answers are still here — please try again."
      );
    }
  };

  const handlePreviewSuccess = () => {
    router.push("/success?preview=1");
  };

  const maskedEmailDisplay = maskEmail(draft.contact.email || "user@example.com");

  return (
    <div className="flex flex-col gap-8">
      {/* Review Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--primary)]/30 shadow-xs flex flex-col gap-3 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <Badge variant="primary" className="text-[10px] uppercase font-bold tracking-wider mb-1">
              {DURABLE_SIGNUP_ENABLED ? "Ready for Submission" : "Review Questionnaire"}
            </Badge>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[var(--foreground)]">
              Review your early-access details
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
          Please confirm your details below. Once submitted, your trip will be recorded to help us open early matching.
        </p>
      </div>

      {/* Submission Error Banner */}
      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3 shadow-xs"
        >
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-red-900">Submission Notice</span>
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Summary Review Card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Submission Summary
          </span>
          <span className="text-xs font-mono text-[var(--muted-foreground)] truncate max-w-[140px] sm:max-w-none">
            ID: {draft.submissionId.slice(0, 8)}...
          </span>
        </div>

        {/* Trip Row */}
        <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-[var(--primary)] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-bold text-[var(--foreground)]">
                {draft.trip.destination?.name}, {draft.trip.destination?.country}
              </span>
              <div className="text-xs text-[var(--muted-foreground)] mt-0.5">
                {draft.trip.arrivalDate && draft.trip.departureDate
                  ? formatDateRangeDisplay(draft.trip.arrivalDate, draft.trip.departureDate)
                  : "Dates selected"}
                {draft.trip.travelMode && (
                  <span className="capitalize"> &middot; {draft.trip.travelMode} traveler</span>
                )}
              </div>
            </div>
          </div>
          {onEditTrip && (
            <button
              type="button"
              onClick={onEditTrip}
              className="text-xs text-[var(--primary)] hover:underline font-semibold shrink-0 cursor-pointer"
            >
              Edit
            </button>
          )}
        </div>

        {/* Profile / Preferences Row */}
        <div className="flex items-start gap-3 text-xs sm:text-sm">
          <Compass className="h-4 w-4 text-[#1C3F5E] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <span className="font-bold text-[var(--foreground)]">
              Interested in meeting {draft.profile.interestedIn || "travelers"}
            </span>
            <div className="text-xs text-[var(--muted-foreground)] mt-0.5 capitalize">
              Age band: {draft.profile.ageBand || "18+"} &middot; Meet: {draft.profile.meetPreference || "Both"}
            </div>
          </div>
        </div>

        {/* Intentions Row */}
        <div className="flex items-start gap-3 text-xs sm:text-sm">
          <Heart className="h-4 w-4 text-[var(--primary)] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <span className="font-bold text-[var(--foreground)]">Looking for:</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {draft.intentions.map((intent) => (
                <span
                  key={intent}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)]"
                >
                  {INTENTION_DISPLAY_NAMES[intent] || intent}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Row with masked email */}
        <div className="flex items-start gap-3 text-xs sm:text-sm pt-2 border-t border-[var(--border)]/70">
          <ShieldCheck className="h-4 w-4 text-[#1B4332] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex items-center justify-between w-full">
            <div>
              <span className="font-bold text-[var(--foreground)]">Invite contact:</span>
              <div className="text-xs text-[var(--muted-foreground)] mt-0.5">
                {maskedEmailDisplay} &middot; {draft.contact.homeCountry}
              </div>
            </div>
            <span className="text-[11px] text-[#1B4332] bg-[var(--safety-accent)] px-2 py-0.5 rounded-md font-semibold">
              18+ Confirmed
            </span>
          </div>
        </div>
      </div>

      {/* User Research Interview Opt-In */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface-muted)]/70 border border-[var(--border)] flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-base sm:text-lg font-bold text-[var(--foreground)]">
              Help us build Roam properly.
            </h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              Would you be open to a short conversation about how you meet people while traveling?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => handleInterviewChoice(true)}
            aria-pressed={hasOptedIn === true}
            className={`h-10 px-5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
              hasOptedIn === true
                ? "bg-[var(--primary)] text-white border-[var(--primary)] font-bold shadow-xs"
                : "bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] hover:border-[var(--primary)]/40"
            }`}
          >
            Yes, I&apos;d love to help
          </button>
          <button
            type="button"
            onClick={() => handleInterviewChoice(false)}
            aria-pressed={hasOptedIn === false}
            className={`h-10 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
              hasOptedIn === false
                ? "bg-[var(--surface-muted)] text-[var(--foreground)] border-[var(--border)] font-bold"
                : "bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)]"
            }`}
          >
            Not right now
          </button>
        </div>

        {hasOptedIn === true && (
          <p className="text-xs text-[var(--primary)] font-semibold flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Thank you! We may reach out to {maskedEmailDisplay} for a 15-minute research chat.</span>
          </p>
        )}
      </div>

      {/* Main Submission Action */}
      <div className="pt-2 border-t border-[var(--border)] flex flex-col items-center gap-3">
        <Button
          type="button"
          variant="primary"
          size="lg"
          disabled={status === "submitting"}
          onClick={handleSubmit}
          leftIcon={
            status === "submitting" ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" aria-hidden="true" />
            ) : undefined
          }
          rightIcon={
            status !== "submitting" ? (
              <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
            ) : undefined
          }
          className="w-full sm:w-auto h-12 px-10 text-sm font-bold rounded-full shadow-md"
        >
          {status === "submitting" ? "Joining…" : "Join Early Access"}
        </Button>

        {/* Development preview button fallback */}
        {!DURABLE_SIGNUP_ENABLED && (
          <button
            type="button"
            onClick={handlePreviewSuccess}
            className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] underline underline-offset-2"
          >
            Development Preview Mode &middot; Preview Success Screen
          </button>
        )}
      </div>
    </div>
  );
}
