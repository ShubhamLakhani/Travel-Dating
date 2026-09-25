import type { TravelInterest, RelationshipIntention } from "@/types/signup";
import type { DestinationOption, TripSearchDraft } from "@/types/trip";
import {
  addDaysToCalendarDate,
  calculateTripOverlap,
  getTodayCalendarDate,
  type TripOverlapResult,
} from "./trip-dates.ts";

export interface SampleProfile {
  id: string;
  name: string;
  age: number;
  homeCity: string;
  homeCountry: string;
  image?: string;
  avatarColor: string;
  initials: string;
  arrivalOffsetDays: number;
  departureOffsetDays: number;
  travelMode: "solo" | "friends";
  interests: TravelInterest[];
  intentions: RelationshipIntention[];
  shortBio: string;
}

export interface SampleMatch {
  profile: SampleProfile;
  destination: DestinationOption;
  arrivalDate: string;
  departureDate: string;
  overlap: TripOverlapResult;
}

export const SAMPLE_PROFILES: readonly SampleProfile[] = [
  {
    id: "sample-maya",
    name: "Maya",
    age: 27,
    homeCity: "Sydney",
    homeCountry: "Australia",
    avatarColor: "#FF6257", // Roam Coral
    initials: "M",
    arrivalOffsetDays: 2,
    departureOffsetDays: 2,
    travelMode: "solo",
    interests: ["photography", "beach_relaxation", "food_cafes"],
    intentions: ["dating", "open_to_possibilities"],
    shortBio: "Usually planning my day around coffee, a camera, and somewhere near the water.",
  },
  {
    id: "sample-elena",
    name: "Elena",
    age: 28,
    homeCity: "Barcelona",
    homeCountry: "Spain",
    avatarColor: "#1C3F5E", // Deep Sky Mist / Midnight Navy
    initials: "E",
    arrivalOffsetDays: -1,
    departureOffsetDays: -2,
    travelMode: "solo",
    interests: ["food_cafes", "nature_hiking", "art_culture", "nightlife"],
    intentions: ["dating", "travel_companion"],
    shortBio: "I travel for local food, long walks, and the places that aren't on the first page of a guidebook.",
  },
  {
    id: "sample-sofia",
    name: "Sofia",
    age: 26,
    homeCity: "Milan",
    homeCountry: "Italy",
    avatarColor: "#2E6B52", // Soft Sage dark
    initials: "S",
    arrivalOffsetDays: 4,
    departureOffsetDays: 4,
    travelMode: "friends",
    interests: ["nightlife", "beach_relaxation", "adventure", "food_cafes"],
    intentions: ["dating", "open_to_possibilities"],
    shortBio: "Live music, spontaneous day trips, and finding the best café in every city.",
  },
];

export const INTENTION_LABELS: Record<RelationshipIntention, string> = {
  casual_dating: "Casual dating",
  romantic_connection: "Romantic connection",
  potential_relationship: "Potential relationship",
  see_where_it_goes: "Open to seeing where it goes",
  dating: "Dating",
  travel_companion: "Travel companion",
  open_to_possibilities: "Open to possibilities",
  activity_partner: "Activity partner",
};

export const INTEREST_LABELS: Record<TravelInterest, string> = {
  beach: "Beach",
  nightlife: "Nightlife",
  food: "Food",
  cafes: "Cafés",
  photography: "Photography",
  hiking: "Hiking",
  adventure: "Adventure",
  museums: "Museums",
  music: "Music",
  wellness: "Wellness",
  surfing: "Surfing",
  road_trips: "Road trips",
  culture: "Culture",
  shopping: "Shopping",
  other: "Other",
  food_cafes: "Food & Cafés",
  nature_hiking: "Nature & Hiking",
  art_culture: "Art & Culture",
  beach_relaxation: "Beach & Relaxation",
};

/**
 * Deterministically generates sample matches with dynamic travel dates
 * calculated relative to the user's selected trip.
 *
 * Guarantees:
 * 1. Arrival is not in the past relative to referenceDate (default: today).
 * 2. Departure is strictly after arrival (> 0 nights).
 * 3. Overlap is accurately calculated using arrival-inclusive, departure-exclusive semantics.
 */
export function generateSampleMatches(
  userTrip: TripSearchDraft,
  referenceDate?: string
): SampleMatch[] {
  if (!userTrip.destination || !userTrip.arrivalDate || !userTrip.departureDate) {
    return [];
  }

  const todayStr = referenceDate || getTodayCalendarDate();
  const userArrival = userTrip.arrivalDate;
  const userDeparture = userTrip.departureDate;

  return SAMPLE_PROFILES.map((profile) => {
    let sampleArrival = addDaysToCalendarDate(userArrival, profile.arrivalOffsetDays);
    let sampleDeparture = addDaysToCalendarDate(userDeparture, profile.departureOffsetDays);

    // Rule 1: Past date boundary check. Sample arrival cannot be before today.
    if (sampleArrival < todayStr) {
      sampleArrival = todayStr;
    }

    // Rule 2: Ensure departure is strictly greater than arrival with at least 3 nights
    if (sampleDeparture <= sampleArrival) {
      sampleDeparture = addDaysToCalendarDate(sampleArrival, 4);
    }

    const overlap = calculateTripOverlap(
      userArrival,
      userDeparture,
      sampleArrival,
      sampleDeparture
    );

    return {
      profile,
      destination: userTrip.destination!,
      arrivalDate: sampleArrival,
      departureDate: sampleDeparture,
      overlap,
    };
  });
}
