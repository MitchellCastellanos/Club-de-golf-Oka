"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/components/site/language-provider";
import { booking } from "@/lib/site-content";
import { PaymentModal, type BookingSelection } from "@/components/site/payment-modal";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function buildTimes() {
  const times: string[] = [];
  for (let h = 7; h <= 17; h++) {
    times.push(`${String(h).padStart(2, "0")}:00`);
    times.push(`${String(h).padStart(2, "0")}:20`);
    times.push(`${String(h).padStart(2, "0")}:40`);
  }
  return times;
}

/** Hash deterministico (misma disponibilidad en servidor y cliente para una fecha+hora dadas). */
function isSlotTaken(date: string, time: string) {
  let hash = 0;
  const key = `${date}${time}`;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % 100 < 28;
}

export function BookingWidget() {
  const { lang } = useLang();
  const t = booking[lang];

  const [date, setDate] = useState(todayIso());
  const [players, setPlayers] = useState(2);
  const [holes, setHoles] = useState<9 | 18>(9);
  const [cart, setCart] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const times = useMemo(() => buildTimes(), []);
  const taken = useMemo(() => {
    const map: Record<string, boolean> = {};
    times.forEach((time) => {
      map[time] = isSlotTaken(date, time);
    });
    return map;
  }, [date, times]);

  function onDateChange(value: string) {
    setDate(value);
    setSelectedSlot(null);
  }

  const greenUnit = holes === 18 ? 36 : 28;
  const cartUnit = holes === 18 ? 18 : 14;
  const greenTotal = greenUnit * players;
  const cartTotal = cart ? cartUnit * players : 0;
  const total = greenTotal + cartTotal;

  const selection: BookingSelection | null = selectedSlot
    ? { date, time: selectedSlot, holes, players, cart, total }
    : null;

  return (
    <div className="mb-16 rounded-md border border-paper-dark bg-white p-7">
      <div className="grid gap-7 md:grid-cols-[220px_1fr_260px]">
        <div>
          <FieldWrap label={t.date}>
            <input
              type="date"
              value={date}
              min={todayIso()}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full rounded border border-paper-dark bg-paper px-3 py-2.5 text-[0.94rem]"
            />
          </FieldWrap>
          <FieldWrap label={t.players}>
            <select
              value={players}
              onChange={(e) => setPlayers(Number(e.target.value))}
              className="w-full rounded border border-paper-dark bg-paper px-3 py-2.5 text-[0.94rem]"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </FieldWrap>
          <FieldWrap label={t.holes}>
            <select
              value={holes}
              onChange={(e) => setHoles(Number(e.target.value) as 9 | 18)}
              className="w-full rounded border border-paper-dark bg-paper px-3 py-2.5 text-[0.94rem]"
            >
              <option value={9}>{t.hole9}</option>
              <option value={18}>{t.hole18}</option>
            </select>
          </FieldWrap>
          <label className="flex items-center gap-2 text-[0.85rem] font-semibold text-ink-soft">
            <input
              type="checkbox"
              checked={cart}
              onChange={(e) => setCart(e.target.checked)}
              className="h-auto w-auto"
            />
            <span>{t.cart}</span>
          </label>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-ink-soft">
            {t.slots}
          </label>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] gap-2">
            {times.map((time) => {
              const isTaken = taken[time];
              const isSelected = selectedSlot === time;
              return (
                <button
                  key={time}
                  disabled={isTaken}
                  onClick={() => setSelectedSlot(time)}
                  className={`rounded border px-1.5 py-2.5 text-center text-[0.86rem] transition-colors ${
                    isTaken
                      ? "cursor-not-allowed border-paper-dark bg-[#EEE9DA] text-[#b7b0a0] line-through"
                      : isSelected
                        ? "border-forest bg-forest text-white"
                        : "border-paper-dark bg-paper text-ink hover:border-brass"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded bg-paper-dark p-5">
          <h4 className="mb-3 text-[0.95rem]">{t.summary}</h4>
          {!selectedSlot ? (
            <div className="text-[0.86rem] italic text-ink-soft">{t.empty}</div>
          ) : (
            <div>
              <CartLine label={`${date} — ${selectedSlot}`} value={`${players} ${lang === "fr" ? "pers." : "players"}`} />
              <CartLine label={t.priceCards[0].h} value={`${greenTotal} $`} />
              {cart && <CartLine label={t.cart.split("(")[0]} value={`${cartTotal} $`} />}
              <div className="mt-2 flex justify-between border-t border-[#d7cfae] pt-2.5 font-bold text-forest-deep">
                <span>Total</span>
                <span>{total} $</span>
              </div>
            </div>
          )}
          <button
            disabled={!selectedSlot}
            onClick={() => setShowModal(true)}
            className="mt-3.5 w-full rounded bg-brass py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#cbbfa0]"
          >
            {t.pay}
          </button>
        </div>
      </div>

      {showModal && selection && (
        <PaymentModal selection={selection} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

function FieldWrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-xs font-semibold text-ink-soft">{label}</label>
      {children}
    </div>
  );
}

function CartLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 text-[0.86rem] text-ink-soft">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
