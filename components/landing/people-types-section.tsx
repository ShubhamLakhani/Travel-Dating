"use client";

import { motion, useReducedMotion } from "motion/react";
import { Plane, Compass, Coffee, Navigation } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function PeopleTypesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section spacing="default" className="border-t border-[var(--border)] bg-[var(--surface-soft)]">
      <Container size="wide">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 mb-12 sm:mb-16">
          <Badge variant="travel" className="w-fit mx-auto text-xs font-semibold">
            Discovery Modes
          </Badge>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            Meet visiting travelers.
            <br />
            <span className="text-[#6B5BFF]">Or connect with someone who lives there.</span>
          </h2>

          <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
            Choose whether you want to explore new sights alongside someone with a shared vacation mindset, or let a resident show you their favorite neighborhood spots.
          </p>
        </div>

        {/* Split Visual: Traveler Route Card (Dream Purple) vs Local City Card (Sunset Coral) */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Fellow Travelers (Dream Purple) */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            transition={{ duration: 0.25 }}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-large)] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#6B5BFF]/40 hover:shadow-md transition-all"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[#6B5BFF]/10 text-[#6B5BFF] flex items-center justify-center">
                  <Plane className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B5BFF] px-2.5 py-1 rounded-full bg-[#6B5BFF]/10">
                  Visiting Travelers
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-2xl font-bold text-[var(--foreground)]">
                  Fellow Travelers
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  Discover singles whose vacation or remote work window overlaps yours.
                </p>
              </div>

              {/* Traveler Route Visual */}
              <div className="bg-[var(--surface-soft)] border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-2.5 text-xs">
                <div className="flex items-center gap-2 font-medium text-[var(--foreground)]">
                  <span className="h-2 w-2 rounded-full bg-[#6B5BFF]" aria-hidden="true" />
                  <span>Matching travel windows and arrival dates</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-[var(--foreground)]">
                  <span className="h-2 w-2 rounded-full bg-[#6B5BFF]" aria-hidden="true" />
                  <span>Both experiencing the destination as newcomers</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-[var(--foreground)]">
                  <span className="h-2 w-2 rounded-full bg-[#6B5BFF]" aria-hidden="true" />
                  <span>Shared excitement for sightseeing, day trips, and markets</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)] flex items-center gap-1.5">
              <Navigation className="h-4 w-4 text-[#6B5BFF]" aria-hidden="true" />
              <span>Itinerary overlap matching mode</span>
            </div>
          </motion.div>

          {/* Card 2: Local Residents (Sunset Coral) */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            transition={{ duration: 0.25 }}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-large)] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#FF735D]/40 hover:shadow-md transition-all"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[#FF735D]/10 text-[#FF735D] flex items-center justify-center">
                  <Compass className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF735D] px-2.5 py-1 rounded-full bg-[#FF735D]/10">
                  Local Residents
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-2xl font-bold text-[var(--foreground)]">
                  Local Hosts &amp; Residents
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  Connect with people who live in the city and enjoy meeting visitors.
                </p>
              </div>

              {/* Local City Visual */}
              <div className="bg-[var(--surface-soft)] border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-2.5 text-xs">
                <div className="flex items-center gap-2 font-medium text-[var(--foreground)]">
                  <span className="h-2 w-2 rounded-full bg-[#FF735D]" aria-hidden="true" />
                  <span>Neighborhood insider knowledge and hidden cafes</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-[var(--foreground)]">
                  <span className="h-2 w-2 rounded-full bg-[#FF735D]" aria-hidden="true" />
                  <span>Authentic restaurants away from tourist strips</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-[var(--foreground)]">
                  <span className="h-2 w-2 rounded-full bg-[#FF735D]" aria-hidden="true" />
                  <span>Comfortable local recommendations and genuine conversations</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)] flex items-center gap-1.5">
              <Coffee className="h-4 w-4 text-[#FF735D]" aria-hidden="true" />
              <span>Resident exploration mode</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
