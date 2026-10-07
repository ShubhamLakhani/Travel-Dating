// Project Roam : Phase 7 Trips Explorer Page
// File: app/admin/(dashboard)/trips/page.tsx

import { getTravelMonthAnalytics } from "@/lib/admin/queries";
import { getRequiredAdminClient } from "@/lib/supabase/admin";
import { TripsExplorerView } from "@/components/admin/trips-explorer-view";
import type { TripEntity } from "@/types/admin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Trips Explorer | Triply Admin",
  description: "Browse individual trip submissions and aggregated travel month density.",
};

export default async function AdminTripsPage() {
  const supabase = getRequiredAdminClient();

  const [months, tripsRes] = await Promise.all([
    getTravelMonthAnalytics(),
    supabase.from("trips").select("*").order("arrival_date", { ascending: true }),
  ]);

  const rawTrips = tripsRes.data || [];
  const entities: TripEntity[] = rawTrips.map((t) => ({
    id: t.id,
    waitlistUserId: t.waitlist_user_id,
    destinationId: t.destination_id,
    destinationName: t.destination_name,
    destinationCountry: t.destination_country,
    destinationCountryCode: t.destination_country_code,
    marketSlug: t.market_slug,
    arrivalDate: t.arrival_date,
    departureDate: t.departure_date,
    travelMode: t.travel_mode,
    createdAt: t.created_at,
  }));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Trips Explorer &amp; Seasonal Demand
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
            {entities.length} Total Trips
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Inspect temporal travel patterns by calendar month and view individual trip records across destinations.
        </p>
      </div>

      <TripsExplorerView months={months} trips={entities} />
    </div>
  );
}
