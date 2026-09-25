import type { DestinationOption } from "@/types/trip";

/**
 * Temporary local validation destination catalogue for Phase 2.
 * Note: These are suggested destinations for validation purposes and do not represent live Roam user data.
 */
export const VALIDATION_DESTINATIONS: readonly DestinationOption[] = [
  {
    id: "bali-indonesia",
    name: "Bali",
    country: "Indonesia",
    countryCode: "ID",
    label: "Bali, Indonesia",
    marketSlug: "bali-indonesia",
  },
  {
    id: "bangkok-thailand",
    name: "Bangkok",
    country: "Thailand",
    countryCode: "TH",
    label: "Bangkok, Thailand",
    marketSlug: "bangkok-thailand",
  },
  {
    id: "goa-india",
    name: "Goa",
    country: "India",
    countryCode: "IN",
    label: "Goa, India",
    marketSlug: "goa-india",
  },
  {
    id: "barcelona-spain",
    name: "Barcelona",
    country: "Spain",
    countryCode: "ES",
    label: "Barcelona, Spain",
    marketSlug: "barcelona-spain",
  },
  {
    id: "tokyo-japan",
    name: "Tokyo",
    country: "Japan",
    countryCode: "JP",
    label: "Tokyo, Japan",
    marketSlug: "tokyo-japan",
  },
  {
    id: "lisbon-portugal",
    name: "Lisbon",
    country: "Portugal",
    countryCode: "PT",
    label: "Lisbon, Portugal",
    marketSlug: "lisbon-portugal",
  },
  {
    id: "phuket-thailand",
    name: "Phuket",
    country: "Thailand",
    countryCode: "TH",
    label: "Phuket, Thailand",
    marketSlug: "phuket-thailand",
  },
  {
    id: "dubai-uae",
    name: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    label: "Dubai, United Arab Emirates",
    marketSlug: "dubai-uae",
  },
  {
    id: "paris-france",
    name: "Paris",
    country: "France",
    countryCode: "FR",
    label: "Paris, France",
    marketSlug: "paris-france",
  },
  {
    id: "london-uk",
    name: "London",
    country: "United Kingdom",
    countryCode: "GB",
    label: "London, United Kingdom",
    marketSlug: "london-uk",
  },
];

/**
 * Searches the validation destination catalogue case-insensitively
 * against name, country, and formatted label.
 */
export function searchDestinations(query: string): DestinationOption[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [...VALIDATION_DESTINATIONS];
  }

  return VALIDATION_DESTINATIONS.filter(
    (dest) =>
      dest.name.toLowerCase().includes(normalized) ||
      dest.country.toLowerCase().includes(normalized) ||
      dest.label.toLowerCase().includes(normalized) ||
      dest.marketSlug.toLowerCase().includes(normalized)
  );
}

export function findDestinationBySlug(slug: string): DestinationOption | null {
  const normalized = slug.trim().toLowerCase();
  return (
    VALIDATION_DESTINATIONS.find(
      (dest) => dest.marketSlug.toLowerCase() === normalized || dest.id === normalized
    ) || null
  );
}
