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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand & Tagline */}
          <div className="flex flex-col gap-1.5">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)] hover:opacity-90 transition-opacity"
              aria-label="Roam home"
            >
              roam
            </Link>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
              Meet someone going where you&apos;re going.
            </p>
          </div>

          {/* Legal and Support Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
            <Link
              href="/safety"
              className="hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
            >
              Safety
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
            >
              Terms
            </Link>
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)] cursor-pointer"
            >
              Contact
            </button>
          </nav>
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
