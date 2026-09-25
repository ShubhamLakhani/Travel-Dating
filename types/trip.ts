/**
 * Travel styles and trip-related foundational types for Project Roam.
 */

export type TravelMode = "solo" | "friends" | "group" | "other";

export interface DestinationOption {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  label: string;
  marketSlug: string;
  image?: string;
}

export interface TripSearchDraft {
  destination: DestinationOption | null;
  arrivalDate: string | null;   // ISO calendar date string (YYYY-MM-DD)
  departureDate: string | null; // ISO calendar date string (YYYY-MM-DD)
}

export interface TripDraft {
  destination: string;
  destinationCountry?: string;
  startDate?: string; // ISO date string (YYYY-MM-DD)
  endDate?: string;   // ISO date string (YYYY-MM-DD)
  travelMode?: TravelMode;
  notes?: string;
}
