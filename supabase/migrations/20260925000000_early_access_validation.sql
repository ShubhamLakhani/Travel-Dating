-- Project Roam — Phase 6 Early Access Validation Migration
-- File: 20260925000000_early_access_validation.sql

-- 1. Table: waitlist_users
create table if not exists public.waitlist_users (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  email_normalized text not null unique,
  home_country text not null,
  age_band text not null,
  gender text not null,
  gender_self_describe text null,
  interested_in text not null,
  used_dating_apps_traveling boolean null,
  travel_frequency text null,
  is_18_plus boolean not null default true,
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint waitlist_users_email_normalized_check
    check (email_normalized = lower(trim(email_normalized))),
  constraint waitlist_users_is_18_plus_check
    check (is_18_plus = true),
  constraint waitlist_users_gender_self_describe_length_check
    check (gender_self_describe is null or char_length(gender_self_describe) <= 80),
  constraint waitlist_users_age_band_check
    check (age_band in ('18-21', '22-25', '26-30', '31-35', '36-40', '41+', '18-24')),
  constraint waitlist_users_gender_check
    check (gender in ('woman', 'man', 'non-binary', 'self-describe', 'prefer_not_to_say', 'other')),
  constraint waitlist_users_interested_in_check
    check (interested_in in ('women', 'men', 'everyone')),
  constraint waitlist_users_travel_frequency_check
    check (travel_frequency is null or travel_frequency in ('1_per_year', '2-3_per_year', '4-6_per_year', '7_plus_per_year'))
);

-- 2. Table: preferences
create table if not exists public.preferences (
  id uuid primary key default gen_random_uuid(),
  waitlist_user_id uuid not null unique
    references public.waitlist_users(id)
    on delete cascade,
  meet_preference text not null,
  relationship_intentions text[] not null,
  travel_interests text[] not null default '{}',
  custom_interest text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint preferences_meet_preference_check
    check (meet_preference in ('travelers', 'locals', 'both', 'travelers_only', 'locals_only')),
  constraint preferences_intentions_nonempty_check
    check (array_length(relationship_intentions, 1) >= 1),
  constraint preferences_interests_max_check
    check (array_length(travel_interests, 1) is null or array_length(travel_interests, 1) <= 5),
  constraint preferences_custom_interest_length_check
    check (custom_interest is null or char_length(custom_interest) <= 80)
);

-- 3. Table: trips
create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  waitlist_user_id uuid not null
    references public.waitlist_users(id)
    on delete cascade,
  destination_id text not null,
  destination_name text not null,
  destination_country text not null,
  destination_country_code text null,
  market_slug text not null,
  arrival_date date not null,
  departure_date date not null,
  travel_mode text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint trips_dates_check
    check (departure_date > arrival_date),
  constraint trips_travel_mode_check
    check (travel_mode in ('solo', 'friends', 'group', 'other')),
  constraint trips_unique_per_user_dates
    unique (waitlist_user_id, market_slug, arrival_date, departure_date)
);

-- 4. Table: interview_opt_ins
create table if not exists public.interview_opt_ins (
  id uuid primary key default gen_random_uuid(),
  waitlist_user_id uuid not null
    references public.waitlist_users(id)
    on delete cascade,
  submission_id uuid not null,
  status text not null default 'opted_in',
  created_at timestamptz not null default now(),
  contacted_at timestamptz null,
  completed_at timestamptz null,

  constraint interview_opt_ins_status_check
    check (status in ('opted_in', 'contacted', 'scheduled', 'completed', 'declined'))
);

-- 5. Table: validation_submissions
create table if not exists public.validation_submissions (
  submission_id uuid primary key,
  payload_hash text not null,
  waitlist_user_id uuid not null
    references public.waitlist_users(id),
  trip_id uuid not null
    references public.trips(id),
  trip_created boolean not null,
  interview_opt_in boolean not null default false,
  confirmation_email_status text not null default 'pending',
  confirmation_email_sent_at timestamptz null,
  confirmation_email_last_attempt_at timestamptz null,
  created_at timestamptz not null default now(),

  constraint validation_submissions_email_status_check
    check (confirmation_email_status in ('pending', 'sent', 'failed', 'skipped'))
);

-- Indexes
create index if not exists idx_trips_market_slug on public.trips(market_slug);
create index if not exists idx_trips_dates on public.trips(arrival_date, departure_date);
create index if not exists idx_trips_waitlist_user_id on public.trips(waitlist_user_id);
create index if not exists idx_interview_opt_ins_status on public.interview_opt_ins(status);
create index if not exists idx_validation_submissions_created_at on public.validation_submissions(created_at);

-- Row Level Security (RLS)
alter table public.waitlist_users enable row level security;
alter table public.preferences enable row level security;
alter table public.trips enable row level security;
alter table public.interview_opt_ins enable row level security;
alter table public.validation_submissions enable row level security;

-- Security Grants: Revoke anonymous & authenticated direct access
revoke all on table public.waitlist_users from anon, authenticated;
revoke all on table public.preferences from anon, authenticated;
revoke all on table public.trips from anon, authenticated;
revoke all on table public.interview_opt_ins from anon, authenticated;
revoke all on table public.validation_submissions from anon, authenticated;

-- Allow privileged service_role full access
grant all on table public.waitlist_users to service_role;
grant all on table public.preferences to service_role;
grant all on table public.trips to service_role;
grant all on table public.interview_opt_ins to service_role;
grant all on table public.validation_submissions to service_role;

-- 6. Atomic Submission Function (RPC)
create or replace function public.submit_early_access(
  p_submission_id uuid,
  p_payload_hash text,
  p_email text,
  p_home_country text,
  p_age_band text,
  p_gender text,
  p_gender_self_describe text,
  p_interested_in text,
  p_used_dating_apps_traveling boolean,
  p_travel_frequency text,
  p_is_18_plus boolean,
  p_marketing_consent boolean,
  p_meet_preference text,
  p_relationship_intentions text[],
  p_travel_interests text[],
  p_custom_interest text,
  p_destination_id text,
  p_destination_name text,
  p_destination_country text,
  p_destination_country_code text,
  p_market_slug text,
  p_arrival_date date,
  p_departure_date date,
  p_travel_mode text,
  p_interview_opt_in boolean
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_normalized_email text;
  v_existing_submission record;
  v_user_id uuid;
  v_trip_id uuid;
  v_trip_created boolean := false;
  v_existing_trip_id uuid;
begin
  -- 1. Acquire transaction-level advisory lock on submission_id
  perform pg_advisory_xact_lock(hashtext(p_submission_id::text));

  v_normalized_email := lower(trim(p_email));

  -- 2. Check for existing submission under this submission_id
  select * into v_existing_submission
  from public.validation_submissions
  where submission_id = p_submission_id;

  if found then
    -- If hash matches, return existing submission idempotently
    if v_existing_submission.payload_hash = p_payload_hash then
      return jsonb_build_object(
        'ok', true,
        'submission_id', v_existing_submission.submission_id,
        'trip_created', v_existing_submission.trip_created,
        'idempotent_replay', true,
        'confirmation_email', v_existing_submission.confirmation_email_status
      );
    else
      -- Same ID with different payload -> 409 conflict error
      raise exception 'IDEMPOTENCY_CONFLICT: submission_id already exists with different payload'
        using errcode = '23505';
    end if;
  end if;

  -- 3. Find or Create waitlist_users record
  select id into v_user_id
  from public.waitlist_users
  where email_normalized = v_normalized_email;

  if found then
    -- Update participant information to latest explicit preferences
    update public.waitlist_users
    set
      email = p_email,
      home_country = p_home_country,
      age_band = p_age_band,
      gender = p_gender,
      gender_self_describe = p_gender_self_describe,
      interested_in = p_interested_in,
      used_dating_apps_traveling = p_used_dating_apps_traveling,
      travel_frequency = p_travel_frequency,
      is_18_plus = p_is_18_plus,
      marketing_consent = p_marketing_consent,
      updated_at = now()
    where id = v_user_id;
  else
    insert into public.waitlist_users (
      email,
      email_normalized,
      home_country,
      age_band,
      gender,
      gender_self_describe,
      interested_in,
      used_dating_apps_traveling,
      travel_frequency,
      is_18_plus,
      marketing_consent
    ) values (
      p_email,
      v_normalized_email,
      p_home_country,
      p_age_band,
      p_gender,
      p_gender_self_describe,
      p_interested_in,
      p_used_dating_apps_traveling,
      p_travel_frequency,
      p_is_18_plus,
      p_marketing_consent
    )
    returning id into v_user_id;
  end if;

  -- 4. Upsert preferences
  insert into public.preferences (
    waitlist_user_id,
    meet_preference,
    relationship_intentions,
    travel_interests,
    custom_interest
  ) values (
    v_user_id,
    p_meet_preference,
    p_relationship_intentions,
    coalesce(p_travel_interests, '{}'),
    p_custom_interest
  )
  on conflict (waitlist_user_id) do update set
    meet_preference = excluded.meet_preference,
    relationship_intentions = excluded.relationship_intentions,
    travel_interests = excluded.travel_interests,
    custom_interest = excluded.custom_interest,
    updated_at = now();

  -- 5. Deduplicate and insert trip
  select id into v_existing_trip_id
  from public.trips
  where waitlist_user_id = v_user_id
    and market_slug = p_market_slug
    and arrival_date = p_arrival_date
    and departure_date = p_departure_date;

  if found then
    v_trip_id := v_existing_trip_id;
    v_trip_created := false;
  else
    insert into public.trips (
      waitlist_user_id,
      destination_id,
      destination_name,
      destination_country,
      destination_country_code,
      market_slug,
      arrival_date,
      departure_date,
      travel_mode
    ) values (
      v_user_id,
      p_destination_id,
      p_destination_name,
      p_destination_country,
      p_destination_country_code,
      p_market_slug,
      p_arrival_date,
      p_departure_date,
      p_travel_mode
    )
    returning id into v_trip_id;
    v_trip_created := true;
  end if;

  -- 6. Interview opt-in
  if p_interview_opt_in is true then
    insert into public.interview_opt_ins (
      waitlist_user_id,
      submission_id,
      status
    ) values (
      v_user_id,
      p_submission_id,
      'opted_in'
    );
  end if;

  -- 7. Record validation submission receipt
  insert into public.validation_submissions (
    submission_id,
    payload_hash,
    waitlist_user_id,
    trip_id,
    trip_created,
    interview_opt_in,
    confirmation_email_status
  ) values (
    p_submission_id,
    p_payload_hash,
    v_user_id,
    v_trip_id,
    v_trip_created,
    coalesce(p_interview_opt_in, false),
    'pending'
  );

  return jsonb_build_object(
    'ok', true,
    'submission_id', p_submission_id,
    'trip_created', v_trip_created,
    'idempotent_replay', false,
    'confirmation_email', 'pending'
  );
end;
$$;

-- Revoke execute from public/anon/authenticated and grant to service_role
revoke execute on function public.submit_early_access from public, anon, authenticated;
grant execute on function public.submit_early_access to service_role;

-- 7. Helper: Update confirmation email status
create or replace function public.update_confirmation_email_status(
  p_submission_id uuid,
  p_status text
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  update public.validation_submissions
  set
    confirmation_email_status = p_status,
    confirmation_email_sent_at = case when p_status = 'sent' then now() else confirmation_email_sent_at end,
    confirmation_email_last_attempt_at = now()
  where submission_id = p_submission_id;
end;
$$;

revoke execute on function public.update_confirmation_email_status from public, anon, authenticated;
grant execute on function public.update_confirmation_email_status to service_role;
