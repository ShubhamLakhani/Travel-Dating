import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Add your trip",
      description: "Tell Roam where you're going and when.",
      context: "Selected destination and calendar dates become your matching window.",
    },
    {
      num: "02",
      title: "Discover people",
      description: "See travelers and locals relevant to your destination and dates.",
      context: "Filtered strictly by overlapping days and shared travel styles.",
    },
    {
      num: "03",
      title: "Connect before you arrive",
      description: "Get to know someone before or during your trip.",
      context: "Coordinate plans, cafés, and day trips before touching down.",
    },
    {
      num: "04",
      title: "Meet more safely",
      description: "Use travel-specific trust and safety tools when meeting in person.",
      context: "Planned verification, check-in reminders, and private itinerary sharing.",
    },
  ];

  return (
    <Section
      id="how-it-works"
      spacing="default"
      className="border-t border-[var(--border)] bg-[var(--surface)]/50 scroll-mt-20"
    >
      <Container size="wide">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 mb-14 sm:mb-20">
          <Badge variant="travel" className="w-fit mx-auto text-xs font-semibold">
            The Journey
          </Badge>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            Your trip becomes your dating map.
          </h2>

          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            Roam connects your travel itinerary with people heading the same direction at the same time.
          </p>
        </div>

        {/* Steps with Route / Path Motif */}
        {/* Desktop View: Horizontal Crossing Path */}
        <div className="hidden lg:grid grid-cols-4 gap-6 relative">
          {/* Continuous Connecting Line Behind Nodes */}
          <div
            className="absolute top-7 left-12 right-12 h-0.5 border-t-2 border-dashed border-[var(--border)] -z-0"
            aria-hidden="true"
          />

          {steps.map((step, idx) => (
            <div key={step.num} className="relative z-10 flex flex-col items-start gap-4">
              {/* Node Marker */}
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-2xl bg-[var(--surface)] border-2 border-[var(--border)] flex items-center justify-center font-display text-lg font-black text-[var(--primary)] shadow-sm">
                  {step.num}
                </div>
                {idx < steps.length - 1 && (
                  <span className="text-[11px] text-[var(--muted-foreground)] font-mono">
                    &rarr;
                  </span>
                )}
              </div>

              {/* Step Copy */}
              <div className="flex flex-col gap-1.5 pr-2">
                <h3 className="font-display text-lg font-bold text-[var(--foreground)]">
                  {step.title}
                </h3>
                <p className="text-sm font-medium text-[var(--foreground)]/90 leading-snug">
                  {step.description}
                </p>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mt-1">
                  {step.context}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile / Tablet View: Vertical Route Path */}
        <div className="lg:hidden flex flex-col gap-8 relative max-w-md mx-auto">
          {/* Vertical Connecting Line */}
          <div
            className="absolute top-6 bottom-6 left-6 w-0.5 border-l-2 border-dashed border-[var(--border)] -z-0"
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div key={step.num} className="relative z-10 flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-[var(--surface)] border-2 border-[var(--border)] flex items-center justify-center font-display text-base font-black text-[var(--primary)] shadow-sm shrink-0">
                {step.num}
              </div>

              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 flex-1 shadow-xs flex flex-col gap-1">
                <h3 className="font-display text-base font-bold text-[var(--foreground)]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[var(--foreground)]/90 leading-snug">
                  {step.description}
                </p>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mt-1">
                  {step.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
