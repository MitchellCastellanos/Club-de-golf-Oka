"use client";

import { useState } from "react";
import { useLang } from "@/components/site/language-provider";
import { booking } from "@/lib/site-content";

export type BookingSelection = {
  date: string;
  time: string;
  holes: 9 | 18;
  players: number;
  cart: boolean;
  total: number;
};

type Step = "form" | "paying" | "done" | "error";

export function PaymentModal({
  selection,
  onClose,
}: {
  selection: BookingSelection;
  onClose: () => void;
}) {
  const { lang } = useLang();
  const t = booking[lang];
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [result, setResult] = useState<{
    confirmationCode: string;
    persisted: boolean;
    emailSent: boolean;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit =
    name.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(email) &&
    cardName.trim().length > 1 &&
    cardNumber.replace(/\s/g, "").length >= 12 &&
    cardExp.length === 5 &&
    cardCvv.length === 3;

  async function submit() {
    setStep("paying");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selection.date,
          time: selection.time,
          holes: selection.holes,
          players: selection.players,
          cart: selection.cart,
          name,
          email,
          phone,
          lang,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Erreur inconnue");
      }
      const data = await res.json();
      setResult(data);
      setStep("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
      setStep("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-forest-deep/55 p-5"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[440px] rounded-md bg-white p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-3.5 text-xl text-ink-soft"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {step === "form" && (
          <>
            <h3 className="mb-1.5">{t.payH}</h3>
            <p className="mb-4 text-xs text-ink-soft">{t.payNote}</p>

            <Field label={t.name} value={name} onChange={setName} placeholder="Jean Tremblay" />
            <Field
              label={t.email}
              value={email}
              onChange={setEmail}
              placeholder="jean.tremblay@courriel.com"
              type="email"
            />
            <Field
              label={t.phone}
              value={phone}
              onChange={setPhone}
              placeholder="450 555-1234"
            />
            <Field
              label={t.payNameLbl}
              value={cardName}
              onChange={setCardName}
              placeholder="Jean Tremblay"
            />
            <Field
              label={t.payCard}
              value={cardNumber}
              onChange={(v) =>
                setCardNumber(
                  v
                    .replace(/\D/g, "")
                    .slice(0, 16)
                    .replace(/(.{4})/g, "$1 ")
                    .trim(),
                )
              }
              placeholder="4242 4242 4242 4242"
              maxLength={19}
            />
            <div className="flex gap-2.5">
              <div className="flex-1">
                <Field
                  label={t.payExp}
                  value={cardExp}
                  onChange={(v) => {
                    let d = v.replace(/\D/g, "").slice(0, 4);
                    if (d.length >= 3) d = d.slice(0, 2) + "/" + d.slice(2);
                    setCardExp(d);
                  }}
                  placeholder="MM/AA"
                  maxLength={5}
                />
              </div>
              <div className="flex-1">
                <Field
                  label="CVV"
                  value={cardCvv}
                  onChange={(v) => setCardCvv(v.replace(/\D/g, "").slice(0, 3))}
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>

            <button
              disabled={!canSubmit}
              onClick={submit}
              className="mt-5 w-full rounded bg-brass py-3.5 text-[0.98rem] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t.paySubmit}
            </button>
          </>
        )}

        {step === "paying" && (
          <div className="py-5 text-center">
            <div className="mx-auto mb-4 h-[34px] w-[34px] animate-spin rounded-full border-[3px] border-paper-dark border-t-brass" />
            <p>{t.payProcessing}</p>
          </div>
        )}

        {step === "done" && result && (
          <div className="py-2.5 text-center">
            <div className="mx-auto mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-forest text-2xl text-white">
              ✓
            </div>
            <h3>{t.payDoneH}</h3>
            <div className="my-2.5 font-serif text-xl tracking-wide text-forest-deep">
              {result.confirmationCode}
            </div>
            <p>{t.payDoneP}</p>
            {!result.persisted && (
              <p className="text-xs text-brass">
                Mode demo — base de donnees non connectee (aucune persistance reelle).
              </p>
            )}
            {!result.emailSent && (
              <p className="text-xs text-brass">
                Mode demo — service de courriel non connecte (aucun courriel envoye).
              </p>
            )}
            <button
              className="mt-5 w-full rounded bg-forest py-3.5 text-[0.98rem] font-bold text-white"
              onClick={onClose}
            >
              {t.payDoneBtn}
            </button>
          </div>
        )}

        {step === "error" && (
          <div className="py-2.5 text-center">
            <div className="mx-auto mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-red text-2xl text-white">
              !
            </div>
            <h3>Erreur</h3>
            <p>{errorMsg}</p>
            <button
              className="mt-5 w-full rounded bg-forest py-3.5 text-[0.98rem] font-bold text-white"
              onClick={() => setStep("form")}
            >
              Reessayer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div className="mb-1">
      <label className="mb-1.5 mt-3 block text-xs font-semibold text-ink-soft">
        {label}
      </label>
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-paper-dark px-3 py-2.5 font-sans"
      />
    </div>
  );
}
