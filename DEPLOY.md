# Checklist de despliegue — solo falta meter las llaves

El proyecto ya esta conectado a Vercel (`club-de-golf-oka`, equipo
`mitchellcastellanos-projects`) via GitHub. El codigo funciona en **modo
demo** sin ninguna variable de entorno — reservas y solicitudes de boda no
persisten y no se envia correo real, pero todo el flujo se puede mostrar tal
cual.

Estos son los unicos pasos manuales que faltan, todos fuera de este repo:

## 1. Supabase (persistencia real)

1. Crea un proyecto gratis en [supabase.com](https://supabase.com).
2. En el SQL editor del proyecto, corre el contenido de
   `supabase/migrations/0001_init_schema.sql` (crea las 10 tablas del
   modelo de datos, con RLS habilitado).
3. Copia de **Project Settings → API**:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (secreta, no la publiques) → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Resend (correos reales)

1. Crea una cuenta gratis en [resend.com](https://resend.com).
2. Agrega y verifica un dominio para enviar correo — recomendado usar un
   subdominio de `gabansolutions.ca` para la demo (p.ej.
   `demo.gabansolutions.ca`), sin tocar el dominio final del club todavia.
   Resend te da los registros DNS (TXT/CNAME) para pegar donde tengan el
   DNS de `gabansolutions.ca`.
3. Copia la API key → `RESEND_API_KEY`.
4. Define `EMAIL_FROM`, p.ej.
   `Golf d'Oka (demo) <reservations@demo.gabansolutions.ca>`.

## 3. Vercel — pegar las variables

En el proyecto `club-de-golf-oka` en Vercel → **Settings → Environment
Variables**, agrega las 5 variables de arriba (Production y Preview).
Vercel redeploya automaticamente al guardar, o puedes forzar un redeploy
manual.

## 4. Crear tu primer usuario admin

El panel `/admin` esta protegido con Supabase Auth de verdad (no un login
de mentiritas) — sin una cuenta creada, nadie entra, ni siquiera con las
keys puestas.

1. En Supabase → **Authentication → Users → Add user**, crea tu usuario
   (correo + contraseña).
2. Opcionalmente, agrega una fila en la tabla `users` con ese mismo correo
   y `role = 'gerencia'` (por ahora el panel no filtra por rol todavia,
   pero la columna ya existe para cuando se agregue).
3. Entra en `/admin/login` con ese correo y contraseña.

## Importante — falta un paso para que se vea el trabajo actual

Todo este trabajo vive en la rama `claude/golf-oka-product-lb2017`. Vercel
esta desplegando `main`, que todavia es solo el README original. **Hace
falta fusionar (merge) o abrir un PR de esta rama a `main`** para que el
link publico de Vercel muestre el sitio real — dime si quieres que abra
el PR o prefieres hacerlo tu mismo al llegar.

## Que sigue funcionando distinto una vez conectado

- `/reservation`: las reservas confirmadas se guardan en `bookings` +
  `tee_slots`, y el correo de confirmacion sale de verdad.
- `/mariages`: las solicitudes se guardan en `wedding_inquiries`.
- `/admin`, `/admin/reservations`, `/admin/mariages`: dejan de mostrar
  "Supabase non connecté" y muestran los datos reales, y quedan detras del
  login.
