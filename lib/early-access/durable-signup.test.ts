import test from "node:test";
import assert from "node:assert/strict";
import {
  buildCanonicalSubmissionPayload,
  computeCanonicalPayloadHash,
  type CanonicalSubmissionPayloadInput,
} from "./canonical-payload.ts";
import { earlyAccessServerSchema } from "../validation/early-access-schema.ts";
import {
  createEmptySignupDraft,
  resetForNewTrip,
  rotateSubmissionId,
} from "../validation/signup-storage.ts";
import type { EarlyAccessDraft } from "../../types/signup.ts";
import { getTodayCalendarDate, addDaysToCalendarDate } from "../validation/trip-dates.ts";

const sampleInput: CanonicalSubmissionPayloadInput = {
  email: "  Traveler@Example.COM  ",
  homeCountry: "  United States  ",
  ageBand: "26-30",
  gender: "woman",
  genderSelfDescribe: "  adventurous traveler  ",
  interestedIn: "men",
  usedDatingAppsWhileTraveling: true,
  travelFrequency: "2-3_per_year",
  is18Plus: true,
  marketingConsent: false,
  meetPreference: "travelers",
  intentions: ["romantic_connection", "casual_dating"],
  interests: ["photography", "beach", "cafes"],
  customInterest: "  scuba diving  ",
  destinationId: "dest-bali",
  marketSlug: "bali",
  arrivalDate: "2026-11-01",
  departureDate: "2026-11-10",
  travelMode: "solo",
  interviewOptIn: true,
};

test("canonical-payload: normalizes email, strings, and deterministically sorts arrays", () => {
  const normalized = buildCanonicalSubmissionPayload(sampleInput);

  assert.equal(normalized.email, "traveler@example.com");
  assert.equal(normalized.homeCountry, "United States");
  assert.equal(normalized.genderSelfDescribe, "adventurous traveler");
  assert.equal(normalized.customInterest, "scuba diving");
  assert.deepEqual(normalized.intentions, ["casual_dating", "romantic_connection"]);
  assert.deepEqual(normalized.interests, ["beach", "cafes", "photography"]);
  assert.equal(normalized.interviewOptIn, true);
  assert.equal(normalized.marketingConsent, false);
});

test("canonical-payload: deterministic hashing generates identical hash for identical normalized data", () => {
  const { payloadHash: hash1 } = computeCanonicalPayloadHash(sampleInput);

  // Alter array order and whitespace in input
  const modifiedInput: CanonicalSubmissionPayloadInput = {
    ...sampleInput,
    email: "traveler@example.com",
    intentions: ["casual_dating", "romantic_connection"], // reversed order
    interests: ["beach", "photography", "cafes"], // scrambled order
    homeCountry: "United States",
  };

  const { payloadHash: hash2 } = computeCanonicalPayloadHash(modifiedInput);
  assert.equal(hash1, hash2, "Hashes must match regardless of array input ordering or whitespace");
});

test("canonical-payload: changed payload generates different hash", () => {
  const { payloadHash: baseHash } = computeCanonicalPayloadHash(sampleInput);

  const changedDates: CanonicalSubmissionPayloadInput = {
    ...sampleInput,
    arrivalDate: "2026-11-05",
  };
  const { payloadHash: hashDates } = computeCanonicalPayloadHash(changedDates);
  assert.notEqual(baseHash, hashDates, "Changed dates must yield a different hash");

  const changedDestination: CanonicalSubmissionPayloadInput = {
    ...sampleInput,
    destinationId: "dest-tokyo",
    marketSlug: "tokyo",
  };
  const { payloadHash: hashDest } = computeCanonicalPayloadHash(changedDestination);
  assert.notEqual(baseHash, hashDest, "Changed destination must yield a different hash");

  const changedEmail: CanonicalSubmissionPayloadInput = {
    ...sampleInput,
    email: "different@example.com",
  };
  const { payloadHash: hashEmail } = computeCanonicalPayloadHash(changedEmail);
  assert.notEqual(baseHash, hashEmail, "Changed email must yield a different hash");
});

test("server-schema: validates valid full early-access server submission", () => {
  const today = getTodayCalendarDate();
  const arrival = addDaysToCalendarDate(today, 10);
  const departure = addDaysToCalendarDate(today, 20);

  const validPayload = {
    submissionId: "c87a5518-ffeb-4d51-a209-648cfbd731d1",
    trip: {
      destination: {
        id: "dest-bali",
        name: "Bali",
        country: "Indonesia",
        countryCode: "ID",
        label: "Bali, Indonesia",
        marketSlug: "bali",
      },
      arrivalDate: arrival,
      departureDate: departure,
      travelMode: "solo",
    },
    profile: {
      ageBand: "26-30",
      gender: "woman",
      genderSelfDescribe: "photographer",
      interestedIn: "men",
      meetPreference: "travelers",
    },
    intentions: ["romantic_connection"],
    interests: ["beach", "cafes"],
    customInterest: "sunsets",
    contact: {
      email: "traveler@example.com",
      homeCountry: "United States",
      usedDatingAppsWhileTraveling: true,
      travelFrequency: "2-3_per_year",
      is18Plus: true,
      marketingConsent: false,
    },
    interviewOptIn: true,
    website: "", // empty honeypot
  };

  const parsed = earlyAccessServerSchema.safeParse(validPayload);
  assert.equal(parsed.success, true);
});

test("server-schema: rejects payload with invalid dates or missing 18+ confirmation", () => {
  const today = getTodayCalendarDate();
  const pastArrival = "2020-01-01";
  const departure = addDaysToCalendarDate(today, 5);

  const invalidDates = {
    submissionId: "c87a5518-ffeb-4d51-a209-648cfbd731d1",
    trip: {
      destination: {
        id: "dest-bali",
        name: "Bali",
        country: "Indonesia",
        countryCode: "ID",
        label: "Bali, Indonesia",
        marketSlug: "bali",
      },
      arrivalDate: pastArrival,
      departureDate: departure,
      travelMode: "solo",
    },
    profile: {
      ageBand: "26-30",
      gender: "woman",
      interestedIn: "men",
      meetPreference: "travelers",
    },
    intentions: ["romantic_connection"],
    interests: ["beach"],
    contact: {
      email: "traveler@example.com",
      homeCountry: "United States",
      is18Plus: false, // under 18
      marketingConsent: false,
    },
  };

  const parsed = earlyAccessServerSchema.safeParse(invalidDates);
  assert.equal(parsed.success, false);
});

test("submission-rotation: rotateSubmissionId generates a fresh unique ID", () => {
  const initialDraft = createEmptySignupDraft();
  const initialId = initialDraft.submissionId;

  const rotated = rotateSubmissionId(initialDraft);
  assert.notEqual(rotated.submissionId, initialId);
  assert.equal(rotated.step, initialDraft.step);
  assert.equal(rotated.trip.destination, initialDraft.trip.destination);
});

test("resetForNewTrip: generates a new submissionId and clears only trip fields", () => {
  const sampleDraft: EarlyAccessDraft = {
    submissionId: "old-submission-id-1234",
    step: "review",
    trip: {
      destination: {
        id: "dest-bali",
        name: "Bali",
        country: "Indonesia",
        countryCode: "ID",
        label: "Bali, Indonesia",
        marketSlug: "bali",
      },
      arrivalDate: "2026-10-01",
      departureDate: "2026-10-10",
      travelMode: "solo",
    },
    profile: {
      ageBand: "26-30",
      gender: "woman",
      interestedIn: "men",
      meetPreference: "both",
    },
    intentions: ["romantic_connection"],
    interests: ["beach", "food"],
    contact: {
      email: "explorer@example.com",
      homeCountry: "Canada",
      is18Plus: true,
      marketingConsent: true,
    },
    interviewOptIn: true,
  };

  const resetDraft = resetForNewTrip(sampleDraft);

  // New submission ID generated
  assert.notEqual(resetDraft.submissionId, "old-submission-id-1234");
  // Step reset to 1
  assert.equal(resetDraft.step, 1);
  // Trip cleared
  assert.equal(resetDraft.trip.destination, null);
  assert.equal(resetDraft.trip.arrivalDate, null);
  assert.equal(resetDraft.trip.departureDate, null);
  assert.equal(resetDraft.trip.travelMode, null);
  // Profile, contact, intentions retained
  assert.equal(resetDraft.profile.ageBand, "26-30");
  assert.equal(resetDraft.contact.email, "explorer@example.com");
  assert.equal(resetDraft.contact.homeCountry, "Canada");
  assert.deepEqual(resetDraft.intentions, ["romantic_connection"]);
  assert.deepEqual(resetDraft.interests, ["beach", "food"]);
  assert.equal(resetDraft.contact.marketingConsent, true);
});
