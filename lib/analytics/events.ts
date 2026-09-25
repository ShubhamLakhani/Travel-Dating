/**
 * Project Roam Analytics Event Registry
 * Canonical list of event names for demand validation tracking.
 */

export const ANALYTICS_EVENTS = {
  LANDING_VIEW: "landing_view",
  DESTINATION_INPUT_FOCUSED: "destination_input_focused",
  DESTINATION_ENTERED: "destination_entered",
  TRIP_DATES_ENTERED: "trip_dates_entered",
  FIND_MATCHES_CLICKED: "find_matches_clicked",
  SAMPLE_MATCHES_VIEWED: "sample_matches_viewed",
  SAMPLE_PROFILE_OPENED: "sample_profile_opened",
  SAMPLE_PROFILE_INTEREST_CLICKED: "sample_profile_interest_clicked",
  EARLY_ACCESS_STARTED: "early_access_started",
  EARLY_ACCESS_TRIP_COMPLETED: "early_access_trip_completed",
  EARLY_ACCESS_PREFERENCES_COMPLETED: "early_access_preferences_completed",
  EARLY_ACCESS_PROFILE_COMPLETED: "early_access_profile_completed",
  EARLY_ACCESS_COMPLETED: "early_access_completed",
  REAL_TRIP_SUBMITTED: "real_trip_submitted",
  INTERVIEW_OPT_IN: "interview_opt_in",
  SECOND_TRIP_STARTED: "second_trip_started",
  SECOND_TRIP_COMPLETED: "second_trip_completed",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
