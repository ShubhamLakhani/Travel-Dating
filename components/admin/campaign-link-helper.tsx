"use client";

import * as React from "react";
import { Link2, Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CampaignLinkHelper() {
  const [source, setSource] = React.useState("reddit");
  const [medium, setMedium] = React.useState("social");
  const [campaign, setCampaign] = React.useState("solotravel_validation");
  const [content, setContent] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [path, setPath] = React.useState("/");
  const [copied, setCopied] = React.useState(false);

  const generatedUrl = React.useMemo(() => {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "https://triply.toolmint.cc";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const url = new URL(cleanPath, base);

    if (source.trim()) url.searchParams.set("utm_source", source.trim().toLowerCase());
    if (medium.trim()) url.searchParams.set("utm_medium", medium.trim().toLowerCase());
    if (campaign.trim()) url.searchParams.set("utm_campaign", campaign.trim().toLowerCase());
    if (content.trim()) url.searchParams.set("utm_content", content.trim().toLowerCase());
    if (term.trim()) url.searchParams.set("utm_term", term.trim().toLowerCase());

    return url.toString();
  }, [source, medium, campaign, content, term, path]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const setPreset = (s: string, m: string, c: string) => {
    setSource(s);
    setMedium(m);
    setCampaign(c);
  };

  return (
    <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Link2 className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
          <h2 className="text-base font-bold text-[var(--foreground)]">
            Campaign Link Helper
          </h2>
        </div>
        <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Admin Only
        </span>
      </div>

      <p className="text-xs text-[var(--muted-foreground)] mb-5">
        Generate canonical tracking URLs for acquisition experiments. Attribution is persisted
        through early-access signups.
      </p>

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-xs font-semibold text-[var(--muted-foreground)]">Presets:</span>
        <button
          type="button"
          onClick={() => setPreset("reddit", "social", "r_solotravel")}
          className="text-xs px-2.5 py-1 rounded-full bg-[var(--surface-muted)] hover:bg-[var(--border)] text-[var(--foreground)] transition-colors cursor-pointer"
        >
          Reddit SoloTravel
        </button>
        <button
          type="button"
          onClick={() => setPreset("instagram", "social", "travel_dating_reels")}
          className="text-xs px-2.5 py-1 rounded-full bg-[var(--surface-muted)] hover:bg-[var(--border)] text-[var(--foreground)] transition-colors cursor-pointer"
        >
          Instagram Reels
        </button>
        <button
          type="button"
          onClick={() => setPreset("twitter", "social", "digital_nomad_thread")}
          className="text-xs px-2.5 py-1 rounded-full bg-[var(--surface-muted)] hover:bg-[var(--border)] text-[var(--foreground)] transition-colors cursor-pointer"
        >
          Twitter / X
        </button>
        <button
          type="button"
          onClick={() => setPreset("newsletter", "email", "pilot_cohort_01")}
          className="text-xs px-2.5 py-1 rounded-full bg-[var(--surface-muted)] hover:bg-[var(--border)] text-[var(--foreground)] transition-colors cursor-pointer"
        >
          Newsletter Cohort
        </button>
      </div>

      {/* Inputs Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-xs font-medium text-[var(--foreground)] mb-1">
            Source <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g. reddit, instagram, twitter"
            className="w-full text-xs px-3 py-2 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--foreground)] mb-1">
            Medium <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            placeholder="e.g. social, cpc, email"
            className="w-full text-xs px-3 py-2 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--foreground)] mb-1">
            Campaign <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            placeholder="e.g. solotravel_phase11"
            className="w-full text-xs px-3 py-2 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--foreground)] mb-1">
            Landing Path
          </label>
          <select
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="/">Homepage (/)</option>
            <option value="/travel-dating">Travel Dating Guide (/travel-dating)</option>
            <option value="/dating-while-traveling">Dating While Traveling (/dating-while-traveling)</option>
            <option value="/meet-people-before-your-trip">Meet People Before Trip (/meet-people-before-your-trip)</option>
            <option value="/solo-travel-dating">Solo Travel Dating (/solo-travel-dating)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--foreground)] mb-1">
            Content <span className="text-[var(--muted-foreground)] font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="e.g. linkinbio, banner_v1"
            className="w-full text-xs px-3 py-2 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--foreground)] mb-1">
            Term <span className="text-[var(--muted-foreground)] font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="e.g. travel+dating"
            className="w-full text-xs px-3 py-2 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
      </div>

      {/* Generated Output */}
      <div className="bg-[var(--surface-muted)] p-4 rounded-xl border border-[var(--border)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <code className="text-xs font-mono text-[var(--foreground)] break-all select-all flex-1">
          {generatedUrl}
        </code>
        <Button
          type="button"
          size="sm"
          onClick={handleCopy}
          className="shrink-0 flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-300" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy URL
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
