"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/src/services/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // estrelas leves (mesma vibe do site)
  const [stars, setStars] = useState<
    {
      id: number;
      left: number;
      top: number;
      size: number;
      opacity: number;
      blur: number;
    }[]
  >([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 65 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        opacity: 0.12 + Math.random() * 0.5,
        blur: Math.random() * 1.2,
      })),
    );
  }, []);

  useEffect(() => {
    // se já estiver logado, manda pro painel
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/admin");
    });
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email ou senha inválidos.");
      return;
    }

    if (!data.session) {
      setError("Não foi possível iniciar sessão.");
      return;
    }

    setSuccess("Acesso autorizado. Redirecionando...");
    router.replace("/admin");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040607] text-white flex items-center justify-center p-4">
      {/* Fundo + glow */}
      <div className="absolute inset-0 bg-[#040607]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(79,163,255,0.18),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(255,140,0,0.14),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.05),transparent_60%)]" />

      {/* Estrelas */}
      <div className="absolute inset-0 opacity-70">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              filter: `blur(${s.blur}px)`,
            }}
          />
        ))}
      </div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 space-y-4 shadow-sm"
      >
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
          <span className="inline-block h-2 w-2 rounded-full bg-orange-400" />
          Acesso restrito
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight">Entrar</h1>
        <p className="text-sm text-white/70">
          Esta área é destinada apenas a administradores.
        </p>

        <div className="space-y-2">
          <label className="text-sm text-white/80">Email</label>
          <input
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none
                       focus:border-[#4fa3ff] focus:ring-2 focus:ring-[#4fa3ff]/20"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/80">Senha</label>
          <input
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none
                       focus:border-[#4fa3ff] focus:ring-2 focus:ring-[#4fa3ff]/20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-white text-black font-semibold py-3 hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-xs text-white/60">
          *Se você não é administrador, não terá acesso a esta área.*
        </p>
      </form>
    </div>
  );
}
