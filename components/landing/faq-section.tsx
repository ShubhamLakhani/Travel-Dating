"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "faq-live",
    question: "Is Roam live?",
    answer:
      "Roam is currently in pre-launch validation. Early-access participants will help us decide where and how the first real matching experience should launch.",
  },
  {
    id: "faq-real-profiles",
    question: "Are the profiles shown here real?",
    answer:
      "No. Profiles shown in the current preview are fictional examples used to demonstrate how trip-based discovery could work.",
  },
  {
    id: "faq-solo",
    question: "Is Roam only for solo travelers?",
    answer:
      "Solo travelers are our initial focus, but the product concept also supports people traveling with friends or groups.",
  },
  {
    id: "faq-locals",
    question: "Can I meet locals?",
    answer:
      "That's part of the product direction. Roam is being designed so people can choose whether they want to meet travelers, locals, or both.",
  },
  {
    id: "faq-location",
    question: "Will my exact location be shown?",
    answer:
      "The product is being designed so exact accommodation and live location are not displayed publicly.",
  },
  {
    id: "faq-age",
    question: "Is Roam 18+?",
    answer: "Yes. Project Roam is intended only for adults aged 18 or older.",
  },
];

export function FaqSection() {
  const [openIds, setOpenIds] = React.useState<Record<string, boolean>>({
    "faq-live": true, // First open by default for immediate context
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Section spacing="default" className="border-t border-[var(--border)] bg-[var(--surface)]/50">
      <Container size="default">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 mb-12 sm:mb-16">
          <Badge variant="neutral" className="w-fit mx-auto text-xs font-semibold">
            Frequently Asked Questions
          </Badge>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            Common questions
          </h2>

          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            Everything you need to know about our pre-launch validation stage and how Roam works.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {FAQS.map((faq) => {
            const isOpen = !!openIds[faq.id];
            const contentId = `${faq.id}-content`;
            const buttonId = `${faq.id}-button`;

            return (
              <div
                key={faq.id}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display text-base sm:text-lg font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[var(--muted-foreground)] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[var(--primary)]" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed border-t border-[var(--border)]/50 pt-3"
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
