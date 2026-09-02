export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-neutral-50 px-6">
      <main className="max-w-xl space-y-4 py-24 text-center sm:text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-primary-dark">
          Club de Golf d&apos;Oka
        </h1>
        <p className="text-neutral-900/80">
          Fase 0: scaffolding del proyecto (Next.js + Supabase) en curso. El
          sitio publico todavia no reproduce la maqueta visual (
          <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">
            golf-oka-maqueta.html
          </code>
          ) porque ese archivo aun no fue compartido en el repositorio.
        </p>
      </main>
    </div>
  );
}
