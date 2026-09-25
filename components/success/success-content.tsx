"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Share2, Check, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { getStoredSignupDraft, resetForNewTrip } from "@/lib/validation/signup-storage";
import { formatDateRangeDisplay } from "@/lib/validation/trip-dates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * ---------------------------------------------------------------------------------
 * PHASE 6 TARGET COPY (Keep inactive until Phase 6 durable persistence is connected):
 * ---------------------------------------------------------------------------------
 * Headline: "You're on the list. ✈️"
 * Subcopy: "We'll let you know as Roam begins opening early matching around destinations like Bali."
 * ---------------------------------------------------------------------------------
 */

export function SuccessContent() {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);

  const draft = React.useMemo(() => {
    return getStoredSignupDraft();
  }, []);

  const destinationName = draft?.trip.destination?.name || "Your destination";
  const datesDisplay =
    draft?.trip.arrivalDate && draft?.trip.departureDate
      ? formatDateRangeDisplay(draft.trip.arrivalDate, draft.trip.departureDate)
      : "Travel dates recorded";

  const handleAddAnotherTrip = () => {
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
        // User cancelled or failed; fallback to clipboard
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback error handling
      }
    }
  };

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

      {/* Pre-Persistence Development Disclosure */}
      <Badge variant="neutral" className="text-[11px] font-semibold tracking-wide uppercase">
        Development Submission Preview
      </Badge>

      {/* Trip Confirmation Card */}
      <div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-8 shadow-sm flex flex-col gap-4 text-center">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            {destinationName} added.
          </h1>
          <div className="text-xs sm:text-sm font-semibold text-[var(--primary)] flex items-center justify-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>{datesDisplay}</span>
          </div>
        </div>

        {/* Phase 5 Notice (Truthful pre-persistence wording) */}
        <div className="p-4 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] text-xs text-[var(--muted-foreground)] leading-relaxed flex flex-col gap-1">
          <strong className="text-[var(--foreground)] font-semibold">
            Submission preview — database registration is connected in the next build phase.
          </strong>
          <span>
            You&apos;re almost ready for early access. Once durable database storage is enabled in Phase 6, submissions will receive confirmation and priority invites.
          </span>
        </div>

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
