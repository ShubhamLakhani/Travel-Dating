import { Plane, Building2, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function PeopleTypesSection() {
  return (
    <Section spacing="default" className="border-t border-[var(--border)] bg-[var(--surface)]/50">
      <Container size="wide">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 mb-12 sm:mb-16">
          <Badge variant="travel" className="w-fit mx-auto text-xs font-semibold">
            Discovery Modes
          </Badge>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            Meet travelers.
            <br />
            <span className="text-[#1C3F5E]">Or meet someone who knows the city.</span>
          </h2>

          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            Roam is being designed so you can choose whether you want to explore with fellow travelers or connect with residents who call your destination home.
          </p>
        </div>

        {/* Two Primary Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Travelers */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[var(--primary)]/30 transition-colors">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                  <Plane className="h-6 w-6" aria-hidden="true" />
                </div>
                <Badge variant="primary" className="text-xs">
                  Travelers
                </Badge>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-bold text-[var(--foreground)]">
                  Fellow Travelers
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                  Meet singles whose trips overlap yours.
                </p>
              </div>

              <div className="bg-[var(--surface-muted)]/60 border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-2 text-xs text-[var(--foreground)]/80">
                <div className="flex items-center gap-2 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                  <span>Visiting on the same dates</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                  <span>Exploring the sights as newcomers</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                  <span>Shared vacation mindset</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] text-[11px] text-[var(--muted-foreground)] flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-[var(--primary)]" aria-hidden="true" />
              <span>Planned discovery mode for overlapping itineraries</span>
            </div>
          </div>

          {/* Card 2: Locals */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#1C3F5E]/30 transition-colors">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[var(--travel-accent)] text-[#1C3F5E] flex items-center justify-center">
                  <Building2 className="h-6 w-6" aria-hidden="true" />
                </div>
                <Badge variant="neutral" className="text-xs">
                  Locals
                </Badge>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-bold text-[var(--foreground)]">
                  Local Residents
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                  Meet people who live in the destination you&apos;re visiting.
                </p>
              </div>

              <div className="bg-[var(--surface-muted)]/60 border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-2 text-xs text-[var(--foreground)]/80">
                <div className="flex items-center gap-2 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#1C3F5E]" aria-hidden="true" />
                  <span>Neighborhood insider knowledge</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#1C3F5E]" aria-hidden="true" />
                  <span>Great local cafés, food, and hidden gems</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#1C3F5E]" aria-hidden="true" />
                  <span>Open to meeting travelers visiting their city</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] text-[11px] text-[var(--muted-foreground)] flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-[#1C3F5E]" aria-hidden="true" />
              <span>Planned discovery option for local connections</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
