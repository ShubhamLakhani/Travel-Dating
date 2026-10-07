// Triply Admin Login Page
// File: app/admin/login/page.tsx

import Image from "next/image";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/admin/auth";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata = {
  title: "Admin Login",
  description: "Internal founder and validation dashboard login for Triply.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const auth = await verifyAdminSession();
  if (auth.isAuthorized) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-3">
          <Image
            src="/brand/triply/triply-primary-stacked.png"
            alt="Triply"
            width={120}
            height={150}
            priority
            className="h-16 w-auto object-contain"
          />
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Validation Dashboard
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Internal research and market density analytics
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-[var(--surface)] py-8 px-6 sm:px-10 shadow-sm border border-[var(--border)] rounded-2xl">
          <AdminLoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-[var(--muted-foreground)]">
          Strictly authorized personnel only. Access is logged and audited.
        </p>
      </div>
    </div>
  );
}
