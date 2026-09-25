import Link from "next/link";
import { X } from "lucide-react";
import { Container } from "@/components/ui/container";

export function JoinHeader() {
  return (
    <header className="w-full bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)] transition-colors">
      <Container size="default" className="h-16 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)] select-none hover:opacity-90 transition-opacity"
          aria-label="Roam home"
        >
          roam
        </Link>

        {/* Minimal Close Button */}
        <Link
          href="/"
          className="p-2 rounded-full hover:bg-[var(--surface-muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
          aria-label="Close questionnaire and return home"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </Link>
      </Container>
    </header>
  );
}
