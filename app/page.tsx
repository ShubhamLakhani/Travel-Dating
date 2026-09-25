import { LandingHeader } from "@/components/landing/landing-header";
import { HeroSection } from "@/components/landing/hero-section";
import { WhyRoamSection } from "@/components/landing/why-roam-section";
import { PreTripSection } from "@/components/landing/pretrip-section";
import { CompatibilitySection } from "@/components/landing/compatibility-section";
import { PeopleTypesSection } from "@/components/landing/people-types-section";
import { SafetyPreviewSection } from "@/components/safety/safety-preview-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { EarlyAccessCtaSection } from "@/components/landing/early-access-cta-section";
import { FaqSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { findDestinationBySlug } from "@/lib/destinations/validation-destinations";
import { TripSearchDraft } from "@/types/trip";

interface HomePageProps {
  searchParams?: Promise<{
    destination?: string;
    start?: string;
    end?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  let initialDraft: TripSearchDraft | undefined = undefined;

  if (searchParams) {
    const params = await searchParams;
    const dest = params.destination ? findDestinationBySlug(params.destination) : null;
    const arrivalDate = params.start && params.start.length === 10 ? params.start : null;
    const departureDate = params.end && params.end.length === 10 ? params.end : null;

    if (dest || arrivalDate || departureDate) {
      initialDraft = {
        destination: dest,
        arrivalDate,
        departureDate,
      };
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Header with Navigation and Early Access CTA */}
      <LandingHeader />

      <main className="flex-1 flex flex-col">
        {/* Hero Section + Interactive Trip Search / Match Preview */}
        <HeroSection initialSearchDraft={initialDraft} />

        {/* Why Roam Section */}
        <WhyRoamSection />

        {/* Pre-Trip Matching Section */}
        <PreTripSection />

        {/* Travel Compatibility Section */}
        <CompatibilitySection />

        {/* Travelers vs Locals Section */}
        <PeopleTypesSection />

        {/* Safety Principles & Preview Section */}
        <SafetyPreviewSection />

        {/* How It Works Journey Section */}
        <HowItWorksSection />

        {/* Primary Bottom Early Access Conversion CTA */}
        <EarlyAccessCtaSection />

        {/* FAQ Accordion Section */}
        <FaqSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
