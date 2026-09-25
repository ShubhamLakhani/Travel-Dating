import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { EarlyAccessLink } from "./early-access-link";

export function EarlyAccessCtaSection() {
  return (
    <Section spacing="lg" className="border-t border-[var(--border)] bg-[var(--background)]">
      <Container size="default">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-large)] p-8 sm:p-12 lg:p-16 text-center shadow-sm flex flex-col items-center gap-6 relative overflow-hidden">
          {/* Subtle Decorative Accents */}
          <div
            className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[var(--primary)]/5 pointer-events-none blur-2xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-[var(--travel-accent)]/60 pointer-events-none blur-2xl"
            aria-hidden="true"
          />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Early Access Validation</span>
          </div>

          {/* Headline & Body */}
          <div className="max-w-xl mx-auto flex flex-col gap-3">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              Going somewhere soon?
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              Tell us about your next trip and be one of the first people invited as Roam begins validating matching in selected destinations.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="pt-2">
            <EarlyAccessLink
              source="landing_bottom_cta"
              variant="primary"
              size="lg"
              className="h-13 px-8 text-base font-bold rounded-full shadow-md hover:shadow-lg transition-all"
              rightIcon={<ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />}
            >
              Add My Next Trip &rarr;
            </EarlyAccessLink>
          </div>

          <p className="text-xs text-[var(--muted-foreground)]">
            Free early access &middot; 18+ only &middot; Pre-launch validation
          </p>
        </div>
      </Container>
    </Section>
  );
}
