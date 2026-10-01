"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { EarlyAccessContactState, TravelFrequency } from "@/types/signup";
import { contactStepSchema } from "@/lib/validation/early-access-schema";
import { Button } from "@/components/ui/button";
import { CountrySelect } from "./country-select";

interface StepContactProps {
  contact: EarlyAccessContactState;
  onUpdate: (updated: Partial<EarlyAccessContactState>) => void;
  onBack: () => void;
  onContinue: () => void;
}

const FREQUENCY_OPTIONS: Array<{ value: TravelFrequency; label: string }> = [
  { value: "1_per_year", label: "1 per year" },
  { value: "2-3_per_year", label: "2–3 per year" },
  { value: "4-6_per_year", label: "4–6 per year" },
  { value: "7_plus_per_year", label: "7+ per year" },
];

export function StepContact({ contact, onUpdate, onBack, onContinue }: StepContactProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ email: e.target.value });
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.email;
      return copy;
    });
  };

  const handleCountryChange = (countryName: string) => {
    onUpdate({ homeCountry: countryName });
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.homeCountry;
      return copy;
    });
  };

  const handle18PlusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ is18Plus: e.target.checked });
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.is18Plus;
      return copy;
    });
  };

  const handleMarketingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ marketingConsent: e.target.checked });
  };

  const handleUsedDatingApps = (val: boolean) => {
    onUpdate({ usedDatingAppsWhileTraveling: val });
  };

  const handleSelectFrequency = (freq: TravelFrequency) => {
    onUpdate({ travelFrequency: freq });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactStepSchema.safeParse(contact);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = String(issue.path[0] || "general");
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onContinue();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Step Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Get early access.
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          Where should we send your invite when matching opens for your destination?
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email-input" className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Email address <span className="text-[var(--primary)]">*</span>
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-4 h-5 w-5 text-[var(--muted-foreground)] pointer-events-none" aria-hidden="true" />
            <input
              id="email-input"
              type="email"
              autoComplete="email"
              required
              value={contact.email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              className={`w-full h-12 pl-12 pr-4 rounded-2xl border bg-[var(--surface)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-all focus:outline-none ${
                errors.email
                  ? "border-red-500 ring-2 ring-red-500/20"
                  : "border-[var(--border)] focus:border-[var(--primary)]"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs font-medium text-red-600 pl-1">{errors.email}</p>
          )}
        </div>

        {/* Home Country Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="country-select" className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Home country <span className="text-[var(--primary)]">*</span>
          </label>
          <CountrySelect
            value={contact.homeCountry}
            onChange={handleCountryChange}
            hasError={Boolean(errors.homeCountry)}
            errorMessageId="country-select-error"
          />
          {errors.homeCountry && (
            <p id="country-select-error" className="text-xs font-medium text-red-600 pl-1">
              {errors.homeCountry}
            </p>
          )}
        </div>

        {/* Validation Research Questions (Optional) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface-muted)]/60 border border-[var(--border)] flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
            Validation Research (Optional)
          </span>

          {/* Used dating apps while traveling? */}
          <div className="flex flex-col gap-2">
            <span className="text-xs sm:text-sm font-semibold text-[var(--foreground)]">
              Have you used dating apps while traveling?
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleUsedDatingApps(true)}
                aria-pressed={contact.usedDatingAppsWhileTraveling === true}
                className={`h-9 px-4 rounded-xl text-xs font-semibold border transition-all ${
                  contact.usedDatingAppsWhileTraveling === true
                    ? "bg-[var(--primary)] text-white border-[var(--primary)] font-bold shadow-xs"
                    : "bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] hover:border-[var(--primary)]/40"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleUsedDatingApps(false)}
                aria-pressed={contact.usedDatingAppsWhileTraveling === false}
                className={`h-9 px-4 rounded-xl text-xs font-semibold border transition-all ${
                  contact.usedDatingAppsWhileTraveling === false
                    ? "bg-[var(--primary)] text-white border-[var(--primary)] font-bold shadow-xs"
                    : "bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] hover:border-[var(--primary)]/40"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* How often do you take leisure trips? */}
          <div className="flex flex-col gap-2 pt-1">
            <span className="text-xs sm:text-sm font-semibold text-[var(--foreground)]">
              How often do you take leisure trips?
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FREQUENCY_OPTIONS.map((opt) => {
                const isSelected = contact.travelFrequency === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelectFrequency(opt.value)}
                    aria-pressed={isSelected}
                    className={`h-9 px-2 rounded-xl text-xs font-semibold border transition-all text-center flex items-center justify-center ${
                      isSelected
                        ? "bg-[var(--primary)] text-white border-[var(--primary)] font-bold shadow-xs"
                        : "bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] hover:border-[var(--primary)]/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 18+ Confirmation (REQUIRED) */}
        <div className="flex flex-col gap-1 pt-1">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={contact.is18Plus}
              onChange={handle18PlusChange}
              className="h-4.5 w-4.5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--focus)] mt-0.5"
            />
            <span className="text-xs sm:text-sm font-semibold text-[var(--foreground)]">
              I&apos;m 18 or older. <span className="text-[var(--primary)]">*</span>
            </span>
          </label>
          {errors.is18Plus && (
            <p className="text-xs font-medium text-red-600 pl-7">{errors.is18Plus}</p>
          )}
        </div>

        {/* Marketing Consent (OPTIONAL, separate) */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={contact.marketingConsent}
              onChange={handleMarketingChange}
              className="h-4.5 w-4.5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--focus)] mt-0.5"
            />
            <span className="text-xs text-[var(--muted-foreground)]">
              Send me occasional Project Roam product news and research updates.
            </span>
          </label>
          <p className="text-[11px] text-[var(--muted-foreground)] pl-7">
            We&apos;ll still send a confirmation about this early-access request.
          </p>
        </div>

        {/* Privacy Reassurance Banner */}
        <div className="p-3.5 rounded-xl bg-[var(--safety-accent)]/50 border border-[#1B4332]/20 flex items-start gap-2.5 text-xs text-[#1B4332]">
          <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            Roam doesn&apos;t ask for your hotel, exact accommodation, or live GPS location during validation.
          </span>
        </div>

        {/* Legal Link */}
        <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
          By continuing, you acknowledge Project Roam&apos;s{" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:underline underline-offset-2"
          >
            Privacy Notice
          </Link>{" "}
          and{" "}
          <Link
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:underline underline-offset-2"
          >
            Terms
          </Link>
          .
        </p>
      </div>

      {/* Action Buttons: Back & Continue */}
      <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onBack}
          leftIcon={<ArrowLeft className="h-4 w-4 mr-1" aria-hidden="true" />}
          className="text-xs sm:text-sm font-semibold rounded-full"
        >
          Back
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />}
          className="h-12 px-8 text-sm font-bold rounded-full shadow-md"
        >
          Complete Questionnaire &rarr;
        </Button>
      </div>
    </form>
  );
}
