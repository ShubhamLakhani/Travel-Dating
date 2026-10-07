/**
 * Project Roam Analytics Event Registry : Phase 8 Canonical Event Taxonomy
 * Canonical event names for demand validation tracking adhering strictly to Section 3 taxonomy.
 */

export const ANALYTICS_EVENTS = {
  // Phase 8 Canonical Taxonomy (Section 3)
  LANDING_VIEWED: "landing_viewed",
  DESTINATION_SEARCH_STARTED: "destination_search_started",
  DESTINATION_SELECTED: "destination_selected",
  TRAVEL_DATES_SELECTED: "travel_dates_selected",
  MATCH_PREVIEW_STARTED: "match_preview_started",
  MATCH_PREVIEW_VIEWED: "match_preview_viewed",
  EARLY_ACCESS_STARTED: "early_access_started",
  EARLY_ACCESS_STEP_COMPLETED: "early_access_step_completed",
  EARLY_ACCESS_COMPLETED: "early_access_completed",
  REAL_TRIP_SUBMITTED: "real_trip_submitted",
  INTERVIEW_OPTED_IN: "interview_opted_in",

  // Backward-compatible aliases for existing components
  LANDING_VIEW: "landing_viewed",
  DESTINATION_INPUT_FOCUSED: "destination_search_started",
  DESTINATION_ENTERED: "destination_selected",
  TRIP_DATES_ENTERED: "travel_dates_selected",
  FIND_MATCHES_CLICKED: "match_preview_started",
  SAMPLE_MATCHES_VIEWED: "match_preview_viewed",
  SAMPLE_PROFILE_OPENED: "sample_profile_opened",
  SAMPLE_PROFILE_INTEREST_CLICKED: "sample_profile_interest_clicked",
  EARLY_ACCESS_TRIP_COMPLETED: "early_access_step_completed",
  EARLY_ACCESS_PREFERENCES_COMPLETED: "early_access_step_completed",
  EARLY_ACCESS_PROFILE_COMPLETED: "early_access_step_completed",
  INTERVIEW_OPT_IN: "interview_opted_in",
  SECOND_TRIP_STARTED: "second_trip_started",
  SECOND_TRIP_COMPLETED: "second_trip_completed",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
