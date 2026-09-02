"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(params.get("next") || "/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EEF0E9] px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-md border border-paper-dark bg-white p-8"
      >
        <div className="mb-6">
          <div className="font-serif text-lg text-forest-deep">Golf d&apos;Oka</div>
          <div className="text-xs tracking-wide text-ink-soft">ADMINISTRATION</div>
        </div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Courriel</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border border-paper-dark px-3 py-2.5"
        />
        <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Mot de passe</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded border border-paper-dark px-3 py-2.5"
        />
        {error && <p className="mb-4 text-sm text-red">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-brass py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
