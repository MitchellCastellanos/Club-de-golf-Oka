# Club de Golf d'Oka

Aplicacion real (Next.js + Supabase) para el Club de Golf d'Oka, construida a
partir del plan ejecutivo "de maqueta a producto real".

## Estado — Fase 0 (completa)

- Next.js (App Router, TypeScript, Tailwind CSS v4) en `src/`.
- Cliente de Supabase (`src/lib/supabase/client.ts` para browser,
  `src/lib/supabase/server.ts` para Server Components/Route Handlers).
- Esquema de base de datos inicial en `supabase/migrations/0001_init_schema.sql`,
  siguiendo el modelo de datos borrador del plan (tee_slots, bookings,
  members, gift_cards, tournaments, tournament_signups, wedding_inquiries,
  subscribers, users, price_settings), con RLS habilitado (sin policies aun;
  se definen en fases posteriores segun cada tabla).
- Las 3 maquetas HTML (fuente de verdad visual) viven en `design/mockups/`:
  `golf-oka-maqueta.html` (sitio publico), `golf-oka-emails.html` (correos)
  y `golf-oka-admin.html` (panel admin). Los tres comparten exactamente la
  misma paleta y tipografia.
- Sistema de diseno compartido extraido de las maquetas: `src/lib/theme.ts`
  (tokens en TypeScript, para reusar en React Email en Fase 3) y
  `src/app/globals.css` (los mismos tokens como variables CSS / Tailwind
  v4 `@theme`). No se modifico ningun valor visual de las maquetas.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completar con las claves del proyecto Supabase
npm run dev
```

## Base de datos

El esquema vive en `supabase/migrations/`. Para aplicarlo a un proyecto
Supabase, usa la Supabase CLI:

```bash
supabase link --project-ref <project-ref>
supabase db push
```

## Proximos pasos (segun el plan ejecutivo)

1. Fase 1: reconstruir el sitio publico a partir de
   `design/mockups/golf-oka-maqueta.html`, calendario de reservas real
   conectado a `tee_slots`, i18n FR/EN real (next-intl o similar).
2. Fase 2: integracion de pagos (procesador aun por decidir — ver plan,
   seccion 2).
3. Fase 3: correos transaccionales — migrar
   `design/mockups/golf-oka-emails.html` a componentes de React Email
   usando `src/lib/theme.ts` (proveedor de correo aun por decidir).
4. Fase 4: panel administrativo a partir de
   `design/mockups/golf-oka-admin.html`, con autenticacion (Supabase Auth)
   y roles (gerencia / recepcion / boutique).
