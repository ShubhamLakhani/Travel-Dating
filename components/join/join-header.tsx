import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { Container } from "@/components/ui/container";

export function JoinHeader() {
  return (
    <header className="w-full bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)] transition-colors sticky top-0 z-40">
      <Container size="default" className="h-16 flex items-center justify-between">
        {/* Official Triply Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 select-none hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-[var(--focus)] rounded-md"
          aria-label="Triply home"
        >
          <Image
            src="/brand/triply/triply-primary-horizontal.png"
            alt="Triply"
            width={120}
            height={40}
            priority
            className="h-8 w-auto object-contain"
          />
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
