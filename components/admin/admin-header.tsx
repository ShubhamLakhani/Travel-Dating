// Triply Admin Header Component
// File: components/admin/admin-header.tsx

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  Compass,
  Plane,
  Users,
  MessageSquare,
  LogOut,
  ShieldCheck,
  TrendingUp,
  CheckSquare,
} from "lucide-react";

interface AdminHeaderProps {
  adminEmail: string;
}

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/density", label: "Trip Density", icon: Activity },
  { href: "/admin/destinations", label: "Destinations", icon: Compass },
  { href: "/admin/trips", label: "Trips Explorer", icon: Plane },
  { href: "/admin/attribution", label: "Attribution", icon: TrendingUp },
  { href: "/admin/users", label: "Demographics", icon: Users },
  { href: "/admin/interviews", label: "Interviews", icon: MessageSquare },
  { href: "/admin/launch", label: "Launch Checklist", icon: CheckSquare },
];

export function AdminHeader({ adminEmail }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--surface)] border-b border-[var(--border)] shadow-xs">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Product Title */}
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2" aria-label="Triply Admin home">
            <Image
              src="/brand/triply/triply-primary-horizontal.png"
              alt="Triply Admin"
              width={100}
              height={32}
              priority
              className="h-7 w-auto object-contain"
            />
          </Link>
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[var(--border)]">
            <span className="text-xs font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[var(--surface-muted)] text-[var(--foreground)]/80 border border-[var(--border)]">
              Validation Engine
            </span>
          </div>
        </div>

        {/* Admin User Info & Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
            <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            <span className="font-medium text-[var(--foreground)]">{adminEmail}</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--surface-muted)] hover:bg-red-50 text-[var(--muted-foreground)] hover:text-red-700 border border-[var(--border)] transition-colors cursor-pointer disabled:opacity-50"
            title="Log out of admin"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{loggingOut ? "Exiting..." : "Log out"}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none border-t border-[var(--border)]/60">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? "border-[var(--primary)] text-[var(--primary)] font-bold"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border)]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
