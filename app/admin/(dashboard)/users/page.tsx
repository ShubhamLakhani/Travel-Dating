// Project Roam : Phase 7 Demographics & Users Page
// File: app/admin/(dashboard)/users/page.tsx

import { getDemographicsAndUsersData } from "@/lib/admin/queries";
import { DemographicsView } from "@/components/admin/demographics-view";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Demographics & User Profiles | Triply Admin",
  description: "Aggregated user demographics, travel intentions, and privacy-first validation records.",
};

export default async function AdminUsersPage() {
  const { insights, users } = await getDemographicsAndUsersData();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Demographics &amp; Preference Insights
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            {insights.totalUsers} Registered Users
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Explore aggregate user characteristics, dating orientations, travel intentions, and privacy-minimized records.
        </p>
      </div>

      <DemographicsView insights={insights} users={users} />
    </div>
  );
}
