"use client";

// Triply Privacy Request Page
// File: app/privacy/request/page.tsx

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PRIVACY_REQUEST_TYPES,
  PRIVACY_REQUEST_LABELS,
  type PrivacyRequestType,
} from "@/lib/validation/privacy-request-schema";

export default function PrivacyRequestPage() {
  const [email, setEmail] = React.useState("");
  const [requestType, setRequestType] = React.useState<PrivacyRequestType>("delete_data");
  const [message, setMessage] = React.useState("");
  const [website, setWebsite] = React.useState(""); // Honeypot
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/privacy-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          requestType,
          message,
          website,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(
          data.message || "We were unable to deliver your request right now. Please try again."
        );
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white pb-24">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Privacy Policy
          </Link>
          <Link href="/" aria-label="Triply home">
            <Image
              src="/brand/triply/triply-primary-horizontal.png"
              alt="Triply"
              width={100}
              height={32}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 sm:px-6 pt-12">
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" />
            Data Protection
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Privacy Action Request
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">
            Submit a request to access, update, or completely delete your Triply validation submission records.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 text-center flex flex-col items-center gap-4 shadow-sm">
            <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
            </div>
            <h2 className="font-display text-xl font-bold text-[var(--foreground)]">
              Request received
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] max-w-md leading-relaxed">
              We have received your privacy request and will review it. If you requested deletion, your submission data will be purged from our database.
            </p>
            <div className="pt-4">
              <Link href="/">
                <Button variant="secondary" size="sm" className="rounded-full px-6">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
          >
            {/* Honeypot field (hidden from users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="privacy-email"
                className="block text-sm font-semibold text-[var(--foreground)]"
              >
                Your Submission Email <span className="text-[var(--primary)]">*</span>
              </label>
              <Input
                id="privacy-email"
                type="email"
                required
                placeholder="The email you used to join"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--background)]"
                disabled={isSubmitting}
              />
              <p className="text-xs text-[var(--muted-foreground)]">
                We use this email to locate your records in our early-access waitlist.
              </p>
            </div>

            {/* Request Type */}
            <div className="space-y-2">
              <label
                htmlFor="privacy-type"
                className="block text-sm font-semibold text-[var(--foreground)]"
              >
                Request Type <span className="text-[var(--primary)]">*</span>
              </label>
              <select
                id="privacy-type"
                value={requestType}
                onChange={(e) => setRequestType(e.target.value as PrivacyRequestType)}
                disabled={isSubmitting}
                className="w-full h-10 px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors"
              >
                {PRIVACY_REQUEST_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {PRIVACY_REQUEST_LABELS[type]}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Message */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="privacy-message"
                  className="block text-sm font-semibold text-[var(--foreground)]"
                >
                  Additional Details <span className="text-xs font-normal text-[var(--muted-foreground)]">(Optional)</span>
                </label>
                <span className="text-xs text-[var(--muted-foreground)]">
                  {message.length}/1000
                </span>
              </div>
              <textarea
                id="privacy-message"
                rows={4}
                maxLength={1000}
                placeholder="Any specific instructions or details regarding your request..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors resize-none"
              />
            </div>

            {/* Error Display */}
            {status === "error" && errorMessage && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5"
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" aria-hidden="true" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full font-bold shadow-md rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
                  Submitting request...
                </>
              ) : (
                "Submit Privacy Request"
              )}
            </Button>

            <p className="text-center text-xs text-[var(--muted-foreground)] pt-2">
              Requests are securely handled by our technical operations team.
            </p>
          </form>
        )}
      </main>
    </div>
  );
}
