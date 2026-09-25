"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics/track";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { EarlyAccessSource, AllowedEventProperties } from "@/types/analytics";
import { getStoredTripDraft } from "@/lib/validation/trip-storage";
import { calculateTripNights, getArrivalMonthKey } from "@/lib/validation/trip-dates";
import { Button, ButtonProps } from "@/components/ui/button";

export interface EarlyAccessLinkProps {
  source: EarlyAccessSource;
  children: React.ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}

export function EarlyAccessLink({
  source,
  children,
  variant = "primary",
  size = "md",
  className,
  leftIcon,
  rightIcon,
  onClick,
  "aria-label": ariaLabel,
}: EarlyAccessLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Safely extract existing trip data if available
    const draft = getStoredTripDraft();
    const eventProperties: AllowedEventProperties = {
      source,
    };

    if (draft?.destination) {
      eventProperties.destination = draft.destination.name;
      eventProperties.destination_country = draft.destination.country;
    }

    if (draft?.arrivalDate) {
      eventProperties.arrival_month = getArrivalMonthKey(draft.arrivalDate);
    }

    if (draft?.arrivalDate && draft?.departureDate) {
      eventProperties.trip_duration_days = calculateTripNights(
        draft.arrivalDate,
        draft.departureDate
      );
    }

    trackEvent(ANALYTICS_EVENTS.EARLY_ACCESS_STARTED, eventProperties);

    if (onClick) {
      onClick();
    }

    router.push("/join");
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
}
