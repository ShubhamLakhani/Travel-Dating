"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { EarlyAccessLink } from "./early-access-link";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)] transition-colors">
      <Container size="wide" className="h-16 flex items-center justify-between">
        {/* Triply Official Horizontal Logo */}
        <Link
          href="/"
          className="flex items-center select-none hover:opacity-90 transition-opacity"
          aria-label="Triply home"
        >
          <Image
            src="/brand/triply/triply-primary-horizontal.png"
            alt="Triply"
            width={132}
            height={44}
            priority
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Main Navigation" className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--foreground)]/80">
            <Link
              href="#how-it-works"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#safety"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Safety
            </Link>
            <Link
              href="/travel-dating"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Travel guides
            </Link>
          </div>

          <EarlyAccessLink
            source="header"
            variant="primary"
            size="sm"
            className="h-9 px-4 text-xs sm:text-sm font-semibold rounded-full shadow-xs hover:shadow-sm"
          >
            Early Access
          </EarlyAccessLink>
        </nav>
      </Container>
    </header>
  );
}
