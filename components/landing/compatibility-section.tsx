import { Check, Heart, Compass, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function CompatibilitySection() {
  const userStyles = [
    "Slow mornings",
    "Photography",
    "Local food",
    "Live music",
    "Spontaneous plans",
  ];

  const sharedSignals = [
    { label: "Photography", detail: "Shared hobby" },
    { label: "Local food", detail: "Exploring neighborhood spots" },
    { label: "Relaxed travel", detail: "Flexible afternoon pacing" },
    { label: "Similar dating intention", detail: "Both open to seeing where it goes" },
  ];

  return (
    <Section spacing="default" className="border-t border-[var(--border)] bg-[var(--background)]">
      <Container size="wide">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 mb-12 sm:mb-16">
          <Badge variant="neutral" className="w-fit mx-auto text-xs font-semibold">
            Travel Compatibility
          </Badge>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            More than a location match.
          </h2>

          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            Roam is designed to help you understand whether you&apos;d actually enjoy traveling around the same place together.
          </p>
        </div>

        {/* Side-by-Side Concrete Signal Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Your Travel Style */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-7 shadow-sm flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-[var(--travel-accent)] text-[#1C3F5E] flex items-center justify-center">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  Your Profile
                </span>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-[var(--foreground)]">
                  Your travel style
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  How you like to experience a new destination.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {userStyles.map((style) => (
                  <span
                    key={style}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)]"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
              <span>Personalized travel rhythm, not a generic questionnaire</span>
            </div>
          </div>

          {/* Card 2: You Both Enjoy (Shared Signals) */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-7 shadow-sm flex flex-col justify-between ring-1 ring-[var(--primary)]/15">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                  <Heart className="h-5 w-5 fill-[var(--primary)]" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">
                  Shared Signals
                </span>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-[var(--foreground)]">
                  You both enjoy
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  Clear, tangible reasons why crossing paths makes sense.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                {sharedSignals.map(({ label, detail }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface-muted)]/60 border border-[var(--border)] text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-[var(--safety-accent)] text-[#1B4332] flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                      </div>
                      <span className="font-semibold text-[var(--foreground)]">{label}</span>
                    </div>
                    <span className="text-[11px] text-[var(--muted-foreground)]">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)] flex items-center gap-1.5">
              <span>Understand why someone is relevant before saying hello</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
