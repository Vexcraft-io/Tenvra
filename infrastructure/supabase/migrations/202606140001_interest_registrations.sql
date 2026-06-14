create type public.interest_registration_status as enum (
  'pending_verification',
  'verified',
  'qualified',
  'declined'
);

create table public.interest_registrations (
  id uuid primary key default extensions.gen_random_uuid(),
  email text not null check (char_length(email) between 3 and 254),
  email_normalized text generated always as (lower(btrim(email))) stored,
  display_name text check (display_name is null or char_length(display_name) <= 80),
  interests text[] not null check (
    cardinality(interests) > 0
    and interests <@ array[
      'gpu-operator',
      'developer',
      'researcher',
      'design-partner'
    ]::text[]
  ),
  hardware jsonb,
  network jsonb,
  organization jsonb,
  contribution_note text check (
    contribution_note is null or char_length(contribution_note) <= 600
  ),
  status public.interest_registration_status not null default 'pending_verification',
  email_verified_at timestamptz,
  verification_token_hash text unique,
  verification_expires_at timestamptz,
  deletion_token_hash text not null unique,
  privacy_consent_at timestamptz not null,
  privacy_notice_version text not null,
  updates_consent_at timestamptz,
  source text not null default 'direct' check (char_length(source) <= 80),
  qualification_status text not null default 'unreviewed' check (
    qualification_status in ('unreviewed', 'potential', 'qualified', 'not_qualified')
  ),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  retention_expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (email_normalized)
);

create index interest_registrations_status_idx
  on public.interest_registrations (status, qualification_status);

create index interest_registrations_retention_idx
  on public.interest_registrations (retention_expires_at);

create table public.interest_registration_attempts (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index interest_registration_attempts_lookup_idx
  on public.interest_registration_attempts (ip_hash, created_at desc);

alter table public.interest_registrations enable row level security;
alter table public.interest_registration_attempts enable row level security;

revoke all on public.interest_registrations from anon, authenticated;
revoke all on public.interest_registration_attempts from anon, authenticated;
grant select, insert, update, delete on public.interest_registrations to service_role;
grant select, insert, delete on public.interest_registration_attempts to service_role;
grant usage, select on sequence public.interest_registration_attempts_id_seq to service_role;

comment on table public.interest_registrations is
  'Phase-one verified interest records. Access is restricted to trusted server processes.';
comment on column public.interest_registrations.hardware is
  'Self-reported hardware qualification data; never publish at individual level.';
comment on column public.interest_registrations.deletion_token_hash is
  'SHA-256 hash of a random self-service deletion token.';
comment on table public.interest_registration_attempts is
  'Short-lived pseudonymous metadata used only for abuse prevention.';

create or replace function public.purge_expired_interest_data()
returns table (
  deleted_registrations bigint,
  deleted_attempts bigint
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  registration_count bigint;
  attempt_count bigint;
begin
  delete from public.interest_registrations
  where retention_expires_at < now();
  get diagnostics registration_count = row_count;

  delete from public.interest_registration_attempts
  where created_at < now() - interval '24 hours';
  get diagnostics attempt_count = row_count;

  return query select registration_count, attempt_count;
end;
$$;

revoke all on function public.purge_expired_interest_data() from public, anon, authenticated;
grant execute on function public.purge_expired_interest_data() to service_role;

comment on function public.purge_expired_interest_data() is
  'Deletes expired registrations and abuse-prevention metadata. Invoke from a trusted scheduled job.';
