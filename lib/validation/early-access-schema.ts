import { z } from "zod";
import { getTodayCalendarDate, parseCalendarDate } from "./trip-dates.ts";

/**
 * Step 1: Trip Schema
 */
export const destinationOptionSchema = z.object({
  id: z.string().min(1, "Destination ID is required"),
  name: z.string().min(1, "Destination name is required"),
  country: z.string().min(1, "Country is required"),
  countryCode: z.string().min(1, "Country code is required"),
  label: z.string().min(1, "Destination label is required"),
  marketSlug: z.string().min(1, "Market slug is required"),
  image: z.string().optional(),
});

export const tripStepSchema = z
  .object({
    destination: destinationOptionSchema.nullable().refine((val) => val !== null, {
      message: "Please choose your destination",
    }),
    arrivalDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please select an arrival date")
      .refine(
        (date) => {
          const parts = parseCalendarDate(date);
          if (!parts) return false;
          return date >= getTodayCalendarDate();
        },
        { message: "Arrival date cannot be in the past" }
      ),
    departureDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a departure date"),
    travelMode: z.enum(["solo", "friends", "group", "other"], {
      message: "Please select how you are traveling",
    }),
  })
  .refine(
    (data) => {
      if (!data.arrivalDate || !data.departureDate) return true;
      return data.departureDate > data.arrivalDate;
    },
    {
      message: "Departure date must be after arrival date",
      path: ["departureDate"],
    }
  );

/**
 * Step 2: Profile / Demographics & Meet Preferences Schema
 */
export const profileStepSchema = z.object({
  ageBand: z.enum(
    ["18-21", "22-25", "26-30", "31-35", "36-40", "41+", "18-24"],
    { message: "Please select your age band" }
  ),
  gender: z.enum(
    ["woman", "man", "non-binary", "self-describe", "prefer_not_to_say", "other"],
    { message: "Please select your gender" }
  ),
  genderSelfDescribe: z
    .string()
    .max(80, "Self-description must be 80 characters or fewer")
    .optional(),
  interestedIn: z.enum(["women", "men", "everyone"], {
    message: "Please select who you are interested in",
  }),
  meetPreference: z.enum(
    ["travelers", "locals", "both", "travelers_only", "locals_only"],
    { message: "Please select who you would like to meet" }
  ),
});

/**
 * Step 3: Intentions & Travel Interests Schema
 */
export const preferencesStepSchema = z.object({
  intentions: z
    .array(z.string())
    .min(1, "Please select at least one relationship intention"),
  interests: z
    .array(z.string())
    .max(5, "Please choose up to 5 travel interests"),
  customInterest: z
    .string()
    .max(80, "Custom interest must be 80 characters or fewer")
    .optional(),
});

/**
 * Step 4: Contact & Validation Questions Schema
 */
export const contactStepSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email address is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be 100 characters or fewer"),
  homeCountry: z
    .string()
    .trim()
    .min(1, "Please select your home country"),
  usedDatingAppsWhileTraveling: z.boolean().nullable().optional(),
  travelFrequency: z
    .enum(["1_per_year", "2-3_per_year", "4-6_per_year", "7_plus_per_year"])
    .nullable()
    .optional(),
  is18Plus: z.literal(true, {
    message: "You must confirm you are 18 or older to join Roam",
  }),
  marketingConsent: z.boolean().default(false),
});

/**
 * Full Early Access Submission Schema (composed)
 */
export const earlyAccessSchema = z.object({
  submissionId: z.string().uuid("Invalid submission ID"),
  trip: tripStepSchema,
  profile: profileStepSchema,
  intentions: z.array(z.string()).min(1, "At least one intention required"),
  interests: z.array(z.string()).max(5, "Maximum 5 interests allowed"),
  customInterest: z.string().max(80).optional(),
  contact: contactStepSchema,
  interviewOptIn: z.boolean().optional(),
});

export type EarlyAccessFormData = z.infer<typeof earlyAccessSchema>;
