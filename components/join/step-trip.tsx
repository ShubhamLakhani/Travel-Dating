"use client";

import * as React from "react";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { EarlyAccessTripState } from "@/types/signup";
import { TravelMode, DestinationOption } from "@/types/trip";
import { DestinationPicker } from "@/components/landing/destination-picker";
import { DateRangePicker } from "@/components/landing/date-range-picker";
import { formatDateRangeDisplay, calculateTripNights } from "@/lib/validation/trip-dates";
import { tripStepSchema } from "@/lib/validation/early-access-schema";
import { Button } from "@/components/ui/button";

interface StepTripProps {
  trip: EarlyAccessTripState;
  onUpdate: (updated: Partial<EarlyAccessTripState>) => void;
  onContinue: () => void;
}

const TRAVEL_MODES: Array<{ mode: TravelMode; label: string; desc: string }> = [
  { mode: "solo", label: "Solo", desc: "Traveling independently" },
  { mode: "friends", label: "With friends", desc: "Traveling in a group of friends" },
  { mode: "group", label: "Group / tour", desc: "Organized retreat or group tour" },
  { mode: "other", label: "Other", desc: "Different travel arrangement" },
];

export function StepTrip({ trip, onUpdate, onContinue }: StepTripProps) {
  const [isDestinationOpen, setIsDestinationOpen] = React.useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSelectDestination = (dest: DestinationOption) => {
    onUpdate({ destination: dest });
    setIsDestinationOpen(false);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.destination;
      return next;
    });
  };

  const handleSaveDates = (arr: string, dep: string) => {
    onUpdate({ arrivalDate: arr, departureDate: dep });
    setIsDatePickerOpen(false);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.arrivalDate;
      delete next.departureDate;
      return next;
    });
  };

  const handleSelectMode = (mode: TravelMode) => {
    onUpdate({ travelMode: mode });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.travelMode;
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = tripStepSchema.safeParse(trip);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = String(issue.path[0] || "general");
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onContinue();
  };

  const nights =
    trip.arrivalDate && trip.departureDate
      ? calculateTripNights(trip.arrivalDate, trip.departureDate)
      : 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Step Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Let&apos;s start with your trip.
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          Tell us where you&apos;re traveling so we can find people whose dates overlap yours.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Destination Field */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Where are you going? <span className="text-[var(--primary)]">*</span>
          </label>
          <button
            type="button"
            onClick={() => setIsDestinationOpen(true)}
            aria-haspopup="dialog"
            className={`w-full p-4 rounded-2xl bg-[var(--surface)] border text-left flex items-center justify-between transition-all focus-visible:outline-2 focus-visible:outline-[var(--focus)] ${
              errors.destination
                ? "border-red-500 ring-1 ring-red-500/20"
                : "border-[var(--border)] hover:border-[var(--primary)]/40"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-xl bg-[var(--travel-accent)] text-[#1C3F5E] flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="truncate">
                {trip.destination ? (
                  <div>
                    <div className="font-display text-base font-bold text-[var(--foreground)] truncate">
                      {trip.destination.name}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)] truncate">
                      {trip.destination.country}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm font-semibold text-[var(--muted-foreground)]">
                      Select destination
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]/80">
                      e.g. Bali, Tokyo, Lisbon...
                    </div>
                  </div>
                )}
              </div>
            </div>
            <span className="text-xs font-semibold text-[var(--primary)] shrink-0 ml-2">
              {trip.destination ? "Change" : "Browse"}
            </span>
          </button>
          {errors.destination && (
            <p className="text-xs font-medium text-red-600 pl-1">{errors.destination}</p>
          )}
        </div>

        {/* Travel Dates Field */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            When will you be there? <span className="text-[var(--primary)]">*</span>
          </label>
          <button
            type="button"
            onClick={() => setIsDatePickerOpen(true)}
            aria-haspopup="dialog"
            className={`w-full p-4 rounded-2xl bg-[var(--surface)] border text-left flex items-center justify-between transition-all focus-visible:outline-2 focus-visible:outline-[var(--focus)] ${
              errors.arrivalDate || errors.departureDate
                ? "border-red-500 ring-1 ring-red-500/20"
                : "border-[var(--border)] hover:border-[var(--primary)]/40"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="truncate">
                {trip.arrivalDate && trip.departureDate ? (
                  <div>
                    <div className="font-display text-base font-bold text-[var(--foreground)] truncate">
                      {formatDateRangeDisplay(trip.arrivalDate, trip.departureDate)}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      {nights} {nights === 1 ? "night" : "nights"} stay
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm font-semibold text-[var(--muted-foreground)]">
                      Choose travel dates
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]/80">
                      Arrival &rarr; Departure
                    </div>
                  </div>
                )}
              </div>
            </div>
            <span className="text-xs font-semibold text-[var(--primary)] shrink-0 ml-2">
              {trip.arrivalDate ? "Change" : "Select"}
            </span>
          </button>
          {(errors.arrivalDate || errors.departureDate) && (
            <p className="text-xs font-medium text-red-600 pl-1">
              {errors.arrivalDate || errors.departureDate}
            </p>
          )}
        </div>

        {/* Travel Mode Field */}
        <fieldset className="flex flex-col gap-2">
          <legend className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            How are you traveling? <span className="text-[var(--primary)]">*</span>
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TRAVEL_MODES.map((item) => {
              const isSelected = trip.travelMode === item.mode;
              return (
                <button
                  key={item.mode}
                  type="button"
                  onClick={() => handleSelectMode(item.mode)}
                  aria-pressed={isSelected}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all focus-visible:outline-2 focus-visible:outline-[var(--focus)] ${
                    isSelected
                      ? "bg-[var(--surface)] border-[var(--primary)] shadow-sm ring-2 ring-[var(--primary)]/20"
                      : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--primary)]/30"
                  }`}
                >
                  <div
                    className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                        : "border-[var(--border)] bg-white"
                    }`}
                  >
                    {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold text-[var(--foreground)]">
                      {item.label}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {errors.travelMode && (
            <p className="text-xs font-medium text-red-600 pl-1">{errors.travelMode}</p>
          )}
        </fieldset>
      </div>

      {/* Action CTA */}
      <div className="pt-4 border-t border-[var(--border)] flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />}
          className="w-full sm:w-auto h-12 px-8 text-sm font-bold rounded-full shadow-md"
        >
          Continue &rarr;
        </Button>
      </div>

      {/* Destination Picker Modal */}
      {isDestinationOpen && (
        <DestinationPicker
          onClose={() => setIsDestinationOpen(false)}
          onSelect={handleSelectDestination}
          selectedDestination={trip.destination}
        />
      )}

      {/* Date Range Picker Modal */}
      {isDatePickerOpen && (
        <DateRangePicker
          onClose={() => setIsDatePickerOpen(false)}
          onSave={handleSaveDates}
          arrivalDate={trip.arrivalDate}
          departureDate={trip.departureDate}
        />
      )}
    </form>
  );
}
