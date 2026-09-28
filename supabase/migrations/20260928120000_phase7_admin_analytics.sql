-- Project Roam — Phase 7 Admin Analytics & Interview Optimization Migration
-- File: supabase/migrations/20260928120000_phase7_admin_analytics.sql

-- 1. Performance Indexes for Admin Time-Series and Destination Analytics
create index if not exists idx_waitlist_users_created_at on public.waitlist_users(created_at);
create index if not exists idx_trips_destination_id on public.trips(destination_id);
create index if not exists idx_trips_created_at on public.trips(created_at);

-- 2. Privileged Helper Function: Update Interview Opt-in Status
create or replace function public.update_interview_status(
  p_opt_in_id uuid,
  p_status text
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if p_status not in ('opted_in', 'contacted', 'scheduled', 'completed', 'declined') then
    raise exception 'INVALID_STATUS: status must be opted_in, contacted, scheduled, completed, or declined';
  end if;

  update public.interview_opt_ins
  set
    status = p_status,
    contacted_at = case when p_status = 'contacted' and contacted_at is null then now() else contacted_at end,
    completed_at = case when p_status = 'completed' and completed_at is null then now() else completed_at end
  where id = p_opt_in_id;
end;
$$;

-- Security Grants: Revoke from public/anon/authenticated and grant exclusively to service_role
revoke execute on function public.update_interview_status from public, anon, authenticated;
grant execute on function public.update_interview_status to service_role;
