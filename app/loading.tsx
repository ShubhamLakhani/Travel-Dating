import Image from "next/image";
import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <Container size="narrow" className="flex flex-col items-center justify-center gap-4">
        <div className="relative flex items-center justify-center animate-pulse">
          <Image
            src="/brand/triply/triply-symbol.png"
            alt="Triply loading"
            width={48}
            height={48}
            priority
            className="w-10 h-10 object-contain"
          />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          Loading Triply...
        </p>
      </Container>
    </div>
  );
}
