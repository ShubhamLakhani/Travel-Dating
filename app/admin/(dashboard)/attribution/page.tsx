// Project Roam — Phase 8 Attribution Analytics Dashboard
// File: app/admin/(dashboard)/attribution/page.tsx

import { TrendingUp, Globe, Target, Layers, ArrowUpRight } from "lucide-react";
import { getAdminAttributionData } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Traffic Attribution | Project Roam Admin",
  description: "Acquisition source, campaign, and referrer analytics for validation traffic.",
};

export default async function AdminAttributionPage() {
  const data = await getAdminAttributionData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Traffic Attribution & Acquisition
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Phase 8 Live
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Real-world validation campaign attribution captured via UTM parameters and document referrers.
        </p>
      </div>

      {/* Aggregate KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] uppercase font-semibold">
            <span>Total Submissions</span>
            <Layers className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[var(--foreground)]">
            {data.totalSubmissions}
          </div>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            Durable early-access entries
          </p>
        </div>

        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] uppercase font-semibold">
            <span>Attributed Traffic</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[var(--foreground)]">
            {data.attributedSubmissions}
          </div>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            {data.totalSubmissions > 0
              ? `${Math.round((data.attributedSubmissions / data.totalSubmissions) * 100)}% with source/campaign`
              : "Awaiting incoming traffic"}
          </p>
        </div>

        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] uppercase font-semibold">
            <span>Direct / Organic</span>
            <Globe className="h-4 w-4 text-sky-600" aria-hidden="true" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[var(--foreground)]">
            {data.directSubmissions}
          </div>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            Unattributed or direct navigations
          </p>
        </div>

        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] uppercase font-semibold">
            <span>Active Channels</span>
            <Target className="h-4 w-4 text-purple-600" aria-hidden="true" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[var(--foreground)]">
            {data.channels.length}
          </div>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            Unique source / medium pairs
          </p>
        </div>
      </div>

      {/* Breakdown Grids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Sources */}
        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)] mb-4">
            Top Sources
          </h2>
          {data.topSources.length === 0 ? (
            <p className="text-xs text-[var(--muted-foreground)] py-6 text-center">
              No traffic sources recorded yet.
            </p>
          ) : (
            <div className="space-y-3">
              {data.topSources.map((item) => (
                <div key={item.source} className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--foreground)] capitalize">
                    {item.source}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--muted-foreground)]">{item.count}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[var(--surface-muted)] text-[10px] font-bold text-[var(--foreground)]">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Mediums */}
        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)] mb-4">
            Top Mediums
          </h2>
          {data.topMediums.length === 0 ? (
            <p className="text-xs text-[var(--muted-foreground)] py-6 text-center">
              No mediums recorded yet.
            </p>
          ) : (
            <div className="space-y-3">
              {data.topMediums.map((item) => (
                <div key={item.medium} className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--foreground)] capitalize">
                    {item.medium}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--muted-foreground)]">{item.count}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[var(--surface-muted)] text-[10px] font-bold text-[var(--foreground)]">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Campaigns */}
        <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)] mb-4">
            Top Campaigns
          </h2>
          {data.topCampaigns.length === 0 ? (
            <p className="text-xs text-[var(--muted-foreground)] py-6 text-center">
              No campaigns recorded yet.
            </p>
          ) : (
            <div className="space-y-3">
              {data.topCampaigns.map((item) => (
                <div key={item.campaign} className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--foreground)]">
                    {item.campaign}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--muted-foreground)]">{item.count}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[var(--surface-muted)] text-[10px] font-bold text-[var(--foreground)]">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Full Attribution Channels Table */}
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[var(--foreground)]">
              Acquisition Channels Breakdown
            </h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
              Performance by campaign parameters and referrers
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--muted-foreground)]">
            {data.channels.length} {data.channels.length === 1 ? "channel" : "channels"}
          </span>
        </div>

        {data.channels.length === 0 ? (
          <div className="p-8 text-center text-xs text-[var(--muted-foreground)]">
            No attribution channels active yet. Launch UTM links like <code className="bg-[var(--surface-muted)] px-1.5 py-0.5 rounded font-mono">?utm_source=instagram&amp;utm_medium=social</code> to begin tracking.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--surface-muted)] border-b border-[var(--border)] text-[var(--muted-foreground)] uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Medium</th>
                  <th className="px-4 py-3">Campaign</th>
                  <th className="px-4 py-3 text-right">Submissions</th>
                  <th className="px-4 py-3 text-right">Trips</th>
                  <th className="px-4 py-3 text-right">Interviews</th>
                  <th className="px-4 py-3 text-right">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {data.channels.map((c, idx) => (
                  <tr key={`${c.source}-${c.medium}-${c.campaign}-${idx}`} className="hover:bg-[var(--surface-muted)]/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-[var(--foreground)] capitalize">
                      {c.source}
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">
                      {c.medium}
                    </td>
                    <td className="px-4 py-3 font-mono text-[var(--muted-foreground)]">
                      {c.campaign}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-[var(--foreground)]">
                      {c.submissionsCount}
                    </td>
                    <td className="px-4 py-3 text-right text-[var(--foreground)]">
                      {c.tripsCount}
                    </td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-semibold">
                      {c.interviewOptInsCount}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 font-bold text-[var(--primary)]">
                        {c.conversionRate}%
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </span>
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
