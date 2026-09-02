-- Club de Golf d'Oka — Fase 0: esquema inicial
-- Basado en el modelo de datos borrador del plan ejecutivo (seccion 4).
-- Refinado con tipos, restricciones e indices; sujeto a ajuste en fases posteriores.

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- users: cuentas del panel administrativo (gerencia / recepcion / boutique)
-- ---------------------------------------------------------------------------
create table public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users (id) on delete set null,
  name text not null,
  email text not null unique,
  role text not null check (role in ('gerencia', 'recepcion', 'boutique')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger users_set_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- tee_slots: horarios de salida disponibles
-- ---------------------------------------------------------------------------
create table public.tee_slots (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time time not null,
  holes smallint not null check (holes in (9, 18)),
  capacity smallint not null check (capacity > 0),
  status text not null default 'open' check (status in ('open', 'blocked', 'full', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (date, time)
);
create index tee_slots_date_idx on public.tee_slots (date);
create trigger tee_slots_set_updated_at
  before update on public.tee_slots
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- bookings: reservas de tee_slots
-- ---------------------------------------------------------------------------
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  tee_slot_id uuid not null references public.tee_slots (id) on delete restrict,
  customer_name text not null,
  email text not null,
  phone text,
  players smallint not null check (players > 0),
  cart_addon boolean not null default false,
  total numeric(10, 2) not null default 0 check (total >= 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'no_show')),
  confirmation_code text not null unique default upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index bookings_tee_slot_id_idx on public.bookings (tee_slot_id);
create index bookings_email_idx on public.bookings (email);
create index bookings_status_idx on public.bookings (status);
create trigger bookings_set_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- members: socios / abonados
-- ---------------------------------------------------------------------------
create table public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  plan_type text not null,
  start_date date not null,
  renewal_date date,
  status text not null default 'active' check (status in ('active', 'expired', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index members_status_idx on public.members (status);
create trigger members_set_updated_at
  before update on public.members
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- gift_cards: tarjetas regalo
-- ---------------------------------------------------------------------------
create table public.gift_cards (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  value numeric(10, 2) not null check (value > 0),
  purchased_by text,
  purchased_at timestamptz not null default now(),
  status text not null default 'active' check (status in ('active', 'redeemed', 'expired', 'cancelled')),
  redeemed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index gift_cards_status_idx on public.gift_cards (status);
create trigger gift_cards_set_updated_at
  before update on public.gift_cards
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- tournaments + tournament_signups
-- ---------------------------------------------------------------------------
create table public.tournaments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  date date not null,
  capacity smallint not null check (capacity > 0),
  status text not null default 'open' check (status in ('open', 'full', 'closed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index tournaments_date_idx on public.tournaments (date);
create trigger tournaments_set_updated_at
  before update on public.tournaments
  for each row execute function public.set_updated_at();

create table public.tournament_signups (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments (id) on delete cascade,
  name text not null,
  email text not null,
  players smallint not null default 1 check (players > 0),
  created_at timestamptz not null default now()
);
create index tournament_signups_tournament_id_idx on public.tournament_signups (tournament_id);

-- ---------------------------------------------------------------------------
-- wedding_inquiries: pipeline de bodas
-- ---------------------------------------------------------------------------
create table public.wedding_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  date_requested date,
  guests smallint,
  package text,
  stage text not null default 'new' check (
    stage in ('new', 'contacted', 'proposal_sent', 'confirmed', 'lost')
  ),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index wedding_inquiries_stage_idx on public.wedding_inquiries (stage);
create trigger wedding_inquiries_set_updated_at
  before update on public.wedding_inquiries
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- subscribers: infolettre (LCAP: se conserva source + timestamps para prueba de opt-in)
-- ---------------------------------------------------------------------------
create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  subscribed_at timestamptz not null default now(),
  status text not null default 'subscribed' check (status in ('subscribed', 'unsubscribed')),
  unsubscribed_at timestamptz
);
create index subscribers_status_idx on public.subscribers (status);

-- ---------------------------------------------------------------------------
-- price_settings: valores configurables desde el admin (tarifas, etc.)
-- ---------------------------------------------------------------------------
create table public.price_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
create trigger price_settings_set_updated_at
  before update on public.price_settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Por defecto: sin acceso publico. El acceso se otorga via policies en fases
-- posteriores (Fase 1+) segun cada tabla (p.ej. lectura publica de tee_slots
-- disponibles, escritura de bookings via API route con service role, etc.)
-- ---------------------------------------------------------------------------
alter table public.users enable row level security;
alter table public.tee_slots enable row level security;
alter table public.bookings enable row level security;
alter table public.members enable row level security;
alter table public.gift_cards enable row level security;
alter table public.tournaments enable row level security;
alter table public.tournament_signups enable row level security;
alter table public.wedding_inquiries enable row level security;
alter table public.subscribers enable row level security;
alter table public.price_settings enable row level security;
