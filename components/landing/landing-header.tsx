import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EarlyAccessLink } from "./early-access-link";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)] transition-colors">
      <Container size="wide" className="h-16 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)] select-none hover:opacity-90 transition-opacity"
          aria-label="Roam home"
        >
          roam
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
          </div>

          <EarlyAccessLink
            source="header"
            variant="primary"
            size="sm"
            className="h-9 px-4 text-xs sm:text-sm font-semibold rounded-full"
          >
            Early Access
          </EarlyAccessLink>
        </nav>
      </Container>
    </header>
  );
}
