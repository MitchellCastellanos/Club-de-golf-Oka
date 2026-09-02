import { createClient } from "@/lib/supabase/server";

export async function AdminTopbar({ title }: { title: string }) {
  let email: string | null = null;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    email = user?.email ?? null;
  }

  return (
    <div className="flex items-center justify-between border-b border-paper-dark bg-white px-7 py-4">
      <h2 className="m-0 font-serif text-[1.3rem] text-forest-deep">{title}</h2>
      <div className="flex items-center gap-2.5 text-[0.82rem] text-ink-soft">
        {email ? (
          <>
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-brass text-[0.78rem] font-bold text-white">
              {email.slice(0, 2).toUpperCase()}
            </div>
            {email}
          </>
        ) : (
          <span className="rounded bg-[#F4EBD6] px-2.5 py-1 text-brass">
            Supabase non connecté — donnees de demonstration
          </span>
        )}
      </div>
    </div>
  );
}
