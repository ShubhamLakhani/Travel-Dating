# Project Roam

**Working Product Name:** roam  
**Tagline:** *Meet someone going where you're going.*  
**Positioning:** 18+ pre-MVP validation web application for a travel-first dating platform.

---

## Important Notice

> **This repository is currently a validation product.**  
> It does not contain live dating profiles, matching, messaging, payments, or production user authentication.

---

## Purpose

Pre-MVP demand validation for a trip-first dating concept. Instead of querying *"Who is near me right now?"*, Roam investigates whether travelers will connect around shared future destinations and overlapping travel dates (*"Who will be where I'm going, when I'm going?"*).

---

## Current Phase

```text
Current phase: Phase 1 — Foundation
```

This phase establishes the production-grade architectural and design foundation:
- Next.js App Router & TypeScript in strict mode
- Design tokens & semantic color system in CSS custom properties
- Base UI primitives (Button, Input, Card, Badge, Container, Section)
- Supabase SSR client architecture (browser, server, and server-only admin key isolation)
- PostHog analytics with privacy guardrails and PII protection
- Baseline HTTP security headers
- Route placeholders and error boundaries

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4 & Vanilla CSS Custom Properties
- **Icons:** Lucide React
- **Validation:** Zod
- **Analytics:** PostHog JS (PII-safe client wrapper)
- **Database/Auth Ready:** Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- **Package Manager:** pnpm

---

## Requirements

- **Node.js:** `>= 20.9.0` (Recommended: Node 20 or 22 LTS / tested on v24)
- **pnpm:** `>= 9.0.0` (tested on v12.4.2)

---

## Local Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env.local
   ```
   *(Note: The application compiles and runs in Phase 1 even if third-party credentials are not yet configured).*

3. **Run the development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Quality Checks

Run all verification suites:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

---

## Project Layout

```text
app/                  # Next.js App Router routes & layouts
├── globals.css       # Roam design tokens and CSS theme
├── layout.tsx        # Root layout with fonts, metadata, and analytics
├── page.tsx          # Phase 1 foundation preview
├── join/             # Placeholder route
├── success/          # Verified Phase 6 durable submission success page
├── privacy/          # Public legal privacy policy
├── terms/            # Public terms of service
├── safety/           # Safety guidelines
└── admin/            # Phase 7 Internal Founder Validation Dashboard
    ├── login/        # Admin authentication entry
    └── (dashboard)/  # Guarded internal screens (Overview, Density, Destinations, Trips, Users, Interviews)

components/admin/     # Admin views, interactive density tables, filters, header
lib/admin/            # Density engine, session auth, database analytics queries
```

---

## Phase 7 — Admin Validation Dashboard & Trip Density Analytics

Phase 7 introduces an internal founder dashboard to answer key market validation questions before launching a public beta.

### 1. Key Objectives & Metrics

- **Core Metric:** **Trip Density** (`destination + overlapping travel dates`). Total registration vanity counts are separated from usable liquidity.
- **Max Concurrency Algorithm:** Sweep-line timeline calculation of simultaneous travellers at a destination (`O(n log n)`). Users with multiple trips are merged into non-overlapping intervals to prevent self-counting.
- **Overlap Formula:**
  $$\text{Overlap} \iff \text{tripA.arrivalDate} \le \text{tripB.departureDate} \land \text{tripB.arrivalDate} \le \text{tripA.departureDate}$$
- **Compatible Density:** Conservative mutual compatibility filter requiring symmetric gender/interested-in preferences, compatible meet modes (travelers vs locals), and overlapping intentions.
- **Closed-Beta Readiness Signals:**
  - `READY`: Peak concurrency $\ge 5$ OR ($\ge 3$ concurrency with $5+$ unique travellers).
  - `WARMING`: Peak concurrency $\ge 2$ with at least 1 overlapping pair.
  - `COLD`: $0-1$ isolated travellers.
- **Interview Research Pipeline:** Tracks founder interview volunteers from opt-in to completed outreach calls.
- **CSV Data Exports:** Protected endpoints for Destinations, Trips, and Interview Volunteers.

### 2. Admin Security Architecture

- **Fail-Closed Gateways:** Next.js Edge `middleware.ts` intercepts unauthorized `/admin/*` and `/api/admin/*` calls, returning immediate `307 Redirect` to `/admin/login` or `401 Unauthorized` for APIs.
- **Server Guard:** All dashboard server components verify HMAC-SHA256 signed HTTP-only cookies (`roam_admin_session`) or Bearer tokens against `ADMIN_SECRET_KEY` and the `ADMIN_EMAILS` allowlist.
- **Data Minimization:** Aggregate views obfuscate identifiers (`u_39f…1a2b`) and hide emails. Full contact emails are strictly restricted to the authorized interview pipeline.
- **No Client Secrets:** Service-role keys and administrative credentials remain strictly server-side.

### 3. Local Dashboard Access

1. Ensure `.env` contains:
   ```bash
   ADMIN_SECRET_KEY=roam_admin_dev_pass_2026
   ADMIN_EMAILS=admin@mail.toolmint.cc
   ```
2. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) (automatically redirects to `/admin/login`).
3. Enter the secret passkey (`roam_admin_dev_pass_2026`) and optional admin email (`admin@mail.toolmint.cc`).
4. To test logout, click **Log out** in the header.

### 4. Running Test Suites

```bash
pnpm test       # 59/59 unit tests (dates, schemas, durable signup, density engine, auth, security)
pnpm lint       # ESLint (0 errors, 0 warnings)
pnpm typecheck  # TypeScript strict typechecking
pnpm build      # Production Next.js build
```
