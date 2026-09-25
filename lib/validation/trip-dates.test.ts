import test from "node:test";
import assert from "node:assert/strict";
import {
  parseCalendarDate,
  formatCalendarDate,
  isPastDate,
  calculateTripNights,
  formatDateRangeDisplay,
  getArrivalMonthKey,
  addDaysToCalendarDate,
  calculateTripOverlap,
} from "./trip-dates.ts";
import {
  searchDestinations,
  findDestinationBySlug,
} from "../destinations/validation-destinations.ts";
import { generateSampleMatches } from "./sample-profiles.ts";

test("searchDestinations filters correctly", () => {
  // Case-insensitive name and country
  const indo = searchDestinations("indo");
  assert.equal(indo.length >= 1, true);
  assert.equal(indo.some((d) => d.name === "Bali"), true);

  const thai = searchDestinations("thai");
  assert.equal(thai.length >= 2, true);
  assert.equal(thai.some((d) => d.name === "Bangkok"), true);
  assert.equal(thai.some((d) => d.name === "Phuket"), true);

  const bar = searchDestinations("bar");
  assert.equal(bar.length >= 1, true);
  assert.equal(bar.some((d) => d.name === "Barcelona"), true);
});

test("findDestinationBySlug retrieves by slug", () => {
  const dest = findDestinationBySlug("bali-indonesia");
  assert.notEqual(dest, null);
  assert.equal(dest?.name, "Bali");
  assert.equal(dest?.country, "Indonesia");
});

test("date arithmetic: parse and format", () => {
  const parts = parseCalendarDate("2026-12-04");
  assert.deepEqual(parts, { year: 2026, month: 12, day: 4 });

  const formatted = formatCalendarDate(2026, 12, 4);
  assert.equal(formatted, "2026-12-04");
});

test("date arithmetic: past date checks", () => {
  assert.equal(isPastDate("2025-01-01", "2026-09-25"), true);
  assert.equal(isPastDate("2026-12-01", "2026-09-25"), false);
  assert.equal(isPastDate("2026-09-25", "2026-09-25"), false);
});

test("date arithmetic: calculateTripNights", () => {
  assert.equal(calculateTripNights("2026-12-04", "2026-12-12"), 8);
  assert.equal(calculateTripNights("2026-12-04", "2026-12-05"), 1);
  assert.equal(calculateTripNights("2026-12-12", "2026-12-04"), 0);
  assert.equal(calculateTripNights("2026-12-04", "2026-12-04"), 0);
});

test("date arithmetic: formatDateRangeDisplay", () => {
  assert.equal(formatDateRangeDisplay("2026-12-04", "2026-12-12"), "Dec 04 → Dec 12");
  assert.equal(formatDateRangeDisplay("2026-12-04", null), "Dec 04 → Departure");
  assert.equal(formatDateRangeDisplay(null, null), "");
});

test("analytics helper: getArrivalMonthKey", () => {
  assert.equal(getArrivalMonthKey("2026-12-04"), "2026-12");
  assert.equal(getArrivalMonthKey(null), undefined);
});

test("date arithmetic: addDaysToCalendarDate", () => {
  assert.equal(addDaysToCalendarDate("2026-12-04", 2), "2026-12-06");
  assert.equal(addDaysToCalendarDate("2026-12-04", -1), "2026-12-03");
  assert.equal(addDaysToCalendarDate("2026-12-31", 1), "2027-01-01");
});

test("overlap calculation: partial overlap (Dec 04-12 vs Dec 06-14)", () => {
  const result = calculateTripOverlap("2026-12-04", "2026-12-12", "2026-12-06", "2026-12-14");
  assert.equal(result.hasOverlap, true);
  assert.equal(result.overlapDays, 6);
  assert.equal(result.overlapStart, "2026-12-06");
  assert.equal(result.overlapEnd, "2026-12-12");
});

test("overlap calculation: other starts earlier (Dec 04-12 vs Dec 03-10)", () => {
  const result = calculateTripOverlap("2026-12-04", "2026-12-12", "2026-12-03", "2026-12-10");
  assert.equal(result.hasOverlap, true);
  assert.equal(result.overlapDays, 6);
  assert.equal(result.overlapStart, "2026-12-04");
  assert.equal(result.overlapEnd, "2026-12-10");
});

test("overlap calculation: exact same dates (Dec 04-12 vs Dec 04-12)", () => {
  const result = calculateTripOverlap("2026-12-04", "2026-12-12", "2026-12-04", "2026-12-12");
  assert.equal(result.hasOverlap, true);
  assert.equal(result.overlapDays, 8);
  assert.equal(result.overlapStart, "2026-12-04");
  assert.equal(result.overlapEnd, "2026-12-12");
});

test("overlap calculation: touching boundaries only (Dec 04-12 vs Dec 12-18)", () => {
  const result = calculateTripOverlap("2026-12-04", "2026-12-12", "2026-12-12", "2026-12-18");
  assert.equal(result.hasOverlap, false);
  assert.equal(result.overlapDays, 0);
  assert.equal(result.overlapStart, null);
  assert.equal(result.overlapEnd, null);
});

test("overlap calculation: no overlap (Dec 04-12 vs Dec 15-20)", () => {
  const result = calculateTripOverlap("2026-12-04", "2026-12-12", "2026-12-15", "2026-12-20");
  assert.equal(result.hasOverlap, false);
  assert.equal(result.overlapDays, 0);
});

test("overlap calculation: other entirely inside (Dec 04-12 vs Dec 06-10)", () => {
  const result = calculateTripOverlap("2026-12-04", "2026-12-12", "2026-12-06", "2026-12-10");
  assert.equal(result.hasOverlap, true);
  assert.equal(result.overlapDays, 4);
  assert.equal(result.overlapStart, "2026-12-06");
  assert.equal(result.overlapEnd, "2026-12-10");
});

test("overlap calculation: user entirely inside (Dec 06-10 vs Dec 04-12)", () => {
  const result = calculateTripOverlap("2026-12-06", "2026-12-10", "2026-12-04", "2026-12-12");
  assert.equal(result.hasOverlap, true);
  assert.equal(result.overlapDays, 4);
  assert.equal(result.overlapStart, "2026-12-06");
  assert.equal(result.overlapEnd, "2026-12-10");
});

test("generateSampleMatches produces valid deterministic output", () => {
  const dest = findDestinationBySlug("bali-indonesia")!;
  const userTrip = {
    destination: dest,
    arrivalDate: "2026-12-04",
    departureDate: "2026-12-12",
  };

  const matches = generateSampleMatches(userTrip, "2026-09-25");
  assert.equal(matches.length, 3);

  // Maya: arrival +2, departure +2 => Dec 06 - Dec 14 => 6 days overlap
  const maya = matches.find((m) => m.profile.name === "Maya")!;
  assert.equal(maya.arrivalDate, "2026-12-06");
  assert.equal(maya.departureDate, "2026-12-14");
  assert.equal(maya.overlap.overlapDays, 6);

  // Elena: arrival -1, departure -2 => Dec 03 - Dec 10 => 6 days overlap
  const elena = matches.find((m) => m.profile.name === "Elena")!;
  assert.equal(elena.arrivalDate, "2026-12-03");
  assert.equal(elena.departureDate, "2026-12-10");
  assert.equal(elena.overlap.overlapDays, 6);

  // Sofia: arrival +4, departure +4 => Dec 08 - Dec 16 => 4 days overlap
  const sofia = matches.find((m) => m.profile.name === "Sofia")!;
  assert.equal(sofia.arrivalDate, "2026-12-08");
  assert.equal(sofia.departureDate, "2026-12-16");
  assert.equal(sofia.overlap.overlapDays, 4);

  // Determinism: Calling again with same input produces exact same values
  const matches2 = generateSampleMatches(userTrip, "2026-09-25");
  assert.deepEqual(matches, matches2);
});

