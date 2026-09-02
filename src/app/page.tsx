export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-paper px-6">
      <main className="max-w-xl space-y-4 py-24 text-center sm:text-left">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-forest-deep">
          Club de Golf d&apos;Oka
        </h1>
        <p className="text-ink-soft">
          Fase 0: scaffolding del proyecto (Next.js + Supabase) y sistema de
          diseno compartido (
          <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">
            src/lib/theme.ts
          </code>
          ) extraidos de las 3 maquetas en{" "}
          <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">
            design/mockups/
          </code>
          . La reconstruccion del sitio publico llega en la Fase 1.
        </p>
      </main>
    </div>
  );
}
