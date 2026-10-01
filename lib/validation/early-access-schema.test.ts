import { test } from "node:test";
import assert from "node:assert/strict";
import {
  tripStepSchema,
  profileStepSchema,
  preferencesStepSchema,
  contactStepSchema,
  earlyAccessSchema,
} from "./early-access-schema.ts";
import { addDaysToCalendarDate, getTodayCalendarDate } from "./trip-dates.ts";

const VALID_DESTINATION = {
  id: "dest-bali",
  name: "Bali",
  country: "Indonesia",
  countryCode: "ID",
  label: "Bali, Indonesia",
  marketSlug: "bali",
};

test("tripStepSchema: validates correct future trip", () => {
  const today = getTodayCalendarDate();
  const arrival = addDaysToCalendarDate(today, 10);
  const departure = addDaysToCalendarDate(today, 18);

  const result = tripStepSchema.safeParse({
    destination: VALID_DESTINATION,
    arrivalDate: arrival,
    departureDate: departure,
    travelMode: "solo",
  });

  assert.equal(result.success, true);
});

test("tripStepSchema: rejects missing destination", () => {
  const today = getTodayCalendarDate();
  const result = tripStepSchema.safeParse({
    destination: null,
    arrivalDate: addDaysToCalendarDate(today, 5),
    departureDate: addDaysToCalendarDate(today, 10),
    travelMode: "solo",
  });

  assert.equal(result.success, false);
});

test("tripStepSchema: rejects past arrival date", () => {
  const result = tripStepSchema.safeParse({
    destination: VALID_DESTINATION,
    arrivalDate: "2020-01-01",
    departureDate: "2020-01-10",
    travelMode: "solo",
  });

  assert.equal(result.success, false);
});

test("tripStepSchema: rejects departure on or before arrival date", () => {
  const today = getTodayCalendarDate();
  const arrival = addDaysToCalendarDate(today, 10);

  // Exact same date
  const sameResult = tripStepSchema.safeParse({
    destination: VALID_DESTINATION,
    arrivalDate: arrival,
    departureDate: arrival,
    travelMode: "solo",
  });
  assert.equal(sameResult.success, false);

  // Prior date
  const priorResult = tripStepSchema.safeParse({
    destination: VALID_DESTINATION,
    arrivalDate: arrival,
    departureDate: addDaysToCalendarDate(arrival, -2),
    travelMode: "solo",
  });
  assert.equal(priorResult.success, false);
});

test("tripStepSchema: rejects invalid travel mode", () => {
  const today = getTodayCalendarDate();
  const result = tripStepSchema.safeParse({
    destination: VALID_DESTINATION,
    arrivalDate: addDaysToCalendarDate(today, 5),
    departureDate: addDaysToCalendarDate(today, 12),
    travelMode: "spaceship",
  });

  assert.equal(result.success, false);
});

test("profileStepSchema: validates correct profile fields", () => {
  const result = profileStepSchema.safeParse({
    ageBand: "26-30",
    gender: "woman",
    interestedIn: "everyone",
    meetPreference: "both",
  });

  assert.equal(result.success, true);
});

test("profileStepSchema: rejects missing required fields", () => {
  const missingAge = profileStepSchema.safeParse({
    gender: "woman",
    interestedIn: "everyone",
    meetPreference: "both",
  });
  assert.equal(missingAge.success, false);

  const missingGender = profileStepSchema.safeParse({
    ageBand: "26-30",
    interestedIn: "everyone",
    meetPreference: "both",
  });
  assert.equal(missingGender.success, false);
});

test("profileStepSchema: validates optional genderSelfDescribe length", () => {
  const validDesc = profileStepSchema.safeParse({
    ageBand: "22-25",
    gender: "self-describe",
    genderSelfDescribe: "Agender traveler",
    interestedIn: "women",
    meetPreference: "travelers",
  });
  assert.equal(validDesc.success, true);

  const tooLongDesc = profileStepSchema.safeParse({
    ageBand: "22-25",
    gender: "self-describe",
    genderSelfDescribe: "A".repeat(81),
    interestedIn: "women",
    meetPreference: "travelers",
  });
  assert.equal(tooLongDesc.success, false);
});

test("preferencesStepSchema: validates intentions and travel interests", () => {
  const result = preferencesStepSchema.safeParse({
    intentions: ["casual_dating", "see_where_it_goes"],
    interests: ["food", "cafes", "photography"],
  });
  assert.equal(result.success, true);
});

test("preferencesStepSchema: rejects empty intentions", () => {
  const result = preferencesStepSchema.safeParse({
    intentions: [],
    interests: ["food"],
  });
  assert.equal(result.success, false);
});

test("preferencesStepSchema: enforces maximum of 5 travel interests", () => {
  // Exactly 5 is valid
  const valid5 = preferencesStepSchema.safeParse({
    intentions: ["dating"],
    interests: ["beach", "food", "cafes", "music", "hiking"],
  });
  assert.equal(valid5.success, true);

  // 6 interests is rejected
  const invalid6 = preferencesStepSchema.safeParse({
    intentions: ["dating"],
    interests: ["beach", "food", "cafes", "music", "hiking", "nightlife"],
  });
  assert.equal(invalid6.success, false);
});

test("contactStepSchema: validates email, country, and 18+ confirmation", () => {
  const result = contactStepSchema.safeParse({
    email: "traveler@example.com",
    homeCountry: "Australia",
    usedDatingAppsWhileTraveling: true,
    travelFrequency: "2-3_per_year",
    is18Plus: true,
    marketingConsent: true,
  });

  assert.equal(result.success, true);
});

test("contactStepSchema: rejects invalid email format", () => {
  const result = contactStepSchema.safeParse({
    email: "not-an-email",
    homeCountry: "Australia",
    is18Plus: true,
    marketingConsent: false,
  });

  assert.equal(result.success, false);
});

test("contactStepSchema: rejects when 18+ is false", () => {
  const result = contactStepSchema.safeParse({
    email: "traveler@example.com",
    homeCountry: "Australia",
    is18Plus: false,
    marketingConsent: false,
  });

  assert.equal(result.success, false);
});

test("contactStepSchema: allows marketingConsent to be false while valid", () => {
  const result = contactStepSchema.safeParse({
    email: "traveler@example.com",
    homeCountry: "Australia",
    is18Plus: true,
    marketingConsent: false,
  });

  assert.equal(result.success, true);
});

test("earlyAccessSchema: validates composed full submission", () => {
  const today = getTodayCalendarDate();
  const validFullDraft = {
    submissionId: "c3d52d9a-9e3f-4e07-88ab-d218d6e3f4e2",
    trip: {
      destination: VALID_DESTINATION,
      arrivalDate: addDaysToCalendarDate(today, 10),
      departureDate: addDaysToCalendarDate(today, 20),
      travelMode: "solo",
    },
    profile: {
      ageBand: "26-30",
      gender: "woman",
      interestedIn: "everyone",
      meetPreference: "both",
    },
    intentions: ["romantic_connection"],
    interests: ["photography", "cafes"],
    contact: {
      email: "maya.test@example.com",
      homeCountry: "Australia",
      usedDatingAppsWhileTraveling: false,
      travelFrequency: "4-6_per_year",
      is18Plus: true,
      marketingConsent: false,
    },
    interviewOptIn: true,
  };

  const result = earlyAccessSchema.safeParse(validFullDraft);
  assert.equal(result.success, true);
});

test("contactStepSchema: validates all entries in COUNTRIES dataset", async () => {
  const { COUNTRIES } = await import("../data/countries.ts");
  assert.ok(COUNTRIES.length > 40, "COUNTRIES must contain full country list");

  for (const country of COUNTRIES) {
    const res = contactStepSchema.safeParse({
      email: "traveler@example.com",
      homeCountry: country.name,
      is18Plus: true,
      marketingConsent: false,
    });
    assert.equal(res.success, true, `Country ${country.name} must be valid`);
    if (res.success) {
      assert.equal(res.data.homeCountry, country.name);
    }
  }
});

test("contactStepSchema: rejects empty homeCountry", () => {
  const res = contactStepSchema.safeParse({
    email: "traveler@example.com",
    homeCountry: "",
    is18Plus: true,
    marketingConsent: false,
  });
  assert.equal(res.success, false);
});

