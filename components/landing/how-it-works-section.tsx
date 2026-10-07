"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function HowItWorksSection() {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      num: "01",
      title: "Add your trip",
      description: "Enter your destination city and travel dates.",
      context: "Your itinerary dates define your match window without sharing live GPS.",
      color: "#FF735D",
    },
    {
      num: "02",
      title: "Discover overlap",
      description: "See travelers visiting during the exact same days.",
      context: "Every potential match has a confirmed overlapping schedule.",
      color: "#E84A8B",
    },
    {
      num: "03",
      title: "Connect before you land",
      description: "Message and compare travel styles in advance.",
      context: "Coordinate plans, discover common interests, and decide on a public spot.",
      color: "#6B5BFF",
    },
    {
      num: "04",
      title: "Meet thoughtfully",
      description: "Meet up safely in a vibrant public setting.",
      context: "Grab an espresso, wander an art museum, or catch sunset at a viewpoint.",
      color: "#A78BFA",
    },
  ];

  return (
    <Section
      id="how-it-works"
      spacing="default"
      className="border-t border-[var(--border)] bg-[var(--background)] scroll-mt-20"
    >
      <Container size="wide">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 mb-14 sm:mb-20">
          <Badge variant="travel" className="w-fit mx-auto text-xs font-semibold">
            How It Works
          </Badge>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            Your travel schedule becomes your dating map.
          </h2>

          <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
            Triply aligns your itinerary with people heading in the same direction, so you can connect before or during your trip.
          </p>
        </div>

        {/* Single Responsive Journey Container (No DOM Duplication) */}
        <div className="relative max-w-5xl mx-auto">
          {/* Animated Connecting SVG Path for Desktop */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-1 -z-0 pointer-events-none">
            <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none">
              <motion.line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="url(#journey-grad)"
                strokeWidth="3"
                strokeDasharray="6 6"
                initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <defs>
                <linearGradient id="journey-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF735D" />
                  <stop offset="35%" stopColor="#E84A8B" />
                  <stop offset="70%" stopColor="#6B5BFF" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Grid Layout: Stacks vertically on mobile/tablet, 4-col on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative z-10 flex flex-col items-start gap-4 p-5 sm:p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs hover:border-[var(--primary)]/30 hover:shadow-sm transition-all"
              >
                {/* Step Marker */}
                <div className="flex items-center justify-between w-full">
                  <div
                    style={{ borderColor: `${step.color}40`, color: step.color }}
                    className="h-12 w-12 rounded-2xl bg-[var(--surface-soft)] border-2 flex items-center justify-center font-display text-base font-extrabold shadow-xs"
                  >
                    {step.num}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                    Step {idx + 1}
                  </span>
                </div>

                {/* Step Content */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-lg font-bold text-[var(--foreground)]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/80 leading-snug">
                    {step.description}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mt-1">
                    {step.context}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
