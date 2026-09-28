// Project Roam — Phase 7 Trip Density Engine
// File: lib/admin/density-engine.ts

import type {
  TripEntity,
  UserPreferencesProfile,
  DensityBucket,
  DestinationReadiness,
  DensityWindow,
  DestinationDensitySummary,
} from "../../types/admin.ts";
import { addDaysToCalendarDate, getTodayCalendarDate } from "../validation/trip-dates.ts";

/**
 * 1. OVERLAP DEFINITION:
 * Two trip intervals [arrA, depA] and [arrB, depB] overlap if and only if:
 * arrA <= depB AND arrB <= depA.
 * Date handling is inclusive of departure date.
 */
export function doTripsOverlap(
  arrA: string,
  depA: string,
  arrB: string,
  depB: string
): boolean {
  return arrA <= depB && arrB <= depA;
}

/**
 * 2. DENSITY BUCKETS:
 * Research labels for visual interpretation of market density.
 * 0 travellers -> 'none'
 * 1 traveller -> 'isolated'
 * 2 travellers -> 'minimal'
 * 3–5 travellers -> 'emerging'
 * 6–10 travellers -> 'meaningful'
 * 10+ travellers -> 'strong'
 */
export function getDensityBucket(travellersCount: number): DensityBucket {
  if (travellersCount <= 0) return "none";
  if (travellersCount === 1) return "isolated";
  if (travellersCount === 2) return "minimal";
  if (travellersCount <= 5) return "emerging";
  if (travellersCount <= 10) return "meaningful";
  return "strong";
}

/**
 * Merges overlapping or touching date intervals for a single user into disjoint intervals.
 * Ensures a single traveller is never double-counted on the same day if they submit multiple trips.
 */
export function mergeUserTripIntervals(
  intervals: Array<{ start: string; end: string }>
): Array<{ start: string; end: string }> {
  if (intervals.length === 0) return [];

  // Sort by start date ascending, then end date ascending
  const sorted = [...intervals].sort((a, b) => {
    if (a.start !== b.start) return a.start.localeCompare(b.start);
    return a.end.localeCompare(b.end);
  });

  const merged: Array<{ start: string; end: string }> = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    if (current.start <= last.end) {
      // Overlapping: extend end date if current ends later
      if (current.end > last.end) {
        last.end = current.end;
      }
    } else {
      merged.push(current);
    }
  }

  return merged;
}

/**
 * 3. MAXIMUM SIMULTANEOUS TRAVELLERS (CONCURRENCY ALGORITHM):
 * Sweep-line / event-point algorithm on calendar intervals.
 *
 * Algorithm:
 * 1. For each distinct traveller, merge their trips at this destination into disjoint intervals.
 * 2. For each disjoint interval [start, end]:
 *    - Generate +1 event at `start`
 *    - Generate -1 event at `addDaysToCalendarDate(end, 1)` (departure day is inclusive)
 * 3. Sort events chronologically. If dates match, -1 events occur after +1 events.
 * 4. Sweep through events, updating the count of concurrent active travellers.
 * 5. Track maximum concurrency observed and the earliest peak date.
 */
export function calculateMaxConcurrency(trips: TripEntity[]): {
  maxConcurrency: number;
  peakDate: string | null;
} {
  if (trips.length === 0) {
    return { maxConcurrency: 0, peakDate: null };
  }

  // 1. Group trips by waitlist user
  const userTripsMap = new Map<string, Array<{ start: string; end: string }>>();
  for (const t of trips) {
    const list = userTripsMap.get(t.waitlistUserId) || [];
    list.push({ start: t.arrivalDate, end: t.departureDate });
    userTripsMap.set(t.waitlistUserId, list);
  }

  // 2. Generate events from merged user intervals
  interface SweepEvent {
    date: string;
    type: 1 | -1;
    userId: string;
  }
  const events: SweepEvent[] = [];

  for (const [userId, intervals] of userTripsMap.entries()) {
    const merged = mergeUserTripIntervals(intervals);
    for (const interval of merged) {
      events.push({ date: interval.start, type: 1, userId });
      // Departure date is inclusive: traveller leaves on end + 1 day
      const leaveDate = addDaysToCalendarDate(interval.end, 1);
      events.push({ date: leaveDate, type: -1, userId });
    }
  }

  // Sort events chronologically. If same date, +1 comes before -1 (inclusive boundary)
  events.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return b.type - a.type;
  });

  let currentCount = 0;
  let maxConcurrency = 0;
  let peakDate: string | null = null;

  for (const ev of events) {
    currentCount += ev.type;
    if (currentCount > maxConcurrency) {
      maxConcurrency = currentCount;
      peakDate = ev.date;
    }
  }

  return { maxConcurrency, peakDate };
}

/**
 * 4. OVERLAPPING TRAVELLER PAIRS & TRAVELLERS WITH OVERLAP:
 *
 * Distinct user pairs {u, v} (u != v) that have at least one overlapping trip interval.
 * Returns:
 * - overlappingUserPairs: Set of string keys "u::v" (ordered lexicographically)
 * - travellersWithOverlap: Set of user IDs that participate in at least one overlap
 */
export function calculateOverlappingPairs(trips: TripEntity[]): {
  overlappingPairsCount: number;
  travellersWithOverlap: Set<string>;
  pairKeys: Set<string>;
} {
  const userTripsMap = new Map<string, Array<{ start: string; end: string }>>();
  for (const t of trips) {
    const list = userTripsMap.get(t.waitlistUserId) || [];
    list.push({ start: t.arrivalDate, end: t.departureDate });
    userTripsMap.set(t.waitlistUserId, list);
  }

  const userIds = Array.from(userTripsMap.keys());
  const travellersWithOverlap = new Set<string>();
  const pairKeys = new Set<string>();

  for (let i = 0; i < userIds.length; i++) {
    const u1 = userIds[i];
    const trips1 = userTripsMap.get(u1)!;

    for (let j = i + 1; j < userIds.length; j++) {
      const u2 = userIds[j];
      const trips2 = userTripsMap.get(u2)!;

      // Check if any trip of u1 overlaps with any trip of u2
      let overlaps = false;
      for (const t1 of trips1) {
        for (const t2 of trips2) {
          if (doTripsOverlap(t1.start, t1.end, t2.start, t2.end)) {
            overlaps = true;
            break;
          }
        }
        if (overlaps) break;
      }

      if (overlaps) {
        travellersWithOverlap.add(u1);
        travellersWithOverlap.add(u2);
        const pairKey = u1 < u2 ? `${u1}::${u2}` : `${u2}::${u1}`;
        pairKeys.add(pairKey);
      }
    }
  }

  return {
    overlappingPairsCount: pairKeys.size,
    travellersWithOverlap,
    pairKeys,
  };
}

/**
 * 5. POTENTIAL MUTUAL COMPATIBILITY ENGINE:
 * Conservative rules based strictly on explicitly collected Phase 6 fields:
 *
 * Two overlapping travellers A and B are potentially compatible if:
 * 1. Gender & Dating Intentions Match:
 *    - A satisfies B's interestedIn:
 *      (B.interestedIn === 'everyone' || (B.interestedIn === 'women' && A.gender === 'woman') || (B.interestedIn === 'men' && A.gender === 'man'))
 *    - B satisfies A's interestedIn:
 *      (A.interestedIn === 'everyone' || (A.interestedIn === 'women' && B.gender === 'woman') || (A.interestedIn === 'men' && B.gender === 'man'))
 * 2. Shared Relationship Intentions:
 *    At least one common intention between A.intentions and B.intentions.
 * 3. Meet Preference:
 *    Both are willing to meet travellers (travelers, both, or travelers_only).
 */
export function areProfilesCompatible(
  pA: UserPreferencesProfile,
  pB: UserPreferencesProfile
): boolean {
  // 1. Gender mutual match
  const aSatisfiesB =
    pB.interestedIn === "everyone" ||
    (pB.interestedIn === "women" && pA.gender === "woman") ||
    (pB.interestedIn === "men" && pA.gender === "man");

  const bSatisfiesA =
    pA.interestedIn === "everyone" ||
    (pA.interestedIn === "women" && pB.gender === "woman") ||
    (pA.interestedIn === "men" && pB.gender === "man");

  if (!aSatisfiesB || !bSatisfiesA) {
    return false;
  }

  // 2. Shared relationship intentions (non-empty intersection)
  const setA = new Set(pA.intentions);
  const sharedIntentions = pB.intentions.some((int) => setA.has(int));
  if (!sharedIntentions) {
    return false;
  }

  // 3. Meet preference: both are travellers in this destination
  const aAcceptsTravellers = ["travelers", "both", "travelers_only"].includes(
    pA.meetPreference
  );
  const bAcceptsTravellers = ["travelers", "both", "travelers_only"].includes(
    pB.meetPreference
  );

  return aAcceptsTravellers && bAcceptsTravellers;
}

/**
 * 6. DENSITY WINDOWS (Actual overlapping date clusters):
 * Groups overlapping trips into coherent travel periods with 2+ overlapping travellers.
 */
export function findDensityWindows(
  trips: TripEntity[],
  profiles?: Map<string, UserPreferencesProfile>
): DensityWindow[] {
  if (trips.length < 2) return [];

  // Group trips by user
  const userTripsMap = new Map<string, Array<{ start: string; end: string }>>();
  for (const t of trips) {
    const list = userTripsMap.get(t.waitlistUserId) || [];
    list.push({ start: t.arrivalDate, end: t.departureDate });
    userTripsMap.set(t.waitlistUserId, list);
  }

  // Sort trips by arrival date
  const sortedTrips = [...trips].sort((a, b) =>
    a.arrivalDate.localeCompare(b.arrivalDate)
  );

  // Find continuous overlapping clusters
  const clusters: Array<{ start: string; end: string; trips: TripEntity[] }> = [];

  for (const trip of sortedTrips) {
    let merged = false;
    for (const cluster of clusters) {
      if (doTripsOverlap(trip.arrivalDate, trip.departureDate, cluster.start, cluster.end)) {
        if (trip.arrivalDate < cluster.start) cluster.start = trip.arrivalDate;
        if (trip.departureDate > cluster.end) cluster.end = trip.departureDate;
        cluster.trips.push(trip);
        merged = true;
        break;
      }
    }
    if (!merged) {
      clusters.push({
        start: trip.arrivalDate,
        end: trip.departureDate,
        trips: [trip],
      });
    }
  }

  const windows: DensityWindow[] = [];

  for (const cluster of clusters) {
    const uniqueUserIds = Array.from(new Set(cluster.trips.map((t) => t.waitlistUserId)));
    if (uniqueUserIds.length < 2) continue; // Single traveller is isolated

    const { maxConcurrency } = calculateMaxConcurrency(cluster.trips);

    // Calculate compatible travellers in window
    let compatibleCount = 0;
    if (profiles) {
      const compatibleUsersInWindow = new Set<string>();
      for (let i = 0; i < uniqueUserIds.length; i++) {
        const uA = uniqueUserIds[i];
        const profA = profiles.get(uA);
        if (!profA) continue;

        for (let j = i + 1; j < uniqueUserIds.length; j++) {
          const uB = uniqueUserIds[j];
          const profB = profiles.get(uB);
          if (!profB) continue;

          if (areProfilesCompatible(profA, profB)) {
            compatibleUsersInWindow.add(uA);
            compatibleUsersInWindow.add(uB);
          }
        }
      }
      compatibleCount = compatibleUsersInWindow.size;
    }

    windows.push({
      startDate: cluster.start,
      endDate: cluster.end,
      travellersCount: uniqueUserIds.length,
      compatibleTravellersCount: compatibleCount,
      peakConcurrency: maxConcurrency,
      bucket: getDensityBucket(uniqueUserIds.length),
    });
  }

  // Sort windows by start date ascending
  return windows.sort((a, b) => a.startDate.localeCompare(b.startDate));
}

/**
 * 7. DESTINATION READINESS (Factual Beta Readiness Signal):
 * Conservative transparent indicator derived from factual thresholds:
 * - 'ready': 5+ overlapping travellers, at least 1 window with 5+ travellers, and 10+ upcoming travellers
 * - 'warming': 2+ overlapping travellers or at least 1 window with 2+ travellers
 * - 'cold': isolated / no current overlaps
 */
export function calculateDestinationReadiness(params: {
  uniqueTravellers: number;
  travellersWithOverlap: number;
  maxConcurrency: number;
  windowsWith2Plus: number;
  windowsWith5Plus: number;
}): DestinationReadiness {
  if (
    params.windowsWith5Plus >= 1 &&
    params.travellersWithOverlap >= 5 &&
    params.uniqueTravellers >= 8
  ) {
    return "ready";
  }
  if (params.windowsWith2Plus >= 1 || params.travellersWithOverlap >= 2) {
    return "warming";
  }
  return "cold";
}

/**
 * 8. COMPLETE DESTINATION SUMMARY COMPILER:
 * Compiles all density, concurrency, window, compatibility, and readiness metrics for a destination.
 */
export function compileDestinationDensitySummary(
  destinationId: string,
  destinationName: string,
  destinationCountry: string,
  marketSlug: string,
  allTrips: TripEntity[],
  profiles?: Map<string, UserPreferencesProfile>,
  interviewVolunteersCount = 0
): DestinationDensitySummary {
  const today = getTodayCalendarDate();

  const totalTrips = allTrips.length;
  const uniqueUserIds = Array.from(new Set(allTrips.map((t) => t.waitlistUserId)));
  const uniqueTravellers = uniqueUserIds.length;

  // Split upcoming vs past
  const upcomingTripsList = allTrips.filter((t) => t.departureDate >= today);
  const pastTripsList = allTrips.filter((t) => t.departureDate < today);

  const upcomingTrips = upcomingTripsList.length;
  const pastTrips = pastTripsList.length;

  // Earliest upcoming arrival & latest departure
  let earliestArrival: string | null = null;
  let latestDeparture: string | null = null;

  for (const t of upcomingTripsList) {
    if (!earliestArrival || t.arrivalDate < earliestArrival) {
      earliestArrival = t.arrivalDate;
    }
    if (!latestDeparture || t.departureDate > latestDeparture) {
      latestDeparture = t.departureDate;
    }
  }

  // Calculate concurrency & overlapping pairs on upcoming trips (or all trips if no upcoming)
  const analysisTrips = upcomingTripsList.length > 0 ? upcomingTripsList : allTrips;
  const analysisUsers = new Set(analysisTrips.map((t) => t.waitlistUserId)).size;

  const { maxConcurrency, peakDate } = calculateMaxConcurrency(analysisTrips);
  const { overlappingPairsCount, travellersWithOverlap, pairKeys } =
    calculateOverlappingPairs(analysisTrips);

  // Density percentage: % of unique travellers with at least one overlap
  const densityPercentage =
    analysisUsers > 0
      ? Math.round((travellersWithOverlap.size / analysisUsers) * 100)
      : 0;

  // Compatible Density Analysis
  let compatibleTravellersCount = 0;
  let compatiblePairsCount = 0;

  if (profiles) {
    const compatibleUsersSet = new Set<string>();

    for (const pairKey of pairKeys) {
      const [uA, uB] = pairKey.split("::");
      const pA = profiles.get(uA);
      const pB = profiles.get(uB);
      if (pA && pB && areProfilesCompatible(pA, pB)) {
        compatiblePairsCount++;
        compatibleUsersSet.add(uA);
        compatibleUsersSet.add(uB);
      }
    }
    compatibleTravellersCount = compatibleUsersSet.size;
  }

  const compatibleDensityPercentage =
    analysisUsers > 0
      ? Math.round((compatibleTravellersCount / analysisUsers) * 100)
      : 0;

  // Density Windows
  const upcomingWindows = findDensityWindows(upcomingTripsList, profiles);
  const windowsWith2Plus = upcomingWindows.filter((w) => w.travellersCount >= 2).length;
  const windowsWith5Plus = upcomingWindows.filter((w) => w.travellersCount >= 5).length;

  const readiness = calculateDestinationReadiness({
    uniqueTravellers: analysisUsers,
    travellersWithOverlap: travellersWithOverlap.size,
    maxConcurrency,
    windowsWith2Plus,
    windowsWith5Plus,
  });

  return {
    destinationId,
    destinationName,
    destinationCountry,
    marketSlug,
    totalTrips,
    uniqueTravellers,
    upcomingTrips,
    pastTrips,
    earliestArrival,
    latestDeparture,
    travellersWithOverlap: travellersWithOverlap.size,
    overlappingPairsCount,
    maxConcurrency,
    peakDate,
    densityPercentage,
    densityBucket: getDensityBucket(analysisUsers),
    compatibleTravellersCount,
    compatiblePairsCount,
    compatibleDensityPercentage,
    windowsWith2Plus,
    windowsWith5Plus,
    interviewVolunteersCount,
    readiness,
    upcomingWindows,
  };
}
