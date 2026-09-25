"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, AlertCircle, Check } from "lucide-react";
import { RelationshipIntention, TravelInterest } from "@/types/signup";
import { preferencesStepSchema } from "@/lib/validation/early-access-schema";
import { Button } from "@/components/ui/button";

interface StepIntentionsProps {
  intentions: RelationshipIntention[];
  interests: TravelInterest[];
  customInterest?: string;
  onUpdateIntentions: (intentions: RelationshipIntention[]) => void;
  onUpdateInterests: (interests: TravelInterest[], custom?: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const INTENTIONS: Array<{ value: RelationshipIntention; label: string; desc: string }> = [
  {
    value: "casual_dating",
    label: "Casual dating",
    desc: "Fun dates, dinner, drinks, and casual companionship on the trip.",
  },
  {
    value: "romantic_connection",
    label: "Romantic connection",
    desc: "Looking for real romantic spark and attraction while traveling.",
  },
  {
    value: "potential_relationship",
    label: "Potential relationship",
    desc: "Open to something that could last beyond the vacation.",
  },
  {
    value: "see_where_it_goes",
    label: "Open to seeing where it goes",
    desc: "No strict expectations; meeting people and seeing what happens.",
  },
];

const INTERESTS: Array<{ value: TravelInterest; label: string }> = [
  { value: "beach", label: "Beach" },
  { value: "nightlife", label: "Nightlife" },
  { value: "food", label: "Food" },
  { value: "cafes", label: "Cafés" },
  { value: "photography", label: "Photography" },
  { value: "hiking", label: "Hiking" },
  { value: "adventure", label: "Adventure" },
  { value: "museums", label: "Museums" },
  { value: "music", label: "Music" },
  { value: "wellness", label: "Wellness" },
  { value: "surfing", label: "Surfing" },
  { value: "road_trips", label: "Road trips" },
  { value: "culture", label: "Culture" },
  { value: "shopping", label: "Shopping" },
  { value: "other", label: "Other" },
];

export function StepIntentions({
  intentions,
  interests,
  customInterest = "",
  onUpdateIntentions,
  onUpdateInterests,
  onBack,
  onContinue,
}: StepIntentionsProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [interestLimitWarning, setInterestLimitWarning] = React.useState(false);

  const toggleIntention = (val: RelationshipIntention) => {
    let next: RelationshipIntention[];
    if (intentions.includes(val)) {
      next = intentions.filter((i) => i !== val);
    } else {
      next = [...intentions, val];
    }
    onUpdateIntentions(next);
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.intentions;
      return copy;
    });
  };

  const toggleInterest = (val: TravelInterest) => {
    if (interests.includes(val)) {
      const next = interests.filter((i) => i !== val);
      const nextCustom = val === "other" ? "" : customInterest;
      onUpdateInterests(next, nextCustom);
      setInterestLimitWarning(false);
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.interests;
        return copy;
      });
    } else {
      if (interests.length >= 5) {
        setInterestLimitWarning(true);
        return;
      }
      setInterestLimitWarning(false);
      onUpdateInterests([...interests, val], customInterest);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateInterests(interests, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = preferencesStepSchema.safeParse({
      intentions,
      interests,
      customInterest,
    });

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
          What are you hoping to find?
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          Select what you&apos;re looking for and what you love doing when you explore a new place.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Intentions: Multi-select */}
        <fieldset className="flex flex-col gap-3">
          <legend className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Relationship intentions <span className="text-[var(--primary)]">*</span>{" "}
            <span className="text-xs font-normal text-[var(--muted-foreground)]">
              (select all that apply)
            </span>
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INTENTIONS.map((item) => {
              const isSelected = intentions.includes(item.value);
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => toggleIntention(item.value)}
                  aria-pressed={isSelected}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all focus-visible:outline-2 focus-visible:outline-[var(--focus)] ${
                    isSelected
                      ? "bg-[var(--surface)] border-[var(--primary)] shadow-sm ring-2 ring-[var(--primary)]/20"
                      : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--primary)]/30"
                  }`}
                >
                  <div
                    className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                        : "border-[var(--border)] bg-white"
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold text-[var(--foreground)]">
                      {item.label}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)] leading-snug mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {errors.intentions && (
            <p className="text-xs font-medium text-red-600 pl-1">{errors.intentions}</p>
          )}
        </fieldset>

        {/* Travel Interests: 0-5 chips */}
        <fieldset className="flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between">
            <legend className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
              What do you enjoy while traveling?
            </legend>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                interests.length === 5
                  ? "bg-[var(--primary)]/15 text-[var(--primary)]"
                  : "bg-[var(--surface-muted)] text-[var(--muted-foreground)]"
              }`}
            >
              Selected: {interests.length} / 5
            </span>
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">
            Choose up to 5 interests to help travelers understand your travel pace and style.
          </p>

          {/* 5-Interest Limit Warning */}
          {interestLimitWarning && (
            <div className="p-3 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center gap-2 text-xs font-semibold text-[var(--primary)]">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>You have reached the maximum of 5 interests. Tap an active chip to deselect it before picking another.</span>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {INTERESTS.map((item) => {
              const isSelected = interests.includes(item.value);
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => toggleInterest(item.value)}
                  aria-pressed={isSelected}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[var(--focus)] ${
                    isSelected
                      ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-xs font-bold"
                      : "bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] hover:border-[var(--primary)]/40"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Optional Other / Custom Interest Input */}
          {interests.includes("other") && (
            <div className="mt-2 max-w-sm">
              <label htmlFor="custom-interest-input" className="text-xs font-semibold text-[var(--foreground)] block mb-1">
                Tell us your other travel interest:
              </label>
              <input
                id="custom-interest-input"
                type="text"
                maxLength={80}
                value={customInterest}
                onChange={handleCustomChange}
                placeholder="e.g. Scuba diving, vintage record hunting (max 80 chars)"
                className="w-full h-11 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs sm:text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none"
              />
            </div>
          )}

          {errors.interests && (
            <p className="text-xs font-medium text-red-600 pl-1">{errors.interests}</p>
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
