// Project Roam : Phase 7 Interactive Density Table Component
// File: components/admin/density-table.tsx

"use client";

import * as React from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  Download,
  Calendar,
  Info,
} from "lucide-react";
import type { DestinationDensitySummary } from "@/types/admin";

interface DensityTableProps {
  summaries: DestinationDensitySummary[];
}

export function DensityTable({ summaries }: DensityTableProps) {
  const [search, setSearch] = React.useState("");
  const [readinessFilter, setReadinessFilter] = React.useState<string>("all");
  const [bucketFilter, setBucketFilter] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<"travellers" | "concurrency" | "pairs" | "density">("concurrency");
  const [sortAsc, setSortAsc] = React.useState(false);
  const [expandedDestId, setExpandedDestId] = React.useState<string | null>(null);
  const [showFormulaModal, setShowFormulaModal] = React.useState(false);

  // Filter logic
  const filtered = summaries.filter((item) => {
    const matchesSearch =
      item.destinationName.toLowerCase().includes(search.toLowerCase()) ||
      item.destinationCountry.toLowerCase().includes(search.toLowerCase());

    const matchesReadiness =
      readinessFilter === "all" || item.readiness === readinessFilter;

    const matchesBucket =
      bucketFilter === "all" || item.densityBucket === bucketFilter;

    return matchesSearch && matchesReadiness && matchesBucket;
  });

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    let diff = 0;
    if (sortBy === "travellers") {
      diff = a.uniqueTravellers - b.uniqueTravellers;
    } else if (sortBy === "concurrency") {
      diff = a.maxConcurrency - b.maxConcurrency;
    } else if (sortBy === "pairs") {
      diff = a.overlappingPairsCount - b.overlappingPairsCount;
    } else if (sortBy === "density") {
      diff = a.densityPercentage - b.densityPercentage;
    }
    return sortAsc ? diff : -diff;
  });

  const toggleSort = (column: "travellers" | "concurrency" | "pairs" | "density") => {
    if (sortBy === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(column);
      setSortAsc(false);
    }
  };

  const toggleExpand = (destId: string) => {
    setExpandedDestId(expandedDestId === destId ? null : destId);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
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

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Readiness Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
            <Filter className="h-3.5 w-3.5" aria-hidden="true" />
            <select
              value={readinessFilter}
              onChange={(e) => setReadinessFilter(e.target.value)}
              className="py-1.5 px-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] text-xs text-[var(--foreground)] font-medium outline-none cursor-pointer"
            >
              <option value="all">All Readiness</option>
              <option value="ready">Beta Ready (5+ concurrent)</option>
              <option value="warming">Warming (2–4 concurrent)</option>
              <option value="cold">Cold (0–1 concurrent)</option>
            </select>
          </div>

          {/* Density Bucket Filter */}
          <select
            value={bucketFilter}
            onChange={(e) => setBucketFilter(e.target.value)}
            className="py-1.5 px-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] text-xs text-[var(--foreground)] font-medium outline-none cursor-pointer"
          >
            <option value="all">All Buckets</option>
            <option value="strong">Strong (10+)</option>
            <option value="meaningful">Meaningful (6–10)</option>
            <option value="emerging">Emerging (3–5)</option>
            <option value="minimal">Minimal (2)</option>
            <option value="isolated">Isolated (1)</option>
            <option value="none">None (0)</option>
          </select>

          {/* Formula Info Button */}
          <button
            type="button"
            onClick={() => setShowFormulaModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[var(--foreground)] bg-[var(--surface-muted)] hover:bg-[var(--border)] border border-[var(--border)] transition-colors cursor-pointer"
          >
            <Info className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
            <span>Formulas & Logic</span>
          </button>

          {/* CSV Export */}
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

      {/* Table */}
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-xs overflow-hidden">
        {sorted.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--muted-foreground)]">
            No destinations found matching current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--surface-muted)] text-[var(--muted-foreground)] font-semibold border-b border-[var(--border)]">
                <tr>
                  <th className="py-3 px-4 w-8"></th>
                  <th className="py-3 px-4">Destination</th>
                  <th
                    className="py-3 px-4 text-center cursor-pointer hover:text-[var(--foreground)]"
                    onClick={() => toggleSort("travellers")}
                  >
                    <div className="inline-flex items-center gap-1">
                      <span>Unique Users</span>
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 text-center cursor-pointer hover:text-[var(--foreground)]"
                    onClick={() => toggleSort("concurrency")}
                  >
                    <div className="inline-flex items-center gap-1">
                      <span>Peak Concurrency</span>
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 text-center cursor-pointer hover:text-[var(--foreground)]"
                    onClick={() => toggleSort("pairs")}
                  >
                    <div className="inline-flex items-center gap-1">
                      <span>Overlapping Pairs</span>
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 text-center cursor-pointer hover:text-[var(--foreground)]"
                    onClick={() => toggleSort("density")}
                  >
                    <div className="inline-flex items-center gap-1">
                      <span>Density %</span>
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center">Compatible Density</th>
                  <th className="py-3 px-4 text-center">Density Bucket</th>
                  <th className="py-3 px-4 text-center">Beta Readiness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/60">
                {sorted.map((dest) => {
                  const isExpanded = expandedDestId === dest.destinationId;

                  return (
                    <React.Fragment key={dest.destinationId}>
                      <tr
                        onClick={() => toggleExpand(dest.destinationId)}
                        className={`hover:bg-[var(--surface-muted)]/50 transition-colors cursor-pointer ${
                          isExpanded ? "bg-[var(--surface-muted)]/30" : ""
                        }`}
                      >
                        <td className="py-3 px-4 text-[var(--muted-foreground)]">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <ChevronRight className="h-4 w-4" aria-hidden="true" />
                          )}
                        </td>
                        <td className="py-3 px-4 font-semibold text-[var(--foreground)]">
                          <div className="flex items-center gap-2">
                            <span>{dest.destinationName}</span>
                            <span className="text-[11px] font-normal text-[var(--muted-foreground)]">
                              ({dest.destinationCountry})
                            </span>
                          </div>
                          <div className="text-[10px] text-[var(--muted-foreground)] mt-0.5">
                            {dest.totalTrips} trips • {dest.upcomingTrips} upcoming
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-[var(--foreground)]">
                          {dest.uniqueTravellers}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 font-extrabold text-xs border border-sky-300">
                            {dest.maxConcurrency} max
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-medium text-emerald-800">
                          {dest.overlappingPairsCount} pairs
                        </td>
                        <td className="py-3 px-4 text-center font-medium">
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-[var(--foreground)]">
                              {dest.densityPercentage}%
                            </span>
                            <span className="text-[10px] text-[var(--muted-foreground)]">
                              {dest.travellersWithOverlap}/{dest.uniqueTravellers} overlap
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-semibold text-purple-700">
                              {dest.compatibleTravellersCount} users ({dest.compatibleDensityPercentage}%)
                            </span>
                            <span className="text-[10px] text-[var(--muted-foreground)]">
                              {dest.compatiblePairsCount} compatible pairs
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              dest.densityBucket === "strong"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                : dest.densityBucket === "meaningful"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : dest.densityBucket === "emerging"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : dest.densityBucket === "minimal"
                                ? "bg-orange-50 text-orange-800 border-orange-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            {dest.densityBucket}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              dest.readiness === "ready"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                : dest.readiness === "warming"
                                ? "bg-amber-100 text-amber-800 border-amber-300"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                          >
                            {dest.readiness}
                          </span>
                        </td>
                      </tr>

                      {/* Expandable Drilldown Panel */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={9} className="bg-[var(--surface-muted)]/60 px-6 py-4 border-y border-[var(--border)]">
                            <div className="space-y-4">
                              {/* Destination Summary Stats */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                <div className="bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)]">
                                  <div className="text-[var(--muted-foreground)]">Travel Range</div>
                                  <div className="font-semibold text-[var(--foreground)] mt-0.5">
                                    {dest.earliestArrival || "N/A"} to {dest.latestDeparture || "N/A"}
                                  </div>
                                </div>
                                <div className="bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)]">
                                  <div className="text-[var(--muted-foreground)]">Interview Volunteers</div>
                                  <div className="font-semibold text-purple-700 mt-0.5">
                                    {dest.interviewVolunteersCount} candidates for qualitative calls
                                  </div>
                                </div>
                                <div className="bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)]">
                                  <div className="text-[var(--muted-foreground)]">Windows With 2+ Travellers</div>
                                  <div className="font-semibold text-[var(--foreground)] mt-0.5">
                                    {dest.windowsWith2Plus} upcoming clusters
                                  </div>
                                </div>
                                <div className="bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)]">
                                  <div className="text-[var(--muted-foreground)]">Windows With 5+ Travellers</div>
                                  <div className="font-semibold text-[var(--foreground)] mt-0.5">
                                    {dest.windowsWith5Plus} launch-ready clusters
                                  </div>
                                </div>
                              </div>

                              {/* Overlapping Density Windows */}
                              <div>
                                <h4 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                  <Calendar className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
                                  <span>Upcoming Density Overlap Windows</span>
                                </h4>

                                {dest.upcomingWindows.length === 0 ? (
                                  <p className="text-xs text-[var(--muted-foreground)] italic">
                                    No upcoming multi-traveller overlap windows detected yet. Travellers currently have non-overlapping dates.
                                  </p>
                                ) : (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {dest.upcomingWindows.map((win, idx) => (
                                      <div
                                        key={idx}
                                        className="bg-[var(--surface)] p-3.5 rounded-xl border border-[var(--border)] text-xs space-y-1.5"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="font-bold text-[var(--foreground)]">
                                            {win.startDate} → {win.endDate}
                                          </span>
                                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--surface-muted)] uppercase border border-[var(--border)]">
                                            {win.bucket}
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
                                          <span>Total Travellers:</span>
                                          <strong className="text-[var(--foreground)]">{win.travellersCount}</strong>
                                        </div>
                                        <div className="flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
                                          <span>Potential Compatible:</span>
                                          <strong className="text-purple-700">{win.compatibleTravellersCount}</strong>
                                        </div>
                                        <div className="flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
                                          <span>Peak Concurrency:</span>
                                          <strong className="text-sky-700">{win.peakConcurrency} simultaneous</strong>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Formula & Definitions Modal */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[var(--surface)] max-w-xl w-full p-6 rounded-2xl border border-[var(--border)] shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h3 className="text-base font-bold text-[var(--foreground)]">
                Trip Density & Concurrency Formulas
              </h3>
              <button
                type="button"
                onClick={() => setShowFormulaModal(false)}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[var(--surface-muted)] hover:bg-[var(--border)] cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-[var(--muted-foreground)] leading-relaxed">
              <div>
                <strong className="text-[var(--foreground)]">1. Date Overlap Condition:</strong>
                <p className="font-mono bg-[var(--surface-muted)] p-2 rounded-lg mt-1 text-[11px] text-[var(--foreground)]">
                  tripA.arrivalDate &lt;= tripB.departureDate &amp;&amp; tripB.arrivalDate &lt;= tripA.departureDate
                </p>
                <p className="mt-1">
                  Users are never compared against themselves. Multiple trips by the same user are merged into non-overlapping intervals before concurrency evaluation.
                </p>
              </div>

              <div>
                <strong className="text-[var(--foreground)]">2. Maximum Simultaneous Travellers (Sweep-Line):</strong>
                <p className="mt-1">
                  Arrival adds +1 at start of day. Departure subtracts -1 at next calendar day (midnight). The maximum active counter during the timeline equals true concurrency.
                </p>
              </div>

              <div>
                <strong className="text-[var(--foreground)]">3. Density Percentage:</strong>
                <p className="font-mono bg-[var(--surface-muted)] p-2 rounded-lg mt-1 text-[11px] text-[var(--foreground)]">
                  (travellersWithOverlap / uniqueTravellers) * 100
                </p>
              </div>

              <div>
                <strong className="text-[var(--foreground)]">4. Potential Compatible Density:</strong>
                <p className="mt-1">
                  Conservative filter requiring overlap AND mutual compatibility across:
                  <br />• Gender / interested-in preference symmetry
                  <br />• Meet preference (travelers, locals, or both)
                  <br />• Overlapping relationship intentions (dating, friends, travel buddy)
                </p>
              </div>

              <div>
                <strong className="text-[var(--foreground)]">5. Closed-Beta Readiness Thresholds:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-0.5">
                  <li><strong>READY:</strong> Concurrency &gt;= 5 OR (Concurrency &gt;= 3 with 5+ unique travellers).</li>
                  <li><strong>WARMING:</strong> Concurrency &gt;= 2 with at least 1 overlapping pair.</li>
                  <li><strong>COLD:</strong> 0 or 1 traveller; isolated or non-overlapping.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
