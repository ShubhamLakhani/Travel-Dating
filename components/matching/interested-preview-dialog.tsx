"use client";

import { useRouter } from "next/navigation";
import { Heart, ArrowRight } from "lucide-react";
import { SampleMatch } from "@/lib/validation/sample-profiles.ts";
import { calculateTripNights, getArrivalMonthKey } from "@/lib/validation/trip-dates.ts";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics/track";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

interface InterestedPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  match: SampleMatch | null;
  userArrival: string;
  userDeparture: string;
}

export function InterestedPreviewDialog({
  isOpen,
  onClose,
  match,
  userArrival,
  userDeparture,
}: InterestedPreviewDialogProps) {
  const router = useRouter();

  if (!match) return null;

  const handleJoinEarlyAccess = () => {
    trackEvent(ANALYTICS_EVENTS.EARLY_ACCESS_STARTED, {
      source: "sample_profile_interest",
      destination: match.destination.name,
      destination_country: match.destination.country,
      arrival_month: getArrivalMonthKey(userArrival),
      trip_duration_days: calculateTripNights(userArrival, userDeparture),
    });

    onClose();
    router.push("/join");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={true}
    >
      <div className="p-6 sm:p-7 flex flex-col items-center text-center gap-4">
        {/* Heart Icon Badge */}
        <div className="h-14 w-14 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-1">
          <Heart className="h-7 w-7 fill-[var(--primary)]" aria-hidden="true" />
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight">
          Imagine meeting {match.profile.name} in {match.destination.name}.
        </h3>

        <div className="bg-[var(--surface-muted)] border border-[var(--border)] rounded-2xl p-4 text-xs text-[var(--muted-foreground)] leading-relaxed flex flex-col gap-1.5">
          <span className="font-semibold text-[var(--foreground)]">
            This is a preview of how Roam could work.
          </span>
          <span>
            Join early access to meet real travelers when matching opens in {match.destination.name}.
          </span>
        </div>

        <div className="w-full flex flex-col gap-2.5 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={handleJoinEarlyAccess}
            rightIcon={<ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />}
            className="w-full h-12 text-sm font-semibold rounded-[var(--radius-button)] shadow-md"
          >
            Join Early Access
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="w-full text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Continue previewing
          </Button>
        </div>
      </div>
    </Modal>
  );
}
