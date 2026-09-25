import { TripSearchDraft } from "@/types/trip";

const TRIP_STORAGE_KEY = "roam.validation.trip.v1";

const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedSnapshot: TripSearchDraft | null = null;

export function subscribeToTripStorage(callback: () => void): () => void {
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

/**
 * Retrieves the trip search draft from sessionStorage safely.
 * Returns a stable cached reference to satisfy React useSyncExternalStore invariants.
 */
export function getStoredTripDraft(): TripSearchDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(TRIP_STORAGE_KEY);
    if (!raw) {
      cachedRaw = null;
      cachedSnapshot = null;
      return null;
    }

    if (raw === cachedRaw && cachedSnapshot !== null) {
      return cachedSnapshot;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      cachedRaw = null;
      cachedSnapshot = null;
      return null;
    }

    cachedRaw = raw;
    cachedSnapshot = {
      destination:
        parsed.destination && typeof parsed.destination === "object"
          ? parsed.destination
          : null,
      arrivalDate:
        typeof parsed.arrivalDate === "string" ? parsed.arrivalDate : null,
      departureDate:
        typeof parsed.departureDate === "string" ? parsed.departureDate : null,
    };
    return cachedSnapshot;
  } catch {
    cachedRaw = null;
    cachedSnapshot = null;
    return null;
  }
}

/**
 * Persists the trip search draft to sessionStorage and updates the cache.
 */
export function saveTripDraft(draft: TripSearchDraft): void {
  if (typeof window === "undefined") return;
  try {
    const raw = JSON.stringify(draft);
    if (raw === cachedRaw) return; // No change

    cachedRaw = raw;
    cachedSnapshot = { ...draft };
    window.sessionStorage.setItem(TRIP_STORAGE_KEY, raw);
    notifyListeners();
  } catch {
    // Ignore storage quota or disabled storage errors
  }
}

/**
 * Clears the stored trip draft from sessionStorage and invalidates cache.
 */
export function clearStoredTripDraft(): void {
  if (typeof window === "undefined") return;
  try {
    cachedRaw = null;
    cachedSnapshot = null;
    window.sessionStorage.removeItem(TRIP_STORAGE_KEY);
    notifyListeners();
  } catch {
    // Ignore error
  }
}
