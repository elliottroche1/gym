-- Gym log: run this once in Supabase → SQL Editor → New query → Run.
-- Creates four gym_ tables (safe alongside another app) and locks every row to the signed-in user.

create extension if not exists pgcrypto;

-- ---------- exercises ----------
create table if not exists public.gym_exercises (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name           text not null,
  day            text not null check (day in ('push','pull','legs','other')),
  kind           text not null default 'weight' check (kind in ('weight','bodyweight','swing')),
  working_weight numeric not null default 0,      -- current prescribed weight (kg; added kg for bodyweight moves)
  ww_updated_on  date not null default current_date, -- progression rule only looks at sessions after this
  increment      numeric not null default 5,      -- kg added when progression rule fires
  target_reps    int not null default 5,
  target_sets    int not null default 3,
  core           boolean not null default true,   -- shows on its day's screen; false = occasional extra
  sort_order     int not null default 0,
  archived       boolean not null default false,
  created_at     timestamptz not null default now()
);

-- ---------- sets (one row per working set) ----------
create table if not exists public.gym_sets (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  exercise_id uuid not null references public.gym_exercises(id) on delete cascade,
  done_on     date not null default current_date,
  weight      numeric not null default 0,
  reps        int not null,
  is_test     boolean not null default false,     -- max attempt, excluded from progression rule
  note        text,
  created_at  timestamptz not null default now()
);
create index if not exists gym_sets_user_ex_date on public.gym_sets (user_id, exercise_id, done_on);

-- ---------- cardio warm-ups ----------
create table if not exists public.gym_cardio (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  done_on    date not null default current_date,
  machine    text,
  minutes    numeric,
  calories   int,
  distance   numeric,                             -- miles, optional
  created_at timestamptz not null default now()
);

-- ---------- bodyweight ----------
create table if not exists public.gym_bodyweight (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  measured_on date not null default current_date,
  kg          numeric not null,
  created_at  timestamptz not null default now()
);

-- ---------- row-level security: you only ever see your own rows ----------
alter table public.gym_exercises  enable row level security;
alter table public.gym_sets       enable row level security;
alter table public.gym_cardio     enable row level security;
alter table public.gym_bodyweight enable row level security;

drop policy if exists "own rows" on public.gym_exercises;
create policy "own rows" on public.gym_exercises
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "own rows" on public.gym_sets;
create policy "own rows" on public.gym_sets
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "own rows" on public.gym_cardio;
create policy "own rows" on public.gym_cardio
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "own rows" on public.gym_bodyweight;
create policy "own rows" on public.gym_bodyweight
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Nothing for anonymous visitors: no policies for the anon role = no access.
