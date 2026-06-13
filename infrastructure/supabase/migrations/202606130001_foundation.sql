-- Foundation migration only. Product tables are intentionally deferred.

create extension if not exists pgcrypto with schema extensions;

comment on schema public is
  'Phase-one application schema. Every future user-facing table must enable RLS.';

