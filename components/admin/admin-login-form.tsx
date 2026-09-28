// Project Roam — Phase 7 Admin Login Form Component
// File: components/admin/admin-login-form.tsx

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [passkey, setPasskey] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passkey: passkey.trim(),
          email: email.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid credentials. Please verify your passkey.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error while verifying credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div
          role="alert"
          className="p-3 text-xs rounded-xl bg-red-50 text-red-700 border border-red-200 flex items-start gap-2"
        >
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="admin-email"
          className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-1.5"
        >
          Admin Email <span className="text-[var(--muted-foreground)] font-normal">(optional)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--muted-foreground)]">
            <Mail className="h-4 w-4" aria-hidden="true" />
          </div>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@roam.dating"
            className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
            autoComplete="email"
          />
        </div>
        <p className="mt-1 text-[11px] text-[var(--muted-foreground)]">
          Must match an address configured in ADMIN_EMAILS if specified.
        </p>
      </div>

      <div>
        <label
          htmlFor="admin-passkey"
          className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-1.5"
        >
          Admin Secret Passkey <span className="text-[var(--primary)]">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--muted-foreground)]">
            <Lock className="h-4 w-4" aria-hidden="true" />
          </div>
          <input
            id="admin-passkey"
            type="password"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            placeholder="••••••••••••"
            required
            className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
            autoComplete="current-password"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !passkey}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-[var(--primary)] hover:opacity-95 focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all disabled:opacity-50 cursor-pointer shadow-xs"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Authenticating…</span>
          </>
        ) : (
          <>
            <span>Enter Dashboard</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
