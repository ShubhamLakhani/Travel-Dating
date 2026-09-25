"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Plane, Building2, Globe2 } from "lucide-react";
import { EarlyAccessProfileState, AgeBand, GenderOption, InterestedInOption, MeetPreference } from "@/types/signup";
import { profileStepSchema } from "@/lib/validation/early-access-schema";
import { Button } from "@/components/ui/button";

interface StepProfileProps {
  profile: EarlyAccessProfileState;
  onUpdate: (updated: Partial<EarlyAccessProfileState>) => void;
  onBack: () => void;
  onContinue: () => void;
}

const AGE_BANDS: Array<{ value: AgeBand; label: string }> = [
  { value: "18-21", label: "18–21" },
  { value: "22-25", label: "22–25" },
  { value: "26-30", label: "26–30" },
  { value: "31-35", label: "31–35" },
  { value: "36-40", label: "36–40" },
  { value: "41+", label: "41+" },
];

const GENDERS: Array<{ value: GenderOption; label: string }> = [
  { value: "woman", label: "Woman" },
  { value: "man", label: "Man" },
  { value: "non-binary", label: "Non-binary" },
  { value: "self-describe", label: "Prefer to self-describe" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

const INTERESTED_IN: Array<{ value: InterestedInOption; label: string }> = [
  { value: "women", label: "Women" },
  { value: "men", label: "Men" },
  { value: "everyone", label: "Multiple / everyone" },
];

const MEET_PREFERENCES: Array<{
  value: MeetPreference;
  label: string;
  desc: string;
  icon: typeof Plane;
}> = [
  {
    value: "travelers",
    label: "Travelers",
    desc: "Singles whose trips overlap yours in the destination.",
    icon: Plane,
  },
  {
    value: "locals",
    label: "Locals",
    desc: "Residents who live in the city you're visiting.",
    icon: Building2,
  },
  {
    value: "both",
    label: "Both",
    desc: "Open to meeting both travelers and local residents.",
    icon: Globe2,
  },
];

export function StepProfile({ profile, onUpdate, onBack, onContinue }: StepProfileProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSelectAge = (age: AgeBand) => {
    onUpdate({ ageBand: age });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.ageBand;
      return next;
    });
  };

  const handleSelectGender = (gender: GenderOption) => {
    onUpdate({
      gender,
      genderSelfDescribe: gender === "self-describe" ? profile.genderSelfDescribe : "",
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.gender;
      return next;
    });
  };

  const handleSelectInterested = (interestedIn: InterestedInOption) => {
    onUpdate({ interestedIn });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.interestedIn;
      return next;
    });
  };

  const handleSelectMeet = (meetPreference: MeetPreference) => {
    onUpdate({ meetPreference });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.meetPreference;
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = profileStepSchema.safeParse(profile);
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
          Who would you like to meet?
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          Tell us about yourself and what connections you are looking for while traveling.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Age Band */}
        <fieldset className="flex flex-col gap-2.5">
          <legend className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Your age band <span className="text-[var(--primary)]">*</span>
          </legend>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {AGE_BANDS.map((item) => {
              const isSelected = profile.ageBand === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleSelectAge(item.value)}
                  aria-pressed={isSelected}
                  className={`h-12 rounded-xl text-sm font-semibold transition-all border flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--focus)] ${
                    isSelected
                      ? "bg-[var(--surface)] text-[var(--primary)] border-[var(--primary)] shadow-sm ring-2 ring-[var(--primary)]/20 font-bold"
                      : "bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] hover:border-[var(--primary)]/30"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          {errors.ageBand && (
            <p className="text-xs font-medium text-red-600 pl-1">{errors.ageBand}</p>
          )}
        </fieldset>

        {/* Gender */}
        <fieldset className="flex flex-col gap-2.5">
          <legend className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Your gender <span className="text-[var(--primary)]">*</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {GENDERS.map((item) => {
              const isSelected = profile.gender === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleSelectGender(item.value)}
                  aria-pressed={isSelected}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border focus-visible:outline-2 focus-visible:outline-[var(--focus)] ${
                    isSelected
                      ? "bg-[var(--surface)] text-[var(--primary)] border-[var(--primary)] shadow-xs ring-2 ring-[var(--primary)]/20 font-bold"
                      : "bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] hover:border-[var(--primary)]/30"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Optional Self-describe field */}
          {profile.gender === "self-describe" && (
            <div className="mt-2 max-w-sm">
              <label htmlFor="self-describe-input" className="sr-only">
                Self-describe your gender
              </label>
              <input
                id="self-describe-input"
                type="text"
                maxLength={80}
                value={profile.genderSelfDescribe || ""}
                onChange={(e) => onUpdate({ genderSelfDescribe: e.target.value })}
                placeholder="How do you describe your gender? (optional, max 80 chars)"
                className="w-full h-11 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs sm:text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none"
              />
            </div>
          )}

          {errors.gender && (
            <p className="text-xs font-medium text-red-600 pl-1">{errors.gender}</p>
          )}
        </fieldset>

        {/* Interested in */}
        <fieldset className="flex flex-col gap-2.5">
          <legend className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Interested in meeting <span className="text-[var(--primary)]">*</span>
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {INTERESTED_IN.map((item) => {
              const isSelected = profile.interestedIn === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleSelectInterested(item.value)}
                  aria-pressed={isSelected}
                  className={`h-12 rounded-xl text-xs sm:text-sm font-semibold transition-all border flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--focus)] ${
                    isSelected
                      ? "bg-[var(--surface)] text-[var(--primary)] border-[var(--primary)] shadow-xs ring-2 ring-[var(--primary)]/20 font-bold"
                      : "bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] hover:border-[var(--primary)]/30"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          {errors.interestedIn && (
            <p className="text-xs font-medium text-red-600 pl-1">{errors.interestedIn}</p>
          )}
        </fieldset>

        {/* Meet Preference: Travelers vs Locals */}
        <fieldset className="flex flex-col gap-2.5">
          <legend className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            I&apos;d like to meet <span className="text-[var(--primary)]">*</span>
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MEET_PREFERENCES.map((item) => {
              const isSelected = profile.meetPreference === item.value;
              const Icon = item.icon;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleSelectMeet(item.value)}
                  aria-pressed={isSelected}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all focus-visible:outline-2 focus-visible:outline-[var(--focus)] ${
                    isSelected
                      ? "bg-[var(--surface)] border-[var(--primary)] shadow-sm ring-2 ring-[var(--primary)]/20"
                      : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--primary)]/30"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? "bg-[var(--primary)]/15 text-[var(--primary)]"
                          : "bg-[var(--surface-muted)] text-[var(--muted-foreground)]"
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div
                      className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary)]"
                          : "border-[var(--border)] bg-white"
                      }`}
                    >
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold text-[var(--foreground)]">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-[var(--muted-foreground)] leading-snug mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {errors.meetPreference && (
            <p className="text-xs font-medium text-red-600 pl-1">{errors.meetPreference}</p>
          )}
        </fieldset>
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
          Continue &rarr;
        </Button>
      </div>
    </form>
  );
}
