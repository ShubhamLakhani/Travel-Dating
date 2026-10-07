// Project Roam : Phase 7 Interview Volunteers Pipeline Component
// File: components/admin/interviews-view.tsx

"use client";

import * as React from "react";
import {
  Search,
  Download,
  Copy,
  Check,
  MapPin,
} from "lucide-react";
import type { InterviewVolunteerItem, InterviewStatus } from "@/types/admin";

interface InterviewsViewProps {
  initialVolunteers: InterviewVolunteerItem[];
}

const STATUS_CONFIG: Record<
  InterviewStatus,
  { label: string; colorClass: string; bgClass: string }
> = {
  opted_in: {
    label: "Opted In",
    colorClass: "text-purple-800",
    bgClass: "bg-purple-100 border-purple-200",
  },
  contacted: {
    label: "Contacted",
    colorClass: "text-sky-800",
    bgClass: "bg-sky-100 border-sky-200",
  },
  scheduled: {
    label: "Scheduled",
    colorClass: "text-amber-800",
    bgClass: "bg-amber-100 border-amber-200",
  },
  completed: {
    label: "Completed",
    colorClass: "text-emerald-800",
    bgClass: "bg-emerald-100 border-emerald-200",
  },
  declined: {
    label: "Declined",
    colorClass: "text-slate-600",
    bgClass: "bg-slate-100 border-slate-200",
  },
};

export function InterviewsView({ initialVolunteers }: InterviewsViewProps) {
  const [volunteers, setVolunteers] = React.useState<InterviewVolunteerItem[]>(initialVolunteers);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = React.useState<string | null>(null);

  // Status counts
  const counts = {
    total: volunteers.length,
    opted_in: volunteers.filter((v) => v.status === "opted_in").length,
    contacted: volunteers.filter((v) => v.status === "contacted").length,
    scheduled: volunteers.filter((v) => v.status === "scheduled").length,
    completed: volunteers.filter((v) => v.status === "completed").length,
    declined: volunteers.filter((v) => v.status === "declined").length,
  };

  const filtered = volunteers.filter((v) => {
    const matchesSearch =
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      v.destinations.some((d) => d.toLowerCase().includes(search.toLowerCase())) ||
      v.homeCountry.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || v.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (optInId: string, newStatus: InterviewStatus) => {
    setUpdatingId(optInId);

    // Optimistic update
    const previous = [...volunteers];
    setVolunteers((prev) =>
      prev.map((v) => (v.id === optInId ? { ...v, status: newStatus } : v))
    );

    try {
      const res = await fetch("/api/admin/interviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optInId, status: newStatus }),
      });

      if (!res.ok) {
        // Rollback
        setVolunteers(previous);
        alert("Failed to update status. Please try again.");
      }
    } catch {
      setVolunteers(previous);
      alert("Network error updating status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Status Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          type="button"
          onClick={() => setStatusFilter("all")}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === "all"
              ? "bg-[var(--surface)] border-[var(--primary)] ring-2 ring-[var(--primary)]/20"
              : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border)]"
          }`}
        >
          <span className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] block">All Volunteers</span>
          <strong className="text-xl font-extrabold text-[var(--foreground)]">{counts.total}</strong>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("opted_in")}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === "opted_in"
              ? "bg-purple-50 border-purple-400 ring-2 ring-purple-200"
              : "bg-[var(--surface)] border-[var(--border)]"
          }`}
        >
          <span className="text-[10px] font-bold uppercase text-purple-700 block">Opted In</span>
          <strong className="text-xl font-extrabold text-purple-900">{counts.opted_in}</strong>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("contacted")}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === "contacted"
              ? "bg-sky-50 border-sky-400 ring-2 ring-sky-200"
              : "bg-[var(--surface)] border-[var(--border)]"
          }`}
        >
          <span className="text-[10px] font-bold uppercase text-sky-700 block">Contacted</span>
          <strong className="text-xl font-extrabold text-sky-900">{counts.contacted}</strong>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("scheduled")}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === "scheduled"
              ? "bg-amber-50 border-amber-400 ring-2 ring-amber-200"
              : "bg-[var(--surface)] border-[var(--border)]"
          }`}
        >
          <span className="text-[10px] font-bold uppercase text-amber-700 block">Scheduled</span>
          <strong className="text-xl font-extrabold text-amber-900">{counts.scheduled}</strong>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("completed")}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === "completed"
              ? "bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200"
              : "bg-[var(--surface)] border-[var(--border)]"
          }`}
        >
          <span className="text-[10px] font-bold uppercase text-emerald-700 block">Completed</span>
          <strong className="text-xl font-extrabold text-emerald-900">{counts.completed}</strong>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("declined")}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === "declined"
              ? "bg-slate-100 border-slate-400 ring-2 ring-slate-200"
              : "bg-[var(--surface)] border-[var(--border)]"
          }`}
        >
          <span className="text-[10px] font-bold uppercase text-slate-600 block">Declined</span>
          <strong className="text-xl font-extrabold text-slate-800">{counts.declined}</strong>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search email, country, or destination…"
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/admin/export/interviews"
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-[var(--primary)] hover:opacity-95 transition-all cursor-pointer shadow-xs"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Export Volunteers CSV</span>
          </a>
        </div>
      </div>

      {/* Volunteers Table */}
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-sm text-[var(--muted-foreground)]">
            No interview volunteers match the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--surface-muted)] text-[var(--muted-foreground)] font-semibold border-b border-[var(--border)]">
                <tr>
                  <th className="py-3 px-4">Contact Email</th>
                  <th className="py-3 px-4">Profile Context</th>
                  <th className="py-3 px-4">Destinations &amp; Dates</th>
                  <th className="py-3 px-4 text-center">Pipeline Status</th>
                  <th className="py-3 px-4 text-right">Opted In</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/60">
                {filtered.map((v) => {
                  const cfg = STATUS_CONFIG[v.status] || STATUS_CONFIG.opted_in;

                  return (
                    <tr key={v.id} className="hover:bg-[var(--surface-muted)]/40 transition-colors">
                      {/* Email & Actions */}
                      <td className="py-3.5 px-4 font-medium text-[var(--foreground)]">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{v.email}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(v.email)}
                            className="p-1 rounded hover:bg-[var(--surface-muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
                            title="Copy email address"
                          >
                            {copiedEmail === v.email ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            )}
                          </button>
                        </div>
                        <div className="text-[10px] text-[var(--muted-foreground)] font-mono mt-0.5">
                          ID: {v.maskedUserId}
                        </div>
                      </td>

                      {/* Profile Context */}
                      <td className="py-3.5 px-4 text-[var(--foreground)]">
                        <div>
                          {v.homeCountry} • {v.ageBand}
                        </div>
                        <div className="text-[11px] text-[var(--muted-foreground)] capitalize mt-0.5">
                          Gender: {v.gender}
                        </div>
                      </td>

                      {/* Upcoming Trips */}
                      <td className="py-3.5 px-4 text-[var(--foreground)]">
                        {v.upcomingTrips.length === 0 ? (
                          <span className="text-[var(--muted-foreground)] italic">No trips submitted</span>
                        ) : (
                          <div className="space-y-1">
                            {v.upcomingTrips.map((t, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[11px]">
                                <MapPin className="h-3 w-3 text-[var(--primary)] shrink-0" aria-hidden="true" />
                                <span className="font-semibold">{t.destinationName}</span>
                                <span className="text-[var(--muted-foreground)]">
                                  ({t.arrivalDate} → {t.departureDate})
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>

                      {/* Status Selector */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          <select
                            value={v.status}
                            disabled={updatingId === v.id}
                            onChange={(e) =>
                              handleStatusChange(v.id, e.target.value as InterviewStatus)
                            }
                            className={`py-1 px-2.5 rounded-xl text-xs font-bold border outline-none cursor-pointer transition-all ${cfg.bgClass} ${cfg.colorClass}`}
                          >
                            <option value="opted_in">Opted In</option>
                            <option value="contacted">Contacted</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="declined">Declined</option>
                          </select>
                        </div>
                      </td>

                      {/* Created At */}
                      <td className="py-3.5 px-4 text-right text-[var(--muted-foreground)]">
                        {v.createdAt.slice(0, 10)}
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
  );
}
