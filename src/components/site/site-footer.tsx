"use client";

import { useLang } from "@/components/site/language-provider";
import { footer } from "@/lib/site-content";

export function SiteFooter() {
  const { lang } = useLang();
  const t = footer[lang];

  return (
    <footer className="mt-[70px] bg-forest-deep px-[5vw] pb-6 pt-11 text-paper-dark">
      <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-6">
        <div>
          <div className="font-serif text-lg text-paper">Golf d&apos;Oka</div>
          <p className="mt-2.5 max-w-[32ch] text-sm">{t.address}</p>
        </div>
        <div className="text-right">
          <p className="m-0 text-sm">{t.line1}</p>
          <p className="m-0 text-sm">{t.line2}</p>
        </div>
      </div>
    </footer>
  );
}
