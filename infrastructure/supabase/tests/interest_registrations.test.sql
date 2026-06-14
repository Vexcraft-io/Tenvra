begin;

select plan(17);

select has_table(
  'public',
  'interest_registrations',
  'interest registrations table exists'
);

select has_table(
  'public',
  'interest_registration_attempts',
  'rate-limit attempts table exists'
);

select is(
  (
    select relrowsecurity
    from pg_class
    where oid = 'public.interest_registrations'::regclass
  ),
  true,
  'interest registrations have RLS enabled'
);

select is(
  (
    select relrowsecurity
    from pg_class
    where oid = 'public.interest_registration_attempts'::regclass
  ),
  true,
  'rate-limit attempts have RLS enabled'
);

select is(
  has_table_privilege('anon', 'public.interest_registrations', 'SELECT'),
  false,
  'anonymous users cannot read registrations'
);

select is(
  has_table_privilege('anon', 'public.interest_registrations', 'INSERT'),
  false,
  'anonymous users cannot insert registrations'
);

select is(
  has_table_privilege('authenticated', 'public.interest_registrations', 'SELECT'),
  false,
  'authenticated users cannot read registrations'
);

select is(
  has_table_privilege('authenticated', 'public.interest_registrations', 'INSERT'),
  false,
  'authenticated users cannot insert registrations'
);

select is(
  has_table_privilege('service_role', 'public.interest_registrations', 'SELECT'),
  true,
  'service role can read registrations'
);

select is(
  has_table_privilege('service_role', 'public.interest_registrations', 'INSERT'),
  true,
  'service role can insert registrations'
);

select is(
  (
    select count(*)::integer
    from pg_policies
    where schemaname = 'public'
      and tablename in ('interest_registrations', 'interest_registration_attempts')
  ),
  0,
  'phase-one tables expose no RLS policies to client roles'
);

select has_function(
  'public',
  'purge_expired_interest_data',
  array[]::text[],
  'retention cleanup function exists'
);

select is(
  has_function_privilege(
    'anon',
    'public.purge_expired_interest_data()',
    'EXECUTE'
  ),
  false,
  'anonymous users cannot execute retention cleanup'
);

select has_table(
  'public',
  'interest_review_events',
  'operator review audit table exists'
);

select is(
  has_table_privilege('anon', 'public.interest_review_events', 'SELECT'),
  false,
  'anonymous users cannot read review events'
);

select has_function(
  'public',
  'review_interest_registration',
  array['uuid', 'text', 'text', 'text'],
  'atomic review function exists'
);

select is(
  has_function_privilege(
    'authenticated',
    'public.review_interest_registration(uuid,text,text,text)',
    'EXECUTE'
  ),
  false,
  'authenticated users cannot execute reviews'
);

select * from finish();

rollback;
