# Club de Golf d'Oka

Aplicacion real (Next.js + Supabase) para el Club de Golf d'Oka. Objetivo
inmediato: una demo clickable y con flujo end-to-end (reserva con calendario
real, pago simulado, correo de confirmacion) para presentarle al club, tal
que conectar su dominio, Supabase, proveedor de correo y procesador de pago
reales sea el unico paso que falta.

## Estado actual

**Fase 0 — completa.** Esquema de base de datos (`supabase/migrations/`),
maquetas de referencia en `design/mockups/` y sistema de diseno compartido
(`src/lib/theme.ts` + `src/app/globals.css`), extraidos sin alterar nada
visual.

**Fase 1 — sitio publico: en curso.**

- Construido y funcionando: `/` (accueil), `/reservation` (tarifas +
  calendario de reservas interactivo + modal de pago simulado),
  `/tournois`, `/mariages` (formulario real), `/galerie`, `/contact`.
  Toggle FR/EN funcional (`src/components/site/language-provider.tsx`).
- El flujo de reserva pega a una API real (`/api/bookings`,
  `/api/wedding-inquiries`) que:
  - Si `SUPABASE_SERVICE_ROLE_KEY` esta configurada, inserta la reserva/
    solicitud en Supabase de verdad (visible luego en el panel admin).
  - Si `RESEND_API_KEY` + `EMAIL_FROM` estan configuradas, envia el correo
    de confirmacion real (plantilla portada de
    `design/mockups/golf-oka-emails.html`, ver `src/lib/email/`).
  - Sin esas variables, todo sigue funcionando en **modo demo**: genera un
    codigo de confirmacion, no persiste nada y lo indica claramente en la
    UI — para poder mostrar la demo sin backend conectado.
- Pendiente en Fase 1: paginas de eventos/mariages podrian ganar mas
  contenido; el calendario usa disponibilidad simulada (determinista, no
  Math.random) hasta que se conecte a `tee_slots` real via Supabase.

**Fase 2 — pagos: no iniciada.** El modal de pago captura los datos pero no
llama a ningun procesador real (Stripe/Moneris/Helcim — pendiente decidir,
ver plan seccion 2). Para la demo esto es intencional: no se cobra a nadie.

**Fase 3 — correos: infraestructura lista, falta conectar proveedor.** El
render HTML y la plantilla de confirmacion de reserva ya existen
(`src/lib/email/`); falta una cuenta de Resend + dominio verificado para
que salgan de verdad, y portar las 7 plantillas restantes de
`golf-oka-emails.html`.

**Fase 4 — panel administrativo: no iniciada.** `design/mockups/golf-oka-admin.html`
sigue siendo solo la maqueta; falta reconstruirlo conectado a Supabase con
autenticacion y roles.

**Hosting:** Vercel ya esta conectado a esta cuenta (equipo
`mitchellcastellanos-projects`), que ademas es dueña del dominio
`gabansolutions.ca` — util como dominio de demo (hosting + envio de
correos de prueba) antes de conectar el dominio final del club.

## Lo que falta para el entregable de demo (pitch al club)

1. Un proyecto Supabase (gratis) — URL + anon key + service role key, para
   que las reservas y solicitudes de boda persistan de verdad.
2. Una cuenta de Resend (gratis) + un subdominio verificado, p.ej.
   `demo.gabansolutions.ca`, para que los correos de confirmacion lleguen
   de verdad durante la demo.
3. Decidir si se despliega ya un link de vista previa en Vercel (bajo
   `*.vercel.app` o un subdominio de `gabansolutions.ca`) para que el club
   pueda probarlo ellos mismos.
4. Fase 4 (panel admin) para cerrar el ciclo reserva → correo → visible en
   admin, que es el argumento de venta central.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # opcional: agrega claves de Supabase/Resend
npm run dev
```

Sin `.env.local`, el sitio funciona igual en modo demo (sin persistencia
ni envio real de correos).

## Base de datos

El esquema vive en `supabase/migrations/`. Para aplicarlo a un proyecto
Supabase, usa la Supabase CLI:

```bash
supabase link --project-ref <project-ref>
supabase db push
```

## Variables de entorno

Ver `.env.example`. `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
activan la persistencia real; `RESEND_API_KEY` + `EMAIL_FROM` activan el
envio real de correos. Ninguna es obligatoria para correr el sitio en modo
demo.
