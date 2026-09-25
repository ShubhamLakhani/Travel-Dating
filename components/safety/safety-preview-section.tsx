import { ShieldCheck, MapPinOff, Share2, Clock, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function SafetyPreviewSection() {
  const safetyFeatures = [
    {
      icon: ShieldCheck,
      title: "Verified profiles",
      description: "Selfie verification is planned to help reduce fake profiles.",
      badge: "Planned verification",
    },
    {
      icon: MapPinOff,
      title: "Approximate location",
      description:
        "Roam is being designed so your exact accommodation or live location is never shown publicly.",
      badge: "Privacy by design",
    },
    {
      icon: Share2,
      title: "Share your date",
      description:
        "Privately share who you're meeting, where, and when with someone you trust.",
      badge: "Planned safety feature",
    },
    {
      icon: Clock,
      title: "Safety check-ins",
      description: "Set a time for Roam to check whether your date is going okay.",
      badge: "Product concept only",
    },
  ];

  return (
    <Section
      id="safety"
      spacing="default"
      className="border-t border-[var(--border)] bg-[#FAF8F4] scroll-mt-20"
    >
      <Container size="wide">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 mb-12 sm:mb-16">
          <Badge variant="safety" className="w-fit mx-auto text-xs font-semibold">
            Trust &amp; Safety
          </Badge>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            Travel dating should feel safer.
          </h2>

          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            Meeting someone new can feel different when you&apos;re far from home. Roam is being designed with travel-specific safety built into the experience.
          </p>
        </div>

        {/* 2-Column Layout: 4 Features on Left, Interactive-style Preview Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left: 4 Planned Features */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {safetyFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-5 sm:p-6 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-xl bg-[var(--safety-accent)] text-[#1B4332] flex items-center justify-center">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="text-[10px] font-semibold text-[#1B4332] bg-[var(--safety-accent)]/70 px-2 py-0.5 rounded-full">
                        {feat.badge}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-base sm:text-lg font-bold text-[var(--foreground)]">
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Planned Safety Experience Preview Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-sm bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 shadow-sm flex flex-col gap-5 relative">
              {/* Badge */}
              <div className="flex items-center justify-between">
                <Badge variant="safety" className="text-[11px] font-semibold uppercase tracking-wider">
                  Safety feature preview
                </Badge>
                <span className="text-[11px] text-[var(--muted-foreground)]">Non-functional mock</span>
              </div>

              {/* Date Snapshot Card */}
              <div className="bg-[var(--surface-muted)]/70 border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Your Date
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-[var(--foreground)]">
                    Maya
                  </span>
                  <span className="text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-full">
                    Friday &middot; 8:00 PM
                  </span>
                </div>
                <div className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                  <span>Beach House Caf&eacute; &middot; Canggu</span>
                </div>
              </div>

              {/* Share With Trusted Contact (Decorative Demonstration) */}
              <div
                aria-hidden="true"
                className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-[#1B4332]" />
                  <span className="font-semibold text-[var(--foreground)]">Share with</span>
                </div>
                <span className="text-[11px] font-medium text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-lg">
                  + Trusted contact
                </span>
              </div>

              {/* Check on me timer (Decorative Demonstration) */}
              <div
                aria-hidden="true"
                className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#1B4332]" />
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">Check on me</div>
                    <div className="text-[10px] text-[var(--muted-foreground)]">10:30 PM</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#1B4332]">ON</span>
                  <div className="w-8 h-4.5 bg-[#1B4332] rounded-full p-0.5 flex justify-end items-center">
                    <div className="w-3.5 h-3.5 bg-white rounded-full shadow-xs" />
                  </div>
                </div>
              </div>

              {/* Reassurance text */}
              <div className="text-[11px] text-[var(--muted-foreground)] flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#1B4332] shrink-0" aria-hidden="true" />
                <span>Private details are never made visible to matches</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Principle Statement Banner */}
        <div className="mt-12 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-[var(--safety-accent)]/50 border border-[#1B4332]/20 text-center">
          <p className="text-xs sm:text-sm font-semibold text-[#1B4332] leading-relaxed">
            Our product principle: core safety tools shouldn&apos;t sit behind a premium subscription.
          </p>
        </div>
      </Container>
    </Section>
  );
}
