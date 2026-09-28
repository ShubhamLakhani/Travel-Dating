// Project Roam — Phase 8 Launch Checklist Page
// File: app/admin/(dashboard)/launch/page.tsx

import { CheckCircle2, AlertTriangle, AlertCircle, ShieldCheck, Server, Radio, MessageSquare, Database } from "lucide-react";
import { getLaunchChecklistData } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Launch Checklist | Project Roam Admin",
  description: "Operational readiness, verification status, and launch blockers for public validation.",
};

const CATEGORY_META = {
  infrastructure: { label: "1. Infrastructure & Backend", icon: Server },
  safety: { label: "2. User Safety & Legal", icon: ShieldCheck },
  communication: { label: "3. Communication Channels", icon: MessageSquare },
  analytics: { label: "4. Production Analytics & Attribution", icon: Radio },
  operations: { label: "5. Operational Workflows", icon: Database },
};

export default async function AdminLaunchChecklistPage() {
  const items = await getLaunchChecklistData();

  const totalItems = items.length;
  const verifiedCount = items.filter((i) => i.status === "verified").length;
  const configuredCount = items.filter((i) => i.status === "configured").length;
  const actionRequiredCount = items.filter((i) => i.status === "action_required").length;

  const categories = ["infrastructure", "safety", "communication", "analytics", "operations"] as const;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Validation Launch Checklist
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
            Phase 8 Verification
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Live technical and operational status for Project Roam&apos;s public validation launch. Secrets are securely hidden.
        </p>
      </div>

      {/* Aggregate Readiness Bar */}
      <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
            Overall Readiness Score
          </div>
          <div className="mt-1 text-3xl font-extrabold text-[var(--foreground)]">
            {verifiedCount + configuredCount} / {totalItems} Checks Satisfied
          </div>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            {actionRequiredCount === 0
              ? "All systems green. Application is fully hardened for public validation."
              : `${actionRequiredCount} external DNS / domain configuration action(s) require human authorization.`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            <span>{verifiedCount} Verified</span>
          </div>
          {configuredCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold">
              <CheckCircle2 className="h-4 w-4 text-sky-600" aria-hidden="true" />
              <span>{configuredCount} Configured</span>
            </div>
          )}
          {actionRequiredCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden="true" />
              <span>{actionRequiredCount} External Action Required</span>
            </div>
          )}
        </div>
      </div>

      {/* Categorized Checklists */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryItems = items.filter((i) => i.category === category);
          const meta = CATEGORY_META[category];
          const Icon = meta.icon;

          return (
            <div
              key={category}
              className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-xs overflow-hidden"
            >
              {/* Category Header */}
              <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--surface-muted)]/50 flex items-center gap-2.5">
                <Icon className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                <h2 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">
                  {meta.label}
                </h2>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[var(--border)]">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[var(--surface-muted)]/30 transition-colors"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[var(--foreground)]">
                          {item.title}
                        </span>
                        {item.status === "verified" && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Verified
                          </span>
                        )}
                        {item.status === "configured" && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200">
                            Configured
                          </span>
                        )}
                        {item.status === "action_required" && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                            Action Required
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                        {item.details}
                      </p>
                      {item.actionRequired && (
                        <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold pt-1">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" aria-hidden="true" />
                          <span>Action: {item.actionRequired}</span>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 self-end sm:self-center">
                      {item.status === "verified" || item.status === "configured" ? (
                        <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
