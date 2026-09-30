import { z } from "zod";

export const PRIVACY_REQUEST_TYPES = [
  "delete_data",
  "access_data",
  "correct_info",
  "other_question",
] as const;

export type PrivacyRequestType = (typeof PRIVACY_REQUEST_TYPES)[number];

export const PRIVACY_REQUEST_LABELS: Record<PrivacyRequestType, string> = {
  delete_data: "Delete my validation data",
  access_data: "Access my validation data",
  correct_info: "Correct my information",
  other_question: "Other privacy question",
};

export const privacyRequestSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email address is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be 100 characters or fewer"),
  requestType: z.enum(PRIVACY_REQUEST_TYPES, {
    message: "Please select a valid request type",
  }),
  message: z
    .string()
    .trim()
    .max(1000, "Message must be 1,000 characters or fewer")
    .optional()
    .default(""),
  website: z.string().optional(), // Honeypot
});

export type PrivacyRequestFormData = z.infer<typeof privacyRequestSchema>;
