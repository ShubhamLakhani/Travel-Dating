import { Compass, Users, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TripCrossingTeaser() {
  return (
    <div className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 sm:p-7 shadow-sm flex flex-col gap-6 relative overflow-hidden">
      {/* Subtle decorative background gradient */}
      <div
        className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-[var(--travel-accent)]/50 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-[var(--primary)]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Header Context Strip */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-[var(--surface-muted)] text-[var(--foreground)] flex items-center justify-center">
            <Compass className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
          </div>
          <span className="font-display font-semibold text-sm text-[var(--foreground)]">
            Trip Overlap Concept
          </span>
        </div>
        <Badge variant="neutral" className="text-[10px] tracking-normal">
          Example travelers
        </Badge>
      </div>

      {/* Trips Crossing Visualization */}
      <div className="flex flex-col gap-4 relative">
        {/* Trip 1: Traveler A */}
        <div className="bg-[var(--surface-muted)]/70 border border-[var(--border)] rounded-[var(--radius-button)] p-4 flex flex-col gap-2.5 transition-all hover:border-[var(--primary)]/30">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-[var(--primary)] text-white text-[10px] font-bold flex items-center justify-center">
                A
              </div>
              <span className="font-semibold text-[var(--foreground)]">Your Trip</span>
            </div>
            <span className="font-medium text-[var(--muted-foreground)]">Dec 04 &ndash; Dec 12</span>
          </div>

          <div className="text-sm font-semibold text-[var(--foreground)]">
            Bali, Indonesia
          </div>

          {/* Timeline Bar A */}
          <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden flex">
            <div className="w-[70%] bg-[var(--primary)] h-full rounded-full" />
          </div>
        </div>

        {/* Overlap Connector Node */}
        <div className="flex items-center justify-center -my-2 relative z-10">
          <div className="px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--primary)]/30 shadow-sm flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>5 Days Overlapping in Bali</span>
          </div>
        </div>

        {/* Trip 2: Traveler B */}
        <div className="bg-[var(--surface-muted)]/70 border border-[var(--border)] rounded-[var(--radius-button)] p-4 flex flex-col gap-2.5 transition-all hover:border-[#1C3F5E]/30">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-[#1C3F5E] text-white text-[10px] font-bold flex items-center justify-center">
                B
              </div>
              <span className="font-semibold text-[var(--foreground)]">Compatible Traveler</span>
            </div>
            <span className="font-medium text-[var(--muted-foreground)]">Dec 07 &ndash; Dec 16</span>
          </div>

          <div className="text-sm font-semibold text-[var(--foreground)]">
            Bali, Indonesia
          </div>

          {/* Timeline Bar B (shifted start to show overlap) */}
          <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden flex">
            <div className="w-[30%] bg-transparent h-full" />
            <div className="w-[65%] bg-[#1C3F5E] h-full rounded-full" />
          </div>
        </div>
      </div>

      {/* Explanatory Note */}
      <div className="pt-2 text-xs text-[var(--muted-foreground)] leading-relaxed flex items-start gap-2">
        <Users className="h-4 w-4 text-[var(--muted-foreground)] shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          Roam matches you around shared destinations and travel schedules before you arrive.
        </span>
      </div>
    </div>
  );
}
