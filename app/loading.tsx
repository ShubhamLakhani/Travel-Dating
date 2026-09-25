import { Loader2 } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <Container size="narrow" className="flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" aria-hidden="true" />
        <p className="text-sm font-medium text-[var(--muted-foreground)]">
          Loading Roam...
        </p>
      </Container>
    </div>
  );
}
