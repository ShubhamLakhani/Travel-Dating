"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { MapPin, Calendar, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function WhyTriplySection() {
  const shouldReduceMotion = useReducedMotion();

  const nodes = [
    {
      id: "destination",
      title: "Shared Destination",
      tagline: "Same city",
      description:
        "Meet people who will actually be in the same place at the same time, not someone three states away.",
      icon: MapPin,
      color: "#6B5BFF",
      accentBg: "bg-[var(--triply-purple)]/10",
      pillText: "Tokyo · Lisbon · Bali",
    },
    {
      id: "dates",
      title: "Overlapping Dates",
      tagline: "Same window",
      description:
        "Know exactly when your trips coincide. Coordinate coffee or an evening walk before your trip begins.",
      icon: Calendar,
      color: "#FF735D",
      accentBg: "bg-[var(--triply-coral)]/10",
      pillText: "5 to 8 days overlap",
    },
    {
      id: "connection",
      title: "Travel Pacing",
      tagline: "Same mindset",
      description:
        "Connect around how you like to explore. Slow mornings, local markets, photography, and genuine company.",
      icon: Sparkles,
      color: "#E84A8B",
      accentBg: "bg-[var(--triply-magenta)]/10",
      pillText: "Shared travel styles",
    },
  ];

  return (
    <Section spacing="default" className="border-t border-[var(--border)] bg-[var(--background)] relative overflow-hidden">
      <Container size="wide">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 mb-12 sm:mb-16">
          <Badge variant="primary" className="w-fit mx-auto text-xs font-semibold">
            Why Triply
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            Dating apps know where you live.
            <br />
            <span className="bg-gradient-to-r from-[#FF735D] via-[#E84A8B] to-[#6B5BFF] bg-clip-text text-transparent">
              Triply knows where you&apos;re going.
            </span>
          </h2>
          <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
            Stop sorting through people who will be gone by Friday. Triply aligns your travel calendar so you can discover someone heading to the same place.
          </p>
        </div>

        {/* Central Triply Symbol + 3 Storytelling Nodes Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left / Central Symbol Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-large)] shadow-sm relative overflow-hidden text-center">
            {/* Ambient blur */}
            <div
              className="absolute -top-16 -left-16 w-40 h-40 rounded-full bg-[var(--triply-coral)]/10 blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-[var(--triply-purple)]/10 blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <motion.div
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mb-6"
            >
              <Image
                src="/brand/triply/triply-symbol.png"
                alt="Triply destination mark"
                width={160}
                height={160}
                className="w-32 h-32 sm:w-36 sm:h-36 object-contain drop-shadow-sm"
              />
            </motion.div>

            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--triply-purple)]">
              Two travelers. One shared destination.
            </span>
            <p className="text-xs text-[var(--muted-foreground)] mt-2 max-w-xs leading-relaxed">
              The Triply mark represents two independent travel paths converging at a single shared destination pin.
            </p>
          </div>

          {/* Right: 3 Connected Journey Nodes */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.id}
                  initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-5 sm:p-6 shadow-sm hover:border-[var(--primary)]/30 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      style={{ color: node.color }}
                      className={`h-12 w-12 rounded-2xl ${node.accentBg} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-base sm:text-lg font-bold text-[var(--foreground)]">
                          {node.title}
                        </h3>
                        <span className="text-[11px] font-semibold text-[var(--muted-foreground)] px-2 py-0.5 rounded-full bg-[var(--surface-muted)]">
                          {node.tagline}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed max-w-md">
                        {node.description}
                      </p>
                    </div>
                  </div>

                  <div className="sm:self-center shrink-0">
                    <span
                      style={{ color: node.color }}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--surface-soft)] border border-[var(--border)] inline-block"
                    >
                      {node.pillText}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

// Retain backward-compatible alias
export { WhyTriplySection as WhyRoamSection };
