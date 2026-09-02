"use client";

import { useLang } from "@/components/site/language-provider";
import { booking } from "@/lib/site-content";
import { BookingWidget } from "@/components/site/booking-widget";

export default function ReservationPage() {
  const { lang } = useLang();
  const t = booking[lang];

  return (
    <div className="mx-auto max-w-6xl px-[5vw] py-16">
      <div className="mb-8">
        <div className="mb-1.5 text-sm font-semibold text-brass">{t.kicker}</div>
        <h2 className="max-w-[24ch] text-[1.9rem]">{t.h}</h2>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {t.priceCards.map((card) => (
          <div key={card.h} className="rounded border border-paper-dark bg-white p-6">
            <h4 className="mb-3.5 inline-block border-b-2 border-sand pb-1 text-base text-forest">
              {card.h}
            </h4>
            {card.lines.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-b border-dashed border-paper-dark py-2.5 text-[0.92rem] last:border-b-0"
              >
                <span>{label}</span>
                <b className="text-forest-deep">{value}</b>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="mb-1.5 text-sm font-semibold text-brass">{t.widgetKicker}</div>
        <h2 className="text-[1.9rem]">{t.widgetH}</h2>
      </div>
      <BookingWidget />
    </div>
  );
}
