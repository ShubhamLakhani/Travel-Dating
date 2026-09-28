// Project Roam — Phase 7 Admin & Density Analytics Types
// File: types/admin.ts

export type DensityBucket =
  | "none"       // 0 travellers
  | "isolated"   // 1 traveller
  | "minimal"    // 2 travellers
  | "emerging"   // 3–5 travellers
  | "meaningful" // 6–10 travellers
  | "strong";    // 10+ travellers

export type DestinationReadiness = "ready" | "warming" | "cold";

export type InterviewStatus =
  | "opted_in"
  | "contacted"
  | "scheduled"
  | "completed"
  | "declined";

export interface TripEntity {
  id: string;
  waitlistUserId: string;
  destinationId: string;
  destinationName: string;
  destinationCountry: string;
  destinationCountryCode: string | null;
  marketSlug: string;
  arrivalDate: string; // YYYY-MM-DD
  departureDate: string; // YYYY-MM-DD
  travelMode: string;
  createdAt: string;
}

export interface UserPreferencesProfile {
  userId: string;
  gender: string;
  interestedIn: string;
  meetPreference: string;
  intentions: string[];
  interests: string[];
  is18Plus: boolean;
  travelFrequency: string | null;
  homeCountry: string;
  ageBand: string;
  createdAt: string;
}

export interface DensityWindow {
  startDate: string;
  endDate: string;
  travellersCount: number;
  compatibleTravellersCount: number;
  peakConcurrency: number;
  bucket: DensityBucket;
}

export interface DestinationDensitySummary {
  destinationId: string;
  destinationName: string;
  destinationCountry: string;
  marketSlug: string;
  totalTrips: number;
  uniqueTravellers: number;
  upcomingTrips: number;
  pastTrips: number;
  earliestArrival: string | null;
  latestDeparture: string | null;
  travellersWithOverlap: number;
  overlappingPairsCount: number;
  maxConcurrency: number;
  peakDate: string | null;
  densityPercentage: number;
  densityBucket: DensityBucket;
  compatibleTravellersCount: number;
  compatiblePairsCount: number;
  compatibleDensityPercentage: number;
  windowsWith2Plus: number;
  windowsWith5Plus: number;
  interviewVolunteersCount: number;
  readiness: DestinationReadiness;
  upcomingWindows: DensityWindow[];
}

export interface TravelMonthSummary {
  monthKey: string; // YYYY-MM
  monthLabel: string; // e.g. "October 2026"
  totalTrips: number;
  uniqueTravellers: number;
  destinationsCount: number;
  topDestinations: Array<{ name: string; trips: number; uniqueTravellers: number }>;
  overlappingPairsCount: number;
  maxConcurrency: number;
}

export interface AdminOverviewKPIs {
  totalUsers: number;
  totalTrips: number;
  uniqueTravellers: number;
  multiTripUsers: number;
  interviewVolunteers: number;
  tripsLast7Days: number;
  tripsLast30Days: number;
  signupsLast7Days: number;
  signupsLast30Days: number;
  timeSeriesActivity: Array<{
    date: string;
    signups: number;
    trips: number;
  }>;
  funnel: {
    stages: Array<{
      stage: string;
      label: string;
      count: number;
      conversionFromPrev: number;
      conversionFromTop: number;
      source: "database" | "client_analytics";
    }>;
    notes: string;
  };
}

export interface DemographicInsights {
  totalUsers: number;
  ageBands: Record<string, number>;
  genderDistribution: Record<string, number>;
  interestedInDistribution: Record<string, number>;
  meetPreferenceDistribution: Record<string, number>;
  relationshipIntentions: Record<string, number>;
  travelInterests: Record<string, number>;
  travelFrequency: Record<string, number>;
  travelModeDistribution: Record<string, number>;
}

export interface InterviewVolunteerItem {
  id: string;
  waitlistUserId: string;
  maskedUserId: string;
  email: string;
  homeCountry: string;
  ageBand: string;
  gender: string;
  status: InterviewStatus;
  createdAt: string;
  contactedAt: string | null;
  completedAt: string | null;
  destinations: string[];
  upcomingTrips: Array<{
    destinationName: string;
    arrivalDate: string;
    departureDate: string;
    travelMode: string;
  }>;
}

export interface AdminUserListItem {
  id: string;
  maskedId: string;
  createdAt: string;
  homeCountry: string;
  ageBand: string;
  gender: string;
  interestedIn: string;
  meetPreference: string;
  intentions: string[];
  interests: string[];
  tripCount: number;
  isInterviewVolunteer: boolean;
}
