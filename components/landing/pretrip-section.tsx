import { MessageSquare, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function PreTripSection() {
  return (
    <Section spacing="default" className="border-t border-[var(--border)] bg-[var(--surface)]/50">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Storytelling Copy */}
          <div className="lg:col-span-6 flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
            <Badge variant="travel" className="w-fit text-xs font-semibold">
              Pre-trip Connection
            </Badge>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              Don&apos;t wait until you land.
            </h2>

            <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed max-w-lg">
              Start connecting before your trip so you can spend less time searching and more time enjoying where you&apos;re going.
            </p>

            <div className="pt-2 flex flex-col gap-3 text-xs sm:text-sm text-[var(--foreground)]/80 max-w-md">
              <div className="flex items-start gap-2.5">
                <span className="h-5 w-5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  &bull;
                </span>
                <span>Discover who will be visiting your destination during the same travel window.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="h-5 w-5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  &bull;
                </span>
                <span>Break the ice and decide together on a café, museum, or evening walk in advance.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Illustration */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-5 sm:p-7 shadow-sm flex flex-col gap-5 relative">
              {/* Product preview badge */}
              <div className="flex items-center justify-between">
                <Badge variant="neutral" className="text-[11px] font-semibold tracking-wide uppercase">
                  Product preview
                </Badge>
                <span className="text-xs font-medium text-[var(--muted-foreground)] flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-[var(--primary)]" aria-hidden="true" />
                  Conceptual flow
                </span>
              </div>

              {/* Mini Itinerary Overlap Graphic */}
              <div className="bg-[var(--surface-muted)]/60 border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground)]">
                  <span>Bangkok &middot; Itinerary Overlap</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold">
                    5 days together
                  </span>
                </div>

                {/* Visual timeline bars */}
                <div className="flex flex-col gap-2 pt-1 text-[11px]">
                  {/* User bar */}
                  <div className="flex items-center justify-between text-[var(--muted-foreground)]">
                    <span className="font-semibold text-[var(--foreground)]">Your trip</span>
                    <span>Nov 10 &ndash; Nov 17</span>
                  </div>
                  <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--primary)] rounded-full w-4/5" />
                  </div>

                  {/* Alex bar */}
                  <div className="flex items-center justify-between text-[var(--muted-foreground)] pt-1">
                    <span className="font-semibold text-[var(--foreground)]">Alex&apos;s example trip</span>
                    <span>Nov 12 &ndash; Nov 18</span>
                  </div>
                  <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden flex justify-end">
                    <div className="h-full bg-[#1C3F5E] rounded-full w-4/5" />
                  </div>
                </div>
              </div>

              {/* Fictional Conceptual Chat Message */}
              <div className="border border-[var(--border)] rounded-2xl p-4 bg-[var(--surface-muted)]/30 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--muted-foreground)]">
                  <MessageSquare className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
                  <span>Example conversation</span>
                </div>

                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl rounded-tl-sm p-3.5 shadow-xs max-w-[90%]">
                  <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
                    &ldquo;Looks like we&apos;ll both be in Bangkok next Friday. Want to grab coffee around Ari?&rdquo;
                  </p>
                  <span className="text-[10px] text-[var(--muted-foreground)] mt-1 block">
                    Planned messaging concept
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
