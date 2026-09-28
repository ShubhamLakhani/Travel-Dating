// Project Roam — Phase 7 Trip Density Analytics Page
// File: app/admin/(dashboard)/density/page.tsx

import { Layers, Users, Zap, CheckCircle2 } from "lucide-react";
import { getDestinationDensitySummaries } from "@/lib/admin/queries";
import { DensityTable } from "@/components/admin/density-table";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Trip Density Engine | Project Roam Admin",
  description: "Marketplace density analysis, date overlap calculations, and closed-beta readiness.",
};

export default async function AdminDensityPage() {
  const summaries = await getDestinationDensitySummaries();

  // Compute aggregate density KPIs
  const totalDestinations = summaries.length;
  const readyDestinations = summaries.filter((d) => d.readiness === "ready").length;
  const warmingDestinations = summaries.filter((d) => d.readiness === "warming").length;
  const totalPairs = summaries.reduce((acc, curr) => acc + curr.overlappingPairsCount, 0);
  const totalCompatiblePairs = summaries.reduce((acc, curr) => acc + curr.compatiblePairsCount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Trip Density Engine
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
            Core Metric
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          ROAM is trip-first. A marketplace is viable only when travellers overlap in destination and calendar dates.
        </p>
      </div>

      {/* Aggregate Density Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] uppercase font-semibold">
            <span>Market Destinations</span>
            <Layers className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[var(--foreground)]">
            {totalDestinations}
          </div>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            Active destinations with submitted trips
          </p>
        </div>

        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] uppercase font-semibold">
            <span>Overlapping Pairs</span>
            <Users className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-700">
            {totalPairs}
          </div>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            Distinct traveller pairs sharing dates
          </p>
        </div>

        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] uppercase font-semibold">
            <span>Compatible Pairs</span>
            <Zap className="h-4 w-4 text-purple-600" aria-hidden="true" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-purple-700">
            {totalCompatiblePairs}
          </div>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            Mutually compatible intent & preferences
          </p>
        </div>

        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] uppercase font-semibold">
            <span>Beta Ready Launch</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[var(--foreground)]">
              {readyDestinations}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">
              ready ({warmingDestinations} warming)
            </span>
          </div>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            Destinations meeting concurrency threshold
          </p>
        </div>
      </div>

      {/* Interactive Table with Density Windows */}
      <DensityTable summaries={summaries} />
    </div>
  );
}
