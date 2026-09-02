"use client";

import { useState, type FormEvent } from "react";
import { useLang } from "@/components/site/language-provider";
import { wedding } from "@/lib/site-content";

export default function MariagesPage() {
  const { lang } = useLang();
  const t = wedding[lang];
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/wedding-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          dateRequested: data.get("date") || undefined,
          guests: data.get("guests") ? Number(data.get("guests")) : undefined,
          message: data.get("message") || undefined,
          lang,
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? "Erreur");
      setStatus("done");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-[5vw] py-16">
      <div className="mb-8">
        <div className="mb-1.5 text-sm font-semibold text-brass">{t.kicker}</div>
        <h2 className="max-w-[24ch] text-[1.9rem]">{t.h}</h2>
        <p>{t.p}</p>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {t.packages.map((p) => (
          <div key={p.h} className="rounded border border-paper-dark bg-white p-6">
            <h4 className="mb-2">{p.h}</h4>
            <p className="text-[0.85rem]">{p.p}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-6 text-[1.4rem]">{t.formH}</h2>
      {status === "done" ? (
        <div className="max-w-xl rounded border border-forest-light bg-[#E7EFE4] px-5 py-4 text-[0.92rem] text-forest-deep">
          {t.success}
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
          <Field name="name" label={t.name} required />
          <Field name="email" label={t.email} type="email" required />
          <Field name="date" label={t.date} type="date" />
          <Field name="guests" label={t.guests} type="number" min={1} />
          <div className="col-span-full">
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">
              {t.message}
            </label>
            <textarea
              name="message"
              className="min-h-[100px] w-full rounded border border-paper-dark bg-white px-3 py-2.5"
            />
          </div>
          <div className="col-span-full">
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded bg-brass px-6 py-3.5 font-semibold text-white disabled:opacity-60"
            >
              {status === "sending" ? "…" : t.submit}
            </button>
            {status === "error" && (
              <p className="mt-2 text-sm text-red">{errorMsg}</p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  min,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  min?: number;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-ink-soft">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        min={min}
        className="w-full rounded border border-paper-dark bg-white px-3 py-2.5"
      />
    </div>
  );
}
