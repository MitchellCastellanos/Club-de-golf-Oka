"use client";

import { useLang } from "@/components/site/language-provider";
import { contact, clubInfo } from "@/lib/site-content";

export default function ContactPage() {
  const { lang } = useLang();
  const t = contact[lang];

  return (
    <div className="mx-auto max-w-6xl px-[5vw] py-16">
      <div className="mb-8">
        <div className="mb-1.5 text-sm font-semibold text-brass">{t.kicker}</div>
        <h2 className="max-w-[24ch] text-[1.9rem]">{t.h}</h2>
      </div>
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
        <div>
          <ContactItem label={t.addr} value={clubInfo.address} />
          <ContactItem label={t.tel} value={clubInfo.phone} />
          <ContactItem label={t.mail} value={clubInfo.email} />
          <ContactItem label={t.season} value={t.seasonV} />
        </div>
        <svg viewBox="0 0 400 260" className="rounded-md">
          <rect width="400" height="260" fill="#E8E0C8" />
          <rect y="180" width="400" height="80" fill="#8FB9CC" />
          <polygon points="0,180 60,60 120,180" fill="#3E624A" />
          <polygon points="90,180 150,40 210,180" fill="#2E4E3A" />
          <polygon points="260,180 320,55 380,180" fill="#3E624A" />
          <circle cx="200" cy="150" r="8" fill="#9C6B26" />
          <text
            x="200"
            y="140"
            textAnchor="middle"
            fontFamily="Georgia,serif"
            fontSize="12"
            fill="#20241C"
          >
            345, St-Michel, Oka
          </text>
        </svg>
      </div>
    </div>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-paper-dark py-3.5">
      <b className="mb-0.5 block text-xs text-brass">{label}</b>
      {value}
    </div>
  );
}
