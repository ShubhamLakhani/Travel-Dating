// Project Roam — Phase 7 Trip Density Engine & Concurrency Unit Tests
// File: lib/admin/density-engine.test.ts

import test from "node:test";
import assert from "node:assert/strict";
import {
  doTripsOverlap,
  getDensityBucket,
  calculateMaxConcurrency,
  calculateOverlappingPairs,
  areProfilesCompatible,
  findDensityWindows,
  compileDestinationDensitySummary,
} from "./density-engine.ts";
import type { TripEntity, UserPreferencesProfile } from "../../types/admin.ts";

test("density-engine: doTripsOverlap date interval logic", () => {
  // Overlapping
  assert.equal(doTripsOverlap("2026-10-01", "2026-10-10", "2026-10-05", "2026-10-15"), true);
  // Touching boundaries (inclusive departure date)
  assert.equal(doTripsOverlap("2026-10-01", "2026-10-05", "2026-10-05", "2026-10-10"), true);
  // Non-overlapping
  assert.equal(doTripsOverlap("2026-10-01", "2026-10-04", "2026-10-05", "2026-10-10"), false);
  // Entirely inside
  assert.equal(doTripsOverlap("2026-10-01", "2026-10-20", "2026-10-05", "2026-10-10"), true);
});

test("density-engine: getDensityBucket thresholds", () => {
  assert.equal(getDensityBucket(0), "none");
  assert.equal(getDensityBucket(1), "isolated");
  assert.equal(getDensityBucket(2), "minimal");
  assert.equal(getDensityBucket(3), "emerging");
  assert.equal(getDensityBucket(5), "emerging");
  assert.equal(getDensityBucket(6), "meaningful");
  assert.equal(getDensityBucket(10), "meaningful");
  assert.equal(getDensityBucket(11), "strong");
  assert.equal(getDensityBucket(50), "strong");
});

test("density-engine: calculateMaxConcurrency - single user multiple trips merged", () => {
  // A single user with touching/overlapping trips must NOT count as 2 concurrent travellers
  const trips: TripEntity[] = [
    {
      id: "t1",
      waitlistUserId: "u1",
      destinationId: "bali",
      destinationName: "Bali",
      destinationCountry: "Indonesia",
      destinationCountryCode: "ID",
      marketSlug: "bali",
      arrivalDate: "2026-10-01",
      departureDate: "2026-10-05",
      travelMode: "solo",
      createdAt: "2026-09-01T00:00:00Z",
    },
    {
      id: "t2",
      waitlistUserId: "u1",
      destinationId: "bali",
      destinationName: "Bali",
      destinationCountry: "Indonesia",
      destinationCountryCode: "ID",
      marketSlug: "bali",
      arrivalDate: "2026-10-04",
      departureDate: "2026-10-10",
      travelMode: "solo",
      createdAt: "2026-09-02T00:00:00Z",
    },
  ];

  const result = calculateMaxConcurrency(trips);
  assert.equal(result.maxConcurrency, 1, "Single user cannot be counted twice simultaneously");
});

test("density-engine: calculateMaxConcurrency - three-way concurrency sweep-line (Section 10 example)", () => {
  // Prompt Example:
  // Traveller A: Oct 1–5
  // Traveller B: Oct 3–8
  // Traveller C: Oct 4–6
  // Maximum simultaneous travellers = 3 on Oct 4–5
  const trips: TripEntity[] = [
    {
      id: "tA",
      waitlistUserId: "uA",
      destinationId: "bali",
      destinationName: "Bali",
      destinationCountry: "Indonesia",
      destinationCountryCode: "ID",
      marketSlug: "bali",
      arrivalDate: "2026-10-01",
      departureDate: "2026-10-05",
      travelMode: "solo",
      createdAt: "2026-09-01T00:00:00Z",
    },
    {
      id: "tB",
      waitlistUserId: "uB",
      destinationId: "bali",
      destinationName: "Bali",
      destinationCountry: "Indonesia",
      destinationCountryCode: "ID",
      marketSlug: "bali",
      arrivalDate: "2026-10-03",
      departureDate: "2026-10-08",
      travelMode: "solo",
      createdAt: "2026-09-01T00:00:00Z",
    },
    {
      id: "tC",
      waitlistUserId: "uC",
      destinationId: "bali",
      destinationName: "Bali",
      destinationCountry: "Indonesia",
      destinationCountryCode: "ID",
      marketSlug: "bali",
      arrivalDate: "2026-10-04",
      departureDate: "2026-10-06",
      travelMode: "solo",
      createdAt: "2026-09-01T00:00:00Z",
    },
  ];

  const result = calculateMaxConcurrency(trips);
  assert.equal(result.maxConcurrency, 3, "Expected maximum simultaneous travellers = 3");
  assert.equal(result.peakDate, "2026-10-04", "Peak concurrency starts on 2026-10-04");
});

test("density-engine: calculateOverlappingPairs - pair counts and distinct users", () => {
  // u1 (Oct 1-5), u2 (Oct 3-7), u3 (Oct 10-15)
  // Overlaps: {u1, u2} overlap. u3 does not overlap with anyone.
  const trips: TripEntity[] = [
    {
      id: "t1",
      waitlistUserId: "u1",
      destinationId: "bali",
      destinationName: "Bali",
      destinationCountry: "Indonesia",
      destinationCountryCode: "ID",
      marketSlug: "bali",
      arrivalDate: "2026-10-01",
      departureDate: "2026-10-05",
      travelMode: "solo",
      createdAt: "2026-09-01T00:00:00Z",
    },
    {
      id: "t2",
      waitlistUserId: "u2",
      destinationId: "bali",
      destinationName: "Bali",
      destinationCountry: "Indonesia",
      destinationCountryCode: "ID",
      marketSlug: "bali",
      arrivalDate: "2026-10-03",
      departureDate: "2026-10-07",
      travelMode: "solo",
      createdAt: "2026-09-01T00:00:00Z",
    },
    {
      id: "t3",
      waitlistUserId: "u3",
      destinationId: "bali",
      destinationName: "Bali",
      destinationCountry: "Indonesia",
      destinationCountryCode: "ID",
      marketSlug: "bali",
      arrivalDate: "2026-10-10",
      departureDate: "2026-10-15",
      travelMode: "solo",
      createdAt: "2026-09-01T00:00:00Z",
    },
  ];

  const { overlappingPairsCount, travellersWithOverlap } = calculateOverlappingPairs(trips);
  assert.equal(overlappingPairsCount, 1, "Only {u1, u2} overlap");
  assert.equal(travellersWithOverlap.size, 2);
  assert.equal(travellersWithOverlap.has("u1"), true);
  assert.equal(travellersWithOverlap.has("u2"), true);
  assert.equal(travellersWithOverlap.has("u3"), false);
});

test("density-engine: areProfilesCompatible - mutual match rules", () => {
  const womanLookingForMen: UserPreferencesProfile = {
    userId: "w1",
    gender: "woman",
    interestedIn: "men",
    meetPreference: "travelers",
    intentions: ["romantic_connection", "dating"],
    interests: ["beach", "food"],
    is18Plus: true,
    travelFrequency: "2-3_per_year",
    homeCountry: "United States",
    ageBand: "26-30",
    createdAt: "2026-09-01T00:00:00Z",
  };

  const manLookingForWomen: UserPreferencesProfile = {
    userId: "m1",
    gender: "man",
    interestedIn: "women",
    meetPreference: "both",
    intentions: ["dating", "see_where_it_goes"],
    interests: ["food", "hiking"],
    is18Plus: true,
    travelFrequency: "2-3_per_year",
    homeCountry: "United Kingdom",
    ageBand: "26-30",
    createdAt: "2026-09-01T00:00:00Z",
  };

  const manLookingForMen: UserPreferencesProfile = {
    userId: "m2",
    gender: "man",
    interestedIn: "men",
    meetPreference: "travelers",
    intentions: ["romantic_connection"],
    interests: ["nightlife"],
    is18Plus: true,
    travelFrequency: "4-6_per_year",
    homeCountry: "Canada",
    ageBand: "31-35",
    createdAt: "2026-09-01T00:00:00Z",
  };

  const incompatibleIntentionsUser: UserPreferencesProfile = {
    userId: "m3",
    gender: "man",
    interestedIn: "women",
    meetPreference: "travelers",
    intentions: ["activity_partner"], // no shared intention with w1
    interests: ["surfing"],
    is18Plus: true,
    travelFrequency: "1_per_year",
    homeCountry: "Australia",
    ageBand: "22-25",
    createdAt: "2026-09-01T00:00:00Z",
  };

  // 1. Woman looking for men + Man looking for women + shared "dating" -> Compatible
  assert.equal(areProfilesCompatible(womanLookingForMen, manLookingForWomen), true);

  // 2. Woman looking for men + Man looking for men -> Incompatible (gender mismatch)
  assert.equal(areProfilesCompatible(womanLookingForMen, manLookingForMen), false);

  // 3. Gender matches but zero shared intentions -> Incompatible
  assert.equal(areProfilesCompatible(womanLookingForMen, incompatibleIntentionsUser), false);
});

test("density-engine: findDensityWindows groups overlapping clusters correctly", () => {
  const trips: TripEntity[] = [
    {
      id: "t1",
      waitlistUserId: "u1",
      destinationId: "bali",
      destinationName: "Bali",
      destinationCountry: "Indonesia",
      destinationCountryCode: "ID",
      marketSlug: "bali",
      arrivalDate: "2026-10-12",
      departureDate: "2026-10-18",
      travelMode: "solo",
      createdAt: "2026-09-01T00:00:00Z",
    },
    {
      id: "t2",
      waitlistUserId: "u2",
      destinationId: "bali",
      destinationName: "Bali",
      destinationCountry: "Indonesia",
      destinationCountryCode: "ID",
      marketSlug: "bali",
      arrivalDate: "2026-10-14",
      departureDate: "2026-10-20",
      travelMode: "solo",
      createdAt: "2026-09-01T00:00:00Z",
    },
    // Distinct window in November
    {
      id: "t3",
      waitlistUserId: "u3",
      destinationId: "bali",
      destinationName: "Bali",
      destinationCountry: "Indonesia",
      destinationCountryCode: "ID",
      marketSlug: "bali",
      arrivalDate: "2026-11-03",
      departureDate: "2026-11-09",
      travelMode: "solo",
      createdAt: "2026-09-01T00:00:00Z",
    },
    {
      id: "t4",
      waitlistUserId: "u4",
      destinationId: "bali",
      destinationName: "Bali",
      destinationCountry: "Indonesia",
      destinationCountryCode: "ID",
      marketSlug: "bali",
      arrivalDate: "2026-11-05",
      departureDate: "2026-11-12",
      travelMode: "solo",
      createdAt: "2026-09-01T00:00:00Z",
    },
  ];

  const windows = findDensityWindows(trips);
  assert.equal(windows.length, 2, "Expected 2 distinct overlapping travel windows");
  assert.equal(windows[0].travellersCount, 2);
  assert.equal(windows[0].startDate, "2026-10-12");
  assert.equal(windows[1].travellersCount, 2);
  assert.equal(windows[1].startDate, "2026-11-03");
});

test("density-engine: compileDestinationDensitySummary compiles full destination report", () => {
  const trips: TripEntity[] = [
    {
      id: "t1",
      waitlistUserId: "u1",
      destinationId: "tokyo",
      destinationName: "Tokyo",
      destinationCountry: "Japan",
      destinationCountryCode: "JP",
      marketSlug: "tokyo",
      arrivalDate: "2026-11-01",
      departureDate: "2026-11-10",
      travelMode: "solo",
      createdAt: "2026-09-01T00:00:00Z",
    },
    {
      id: "t2",
      waitlistUserId: "u2",
      destinationId: "tokyo",
      destinationName: "Tokyo",
      destinationCountry: "Japan",
      destinationCountryCode: "JP",
      marketSlug: "tokyo",
      arrivalDate: "2026-11-05",
      departureDate: "2026-11-15",
      travelMode: "solo",
      createdAt: "2026-09-01T00:00:00Z",
    },
  ];

  const summary = compileDestinationDensitySummary(
    "tokyo",
    "Tokyo",
    "Japan",
    "tokyo",
    trips,
    undefined,
    1
  );

  assert.equal(summary.destinationId, "tokyo");
  assert.equal(summary.totalTrips, 2);
  assert.equal(summary.uniqueTravellers, 2);
  assert.equal(summary.travellersWithOverlap, 2);
  assert.equal(summary.overlappingPairsCount, 1);
  assert.equal(summary.maxConcurrency, 2);
  assert.equal(summary.densityPercentage, 100);
  assert.equal(summary.interviewVolunteersCount, 1);
  assert.equal(summary.readiness, "warming");
});
