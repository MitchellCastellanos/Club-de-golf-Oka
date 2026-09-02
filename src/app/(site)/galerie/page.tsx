"use client";

import { useLang } from "@/components/site/language-provider";
import { gallery } from "@/lib/site-content";

const gradientColors = ["#22422F", "#3C6E8F", "#3E624A", "#14261C", "#2A4E64", "#1E3B2C"];

export default function GaleriePage() {
  const { lang } = useLang();
  const t = gallery[lang];

  return (
    <div className="mx-auto max-w-6xl px-[5vw] py-16">
      <div className="mb-8">
        <div className="mb-1.5 text-sm font-semibold text-brass">{t.kicker}</div>
        <h2 className="max-w-[24ch] text-[1.9rem]">{t.h}</h2>
        <p>{t.p}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {t.items.map((label, i) => (
          <div
            key={label}
            className="flex h-[190px] items-end rounded p-3.5"
            style={{
              background: `linear-gradient(160deg, ${gradientColors[i % gradientColors.length]}, #C7A768)`,
            }}
          >
            <span className="text-[0.82rem] font-semibold text-white drop-shadow">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
