# Club de Golf d'Oka

Aplicacion real (Next.js + Supabase) para el Club de Golf d'Oka. Objetivo
inmediato: una demo clickable y con flujo end-to-end (reserva con calendario
real, pago simulado, correo de confirmacion, panel admin) para presentarle
al club, tal que conectar Supabase/Resend/Vercel con llaves reales sea el
unico paso que falta.

**Para desplegar ya con datos y correos reales, ver [`DEPLOY.md`](./DEPLOY.md).**

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
render HTML y las plantillas de confirmacion de reserva y solicitud de boda
ya existen (`src/lib/email/`); falta una cuenta de Resend + dominio
verificado para que salgan de verdad, y portar las 5 plantillas restantes
de `golf-oka-emails.html` (bienvenida, baja, cambio/cancelacion de
reserva, recordatorio, recibo).

**Fase 4 — panel administrativo: en curso.** `/admin` esta construido y
protegido con Supabase Auth de verdad (`src/proxy.ts`, `src/app/admin/`):
- `/admin` (dashboard con KPIs y reservas recientes), `/admin/reservations`
  (tabla completa), `/admin/mariages` (pipeline por etapa). Todas leen de
  Supabase con el cliente service-role (`src/lib/admin-data.ts`).
- Sin sesion de Supabase Auth, redirige a `/admin/login`. Sin
  `NEXT_PUBLIC_SUPABASE_URL` configurada, el proxy no bloquea (no hay nada
  real que proteger todavia) y las paginas muestran un estado vacio claro.
- Pendiente: modulos de `golf-oka-admin.html` que aun no se construyeron
  (Tarifs & produits, Socios, Boutique, Tournois, Infolettre, Galerie,
  Rapports, Utilisateurs) — aparecen en el menu como "próximamente", sin
  enlace todavia. Tampoco hay filtrado por rol (la columna `role` en
  `users` ya existe, falta aplicarla).

**Hosting:** Vercel ya esta conectado (proyecto `club-de-golf-oka`, equipo
`mitchellcastellanos-projects`, via GitHub), y ese mismo equipo es dueño de
`gabansolutions.ca` — util como dominio de demo (envio de correos de
prueba) antes de conectar el dominio final del club. **Importante:**
Vercel esta desplegando la rama `main`, que todavia no tiene este trabajo
— hace falta un PR/merge de `claude/golf-oka-product-lb2017` para que el
link publico lo muestre (ver `DEPLOY.md`).

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # opcional: agrega claves de Supabase/Resend
npm run dev
```

Sin `.env.local`, el sitio funciona igual en modo demo (sin persistencia
ni envio real de correos, y `/admin` sin proteccion porque no hay nada
real que proteger).

## Base de datos

El esquema vive en `supabase/migrations/`. Para aplicarlo a un proyecto
Supabase, usa la Supabase CLI o el SQL editor (ver `DEPLOY.md`):

```bash
supabase link --project-ref <project-ref>
supabase db push
```

## Variables de entorno

Ver `.env.example`. `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
+ `SUPABASE_SERVICE_ROLE_KEY` activan la persistencia real y protegen
`/admin` con Supabase Auth; `RESEND_API_KEY` + `EMAIL_FROM` activan el
envio real de correos. Ninguna es obligatoria para correr el sitio en modo
demo.
