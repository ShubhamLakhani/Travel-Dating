/**
 * Pure calendar-date arithmetic utilities for Project Roam.
 *
 * CRITICAL DESIGN RULE:
 * Travel dates represent calendar dates (YYYY-MM-DD), NOT timestamps.
 * All computations avoid timezone conversions and UTC drift bugs.
 */

export interface CalendarDateParts {
  year: number;
  month: number; // 1-12
  day: number;   // 1-31
}

const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const MONTH_NAMES_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Returns today's date formatted as YYYY-MM-DD in local time.
 */
export function getTodayCalendarDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Parses YYYY-MM-DD string into year, month, day components.
 */
export function parseCalendarDate(dateStr: string): CalendarDateParts | null {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { year, month, day };
}

/**
 * Formats year, month, day into standard YYYY-MM-DD string.
 */
export function formatCalendarDate(year: number, month: number, day: number): string {
  const y = String(year);
  const m = String(month).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Checks if a given YYYY-MM-DD date is strictly in the past relative to referenceDate (default: today).
 */
export function isPastDate(dateStr: string, referenceDateStr?: string): boolean {
  const ref = referenceDateStr || getTodayCalendarDate();
  return dateStr < ref;
}

/**
 * Calculates number of nights between arrival and departure.
 * Returns 0 if departure <= arrival.
 */
export function calculateTripNights(arrivalDate: string, departureDate: string): number {
  if (departureDate <= arrivalDate) return 0;
  const arrival = parseCalendarDate(arrivalDate);
  const departure = parseCalendarDate(departureDate);
  if (!arrival || !departure) return 0;

  // Use UTC day timestamps to prevent daylight savings shifts
  const utcArrival = Date.UTC(arrival.year, arrival.month - 1, arrival.day);
  const utcDeparture = Date.UTC(departure.year, departure.month - 1, departure.day);
  const diffMs = utcDeparture - utcArrival;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Formats a date for UI display (e.g., "Dec 04").
 */
export function formatSingleDateDisplay(dateStr: string): string {
  const parts = parseCalendarDate(dateStr);
  if (!parts) return dateStr;
  const monthName = MONTH_NAMES_SHORT[parts.month - 1];
  const day = String(parts.day).padStart(2, "0");
  return `${monthName} ${day}`;
}

/**
 * Formats date range for display (e.g. "Dec 04 → Dec 12").
 */
export function formatDateRangeDisplay(
  arrivalDate: string | null,
  departureDate: string | null
): string {
  if (!arrivalDate && !departureDate) return "";
  if (arrivalDate && !departureDate) {
    return `${formatSingleDateDisplay(arrivalDate)} → Departure`;
  }
  if (arrivalDate && departureDate) {
    return `${formatSingleDateDisplay(arrivalDate)} → ${formatSingleDateDisplay(departureDate)}`;
  }
  return "";
}

/**
 * Returns formatted month and year header (e.g., "December 2026").
 */
export function formatMonthYearHeader(year: number, month: number): string {
  return `${MONTH_NAMES_FULL[month - 1]} ${year}`;
}

/**
 * Generates accessible label for a specific day button (e.g., "December 4, 2026").
 */
export function formatDayAccessibleLabel(year: number, month: number, day: number): string {
  return `${MONTH_NAMES_FULL[month - 1]} ${day}, ${year}`;
}

/**
 * Computes calendar grid data for a specific year and month (1-12).
 * Returns array of days with day number and date string, padded with leading nulls for start of week (Sunday=0).
 */
export function getCalendarMonthMatrix(year: number, month: number) {
  // First day of month
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0 = Sunday
  // Total days in month
  const totalDays = new Date(year, month, 0).getDate();

  const days: ({ dayNumber: number; dateStr: string } | null)[] = [];

  // Leading empty slots
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of month
  for (let d = 1; d <= totalDays; d++) {
    days.push({
      dayNumber: d,
      dateStr: formatCalendarDate(year, month, d),
    });
  }

  return days;
}

/**
 * Extracts arrival month in YYYY-MM format for safe analytics tracking.
 */
export function getArrivalMonthKey(arrivalDate: string | null): string | undefined {
  if (!arrivalDate) return undefined;
  const parts = parseCalendarDate(arrivalDate);
  if (!parts) return undefined;
  return `${parts.year}-${String(parts.month).padStart(2, "0")}`;
}

/**
 * Adds or subtracts days from a YYYY-MM-DD calendar date string.
 * Avoids local timezone shift by using UTC day addition.
 */
export function addDaysToCalendarDate(dateStr: string, days: number): string {
  const parts = parseCalendarDate(dateStr);
  if (!parts) return dateStr;
  const utcDate = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + days));
  const y = utcDate.getUTCFullYear();
  const m = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
  const d = String(utcDate.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export interface TripOverlapResult {
  overlapDays: number;
  overlapStart: string | null;
  overlapEnd: string | null;
  hasOverlap: boolean;
}

/**
 * Calculates trip overlap under arrival-inclusive, departure-exclusive semantics: [arrival, departure).
 *
 * Example:
 * Trip A: [Dec 04, Dec 12)
 * Trip B: [Dec 06, Dec 14)
 * Overlap: [Dec 06, Dec 12) => 6 days
 */
export function calculateTripOverlap(
  userArrival: string,
  userDeparture: string,
  otherArrival: string,
  otherDeparture: string
): TripOverlapResult {
  const start = userArrival > otherArrival ? userArrival : otherArrival;
  const end = userDeparture < otherDeparture ? userDeparture : otherDeparture;

  if (end > start) {
    const days = calculateTripNights(start, end);
    return {
      overlapDays: days,
      overlapStart: start,
      overlapEnd: end,
      hasOverlap: days > 0,
    };
  }

  return {
    overlapDays: 0,
    overlapStart: null,
    overlapEnd: null,
    hasOverlap: false,
  };
}

/**
 * Returns human-readable label for overlap days.
 */
export function formatOverlapDaysLabel(days: number): string {
  if (days <= 0) return "No trip overlap";
  if (days === 1) return "1 day together";
  return `${days} days together`;
}

