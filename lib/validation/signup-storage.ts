import { EarlyAccessDraft } from "@/types/signup";
import { TripSearchDraft } from "@/types/trip";
import { getStoredTripDraft } from "./trip-storage";

export const SIGNUP_STORAGE_KEY = "roam.validation.signup.v1";

/**
 * Temporary development guard.
 * Phase 5 remains explicitly in a pre-persistence validation/review mode.
 * Phase 6 will enable durable signup when Supabase database writes are connected.
 */
export const DURABLE_SIGNUP_ENABLED = false;

const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedSnapshot: EarlyAccessDraft | null = null;

export function subscribeToSignupStorage(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notifyListeners(): void {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch {
      // Ignore listener error
    }
  });
}

function generateClientSubmissionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "sub-" + Math.random().toString(36).substring(2, 15) + "-" + Date.now().toString(36);
}

export function createEmptySignupDraft(initialTrip?: TripSearchDraft | null): EarlyAccessDraft {
  const trip = initialTrip || getStoredTripDraft();

  return {
    submissionId: generateClientSubmissionId(),
    step: 1,
    trip: {
      destination: trip?.destination || null,
      arrivalDate: trip?.arrivalDate || null,
      departureDate: trip?.departureDate || null,
      travelMode: null,
    },
    profile: {
      ageBand: null,
      gender: null,
      genderSelfDescribe: "",
      interestedIn: null,
      meetPreference: null,
    },
    intentions: [],
    interests: [],
    customInterest: "",
    contact: {
      email: "",
      homeCountry: "",
      usedDatingAppsWhileTraveling: null,
      travelFrequency: null,
      is18Plus: false,
      marketingConsent: false,
    },
    interviewOptIn: false,
  };
}

/**
 * Retrieves the early access questionnaire draft from sessionStorage safely.
 * Returns a stable cached snapshot for React reactivity.
 */
export function getStoredSignupDraft(): EarlyAccessDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SIGNUP_STORAGE_KEY);
    if (!raw) {
      cachedRaw = null;
      cachedSnapshot = null;
      return null;
    }

    if (raw === cachedRaw && cachedSnapshot !== null) {
      return cachedSnapshot;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.submissionId) {
      cachedRaw = null;
      cachedSnapshot = null;
      return null;
    }

    cachedRaw = raw;
    cachedSnapshot = parsed as EarlyAccessDraft;
    return cachedSnapshot;
  } catch {
    cachedRaw = null;
    cachedSnapshot = null;
    return null;
  }
}

/**
 * Persists the early access questionnaire draft to sessionStorage and updates the cache.
 */
export function saveSignupDraft(draft: EarlyAccessDraft): void {
  if (typeof window === "undefined") return;
  try {
    const raw = JSON.stringify(draft);
    if (raw === cachedRaw) return;

    cachedRaw = raw;
    cachedSnapshot = { ...draft };
    window.sessionStorage.setItem(SIGNUP_STORAGE_KEY, raw);
    notifyListeners();
  } catch {
    // Ignore quota or storage error
  }
}

/**
 * Clears the stored signup draft.
 */
export function clearStoredSignupDraft(): void {
  if (typeof window === "undefined") return;
  try {
    cachedRaw = null;
    cachedSnapshot = null;
    window.sessionStorage.removeItem(SIGNUP_STORAGE_KEY);
    notifyListeners();
  } catch {
    // Ignore error
  }
}

/**
 * Prepares the draft for adding another trip (Phase 5/6 "Add another trip" action).
 * Clears destination, arrival, departure, travelMode and resets step to 1.
 * Retains profile, contact, intentions, interests, and submissionId.
 */
export function resetForNewTrip(currentDraft: EarlyAccessDraft): EarlyAccessDraft {
  const updated: EarlyAccessDraft = {
    ...currentDraft,
    step: 1,
    trip: {
      destination: null,
      arrivalDate: null,
      departureDate: null,
      travelMode: null,
    },
    completedAt: undefined,
  };
  saveSignupDraft(updated);
  return updated;
}
