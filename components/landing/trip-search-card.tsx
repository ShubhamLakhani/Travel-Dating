"use client";

import * as React from "react";
import { MapPin, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationOption, TripSearchDraft } from "@/types/trip";
import { DestinationPicker } from "./destination-picker";
import { DateRangePicker } from "./date-range-picker";
import {
  calculateTripNights,
  formatDateRangeDisplay,
  getArrivalMonthKey,
} from "@/lib/validation/trip-dates";
import { trackEvent } from "@/lib/analytics/track";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { saveTripDraft } from "@/lib/validation/trip-storage";

interface TripSearchCardProps {
  initialDraft: TripSearchDraft;
  onFindMatches: (draft: TripSearchDraft) => void;
}

export function TripSearchCard({
  initialDraft,
  onFindMatches,
}: TripSearchCardProps) {
  const [destination, setDestination] = React.useState<DestinationOption | null>(
    initialDraft.destination
  );
  const [arrivalDate, setArrivalDate] = React.useState<string | null>(
    initialDraft.arrivalDate
  );
  const [departureDate, setDepartureDate] = React.useState<string | null>(
    initialDraft.departureDate
  );

  const [isDestPickerOpen, setIsDestPickerOpen] = React.useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const hasFocusedDestRef = React.useRef(false);

  const nights =
    arrivalDate && departureDate
      ? calculateTripNights(arrivalDate, departureDate)
      : 0;

  const isComplete = Boolean(
    destination && arrivalDate && departureDate && nights > 0
  );

  const handleOpenDestination = () => {
    if (!hasFocusedDestRef.current) {
      trackEvent(ANALYTICS_EVENTS.DESTINATION_INPUT_FOCUSED);
      hasFocusedDestRef.current = true;
    }
    setIsDestPickerOpen(true);
  };

  const handleSelectDestination = (dest: DestinationOption) => {
    setDestination(dest);
    setIsDestPickerOpen(false);
    saveTripDraft({ destination: dest, arrivalDate, departureDate });

    trackEvent(ANALYTICS_EVENTS.DESTINATION_ENTERED, {
      destination: dest.name,
      destination_country: dest.country,
    });
  };

  const handleSaveDates = (arrival: string, departure: string) => {
    setArrivalDate(arrival);
    setDepartureDate(departure);
    saveTripDraft({ destination, arrivalDate: arrival, departureDate: departure });

    const tripDays = calculateTripNights(arrival, departure);
    trackEvent(ANALYTICS_EVENTS.TRIP_DATES_ENTERED, {
      arrival_month: getArrivalMonthKey(arrival),
      trip_duration_days: tripDays,
    });
  };

  const handleFindMatches = () => {
    if (!isComplete || !destination || !arrivalDate || !departureDate) return;

    const draft: TripSearchDraft = {
      destination,
      arrivalDate,
      departureDate,
    };

    trackEvent(ANALYTICS_EVENTS.FIND_MATCHES_CLICKED, {
      destination: destination.name,
      destination_country: destination.country,
      arrival_month: getArrivalMonthKey(arrivalDate),
      trip_duration_days: nights,
    });

    onFindMatches(draft);
  };

  return (
    <div className="w-full max-w-lg flex flex-col gap-3.5">
      {/* Search Card Container */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-sm divide-y divide-[var(--border)] overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[var(--focus)]/20">
        {/* Destination Field Row */}
        <button
          type="button"
          onClick={handleOpenDestination}
          aria-haspopup="dialog"
          aria-expanded={isDestPickerOpen}
          className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-[var(--surface-muted)]/50 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
        >
          <div className="h-10 w-10 rounded-full bg-[var(--surface-muted)] text-[var(--primary)] flex items-center justify-center shrink-0">
            <MapPin className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-[var(--muted-foreground)] tracking-wide uppercase">
              Where are you going?
            </div>
            <div
              className={`text-base font-semibold truncate ${
                destination ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]/70"
              }`}
            >
              {destination ? destination.label : "Search a destination"}
            </div>
          </div>
        </button>

        {/* Dates Field Row */}
        <button
          type="button"
          onClick={() => setIsDatePickerOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isDatePickerOpen}
          className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-[var(--surface-muted)]/50 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
        >
          <div className="h-10 w-10 rounded-full bg-[var(--travel-accent)] text-[#1C3F5E] flex items-center justify-center shrink-0">
            <Calendar className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-[var(--muted-foreground)] tracking-wide uppercase">
              When?
            </div>
            <div
              className={`text-base font-semibold truncate ${
                arrivalDate && departureDate
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted-foreground)]/70"
              }`}
            >
              {arrivalDate && departureDate
                ? formatDateRangeDisplay(arrivalDate, departureDate)
                : "Add travel dates"}
            </div>
          </div>
          {nights > 0 && (
            <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--travel-accent)] text-[#1C3F5E]">
              {nights} {nights === 1 ? "night" : "nights"}
            </span>
          )}
        </button>
      </div>

      {/* Primary CTA */}
      <Button
        variant="primary"
        size="lg"
        onClick={handleFindMatches}
        disabled={!isComplete}
        aria-disabled={!isComplete}
        rightIcon={<ArrowRight className="h-5 w-5 ml-1" aria-hidden="true" />}
        className="w-full h-[54px] text-base font-semibold rounded-[var(--radius-button)] shadow-md disabled:cursor-not-allowed transition-all"
      >
        Find Travel Matches
      </Button>

      {/* Helper text when disabled */}
      {!isComplete && (
        <p className="text-xs text-center text-[var(--muted-foreground)]">
          {!destination && !arrivalDate
            ? "Select your destination and travel dates to find matches"
            : !destination
            ? "Please select a destination"
            : "Please select your arrival and departure dates"}
        </p>
      )}

      {/* Hero Reassurance Note */}
      <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-[var(--muted-foreground)] font-medium">
        <ShieldCheck className="h-4 w-4 text-[var(--foreground)]/60 shrink-0" aria-hidden="true" />
        <span>18+ only · Your exact location is never shown publicly</span>
      </div>

      {/* Pickers */}
      {isDestPickerOpen && (
        <DestinationPicker
          onClose={() => setIsDestPickerOpen(false)}
          onSelect={handleSelectDestination}
          selectedDestination={destination}
        />
      )}

      {isDatePickerOpen && (
        <DateRangePicker
          onClose={() => setIsDatePickerOpen(false)}
          onSave={handleSaveDates}
          arrivalDate={arrivalDate}
          departureDate={departureDate}
        />
      )}
    </div>
  );
}
