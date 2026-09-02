"use client";

import { useState } from "react";
import { useLang } from "@/components/site/language-provider";
import { events } from "@/lib/site-content";

export default function TournoisPage() {
  const { lang } = useLang();
  const t = events[lang];
  const [registered, setRegistered] = useState<Record<number, boolean>>({});

  return (
    <div className="mx-auto max-w-6xl px-[5vw] py-16">
      <div className="mb-8">
        <div className="mb-1.5 text-sm font-semibold text-brass">{t.kicker}</div>
        <h2 className="max-w-[24ch] text-[1.9rem]">{t.h}</h2>
        <p>{t.p}</p>
      </div>

      <div>
        {t.list.map((ev, i) => (
          <div
            key={ev.t}
            className="flex flex-wrap items-center justify-between gap-4 border-t border-paper-dark py-6 last:border-b"
          >
            <div className="min-w-[120px] font-serif text-forest">
              <b className="block text-[1.4rem]">{ev.d}</b>
              {ev.m}
            </div>
            <div className="flex-1">
              <h4 className="mb-0.5 text-[1.05rem]">{ev.t}</h4>
              <p className="m-0 text-[0.86rem]">{ev.s}</p>
            </div>
            <button
              disabled={registered[i]}
              onClick={() => setRegistered((r) => ({ ...r, [i]: true }))}
              className="rounded bg-brass px-4 py-2.5 text-[0.85rem] font-semibold text-white disabled:opacity-60"
            >
              {registered[i] ? t.registered : t.register}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
