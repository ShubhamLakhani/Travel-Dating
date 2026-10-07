import type { Metadata } from "next";
import { JoinHeader } from "@/components/join/join-header";
import { EarlyAccessForm } from "@/components/join/early-access-form";
import { Container } from "@/components/ui/container";
import { findDestinationBySlug } from "@/lib/destinations/validation-destinations";
import { TripSearchDraft } from "@/types/trip";

export const metadata: Metadata = {
  title: "Early Access Questionnaire",
  description: "Join the Triply early-access validation list.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

interface JoinPageProps {
  searchParams?: Promise<{
    destination?: string;
    start?: string;
    end?: string;
  }>;
}

export default async function JoinPage({ searchParams }: JoinPageProps) {
  let initialTrip: TripSearchDraft | null = null;

  if (searchParams) {
    const params = await searchParams;
    const dest = params.destination ? findDestinationBySlug(params.destination) : null;
    const arrivalDate = params.start && params.start.length === 10 ? params.start : null;
    const departureDate = params.end && params.end.length === 10 ? params.end : null;

    if (dest || arrivalDate || departureDate) {
      initialTrip = {
        destination: dest,
        arrivalDate,
        departureDate,
      };
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Minimal Header */}
      <JoinHeader />

      {/* Main Form Container */}
      <main className="flex-1 py-8 sm:py-12 flex flex-col justify-center">
        <Container size="default">
          <EarlyAccessForm initialTrip={initialTrip} />
        </Container>
      </main>
    </div>
  );
}
