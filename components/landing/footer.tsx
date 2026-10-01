"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [isContactOpen, setIsContactOpen] = React.useState(false);

  return (
    <footer className="border-t border-[var(--border)] py-12 bg-[var(--surface)] text-[var(--muted-foreground)]">
      <Container size="wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand & Tagline */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)] hover:opacity-90 transition-opacity"
              aria-label="Roam home"
            >
              roam
            </Link>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-sm">
              Meet someone going where you&apos;re going. Travel dating built around shared destinations and real travel dates.
            </p>
            <div className="pt-2">
              <Link
                href="/join"
                className="inline-flex items-center text-xs font-semibold text-[var(--primary)] hover:underline"
              >
                Join early access &rarr;
              </Link>
            </div>
          </div>

          {/* Travel Guides */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Travel Guides
            </span>
            <nav aria-label="Travel Guides" className="flex flex-col gap-2 text-xs sm:text-sm">
              <Link
                href="/travel-dating"
                className="hover:text-[var(--foreground)] transition-colors"
              >
                Travel Dating Guide
              </Link>
              <Link
                href="/dating-while-traveling"
                className="hover:text-[var(--foreground)] transition-colors"
              >
                Dating While Traveling
              </Link>
              <Link
                href="/meet-people-before-your-trip"
                className="hover:text-[var(--foreground)] transition-colors"
              >
                Meet People Before Your Trip
              </Link>
              <Link
                href="/solo-travel-dating"
                className="hover:text-[var(--foreground)] transition-colors"
              >
                Solo Travel Dating
              </Link>
            </nav>
          </div>

          {/* Legal and Support Links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Safety &amp; Legal
            </span>
            <nav aria-label="Footer Navigation" className="flex flex-col gap-2 text-xs sm:text-sm">
              <Link
                href="/safety"
                className="hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
              >
                Safety Principles
              </Link>
              <Link
                href="/privacy"
                className="hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
              >
                Terms of Service
              </Link>
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="text-left hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)] cursor-pointer"
              >
                Contact
              </button>
            </nav>
          </div>
        </div>

        {/* Pre-launch Disclaimer Banner */}
        <div className="mt-8 pt-6 border-t border-[var(--border)]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]/80">
          <div>
            &copy; {new Date().getFullYear()} Project Roam &middot; Pre-MVP Validation Stage &middot; 18+ only.
          </div>
          <div>
            Fictional profiles for demonstration only. No real matching is active.
          </div>
        </div>
      </Container>

      {/* Truthful Contact Information Modal */}
      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Contact Project Roam"
        size="sm"
      >
        <div className="p-6 flex flex-col gap-4 text-left">
          <p className="text-xs sm:text-sm text-[var(--foreground)]/90 leading-relaxed">
            Project Roam is currently in pre-launch validation. Dedicated public customer support channels will be established and published prior to open public access.
          </p>
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
            If you have questions regarding the validation research or your early-access submission, contact information will be provided directly in research invitation emails.
          </p>
          <div className="pt-2 flex justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsContactOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </footer>
  );
}
