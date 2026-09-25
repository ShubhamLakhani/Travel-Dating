/**
 * Signup and early-access preference types for Project Roam.
 * Note: Project Roam is strictly 18+.
 */

import { DestinationOption, TravelMode } from "./trip";

export type AgeBand =
  | "18-21"
  | "22-25"
  | "26-30"
  | "31-35"
  | "36-40"
  | "41+"
  // Backward compatibility with Phase 1 types
  | "18-24";

export type GenderOption =
  | "woman"
  | "man"
  | "non-binary"
  | "self-describe"
  | "prefer_not_to_say"
  // Backward compatibility
  | "other";

export type InterestedInOption =
  | "women"
  | "men"
  | "everyone";

export type MeetPreference =
  | "travelers"
  | "locals"
  | "both"
  // Backward compatibility
  | "travelers_only"
  | "locals_only";

export type RelationshipIntention =
  | "casual_dating"
  | "romantic_connection"
  | "potential_relationship"
  | "see_where_it_goes"
  // Backward compatibility
  | "dating"
  | "travel_companion"
  | "open_to_possibilities"
  | "activity_partner";

export type TravelInterest =
  | "beach"
  | "nightlife"
  | "food"
  | "cafes"
  | "photography"
  | "hiking"
  | "adventure"
  | "museums"
  | "music"
  | "wellness"
  | "surfing"
  | "road_trips"
  | "culture"
  | "shopping"
  | "other"
  // Backward compatibility
  | "food_cafes"
  | "nature_hiking"
  | "art_culture"
  | "beach_relaxation";

export type TravelFrequency =
  | "1_per_year"
  | "2-3_per_year"
  | "4-6_per_year"
  | "7_plus_per_year";

export interface EarlyAccessTripState {
  destination: DestinationOption | null;
  arrivalDate: string | null; // ISO YYYY-MM-DD
  departureDate: string | null; // ISO YYYY-MM-DD
  travelMode: TravelMode | null;
}

export interface EarlyAccessProfileState {
  ageBand: AgeBand | null;
  gender: GenderOption | null;
  genderSelfDescribe?: string;
  interestedIn: InterestedInOption | null;
  meetPreference: MeetPreference | null;
}

export interface EarlyAccessContactState {
  email: string;
  homeCountry: string;
  usedDatingAppsWhileTraveling?: boolean | null;
  travelFrequency?: TravelFrequency | null;
  is18Plus: boolean;
  marketingConsent: boolean;
}

export interface EarlyAccessDraft {
  submissionId: string;
  step: 1 | 2 | 3 | 4 | "review";
  trip: EarlyAccessTripState;
  profile: EarlyAccessProfileState;
  intentions: RelationshipIntention[];
  interests: TravelInterest[];
  customInterest?: string;
  contact: EarlyAccessContactState;
  interviewOptIn?: boolean;
  completedAt?: string;
}

export interface EarlyAccessPreferencesDraft {
  ageBand?: AgeBand;
  gender?: GenderOption;
  genderPreference?: GenderOption[];
  meetPreference?: MeetPreference;
  relationshipIntention?: RelationshipIntention;
  interests?: TravelInterest[];
}
