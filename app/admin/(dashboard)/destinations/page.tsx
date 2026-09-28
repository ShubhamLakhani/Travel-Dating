// Project Roam — Phase 7 Destination Analytics Page
// File: app/admin/(dashboard)/destinations/page.tsx

import { getDestinationDensitySummaries, getAdminOverviewData } from "@/lib/admin/queries";
import { DestinationsView } from "@/components/admin/destinations-view";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Destination Analytics | Project Roam Admin",
  description: "Market demand, trip distribution, and upcoming traveller overlap by destination.",
};

export default async function AdminDestinationsPage() {
  const [summaries, overview] = await Promise.all([
    getDestinationDensitySummaries(),
    getAdminOverviewData(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Destination Analytics
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Market Demand
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Explore validation volume, trip share, upcoming traveller overlaps, and closed-beta viability across all requested destinations.
        </p>
      </div>

      <DestinationsView summaries={summaries} totalTripsCount={overview.totalTrips} />
    </div>
  );
}
