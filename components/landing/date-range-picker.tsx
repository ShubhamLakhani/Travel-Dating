"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  getTodayCalendarDate,
  parseCalendarDate,
  isPastDate,
  calculateTripNights,
  formatSingleDateDisplay,
  formatMonthYearHeader,
  formatDayAccessibleLabel,
  getCalendarMonthMatrix,
} from "@/lib/validation/trip-dates.ts";

interface DateRangePickerProps {
  onClose: () => void;
  onSave: (arrival: string, departure: string) => void;
  arrivalDate: string | null;
  departureDate: string | null;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DateRangePicker({
  onClose,
  onSave,
  arrivalDate,
  departureDate,
}: DateRangePickerProps) {
  const todayStr = React.useMemo(() => getTodayCalendarDate(), []);
  const todayParts = React.useMemo(() => parseCalendarDate(todayStr)!, [todayStr]);

  // Current view month (year, month 1-12) initialized from arrivalDate or today
  const [viewYear, setViewYear] = React.useState(() => {
    if (arrivalDate) {
      const parts = parseCalendarDate(arrivalDate);
      if (parts) return parts.year;
    }
    return todayParts.year;
  });

  const [viewMonth, setViewMonth] = React.useState(() => {
    if (arrivalDate) {
      const parts = parseCalendarDate(arrivalDate);
      if (parts) return parts.month;
    }
    return todayParts.month;
  });

  // Temporary selection state initialized from props
  const [tempArrival, setTempArrival] = React.useState<string | null>(arrivalDate);
  const [tempDeparture, setTempDeparture] = React.useState<string | null>(departureDate);

  const daysMatrix = React.useMemo(() => {
    return getCalendarMonthMatrix(viewYear, viewMonth);
  }, [viewYear, viewMonth]);

  const isPrevDisabled = React.useMemo(() => {
    return viewYear === todayParts.year && viewMonth <= todayParts.month;
  }, [viewYear, viewMonth, todayParts]);

  const handlePrevMonth = () => {
    if (isPrevDisabled) return;
    if (viewMonth === 1) {
      setViewYear((y) => y - 1);
      setViewMonth(12);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 12) {
      setViewYear((y) => y + 1);
      setViewMonth(1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDayClick = (dateStr: string) => {
    if (isPastDate(dateStr, todayStr)) return;

    if (!tempArrival || (tempArrival && tempDeparture)) {
      // Starting new selection
      setTempArrival(dateStr);
      setTempDeparture(null);
    } else if (tempArrival && !tempDeparture) {
      if (dateStr > tempArrival) {
        // Complete range
        setTempDeparture(dateStr);
      } else {
        // Reset arrival to new earlier/same date
        setTempArrival(dateStr);
        setTempDeparture(null);
      }
    }
  };

  const tripNights =
    tempArrival && tempDeparture ? calculateTripNights(tempArrival, tempDeparture) : 0;
  const isSaveReady = Boolean(tempArrival && tempDeparture && tripNights > 0);

  const handleSave = () => {
    if (tempArrival && tempDeparture && isSaveReady) {
      onSave(tempArrival, tempDeparture);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="When are you going?"
      description="Select arrival and departure dates"
      size="md"
    >
      <div className="flex flex-col">
        {/* Date Selection Status Bar */}
        <div className="bg-[var(--surface-muted)] px-4 py-3 border-b border-[var(--border)] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[var(--foreground)]">
              {tempArrival ? formatSingleDateDisplay(tempArrival) : "Select arrival"}
            </span>
            <span className="text-[var(--muted-foreground)]">&rarr;</span>
            <span className="font-medium text-[var(--foreground)]">
              {tempDeparture ? formatSingleDateDisplay(tempDeparture) : "Select departure"}
            </span>
          </div>
          {tripNights > 0 && (
            <span className="font-semibold px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
              {tripNights} {tripNights === 1 ? "night" : "nights"}
            </span>
          )}
        </div>

        {/* Month Navigation */}
        <div className="p-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={isPrevDisabled}
            aria-label="Previous month"
            className="p-2 rounded-full hover:bg-[var(--surface-muted)] text-[var(--foreground)] disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <span className="font-display font-semibold text-sm sm:text-base text-[var(--foreground)]">
            {formatMonthYearHeader(viewYear, viewMonth)}
          </span>

          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="p-2 rounded-full hover:bg-[var(--surface-muted)] text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-7 mb-2 text-center text-xs font-medium text-[var(--muted-foreground)]">
            {WEEKDAYS.map((wd) => (
              <div key={wd} className="py-1">
                {wd}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {daysMatrix.map((item, idx) => {
              if (!item) {
                return <div key={`empty-${idx}`} className="h-10" />;
              }

              const { dateStr, dayNumber } = item;
              const isPast = isPastDate(dateStr, todayStr);
              const isArrival = tempArrival === dateStr;
              const isDeparture = tempDeparture === dateStr;
              const isInRange =
                tempArrival &&
                tempDeparture &&
                dateStr > tempArrival &&
                dateStr < tempDeparture;

              const accessibleLabel = formatDayAccessibleLabel(
                viewYear,
                viewMonth,
                dayNumber
              );

              return (
                <div
                  key={dateStr}
                  className={`h-10 relative flex items-center justify-center ${
                    isInRange ? "bg-[var(--travel-accent)]/60" : ""
                  } ${isArrival && tempDeparture ? "rounded-l-full bg-gradient-to-r from-transparent to-[var(--travel-accent)]/60" : ""} ${
                    isDeparture ? "rounded-r-full bg-gradient-to-l from-transparent to-[var(--travel-accent)]/60" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleDayClick(dateStr)}
                    disabled={isPast}
                    aria-label={accessibleLabel}
                    aria-pressed={isArrival || isDeparture}
                    className={`h-9 w-9 rounded-full text-xs font-semibold flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-[var(--focus)] ${
                      isPast
                        ? "text-[var(--muted-foreground)]/40 cursor-not-allowed"
                        : isArrival || isDeparture
                        ? "bg-[var(--primary)] text-white shadow-sm ring-2 ring-[var(--primary)]/30 scale-105"
                        : isInRange
                        ? "text-[var(--foreground)] hover:bg-[var(--travel-accent)]"
                        : "text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
                    }`}
                  >
                    {dayNumber}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[var(--border)] bg-[var(--surface)] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setTempArrival(null);
              setTempDeparture(null);
            }}
            className="text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] underline underline-offset-4 px-2 py-1"
          >
            Clear dates
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={!isSaveReady}
            className="h-10 px-5 text-sm rounded-[var(--radius-button)]"
          >
            Save dates
          </Button>
        </div>
      </div>
    </Modal>
  );
}
