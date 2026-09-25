import { MapPin, Calendar, Compass, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function WhyRoamSection() {
  return (
    <Section spacing="default" className="border-t border-[var(--border)] bg-[var(--background)]">
      <Container size="wide">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            Dating apps know where you are.
            <br />
            <span className="text-[var(--primary)]">Roam knows where you&apos;re going.</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            Stop sorting through people who will be gone by Friday. Roam is designed around actual trip schedules so you can plan real dates in advance.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Same Destination */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[var(--primary)]/30 transition-colors">
            <div className="flex flex-col gap-4">
              <div className="h-12 w-12 rounded-2xl bg-[var(--travel-accent)] text-[#1C3F5E] flex items-center justify-center">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  Same destination
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                  Meet people who will actually be visiting the same place.
                </p>
              </div>
            </div>

            {/* Visual: Route Concept */}
            <div className="mt-6 pt-5 border-t border-[var(--border)]/70 bg-[var(--surface-muted)]/50 rounded-2xl p-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground)]">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                  Tokyo
                </span>
                <span className="text-[var(--muted-foreground)] text-[11px]">Flight route</span>
              </div>
              <div className="relative flex items-center my-1">
                <div className="w-full h-0.5 border-t-2 border-dashed border-[var(--border)]" />
                <div className="absolute left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[10px] text-[var(--primary)] font-bold shadow-sm">
                  &bull;
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
                <span>Direct match</span>
                <span>Both arriving Nov</span>
              </div>
            </div>
          </div>

          {/* Card 2: Same Time */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[var(--primary)]/30 transition-colors">
            <div className="flex flex-col gap-4">
              <div className="h-12 w-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                <Calendar className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  Same time
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                  See when your trips overlap instead of guessing who&apos;s still around.
                </p>
              </div>
            </div>

            {/* Visual: Shared Overlap Region */}
            <div className="mt-6 pt-5 border-t border-[var(--border)]/70 bg-[var(--surface-muted)]/50 rounded-2xl p-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground)]">
                <span>Trip Overlap</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-semibold">
                  6 days together
                </span>
              </div>
              <div className="flex flex-col gap-1.5 my-1">
                <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden flex">
                  <div className="w-4/5 bg-[var(--primary)] h-full rounded-full" />
                </div>
                <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden flex justify-end">
                  <div className="w-4/5 bg-[#1C3F5E] h-full rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
                <span>Dec 04 &ndash; 12</span>
                <span>Dec 06 &ndash; 14</span>
              </div>
            </div>
          </div>

          {/* Card 3: Same Intention */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[var(--primary)]/30 transition-colors md:col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-4">
              <div className="h-12 w-12 rounded-2xl bg-[var(--safety-accent)] text-[#1B4332] flex items-center justify-center">
                <Compass className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
                  Same intention
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                  Discover people looking for a similar kind of connection.
                </p>
              </div>
            </div>

            {/* Visual: Intention Tags */}
            <div className="mt-6 pt-5 border-t border-[var(--border)]/70 bg-[var(--surface-muted)]/50 rounded-2xl p-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground)]">
                <span>Shared Intentions</span>
                <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] shadow-xs">
                  Romantic connection
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--travel-accent)] text-[#1C3F5E] border border-[#1C3F5E]/15">
                  See where it goes
                </span>
              </div>
              <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                No guessing whether someone wants a coffee date or a vacation romance.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
