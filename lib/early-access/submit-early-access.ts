import "server-only";
import { Resend } from "resend";
import { getRequiredAdminClient } from "@/lib/supabase/admin";
import { computeCanonicalPayloadHash } from "./canonical-payload";
import {
  renderEarlyAccessConfirmationHtml,
  renderEarlyAccessConfirmationText,
  renderNewSignupNotificationHtml,
  renderNewSignupNotificationText,
} from "@/lib/communication/email-formatters";
import { formatDateRangeDisplay } from "@/lib/validation/trip-dates";

export interface SubmitEarlyAccessInput {
  submissionId: string;
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
  destination: {
    id: string;
    name: string;
    country: string;
    countryCode?: string;
    marketSlug: string;
  };
  arrivalDate: string;
  departureDate: string;
  travelMode: string;
  interviewOptIn?: boolean;
  attribution?: {
    utmSource?: string | null;
    utmMedium?: string | null;
    utmCampaign?: string | null;
    utmContent?: string | null;
    utmTerm?: string | null;
    referrer?: string | null;
  } | null;
}

export interface SubmitEarlyAccessResult {
  ok: true;
  submissionId: string;
  tripCreated: boolean;
  idempotentReplay: boolean;
  confirmationEmail: "sent" | "failed" | "skipped";
}

export class IdempotencyConflictError extends Error {
  constructor(message = "Submission ID already exists with a different payload.") {
    super(message);
    this.name = "IdempotencyConflictError";
  }
}

/**
 * Server-only service handling atomic submission, idempotency, and transactional confirmation emails.
 */
export async function submitEarlyAccess(
  input: SubmitEarlyAccessInput
): Promise<SubmitEarlyAccessResult> {
  // 1. Calculate canonical payload hash
  const { payloadHash } = computeCanonicalPayloadHash({
    email: input.email,
    homeCountry: input.homeCountry,
    ageBand: input.ageBand,
    gender: input.gender,
    genderSelfDescribe: input.genderSelfDescribe,
    interestedIn: input.interestedIn,
    usedDatingAppsWhileTraveling: input.usedDatingAppsWhileTraveling,
    travelFrequency: input.travelFrequency,
    is18Plus: input.is18Plus,
    marketingConsent: input.marketingConsent,
    meetPreference: input.meetPreference,
    intentions: input.intentions,
    interests: input.interests,
    customInterest: input.customInterest,
    destinationId: input.destination.id,
    marketSlug: input.destination.marketSlug,
    arrivalDate: input.arrivalDate,
    departureDate: input.departureDate,
    travelMode: input.travelMode,
    interviewOptIn: input.interviewOptIn,
  });

  // 2. Call Supabase atomic RPC with privileged client
  const supabase = getRequiredAdminClient();

  const { data: rpcData, error: rpcError } = await supabase.rpc(
    "submit_early_access",
    {
      p_submission_id: input.submissionId,
      p_payload_hash: payloadHash,
      p_email: input.email.trim(),
      p_home_country: input.homeCountry.trim(),
      p_age_band: input.ageBand,
      p_gender: input.gender,
      p_gender_self_describe: input.genderSelfDescribe?.trim() || null,
      p_interested_in: input.interestedIn,
      p_used_dating_apps_traveling: input.usedDatingAppsWhileTraveling ?? null,
      p_travel_frequency: input.travelFrequency || null,
      p_is_18_plus: true,
      p_marketing_consent: Boolean(input.marketingConsent),
      p_meet_preference: input.meetPreference,
      p_relationship_intentions: input.intentions,
      p_travel_interests: input.interests || [],
      p_custom_interest: input.customInterest?.trim() || null,
      p_destination_id: input.destination.id,
      p_destination_name: input.destination.name,
      p_destination_country: input.destination.country,
      p_destination_country_code: input.destination.countryCode || null,
      p_market_slug: input.destination.marketSlug,
      p_arrival_date: input.arrivalDate,
      p_departure_date: input.departureDate,
      p_travel_mode: input.travelMode,
      p_interview_opt_in: Boolean(input.interviewOptIn),
    }
  );

  if (rpcError) {
    if (
      rpcError.code === "23505" ||
      rpcError.message?.includes("IDEMPOTENCY_CONFLICT") ||
      rpcError.details?.includes("IDEMPOTENCY_CONFLICT")
    ) {
      throw new IdempotencyConflictError();
    }
    // Generic sanitized error
    throw new Error(`Database submission failed: ${rpcError.message}`);
  }

  const tripCreated = Boolean(rpcData?.trip_created);
  const idempotentReplay = Boolean(rpcData?.idempotent_replay);

  // If attribution metadata was provided, persist it to the submission record
  if (input.attribution) {
    try {
      await supabase
        .from("validation_submissions")
        .update({
          utm_source: input.attribution.utmSource || null,
          utm_medium: input.attribution.utmMedium || null,
          utm_campaign: input.attribution.utmCampaign || null,
          utm_content: input.attribution.utmContent || null,
          utm_term: input.attribution.utmTerm || null,
          referrer: input.attribution.referrer || null,
        })
        .eq("submission_id", input.submissionId);
    } catch {
      // Non-fatal: attribution update failure must never fail user signup
    }
  }

  let emailStatus: "sent" | "failed" | "skipped" = "skipped";

  // 3. Handle Transactional Confirmation Email
  // If idempotent replay and email was already sent or skipped, do not resend
  if (idempotentReplay && rpcData?.confirmation_email === "sent") {
    emailStatus = "sent";
  } else {
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM;

    if (!resendApiKey || !emailFrom) {
      // Credentials not configured; record skipped
      emailStatus = "skipped";
      try {
        await supabase.rpc("update_confirmation_email_status", {
          p_submission_id: input.submissionId,
          p_status: "skipped",
        });
      } catch {
        // Non-fatal
      }
    } else {
      try {
        const resend = new Resend(resendApiKey);
        const dateRangeText = formatDateRangeDisplay(input.arrivalDate, input.departureDate);
        const [arrivalPart = input.arrivalDate, departurePart = input.departureDate] =
          dateRangeText.split(" → ");

        const confirmationHtml = renderEarlyAccessConfirmationHtml({
          destinationName: input.destination.name,
          arrivalFormatted: arrivalPart,
          departureFormatted: departurePart,
        });

        const { error: sendError } = await resend.emails.send({
          from: emailFrom,
          to: input.email.trim(),
          replyTo: process.env.EMAIL_REPLY_TO || undefined,
          subject: "You're on the Project Roam early-access list ✈️",
          html: confirmationHtml,
          text: renderEarlyAccessConfirmationText({
            destinationName: input.destination.name,
            arrivalFormatted: arrivalPart,
            departureFormatted: departurePart,
          }),
        });

        if (sendError) {
          emailStatus = "failed";
          await supabase.rpc("update_confirmation_email_status", {
            p_submission_id: input.submissionId,
            p_status: "failed",
          });
        } else {
          emailStatus = "sent";
          await supabase.rpc("update_confirmation_email_status", {
            p_submission_id: input.submissionId,
            p_status: "sent",
          });
        }
      } catch {
        // Resend threw an exception; mark failed but DO NOT fail registration
        emailStatus = "failed";
        try {
          await supabase.rpc("update_confirmation_email_status", {
            p_submission_id: input.submissionId,
            p_status: "failed",
          });
        } catch {
          // Non-fatal
        }
      }
    }
  }

  // 4. Internal Operator Notification (Best-effort, server-only)
  // Sends a minimized notification to the operator inbox without user PII
  const adminNotificationEmail = process.env.ADMIN_SIGNUP_NOTIFICATION_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;

  if (adminNotificationEmail && resendApiKey && emailFrom && !idempotentReplay) {
    try {
      const resend = new Resend(resendApiKey);
      const dateRangeText = formatDateRangeDisplay(input.arrivalDate, input.departureDate);
      const [arrivalPart = input.arrivalDate, departurePart = input.departureDate] =
        dateRangeText.split(" → ");

      const adminNotificationHtml = renderNewSignupNotificationHtml({
        destinationName: input.destination.name,
        arrivalFormatted: arrivalPart,
        departureFormatted: departurePart,
        travelMode: input.travelMode,
        interviewOptIn: Boolean(input.interviewOptIn),
        marketingUpdates: Boolean(input.marketingConsent),
      });

      await resend.emails.send({
        from: emailFrom,
        to: adminNotificationEmail.trim(),
        subject: "New Roam early-access signup",
        html: adminNotificationHtml,
        text: renderNewSignupNotificationText({
          destinationName: input.destination.name,
          arrivalFormatted: arrivalPart,
          departureFormatted: departurePart,
          travelMode: input.travelMode,
          interviewOptIn: Boolean(input.interviewOptIn),
          marketingUpdates: Boolean(input.marketingConsent),
        }),
      });
    } catch (err: unknown) {
      // Best-effort only: do not roll back signup or fail participant request
      // Never log the private operator email
      console.error(
        "Operational notice: Failed to send internal admin signup notification.",
        err instanceof Error ? err.message : ""
      );
    }
  }

  // Return strictly sanitized result
  return {
    ok: true,
    submissionId: input.submissionId,
    tripCreated,
    idempotentReplay,
    confirmationEmail: emailStatus,
  };
}
