"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const groups: {
  label: string;
  items: { href?: string; label: string }[];
}[] = [
  {
    label: "VUE D'ENSEMBLE",
    items: [{ href: "/admin", label: "Tableau de bord" }],
  },
  {
    label: "OPÉRATIONS",
    items: [
      { href: "/admin/reservations", label: "Réservations" },
      { label: "Tarifs & produits" },
      { label: "Socios & abonos" },
      { label: "Boutique / cartes-cadeaux" },
    ],
  },
  {
    label: "ÉVÉNEMENTS",
    items: [
      { label: "Tournois & ligues" },
      { href: "/admin/mariages", label: "Mariages / événements" },
    ],
  },
  {
    label: "MARKETING",
    items: [{ label: "Infolettre" }, { label: "Galerie" }],
  },
  {
    label: "GESTION",
    items: [{ label: "Rapports" }, { label: "Utilisateurs & accès" }],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="sticky top-0 h-screen overflow-y-auto bg-forest-deep px-3.5 py-6 text-paper">
      <div className="mb-5 px-2.5 pb-2">
        <div className="font-serif text-[1.15rem]">Golf d&apos;Oka</div>
        <div className="mt-0.5 text-[0.6rem] tracking-wider text-sand-light">
          ADMINISTRATION
        </div>
      </div>

      {groups.map((g) => (
        <div key={g.label} className="mb-4">
          <div className="px-2.5 pb-1.5 text-[0.68rem] tracking-wide text-[#7f8a76]">
            {g.label}
          </div>
          {g.items.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2.5 rounded px-2.5 py-2 text-[0.87rem] ${
                  pathname === item.href
                    ? "bg-forest text-white"
                    : "text-paper-dark hover:bg-white/[.06]"
                }`}
              >
                <span
                  className={`h-[7px] w-[7px] rounded-full ${
                    pathname === item.href ? "bg-sand" : "bg-current opacity-50"
                  }`}
                />
                {item.label}
              </Link>
            ) : (
              <div
                key={item.label}
                className="flex cursor-not-allowed items-center gap-2.5 rounded px-2.5 py-2 text-[0.87rem] text-paper-dark/40"
                title="Bientôt disponible"
              >
                <span className="h-[7px] w-[7px] rounded-full bg-current opacity-30" />
                {item.label}
              </div>
            ),
          )}
        </div>
      ))}

      <button
        onClick={signOut}
        className="mt-4 px-2.5 text-[0.8rem] text-paper-dark underline"
      >
        Se déconnecter
      </button>
    </div>
  );
}
