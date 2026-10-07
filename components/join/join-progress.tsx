interface JoinProgressProps {
  currentStep: 1 | 2 | 3 | 4 | "review";
}

const STEP_LABELS: Record<number, string> = {
  1: "Your trip",
  2: "Who you'd like to meet",
  3: "What you're hoping to find",
  4: "Get early access",
};

export function JoinProgress({ currentStep }: JoinProgressProps) {
  const stepNumber = currentStep === "review" ? 4 : currentStep;
  const isReview = currentStep === "review";

  return (
    <div
      role="progressbar"
      aria-label="Early access questionnaire progress"
      aria-valuenow={stepNumber}
      aria-valuemin={1}
      aria-valuemax={4}
      aria-valuetext={isReview ? "Review your details" : `Step ${stepNumber} of 4: ${STEP_LABELS[stepNumber]}`}
      className="w-full max-w-xl mx-auto flex flex-col gap-2 pt-4 pb-2"
    >
      {/* Visual Bar with 4 Segments */}
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((step) => {
          const isComplete = step < stepNumber || isReview;
          const isCurrent = step === stepNumber && !isReview;

          return (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isComplete
                  ? "bg-gradient-to-r from-[var(--triply-coral)] to-[var(--triply-purple)]"
                  : isCurrent
                  ? "bg-[var(--triply-coral)] animate-pulse"
                  : "bg-[var(--border)]"
              }`}
            />
          );
        })}
      </div>

      {/* Accessible Step Summary */}
      <div className="flex items-center justify-between text-xs font-semibold text-[var(--muted-foreground)]">
        <span>
          {isReview ? "Review & Confirmation" : `Step ${stepNumber} of 4`}
        </span>
        <span className="text-[var(--foreground)]">
          {isReview ? "Confirm Your Details" : STEP_LABELS[stepNumber]}
        </span>
      </div>
    </div>
  );
}
