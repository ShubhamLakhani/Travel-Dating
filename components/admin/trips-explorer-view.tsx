// Project Roam : Phase 7 Trips Explorer Component
// File: components/admin/trips-explorer-view.tsx

"use client";

import * as React from "react";
import { Search, Calendar, Download } from "lucide-react";
import type { TravelMonthSummary, TripEntity } from "@/types/admin";
import { calculateTripNights, isPastDate } from "@/lib/validation/trip-dates";

interface TripsExplorerViewProps {
  months: TravelMonthSummary[];
  trips: TripEntity[];
}

export function TripsExplorerView({ months, trips }: TripsExplorerViewProps) {
  const [search, setSearch] = React.useState("");
  const [monthFilter, setMonthFilter] = React.useState<string>("all");
  const [timeFilter, setTimeFilter] = React.useState<"all" | "upcoming" | "past">("all");

  const filteredTrips = trips.filter((t) => {
    const matchesSearch =
      t.destinationName.toLowerCase().includes(search.toLowerCase()) ||
      t.destinationCountry.toLowerCase().includes(search.toLowerCase()) ||
      t.travelMode.toLowerCase().includes(search.toLowerCase());

    const tripMonth = t.arrivalDate.slice(0, 7);
    const matchesMonth = monthFilter === "all" || tripMonth === monthFilter;

    const inPast = isPastDate(t.departureDate);
    const matchesTime =
      timeFilter === "all" ||
      (timeFilter === "upcoming" && !inPast) ||
      (timeFilter === "past" && inPast);

    return matchesSearch && matchesMonth && matchesTime;
  });

  return (
    <div className="space-y-8">
      {/* Travel Month Aggregation Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
            <span>Travel Month Analytics</span>
          </h2>
          <span className="text-xs text-[var(--muted-foreground)]">
            Temporal demand across future travel periods
          </span>
        </div>

        {months.length === 0 ? (
          <div className="p-6 bg-[var(--surface)] rounded-2xl border border-[var(--border)] text-center text-xs text-[var(--muted-foreground)]">
            No travel months recorded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {months.map((m) => (
              <div
                key={m.monthKey}
                className="bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[var(--foreground)]">
                    {m.monthLabel}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
                    {m.destinationsCount} markets
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-[var(--surface-muted)] p-2 rounded-xl text-center">
                    <span className="text-[10px] text-[var(--muted-foreground)] block">Trips</span>
                    <strong className="text-xs text-[var(--foreground)]">{m.totalTrips}</strong>
                  </div>
                  <div className="bg-[var(--surface-muted)] p-2 rounded-xl text-center">
                    <span className="text-[10px] text-[var(--muted-foreground)] block">Users</span>
                    <strong className="text-xs text-[var(--foreground)]">{m.uniqueTravellers}</strong>
                  </div>
                  <div className="bg-[var(--surface-muted)] p-2 rounded-xl text-center">
                    <span className="text-[10px] text-[var(--muted-foreground)] block">Peak</span>
                    <strong className="text-xs text-sky-700">{m.maxConcurrency} max</strong>
                  </div>
                </div>

                {m.topDestinations.length > 0 && (
                  <div className="pt-2 border-t border-[var(--border)]/60 text-xs">
                    <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] block mb-1">
                      Top Destinations:
                    </span>
                    <div className="space-y-1">
                      {m.topDestinations.map((d) => (
                        <div key={d.name} className="flex items-center justify-between text-[11px]">
                          <span className="text-[var(--foreground)] font-medium truncate max-w-[140px]">
                            {d.name}
                          </span>
                          <span className="text-[var(--muted-foreground)]">
                            {d.trips} trips ({d.uniqueTravellers} users)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Trips Table */}
      <div className="space-y-4">
        {/* Controls Bar */}
        <div className="bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destination, country, or travel mode…"
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Month Filter */}
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="py-1.5 px-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] text-xs text-[var(--foreground)] font-medium outline-none cursor-pointer"
            >
              <option value="all">All Months</option>
              {months.map((m) => (
                <option key={m.monthKey} value={m.monthKey}>
                  {m.monthLabel}
                </option>
              ))}
            </select>

            {/* Time Filter */}
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as "all" | "upcoming" | "past")}
              className="py-1.5 px-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] text-xs text-[var(--foreground)] font-medium outline-none cursor-pointer"
            >
              <option value="all">Upcoming &amp; Past</option>
              <option value="upcoming">Upcoming Only</option>
              <option value="past">Past Trips Only</option>
            </select>

            <a
              href="/api/admin/export/trips"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-[var(--primary)] hover:opacity-95 transition-all cursor-pointer shadow-xs"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Export Trips CSV</span>
            </a>
          </div>
        </div>

        {/* Trips Table */}
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-xs overflow-hidden">
          {filteredTrips.length === 0 ? (
            <div className="p-12 text-center text-sm text-[var(--muted-foreground)]">
              No trips found matching the criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--surface-muted)] text-[var(--muted-foreground)] font-semibold border-b border-[var(--border)]">
                  <tr>
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4">Arrival Date</th>
                    <th className="py-3 px-4">Departure Date</th>
                    <th className="py-3 px-4 text-center">Nights</th>
                    <th className="py-3 px-4 text-center">Travel Mode</th>
                    <th className="py-3 px-4 text-center">Timing Status</th>
                    <th className="py-3 px-4 text-right">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]/60">
                  {filteredTrips.map((t) => {
                    const nights = calculateTripNights(t.arrivalDate, t.departureDate);
                    const past = isPastDate(t.departureDate);

                    return (
                      <tr key={t.id} className="hover:bg-[var(--surface-muted)]/40 transition-colors">
                        <td className="py-3 px-4 font-semibold text-[var(--foreground)]">
                          <div>{t.destinationName}</div>
                          <div className="text-[11px] font-normal text-[var(--muted-foreground)]">
                            {t.destinationCountry}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-[var(--foreground)]">
                          {t.arrivalDate}
                        </td>
                        <td className="py-3 px-4 font-medium text-[var(--foreground)]">
                          {t.departureDate}
                        </td>
                        <td className="py-3 px-4 text-center text-[var(--foreground)]">
                          {nights} {nights === 1 ? "night" : "nights"}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)]">
                            {t.travelMode}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              past
                                ? "bg-slate-100 text-slate-600 border-slate-200"
                                : "bg-emerald-50 text-emerald-800 border-emerald-200"
                            }`}
                          >
                            {past ? "Past" : "Upcoming"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-[var(--muted-foreground)]">
                          {t.createdAt.slice(0, 10)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
