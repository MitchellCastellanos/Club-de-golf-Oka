"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/components/site/language-provider";
import { nav } from "@/lib/site-content";

const links = [
  { href: "/", key: "home" as const },
  { href: "/reservation", key: "book" as const },
  { href: "/tournois", key: "events" as const },
  { href: "/mariages", key: "wedding" as const },
  { href: "/galerie", key: "gallery" as const },
  { href: "/contact", key: "contact" as const },
];

export function SiteHeader() {
  const { lang, setLang } = useLang();
  const t = nav[lang];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-forest-deep px-[5vw] text-paper">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-serif text-[1.32rem]">Golf d&apos;Oka</span>
          <span className="text-[0.62rem] tracking-wider text-sand-light">
            {t.since}
          </span>
        </Link>

        <button
          className="text-2xl text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          ☰
        </button>

        <nav
          className={`${
            open ? "flex" : "hidden"
          } absolute inset-x-0 top-[72px] flex-col gap-0 bg-forest-deep px-[5vw] pb-4 md:static md:flex md:flex-row md:items-center md:gap-0.5 md:bg-transparent md:px-0 md:pb-0`}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded px-3.5 py-2.5 text-[0.92rem] transition-colors hover:bg-white/10 ${
                pathname === l.href ? "bg-forest text-sand-light" : ""
              }`}
            >
              {t[l.key]}
            </Link>
          ))}
          <Link
            href="/reservation"
            onClick={() => setOpen(false)}
            className="ml-1.5 mt-2 rounded bg-brass px-4 py-2.5 text-center font-semibold text-white hover:bg-[#875c1f] md:mt-0"
          >
            {t.cta}
          </Link>
          <div className="mt-3 flex overflow-hidden rounded-full border border-white/30 md:ml-3.5 md:mt-0">
            <button
              onClick={() => setLang("fr")}
              className={`px-3 py-1.5 text-[0.74rem] font-semibold ${
                lang === "fr" ? "bg-sand text-forest-deep" : "text-paper"
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 text-[0.74rem] font-semibold ${
                lang === "en" ? "bg-sand text-forest-deep" : "text-paper"
              }`}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
