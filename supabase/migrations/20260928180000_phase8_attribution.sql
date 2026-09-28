-- Project Roam — Phase 8 Attribution & Acquisition Columns
-- File: supabase/migrations/20260928180000_phase8_attribution.sql

alter table public.validation_submissions
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_content text,
  add column if not exists utm_term text,
  add column if not exists referrer text;

create index if not exists idx_validation_submissions_utm_source
  on public.validation_submissions(utm_source);

create index if not exists idx_validation_submissions_created_at
  on public.validation_submissions(created_at);
