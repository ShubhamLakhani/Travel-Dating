/**
 * Analytics types and privacy definitions for Project Roam.
 *
 * CRITICAL PRIVACY RULE:
 * Absolutely NO Personally Identifiable Information (PII) may be sent to analytics.
 * The following fields are strictly prohibited from event properties:
 * - email
 * - phone
 * - full name / name / first_name / last_name
 * - exact birthdate / date_of_birth
 * - hotel / accommodation / lodging
 * - precise location / GPS coordinates / street address
 */

export type ProhibitedAnalyticsKeys =
  | "email"
  | "phone"
  | "phoneNumber"
  | "fullName"
  | "name"
  | "firstName"
  | "lastName"
  | "birthdate"
  | "exactBirthdate"
  | "hotel"
  | "exactAccommodation"
  | "accommodation"
  | "preciseLocation"
  | "latitude"
  | "longitude"
  | "address";

export type EarlyAccessSource =
  | "header"
  | "sample_profile_interest"
  | "landing_bottom_cta";

export interface AllowedEventProperties {
  visitor_id?: string;
  experiment_variant?: string;
  device_type?: "mobile" | "tablet" | "desktop";
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  destination?: string;
  destination_country?: string;
  arrival_month?: string;
  trip_duration_days?: number;
  traveler_type?: string;
  age_band?: string;
  traveler_local_preference?: string;
  relationship_intention?: string;
  sample_profile_id?: string;
  overlap_days?: number;
  travel_frequency?: string;
  source?: EarlyAccessSource | string;
  [key: string]: string | number | boolean | undefined | null;
}

/**
 * Ensures at compile-time that prohibited keys cannot be passed into event tracking.
 */
export type SafeEventProperties<T extends AllowedEventProperties = AllowedEventProperties> =
  T & { [K in ProhibitedAnalyticsKeys]?: never };
