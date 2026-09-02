# Club de Golf d'Oka

Aplicacion real (Next.js + Supabase) para el Club de Golf d'Oka, construida a
partir del plan ejecutivo "de maqueta a producto real".

## Estado — Fase 0

Scaffolding inicial del proyecto:

- Next.js (App Router, TypeScript, Tailwind CSS v4) en `src/`.
- Cliente de Supabase (`src/lib/supabase/client.ts` para browser,
  `src/lib/supabase/server.ts` para Server Components/Route Handlers).
- Esquema de base de datos inicial en `supabase/migrations/0001_init_schema.sql`,
  siguiendo el modelo de datos borrador del plan (tee_slots, bookings,
  members, gift_cards, tournaments, tournament_signups, wedding_inquiries,
  subscribers, users, price_settings), con RLS habilitado (sin policies aun;
  se definen en fases posteriores segun cada tabla).

**Pendiente / bloqueado:** el plan ejecutivo indica que el sistema de diseno
(colores, tipografias, componentes) debe extraerse de 3 maquetas HTML
(`golf-oka-maqueta.html`, `golf-oka-emails.html`, `golf-oka-admin.html`), que
son la fuente de verdad visual. Esos archivos no estan en el repositorio ni
fueron adjuntados todavia. Los tokens en `src/app/globals.css` son un
placeholder (verde de golf + dorado) y deben reemplazarse por los valores
reales en cuanto se compartan las maquetas — ver el comentario al inicio de
ese archivo.

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

1. Reemplazar los tokens de diseno placeholder por los extraidos de las 3
   maquetas HTML.
2. Fase 1: reconstruir el sitio publico, calendario de reservas real, i18n
   FR/EN.
3. Fase 2: integracion de pagos (procesador aun por decidir — ver plan,
   seccion 2).
4. Fase 3: correos transaccionales (proveedor aun por decidir).
5. Fase 4: panel administrativo con autenticacion y roles.
