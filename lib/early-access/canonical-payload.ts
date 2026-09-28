import crypto from "crypto";

export interface CanonicalSubmissionPayloadInput {
  email: string;
  homeCountry: string;
  ageBand: string;
  gender: string;
  genderSelfDescribe?: string | null;
  interestedIn: string;
  usedDatingAppsWhileTraveling?: boolean | null;
  travelFrequency?: string | null;
  is18Plus: boolean;
  marketingConsent: boolean;
  meetPreference: string;
  intentions: string[];
  interests: string[];
  customInterest?: string | null;
  destinationId: string;
  marketSlug: string;
  arrivalDate: string;
  departureDate: string;
  travelMode: string;
  interviewOptIn?: boolean;
}

/**
 * Normalizes a submission payload deterministically for database persistence and hashing.
 * Arrays are sorted and strings are trimmed/normalized.
 */
export function buildCanonicalSubmissionPayload(
  input: CanonicalSubmissionPayloadInput
): Record<string, unknown> {
  const intentions = [...input.intentions].sort();
  const interests = [...input.interests].sort();

  return {
    ageBand: input.ageBand,
    arrivalDate: input.arrivalDate,
    customInterest: input.customInterest?.trim() || null,
    departureDate: input.departureDate,
    destinationId: input.destinationId,
    email: input.email.trim().toLowerCase(),
    gender: input.gender,
    genderSelfDescribe: input.genderSelfDescribe?.trim() || null,
    homeCountry: input.homeCountry.trim(),
    intentions,
    interests,
    interestedIn: input.interestedIn,
    interviewOptIn: Boolean(input.interviewOptIn),
    is18Plus: true,
    marketSlug: input.marketSlug,
    marketingConsent: Boolean(input.marketingConsent),
    meetPreference: input.meetPreference,
    travelFrequency: input.travelFrequency || null,
    travelMode: input.travelMode,
    usedDatingAppsWhileTraveling: input.usedDatingAppsWhileTraveling ?? null,
  };
}

/**
 * Computes deterministic SHA-256 hash of the canonical normalized payload.
 */
export function computeCanonicalPayloadHash(
  input: CanonicalSubmissionPayloadInput
): { normalizedPayload: Record<string, unknown>; payloadHash: string } {
  const normalized = buildCanonicalSubmissionPayload(input);
  // Deterministic JSON serialization: Object keys are sorted in buildCanonicalSubmissionPayload
  const serialized = JSON.stringify(normalized);
  const hash = crypto.createHash("sha256").update(serialized).digest("hex");
  return { normalizedPayload: normalized, payloadHash: hash };
}
