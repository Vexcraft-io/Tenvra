create table public.interest_review_events (
  id bigint generated always as identity primary key,
  registration_id uuid not null references public.interest_registrations(id) on delete cascade,
  previous_qualification_status text not null,
  qualification_status text not null check (
    qualification_status in ('unreviewed', 'potential', 'qualified', 'not_qualified')
  ),
  reviewer_label text not null check (char_length(reviewer_label) between 1 and 120),
  note text check (note is null or char_length(note) <= 500),
  created_at timestamptz not null default now()
);

create index interest_review_events_registration_idx
  on public.interest_review_events (registration_id, created_at desc);

alter table public.interest_review_events enable row level security;

revoke all on public.interest_review_events from anon, authenticated;
grant select, insert on public.interest_review_events to service_role;
grant usage, select on sequence public.interest_review_events_id_seq to service_role;

comment on table public.interest_review_events is
  'Append-only operator audit log for Phase 1 qualification decisions.';

create or replace function public.review_interest_registration(
  target_registration_id uuid,
  new_qualification_status text,
  reviewer text,
  review_note text default null
)
returns public.interest_registrations
language plpgsql
security definer
set search_path = ''
as $$
declare
  previous_status text;
  updated_registration public.interest_registrations;
begin
  if new_qualification_status not in (
    'unreviewed',
    'potential',
    'qualified',
    'not_qualified'
  ) then
    raise exception 'invalid qualification status';
  end if;

  if char_length(reviewer) < 1 or char_length(reviewer) > 120 then
    raise exception 'invalid reviewer label';
  end if;

  if review_note is not null and char_length(review_note) > 500 then
    raise exception 'review note is too long';
  end if;

  select qualification_status
  into previous_status
  from public.interest_registrations
  where id = target_registration_id
  for update;

  if not found then
    raise exception 'registration not found';
  end if;

  update public.interest_registrations
  set
    qualification_status = new_qualification_status,
    reviewed_at = now(),
    updated_at = now()
  where id = target_registration_id
  returning * into updated_registration;

  insert into public.interest_review_events (
    registration_id,
    previous_qualification_status,
    qualification_status,
    reviewer_label,
    note
  )
  values (
    target_registration_id,
    previous_status,
    new_qualification_status,
    reviewer,
    nullif(btrim(review_note), '')
  );

  return updated_registration;
end;
$$;

revoke all on function public.review_interest_registration(uuid, text, text, text)
  from public, anon, authenticated;
grant execute on function public.review_interest_registration(uuid, text, text, text)
  to service_role;
