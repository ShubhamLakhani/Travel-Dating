// Project Roam — Phase 7 Main Admin Overview Page
// File: app/admin/(dashboard)/page.tsx

import Link from "next/link";
import {
  Users,
  Plane,
  Sparkles,
  HeartHandshake,
  Activity,
  ArrowRight,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { getAdminOverviewData, getDestinationDensitySummaries } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [kpis, destinationSummaries] = await Promise.all([
    getAdminOverviewData(),
    getDestinationDensitySummaries(),
  ]);

  const topDestinations = destinationSummaries.slice(0, 5);

  // SVG Chart calculation for 14-day activity
  const activityData = kpis.timeSeriesActivity;
  const maxVal = Math.max(
    ...activityData.map((d) => Math.max(d.signups, d.trips)),
    1
  );

  return (
    <div className="space-y-8">
      {/* Header & Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Validation Overview
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Verified Phase 6 Baseline
            </span>
          </div>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Founder research dashboard measuring travel demand, density, and closed-beta viability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/density"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--primary)] text-white hover:opacity-95 transition-all shadow-xs"
          >
            <Activity className="h-4 w-4" aria-hidden="true" />
            <span>Trip Density Engine</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Early-Access Users
            </span>
            <div className="p-2 rounded-xl bg-orange-50 text-[var(--primary)]">
              <Users className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
              {kpis.totalUsers}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">registered</span>
          </div>
          <div className="mt-3 pt-3 border-t border-[var(--border)]/60 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Last 7d: <strong className="text-[var(--foreground)]">+{kpis.signupsLast7Days}</strong></span>
            <span>Last 30d: <strong className="text-[var(--foreground)]">+{kpis.signupsLast30Days}</strong></span>
          </div>
        </div>

        {/* Total Trips */}
        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Submitted Trips
            </span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <Plane className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
              {kpis.totalTrips}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">trips stored</span>
          </div>
          <div className="mt-3 pt-3 border-t border-[var(--border)]/60 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Last 7d: <strong className="text-[var(--foreground)]">+{kpis.tripsLast7Days}</strong></span>
            <span>Last 30d: <strong className="text-[var(--foreground)]">+{kpis.tripsLast30Days}</strong></span>
          </div>
        </div>

        {/* Unique Travellers */}
        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Unique Travellers
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
              {kpis.uniqueTravellers}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">
              ({kpis.totalUsers > 0 ? Math.round((kpis.uniqueTravellers / kpis.totalUsers) * 100) : 0}% of signups)
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-[var(--border)]/60 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Multi-trip users:</span>
            <strong className="text-[var(--foreground)]">{kpis.multiTripUsers} users</strong>
          </div>
        </div>

        {/* Interview Volunteers */}
        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Interview Volunteers
            </span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
              {kpis.interviewVolunteers}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">
              ({kpis.totalUsers > 0 ? Math.round((kpis.interviewVolunteers / kpis.totalUsers) * 100) : 0}% opt-in)
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-[var(--border)]/60 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>High-intent signal</span>
            <Link href="/admin/interviews" className="text-[var(--primary)] font-semibold hover:underline">
              View pipeline →
            </Link>
          </div>
        </div>
      </div>

      {/* Visual Activity Chart & Validation Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 14-Day Activity Chart */}
        <div className="lg:col-span-2 bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">
                Acquisition Momentum (Last 14 Days)
              </h2>
              <p className="text-xs text-[var(--muted-foreground)]">
                Daily registrations vs trip submissions
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
                Signups
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                Trips
              </span>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-52 w-full flex items-end gap-2 pt-6 pb-2">
            {activityData.map((item) => {
              const signupHeight = Math.round((item.signups / maxVal) * 100);
              const tripHeight = Math.round((item.trips / maxVal) * 100);
              const dayLabel = item.date.slice(8); // DD

              return (
                <div key={item.date} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1 h-36">
                    {/* Signups bar */}
                    <div
                      style={{ height: `${Math.max(signupHeight, 4)}%` }}
                      className="w-1/2 max-w-[12px] bg-[var(--primary)] rounded-t-sm transition-all group-hover:opacity-80"
                      title={`${item.date}: ${item.signups} signups`}
                    />
                    {/* Trips bar */}
                    <div
                      style={{ height: `${Math.max(tripHeight, 4)}%` }}
                      className="w-1/2 max-w-[12px] bg-sky-500 rounded-t-sm transition-all group-hover:opacity-80"
                      title={`${item.date}: ${item.trips} trips`}
                    />
                  </div>
                  <span className="mt-2 text-[10px] text-[var(--muted-foreground)]">
                    {dayLabel}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="text-[11px] text-[var(--muted-foreground)] text-right pt-2 border-t border-[var(--border)]/40">
            Source: Live verified Supabase timestamps
          </div>
        </div>

        {/* Validation Funnel */}
        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[var(--foreground)]">
                Validation Funnel
              </h2>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--surface-muted)] text-[var(--muted-foreground)]">
                Conversion Rates
              </span>
            </div>

            <div className="space-y-3">
              {kpis.funnel.stages.map((stage, idx) => (
                <div key={stage.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--foreground)]">
                      {stage.label}
                    </span>
                    <span className="font-bold text-[var(--foreground)]">
                      {stage.count}
                    </span>
                  </div>
                  <div className="w-full bg-[var(--surface-muted)] rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        idx === 0
                          ? "bg-slate-300"
                          : idx === 1
                          ? "bg-[var(--primary)]"
                          : idx === 2
                          ? "bg-sky-500"
                          : idx === 3
                          ? "bg-emerald-500"
                          : "bg-purple-500"
                      }`}
                      style={{
                        width: `${Math.max(stage.conversionFromTop, 6)}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[var(--muted-foreground)]">
                    <span>
                      {idx > 0 ? `Step conv: ${stage.conversionFromPrev}%` : "Baseline"}
                    </span>
                    <span>
                      {idx > 0 ? `Overall: ${stage.conversionFromTop}%` : "100%"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--border)]/60 text-[11px] text-[var(--muted-foreground)]">
            {kpis.funnel.notes}
          </div>
        </div>
      </div>

      {/* Top Destination Density Preview */}
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-xs overflow-hidden">
        <div className="p-6 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
              <Compass className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
              <span>Market Density Leaderboard</span>
            </h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
              Destinations ranked by unique travellers and overlapping date windows.
            </p>
          </div>
          <Link
            href="/admin/destinations"
            className="text-xs font-semibold text-[var(--primary)] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View all destinations ({destinationSummaries.length})</span>
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>

        {topDestinations.length === 0 ? (
          <div className="p-8 text-center text-sm text-[var(--muted-foreground)]">
            No trip submissions recorded yet. Submissions from early-access signups will appear here automatically.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--surface-muted)] text-[var(--muted-foreground)] font-semibold border-b border-[var(--border)]">
                <tr>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4 text-center">Travellers</th>
                  <th className="py-3 px-4 text-center">Total Trips</th>
                  <th className="py-3 px-4 text-center">Overlapping Pairs</th>
                  <th className="py-3 px-4 text-center">Peak Concurrency</th>
                  <th className="py-3 px-4 text-center">Density Status</th>
                  <th className="py-3 px-4 text-center">Beta Readiness</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/60">
                {topDestinations.map((dest) => (
                  <tr key={dest.destinationId} className="hover:bg-[var(--surface-muted)]/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[var(--foreground)]">
                      <div>{dest.destinationName}</div>
                      <div className="text-[11px] font-normal text-[var(--muted-foreground)]">
                        {dest.destinationCountry}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-[var(--foreground)]">
                      {dest.uniqueTravellers}
                    </td>
                    <td className="py-3 px-4 text-center text-[var(--muted-foreground)]">
                      {dest.totalTrips}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-emerald-700">
                      {dest.overlappingPairsCount} pairs
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 font-bold text-xs border border-sky-200">
                        {dest.maxConcurrency} max
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide border ${
                        dest.densityBucket === "strong"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : dest.densityBucket === "meaningful"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : dest.densityBucket === "emerging"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : dest.densityBucket === "minimal"
                          ? "bg-orange-50 text-orange-800 border-orange-200"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}>
                        {dest.densityBucket}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                        dest.readiness === "ready"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : dest.readiness === "warming"
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}>
                        {dest.readiness.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/destinations#${dest.destinationId}`}
                        className="text-[var(--primary)] font-semibold hover:underline"
                      >
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
