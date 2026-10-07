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
    question: "Is Triply live?",
    answer:
      "Triply is currently in early-access validation. Participants will help us determine where and how the first real matching experience opens.",
  },
  {
    id: "faq-real-profiles",
    question: "Are the profiles shown here real?",
    answer:
      "No. Profiles shown across the preview are fictional examples used to demonstrate how trip-based discovery works.",
  },
  {
    id: "faq-solo",
    question: "Is Triply only for solo travelers?",
    answer:
      "Solo travelers are our primary audience, but the product concept also supports people traveling with friends or colleagues.",
  },
  {
    id: "faq-locals",
    question: "Can I meet locals?",
    answer:
      "Yes. Triply is being designed so travelers can choose whether they want to meet fellow visitors, local residents, or both.",
  },
  {
    id: "faq-location",
    question: "Will my exact location or hotel be shown?",
    answer:
      "No. Triply matches by destination city and date window only. Exact accommodation and live GPS location are never collected or shared publicly.",
  },
  {
    id: "faq-age",
    question: "Is Triply strictly 18+?",
    answer:
      "Yes. Triply is designed exclusively for adults aged 18 or older. Minor accounts will not be permitted.",
  },
];

export function FaqSection() {
  const [openIds, setOpenIds] = React.useState<Record<string, boolean>>({
    "faq-live": true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Section spacing="default" className="border-t border-[var(--border)] bg-[var(--surface-soft)]">
      <Container size="default">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 mb-12 sm:mb-16">
          <Badge variant="neutral" className="w-fit mx-auto text-xs font-semibold">
            Frequently Asked Questions
          </Badge>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            Common questions
          </h2>

          <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
            Everything you need to know about our early-access validation stage and how Triply works.
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
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-display text-base font-bold text-[var(--foreground)] hover:bg-[var(--surface-soft)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[var(--muted-foreground)] transition-transform duration-200 shrink-0 ${
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
                  className={`px-5 pb-5 text-sm text-[var(--muted-foreground)] leading-relaxed ${
                    isOpen ? "block animate-in fade-in-50 duration-200" : "hidden"
                  }`}
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
