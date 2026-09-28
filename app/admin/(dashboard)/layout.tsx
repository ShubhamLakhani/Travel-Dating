// Project Roam — Phase 7 Admin Protected Dashboard Layout
// File: app/admin/(dashboard)/layout.tsx

import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/admin/auth";
import { AdminHeader } from "@/components/admin/admin-header";

export const metadata = {
  title: "Admin Dashboard | Project Roam",
  description: "Internal validation dashboard and trip density analytics for Project Roam.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await verifyAdminSession();

  if (!auth.isAuthorized || !auth.email) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[var(--surface-muted)] text-[var(--foreground)] flex flex-col">
      <AdminHeader adminEmail={auth.email} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="border-t border-[var(--border)] py-4 text-center text-xs text-[var(--muted-foreground)]">
        Project Roam Internal Validation Dashboard • Stage: Pre-MVP Validation • Strictly Confidential
      </footer>
    </div>
  );
}
