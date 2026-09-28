-- Project Roam — Phase 6 Database, RLS & Submission Tests
-- File: supabase/tests/database/rls_and_submission_test.sql

begin;

select plan(12);

-- 1. Table existence tests
select has_table('public', 'waitlist_users', 'Table public.waitlist_users exists');
select has_table('public', 'preferences', 'Table public.preferences exists');
select has_table('public', 'trips', 'Table public.trips exists');
select has_table('public', 'interview_opt_ins', 'Table public.interview_opt_ins exists');
select has_table('public', 'validation_submissions', 'Table public.validation_submissions exists');

-- 2. Anonymous Access Tests (Must be DENIED)
set local role anon;

select throws_ok(
  'select * from public.waitlist_users',
  '42501',
  null,
  'anon cannot select from waitlist_users'
);

select throws_ok(
  'insert into public.waitlist_users (email, email_normalized, home_country, age_band, gender, interested_in, is_18_plus) values (''anon@example.com'', ''anon@example.com'', ''US'', ''26-30'', ''woman'', ''men'', true)',
  '42501',
  null,
  'anon cannot insert into waitlist_users'
);

select throws_ok(
  'select * from public.trips',
  '42501',
  null,
  'anon cannot select from trips'
);

-- 3. Authenticated Access Tests (Must be DENIED)
set local role authenticated;

select throws_ok(
  'select * from public.waitlist_users',
  '42501',
  null,
  'authenticated cannot select from waitlist_users'
);

select throws_ok(
  'insert into public.waitlist_users (email, email_normalized, home_country, age_band, gender, interested_in, is_18_plus) values (''auth@example.com'', ''auth@example.com'', ''US'', ''26-30'', ''woman'', ''men'', true)',
  '42501',
  null,
  'authenticated cannot insert into waitlist_users'
);

-- 4. Privileged Service Role Tests (Must be ALLOWED)
reset role;
set local role service_role;

do $$
declare
  v_sub_id uuid := '00000000-0000-0000-0000-000000000001'::uuid;
  v_sub_id_dup uuid := '00000000-0000-0000-0000-000000000002'::uuid;
  v_sub_id_diff uuid := '00000000-0000-0000-0000-000000000003'::uuid;
  v_res1 jsonb;
  v_res_replay jsonb;
  v_res_dup_trip jsonb;
  v_res_diff_trip jsonb;
  v_trips_count int;
  v_users_count int;
begin
  -- 4.1 Valid First Submission
  v_res1 := public.submit_early_access(
    v_sub_id,
    'hash_initial',
    'traveler@example.com',
    'United States',
    '26-30',
    'woman',
    null,
    'men',
    true,
    '2-3_per_year',
    true,
    true,
    'travelers',
    array['romantic_connection'],
    array['beach', 'food'],
    null,
    'bali',
    'Bali',
    'Indonesia',
    'ID',
    'bali',
    '2026-11-01'::date,
    '2026-11-10'::date,
    'solo',
    true
  );

  assert (v_res1->>'ok')::boolean = true, 'Expected first submission ok';
  assert (v_res1->>'trip_created')::boolean = true, 'Expected trip_created to be true';
  assert (v_res1->>'idempotent_replay')::boolean = false, 'Expected idempotent_replay false';

  -- 4.2 Idempotent Replay (Same submission ID + same payload)
  v_res_replay := public.submit_early_access(
    v_sub_id,
    'hash_initial',
    'traveler@example.com',
    'United States',
    '26-30',
    'woman',
    null,
    'men',
    true,
    '2-3_per_year',
    true,
    true,
    'travelers',
    array['romantic_connection'],
    array['beach', 'food'],
    null,
    'bali',
    'Bali',
    'Indonesia',
    'ID',
    'bali',
    '2026-11-01'::date,
    '2026-11-10'::date,
    'solo',
    true
  );

  assert (v_res_replay->>'ok')::boolean = true, 'Expected replay submission ok';
  assert (v_res_replay->>'idempotent_replay')::boolean = true, 'Expected idempotent_replay true';

  -- 4.3 Conflict Check (Same submission ID + changed payload)
  begin
    perform public.submit_early_access(
      v_sub_id,
      'different_hash',
      'traveler@example.com',
      'United States',
      '26-30',
      'woman',
      null,
      'men',
      true,
      '2-3_per_year',
      true,
      true,
      'travelers',
      array['romantic_connection'],
      array['beach', 'food'],
      null,
      'bali',
      'Bali',
      'Indonesia',
      'ID',
      'bali',
      '2026-11-01'::date,
      '2026-11-10'::date,
      'solo',
      true
    );
    raise exception 'FAILURE: Expected idempotency conflict exception';
  exception when unique_violation or sqlstate '23505' then
    -- Expected conflict
  end;

  -- 4.4 Same User + Duplicate Exact Trip (Should reuse trip, trip_created = false)
  v_res_dup_trip := public.submit_early_access(
    v_sub_id_dup,
    'hash_dup_trip',
    'traveler@example.com',
    'United States',
    '26-30',
    'woman',
    null,
    'men',
    true,
    '2-3_per_year',
    true,
    true,
    'travelers',
    array['romantic_connection'],
    array['beach', 'food'],
    null,
    'bali',
    'Bali',
    'Indonesia',
    'ID',
    'bali',
    '2026-11-01'::date,
    '2026-11-10'::date,
    'solo',
    false
  );

  assert (v_res_dup_trip->>'ok')::boolean = true, 'Expected duplicate trip submission ok';
  assert (v_res_dup_trip->>'trip_created')::boolean = false, 'Expected trip_created to be false for exact duplicate trip';

  -- 4.5 Same User + Different Trip (Should create new trip row)
  v_res_diff_trip := public.submit_early_access(
    v_sub_id_diff,
    'hash_diff_trip',
    'traveler@example.com',
    'United States',
    '26-30',
    'woman',
    null,
    'men',
    true,
    '2-3_per_year',
    true,
    false,
    'both',
    array['romantic_connection'],
    array['beach', 'hiking'],
    null,
    'tokyo',
    'Tokyo',
    'Japan',
    'JP',
    'tokyo',
    '2026-12-01'::date,
    '2026-12-10'::date,
    'solo',
    false
  );

  assert (v_res_diff_trip->>'ok')::boolean = true, 'Expected different trip submission ok';
  assert (v_res_diff_trip->>'trip_created')::boolean = true, 'Expected trip_created true for distinct trip';

  select count(*) into v_users_count from public.waitlist_users;
  assert v_users_count = 1, 'Expected exactly 1 waitlist_user for all submissions from same email';

  select count(*) into v_trips_count from public.trips;
  assert v_trips_count = 2, 'Expected exactly 2 trips for distinct dates';

  -- 4.6 Trip departure <= arrival date rejected
  begin
    insert into public.trips (
      waitlist_user_id, destination_id, destination_name, destination_country, market_slug, arrival_date, departure_date, travel_mode
    ) values (
      (select id from public.waitlist_users limit 1), 'paris', 'Paris', 'France', 'paris', '2026-10-15'::date, '2026-10-10'::date, 'solo'
    );
    raise exception 'FAILURE: Expected check constraint on departure_date > arrival_date';
  exception when check_violation then
    -- Expected check violation
  end;

  -- 4.7 Under-18 signup rejected
  begin
    insert into public.waitlist_users (
      email, email_normalized, home_country, age_band, gender, interested_in, is_18_plus
    ) values (
      'under18@example.com', 'under18@example.com', 'US', '18-21', 'woman', 'men', false
    );
    raise exception 'FAILURE: Expected check constraint on is_18_plus = true';
  exception when check_violation then
    -- Expected check violation
  end;

end $$;

select pass('All privileged service_role submissions and constraint tests passed');

select * from finish();

rollback;
