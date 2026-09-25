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
├── success/          # Placeholder route
├── privacy/          # Placeholder legal route
├── terms/            # Placeholder legal route
└── safety/           # Placeholder safety route

components/           # Modular React components
├── ui/               # Base UI primitives (Button, Input, Card, Badge, etc.)
├── layout/           # Shared layout components
├── analytics/        # Analytics client providers
├── forms/            # Form components (upcoming phases)
├── landing/          # Landing sections (upcoming phases)
├── matching/         # Match preview components (upcoming phases)
└── safety/           # Safety components (upcoming phases)

lib/                  # Shared utilities and service clients
├── utils/            # Utility functions (cn class merger)
├── analytics/        # PostHog client, event registry, and track wrapper
└── supabase/         # SSR browser, server, and admin Supabase clients

types/                # Shared domain TypeScript declarations
├── analytics.ts      # Analytics event and privacy types
├── trip.ts           # Trip draft and travel mode types
└── signup.ts         # User preference and signup draft types

public/               # Static assets
```
