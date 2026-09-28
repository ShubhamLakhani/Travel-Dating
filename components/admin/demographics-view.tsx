// Project Roam — Phase 7 Demographics & Privacy-First Users Component
// File: components/admin/demographics-view.tsx

"use client";

import * as React from "react";
import { Search, ShieldCheck } from "lucide-react";
import type { DemographicInsights, AdminUserListItem } from "@/types/admin";

interface DemographicsViewProps {
  insights: DemographicInsights;
  users: AdminUserListItem[];
}

function DistributionCard({
  title,
  data,
  total,
  colorClass = "bg-[var(--primary)]",
}: {
  title: string;
  data: Record<string, number>;
  total: number;
  colorClass?: string;
}) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs space-y-3">
      <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
        {title}
      </h3>
      {entries.length === 0 ? (
        <p className="text-xs text-[var(--muted-foreground)] italic">No data recorded.</p>
      ) : (
        <div className="space-y-2">
          {entries.map(([label, count]) => {
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[var(--foreground)] capitalize">
                    {label.replace(/_/g, " ")}
                  </span>
                  <span className="text-[var(--muted-foreground)]">
                    {count} ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-[var(--surface-muted)] rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${colorClass}`}
                    style={{ width: `${Math.max(pct, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function DemographicsView({ insights, users }: DemographicsViewProps) {
  const [search, setSearch] = React.useState("");
  const [volunteerFilter, setVolunteerFilter] = React.useState<"all" | "volunteers" | "non-volunteers">("all");

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.homeCountry.toLowerCase().includes(search.toLowerCase()) ||
      u.ageBand.toLowerCase().includes(search.toLowerCase()) ||
      u.gender.toLowerCase().includes(search.toLowerCase()) ||
      u.maskedId.toLowerCase().includes(search.toLowerCase());

    const matchesVolunteer =
      volunteerFilter === "all" ||
      (volunteerFilter === "volunteers" && u.isInterviewVolunteer) ||
      (volunteerFilter === "non-volunteers" && !u.isInterviewVolunteer);

    return matchesSearch && matchesVolunteer;
  });

  return (
    <div className="space-y-8">
      {/* Privacy Notice Banner */}
      <div className="bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] flex items-start gap-3 text-xs text-[var(--muted-foreground)]">
        <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <strong className="text-[var(--foreground)] block">Data Minimization Active</strong>
          Overview tables use masked identifiers and broad categorical bands. PII is minimized in research views and emails are only accessible in the dedicated interview research outreach view.
        </div>
      </div>

      {/* Aggregate Distributions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DistributionCard
          title="Age Bands"
          data={insights.ageBands}
          total={insights.totalUsers}
          colorClass="bg-sky-500"
        />
        <DistributionCard
          title="Gender Identification"
          data={insights.genderDistribution}
          total={insights.totalUsers}
          colorClass="bg-[var(--primary)]"
        />
        <DistributionCard
          title="Interested In"
          data={insights.interestedInDistribution}
          total={insights.totalUsers}
          colorClass="bg-purple-500"
        />
        <DistributionCard
          title="Meet Preference"
          data={insights.meetPreferenceDistribution}
          total={insights.totalUsers}
          colorClass="bg-emerald-500"
        />
        <DistributionCard
          title="Relationship Intentions"
          data={insights.relationshipIntentions}
          total={insights.totalUsers}
          colorClass="bg-rose-500"
        />
        <DistributionCard
          title="Travel Frequency"
          data={insights.travelFrequency}
          total={insights.totalUsers}
          colorClass="bg-amber-500"
        />
        <DistributionCard
          title="Top Travel Interests"
          data={insights.travelInterests}
          total={insights.totalUsers}
          colorClass="bg-indigo-500"
        />
        <DistributionCard
          title="Trip Travel Modes"
          data={insights.travelModeDistribution}
          total={insights.totalUsers}
          colorClass="bg-teal-500"
        />
      </div>

      {/* User Validation List */}
      <div className="space-y-4">
        <div className="bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by country, age band, or gender…"
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={volunteerFilter}
              onChange={(e) => setVolunteerFilter(e.target.value as "all" | "volunteers" | "non-volunteers")}
              className="py-1.5 px-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] text-xs text-[var(--foreground)] font-medium outline-none cursor-pointer"
            >
              <option value="all">All Registered Users</option>
              <option value="volunteers">Interview Volunteers Only</option>
              <option value="non-volunteers">Non-Volunteers Only</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-xs overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-sm text-[var(--muted-foreground)]">
              No registered user records match criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--surface-muted)] text-[var(--muted-foreground)] font-semibold border-b border-[var(--border)]">
                  <tr>
                    <th className="py-3 px-4">Masked ID</th>
                    <th className="py-3 px-4">Origin Country</th>
                    <th className="py-3 px-4 text-center">Age Band</th>
                    <th className="py-3 px-4 text-center">Gender / Seeking</th>
                    <th className="py-3 px-4">Meet Preference</th>
                    <th className="py-3 px-4">Intentions</th>
                    <th className="py-3 px-4 text-center">Trips</th>
                    <th className="py-3 px-4 text-center">Interview</th>
                    <th className="py-3 px-4 text-right">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]/60">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-[var(--surface-muted)]/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-[var(--foreground)]">
                        {u.maskedId}
                      </td>
                      <td className="py-3 px-4 text-[var(--foreground)] font-medium">
                        {u.homeCountry}
                      </td>
                      <td className="py-3 px-4 text-center text-[var(--foreground)]">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--surface-muted)] border border-[var(--border)]">
                          {u.ageBand}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-[var(--muted-foreground)]">
                        <span className="capitalize">{u.gender}</span> → <span className="capitalize">{u.interestedIn}</span>
                      </td>
                      <td className="py-3 px-4 capitalize text-[var(--foreground)]">
                        {u.meetPreference}
                      </td>
                      <td className="py-3 px-4 text-[var(--muted-foreground)]">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {u.intentions.map((int) => (
                            <span
                              key={int}
                              className="px-1.5 py-0.2 rounded text-[10px] bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)] capitalize"
                            >
                              {int.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-[var(--foreground)]">
                        {u.tripCount}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {u.isInterviewVolunteer ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                            Opted In
                          </span>
                        ) : (
                          <span className="text-[var(--muted-foreground)]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right text-[var(--muted-foreground)]">
                        {u.createdAt.slice(0, 10)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
