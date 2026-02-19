"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { isCurrentUserAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

export default function AdminHomePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  // estrelas leves (mesma vibe)
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        opacity: 0.15 + Math.random() * 0.55,
        blur: Math.random() * 1.5,
      })),
    [],
  );
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/");
    });

    return () => sub.subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    async function guard() {
      const ok = await isCurrentUserAdmin();
      if (!ok) {
        router.replace("/login");
        return;
      }
      setChecking(false);
    }
    guard();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Verificando permissão...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-black to-slate-950" />
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

      {/* Conteúdo */}
      <div className="relative z-10 p-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <p className="text-xs tracking-[0.2em] uppercase opacity-70">
              STEM-IME · Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold">Painel</h1>
            <p className="mt-2 text-sm opacity-80">
              Gerencie posts do blog e apostilas.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Card Posts */}
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
              <div className="text-lg font-semibold">Posts</div>
              <p className="text-sm opacity-75 mt-2">
                Criar, editar, publicar e remover posts do Blog.
              </p>

              <div className="mt-5 flex gap-3">
                <Link
                  href="/admin/posts"
                  className="rounded-xl bg-white text-black font-semibold px-4 py-3 hover:opacity-90 transition"
                >
                  Criar Post
                </Link>

                <Link
                  href="/blog"
                  className="rounded-xl border border-white/15 px-4 py-3 text-sm hover:border-white/30 transition"
                >
                  Ver Blog
                </Link>
              </div>
            </div>

            {/* Card Apostilas */}
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
              <div className="text-lg font-semibold">Apostilas</div>
              <p className="text-sm opacity-75 mt-2">
                Fazer upload de PDFs e organizar por título e descrição.
              </p>

              <div className="mt-5 flex gap-3">
                <Link
                  href="/admin/apostilas"
                  className="rounded-xl bg-white text-black font-semibold px-4 py-3 hover:opacity-90 transition"
                >
                  Upload Apostila
                </Link>

                <Link
                  href="/apostilas"
                  className="rounded-xl border border-white/15 px-4 py-3 text-sm hover:border-white/30 transition"
                >
                  Ver Apostilas
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs opacity-60">
            Dica: o acesso é controlado por{" "}
            <span className="opacity-90">profiles.is_admin</span>.
          </div>
        </div>
      </div>
    </div>
  );
}
