"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [isContactOpen, setIsContactOpen] = React.useState(false);

  return (
    <footer className="border-t border-[var(--border)] py-12 bg-[var(--surface)] text-[var(--muted-foreground)]">
      <Container size="wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Philosophy */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center select-none hover:opacity-90 transition-opacity"
              aria-label="Triply home"
            >
              <Image
                src="/brand/triply/triply-primary-horizontal.png"
                alt="Triply"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-xs font-semibold text-[var(--triply-purple)] uppercase tracking-wider">
              Two travelers. One shared destination.
            </p>
            <p className="text-xs text-[var(--muted-foreground)] max-w-xs leading-relaxed">
              Travel dating built around shared destinations and matching travel dates. Connect before or during your trip.
            </p>
          </div>

          {/* Column 2: Travel Guides */}
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

          {/* Column 3: Safety & Legal */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Safety &amp; Legal
            </span>
            <nav aria-label="Safety and Legal Links" className="flex flex-col gap-2 text-xs sm:text-sm">
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
              <Link
                href="/privacy/request"
                className="hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
              >
                Data Privacy Request
              </Link>
            </nav>
          </div>

          {/* Column 4: Early Access & Contact */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
              Early Access
            </span>
            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              <Link
                href="/join"
                className="font-semibold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
              >
                <span>Join Early Access</span>
                <span>&rarr;</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="text-left hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)] cursor-pointer"
              >
                Contact &amp; Feedback
              </button>
            </div>
            <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed mt-2">
              Triply is currently in early-access validation. Demonstration profiles are fictional examples.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Mode Notice */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
          <p>
            &copy; {new Date().getFullYear()} Triply. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Pre-launch validation mode</span>
          </div>
        </div>
      </Container>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Contact Triply"
      >
        <div className="flex flex-col gap-4 text-sm text-[var(--foreground)]">
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            Have questions about Triply, feedback on the early-access preview, or privacy inquiries? We would love to hear from you.
          </p>

          <div className="p-4 bg-[var(--surface-muted)] rounded-2xl border border-[var(--border)] flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              Direct Contact
            </span>
            <a
              href="mailto:hello@mail.toolmint.cc"
              className="text-base font-semibold text-[var(--primary)] hover:underline"
            >
              hello@mail.toolmint.cc
            </a>
          </div>

          <div className="flex justify-end pt-2">
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
