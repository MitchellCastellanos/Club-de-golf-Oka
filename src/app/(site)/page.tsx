"use client";

import Link from "next/link";
import { useLang } from "@/components/site/language-provider";
import { HeroScene } from "@/components/site/hero-scene";
import { home } from "@/lib/site-content";

export default function HomePage() {
  const { lang } = useLang();
  const t = home[lang];

  return (
    <>
      <div className="relative overflow-hidden bg-forest-deep">
        <div className="relative z-[3] mx-auto max-w-6xl px-[5vw] pt-24 text-paper">
          <div className="mb-2.5 text-sm text-sand-light">{t.eyebrow}</div>
          <h1 className="max-w-[11ch] font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] text-white">
            {t.title}
          </h1>
          <p className="max-w-[46ch] text-[1.08rem] text-paper-dark">
            {t.lead}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/reservation"
              className="rounded bg-brass px-6 py-3.5 font-semibold text-white transition hover:-translate-y-px hover:bg-[#875c1f]"
            >
              {t.cta1}
            </Link>
            <Link
              href="/mariages"
              className="rounded border border-white/45 px-6 py-3.5 font-semibold text-paper transition hover:-translate-y-px hover:border-white"
            >
              {t.cta2}
            </Link>
          </div>
          <HeroScene />
        </div>
        <div className="relative z-[3] mt-[-2px] flex flex-wrap border-t border-white/[.18] px-[5vw]">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap">
            {t.stats.map(([value, label]) => (
              <div key={label} className="min-w-[150px] flex-1 py-5 pr-8">
                <b className="block font-serif text-[1.7rem] text-sand-light">
                  {value}
                </b>
                <span className="text-[0.82rem] text-paper-dark">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-[5vw]">
        <section className="grid grid-cols-1 gap-14 py-[70px] md:grid-cols-[1.1fr_.9fr]">
          <div>
            <h2 className="max-w-[16ch] text-[2rem]">{t.introTitle}</h2>
            <p>{t.introP1}</p>
            <p>{t.introP2}</p>
            <Link
              href="/reservation"
              className="mt-1.5 inline-block rounded bg-brass px-6 py-3.5 font-semibold text-white hover:bg-[#875c1f]"
            >
              {t.introCta}
            </Link>
          </div>
          <div className="flex flex-col">
            {t.features.map((f) => (
              <div key={f.h} className="border-t border-paper-dark py-5 last:border-b">
                <h4 className="mb-1 text-[1.05rem] text-forest">{f.h}</h4>
                <p className="m-0 text-[0.92rem]">{f.p}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="my-16 -mx-[5vw] bg-forest px-[5vw] py-[54px] text-paper">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-white">{t.bandH}</h3>
              <p className="m-0 text-paper-dark">{t.bandP}</p>
            </div>
            <Link
              href="/reservation"
              className="rounded bg-brass px-6 py-3.5 font-semibold text-white hover:bg-[#875c1f]"
            >
              {t.bandCta}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
