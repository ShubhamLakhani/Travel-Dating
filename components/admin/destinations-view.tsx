// Project Roam : Phase 7 Destination Analytics Component
// File: components/admin/destinations-view.tsx

"use client";

import * as React from "react";
import {
  Search,
  Compass,
  ArrowUpDown,
  Calendar,
  Sparkles,
  MapPin,
  Download,
  Eye,
  X,
} from "lucide-react";
import type { DestinationDensitySummary } from "@/types/admin";

interface DestinationsViewProps {
  summaries: DestinationDensitySummary[];
  totalTripsCount: number;
}

export function DestinationsView({ summaries, totalTripsCount }: DestinationsViewProps) {
  const [search, setSearch] = React.useState("");
  const [upcomingOnly, setUpcomingOnly] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<"trips" | "users" | "density" | "upcoming">("trips");
  const [sortAsc, setSortAsc] = React.useState(false);
  const [selectedDest, setSelectedDest] = React.useState<DestinationDensitySummary | null>(null);

  const filtered = summaries.filter((d) => {
    const matchesSearch =
      d.destinationName.toLowerCase().includes(search.toLowerCase()) ||
      d.destinationCountry.toLowerCase().includes(search.toLowerCase());
    const matchesUpcoming = !upcomingOnly || d.upcomingTrips > 0;
    return matchesSearch && matchesUpcoming;
  });

  const sorted = [...filtered].sort((a, b) => {
    let diff = 0;
    if (sortBy === "trips") diff = a.totalTrips - b.totalTrips;
    else if (sortBy === "users") diff = a.uniqueTravellers - b.uniqueTravellers;
    else if (sortBy === "density") diff = a.densityPercentage - b.densityPercentage;
    else if (sortBy === "upcoming") diff = a.upcomingTrips - b.upcomingTrips;
    return sortAsc ? diff : -diff;
  });

  const toggleSort = (col: "trips" | "users" | "density" | "upcoming") => {
    if (sortBy === col) setSortAsc(!sortAsc);
    else {
      setSortBy(col);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destination or country…"
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
            <ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />
            <select
              value={sortBy}
              onChange={(e) => toggleSort(e.target.value as "trips" | "users" | "density" | "upcoming")}
              className="py-1.5 px-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] text-xs text-[var(--foreground)] font-medium outline-none cursor-pointer"
            >
              <option value="trips">Sort: Total Trips</option>
              <option value="users">Sort: Unique Users</option>
              <option value="density">Sort: Density %</option>
              <option value="upcoming">Sort: Upcoming Trips</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-xs text-[var(--foreground)] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={upcomingOnly}
              onChange={(e) => setUpcomingOnly(e.target.checked)}
              className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
            />
            <span className="font-medium">Upcoming Trips Only</span>
          </label>

          <a
            href="/api/admin/export/destinations"
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-[var(--primary)] hover:opacity-95 transition-all cursor-pointer shadow-xs"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Grid of Destination Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((dest) => {
          const tripShare = totalTripsCount > 0
            ? Math.round((dest.totalTrips / totalTripsCount) * 100)
            : 0;

          return (
            <div
              key={dest.destinationId}
              id={dest.destinationId}
              className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs hover:border-[var(--primary)]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-[var(--foreground)] flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-[var(--primary)] shrink-0" aria-hidden="true" />
                      <span>{dest.destinationName}</span>
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {dest.destinationCountry}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      dest.readiness === "ready"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : dest.readiness === "warming"
                        ? "bg-amber-100 text-amber-800 border-amber-300"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {dest.readiness}
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[var(--surface-muted)] p-2.5 rounded-xl">
                    <span className="text-[var(--muted-foreground)] text-[11px] block">Total Trips</span>
                    <strong className="text-sm text-[var(--foreground)]">{dest.totalTrips}</strong>
                    <span className="text-[10px] text-[var(--muted-foreground)] ml-1">({tripShare}% share)</span>
                  </div>
                  <div className="bg-[var(--surface-muted)] p-2.5 rounded-xl">
                    <span className="text-[var(--muted-foreground)] text-[11px] block">Unique Travellers</span>
                    <strong className="text-sm text-[var(--foreground)]">{dest.uniqueTravellers}</strong>
                  </div>
                  <div className="bg-[var(--surface-muted)] p-2.5 rounded-xl">
                    <span className="text-[var(--muted-foreground)] text-[11px] block">Upcoming / Past</span>
                    <strong className="text-xs text-[var(--foreground)]">
                      {dest.upcomingTrips} up / {dest.pastTrips} past
                    </strong>
                  </div>
                  <div className="bg-[var(--surface-muted)] p-2.5 rounded-xl">
                    <span className="text-[var(--muted-foreground)] text-[11px] block">Peak Concurrency</span>
                    <strong className="text-xs text-sky-700">{dest.maxConcurrency} simultaneous</strong>
                  </div>
                </div>

                {/* Dates & Density status */}
                <div className="mt-3 text-xs text-[var(--muted-foreground)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Overlapping Pairs:</span>
                    <strong className="text-emerald-700">{dest.overlappingPairsCount} pairs</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Date Range:</span>
                    <span className="text-[var(--foreground)] font-medium">
                      {dest.earliestArrival ? `${dest.earliestArrival} → ${dest.latestDeparture}` : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Interview Volunteers:</span>
                    <span className="text-purple-700 font-medium">{dest.interviewVolunteersCount} opted-in</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border)]/60 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-[var(--muted-foreground)]">
                  Bucket: <span className="text-[var(--foreground)]">{dest.densityBucket}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedDest(dest)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:underline cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Inspect Timeline</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {sorted.length === 0 && (
        <div className="p-12 text-center text-sm text-[var(--muted-foreground)] bg-[var(--surface)] rounded-2xl border border-[var(--border)]">
          No destinations match the criteria.
        </div>
      )}

      {/* Drilldown Modal */}
      {selectedDest && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[var(--surface)] max-w-2xl w-full p-6 rounded-2xl border border-[var(--border)] shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[var(--border)] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                  <Compass className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
                  <span>{selectedDest.destinationName}, {selectedDest.destinationCountry}</span>
                </h3>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Market Slug: {selectedDest.marketSlug} • Destination ID: {selectedDest.destinationId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDest(null)}
                className="p-1 rounded-lg hover:bg-[var(--surface-muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-[var(--surface-muted)] p-3 rounded-xl">
                <span className="text-[var(--muted-foreground)] block">Total Travellers</span>
                <strong className="text-base text-[var(--foreground)]">{selectedDest.uniqueTravellers}</strong>
              </div>
              <div className="bg-[var(--surface-muted)] p-3 rounded-xl">
                <span className="text-[var(--muted-foreground)] block">Overlapping Pairs</span>
                <strong className="text-base text-emerald-700">{selectedDest.overlappingPairsCount}</strong>
              </div>
              <div className="bg-[var(--surface-muted)] p-3 rounded-xl">
                <span className="text-[var(--muted-foreground)] block">Max Concurrency</span>
                <strong className="text-base text-sky-700">{selectedDest.maxConcurrency} simultaneous</strong>
              </div>
            </div>

            {/* Compatible Density */}
            <div className="bg-purple-50/60 border border-purple-200 p-4 rounded-xl text-xs space-y-1">
              <div className="font-bold text-purple-900 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-purple-700" aria-hidden="true" />
                <span>Compatible Density Insight</span>
              </div>
              <p className="text-purple-800">
                {selectedDest.compatibleTravellersCount} out of {selectedDest.uniqueTravellers} travellers ({selectedDest.compatibleDensityPercentage}%) have mutually compatible gender, intent, and meet preferences.
              </p>
              <p className="text-purple-700 font-medium">
                Mutually compatible pairs: {selectedDest.compatiblePairsCount} pairs
              </p>
            </div>

            {/* Overlap Windows */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] mb-2 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                <span>Upcoming Overlap Windows</span>
              </h4>
              {selectedDest.upcomingWindows.length === 0 ? (
                <p className="text-xs text-[var(--muted-foreground)] italic">
                  No upcoming multi-traveller overlap clusters found.
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedDest.upcomingWindows.map((win, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)] text-xs flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-[var(--foreground)]">
                          {win.startDate} → {win.endDate}
                        </div>
                        <div className="text-[11px] text-[var(--muted-foreground)]">
                          {win.travellersCount} travellers • {win.compatibleTravellersCount} potentially compatible
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-[var(--foreground)] border border-[var(--border)] uppercase">
                          {win.bucket}
                        </span>
                        <div className="text-[11px] text-sky-700 font-semibold mt-1">
                          {win.peakConcurrency} concurrent
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
