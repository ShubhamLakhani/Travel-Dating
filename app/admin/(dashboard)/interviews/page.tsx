// Project Roam : Phase 7 Interview Pipeline Page
// File: app/admin/(dashboard)/interviews/page.tsx

import { getInterviewVolunteersList } from "@/lib/admin/queries";
import { InterviewsView } from "@/components/admin/interviews-view";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Interview Research Pipeline | Triply Admin",
  description: "User interview pipeline for qualitative founder research and outreach.",
};

export default async function AdminInterviewsPage() {
  const volunteers = await getInterviewVolunteersList();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Interview Research Pipeline
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            {volunteers.length} Volunteers
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Qualitative founder research outreach. Track volunteer candidates across outreach statuses from initial opt-in to completed user interviews.
        </p>
      </div>

      <InterviewsView initialVolunteers={volunteers} />
    </div>
  );
}
