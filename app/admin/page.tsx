"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { isCurrentUserAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

function IconPosts() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="text-white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 6h13M8 12h13M8 18h13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3.5 6h.01M3.5 12h.01M3.5 18h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPdf() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="text-white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v6h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 15h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-white/90"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2l8 4v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AdminHomePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  // estrelas leves
  const stars = useMemo(
    () =>
      Array.from({ length: 75 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        opacity: 0.12 + Math.random() * 0.5,
        blur: Math.random() * 1.2,
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
      <div className="min-h-screen bg-[#040607] text-white flex items-center justify-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
          Verificando permissão...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040607] text-white">
      {/* Fundo base */}
      <div className="absolute inset-0 bg-[#040607]" />

      {/* Glow (igual vibe da tua home) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(79,163,255,0.20),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(255,140,0,0.16),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.06),transparent_60%)]" />

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

      {/* Conteúdo */}
      <div className="relative z-10">
        {/* Hero */}
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
              <span className="inline-block h-2 w-2 rounded-full bg-orange-400" />
              STEMIME · Admin
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  Painel
                </h1>
                <p className="mt-2 text-white/70 max-w-2xl leading-relaxed">
                  Controle rápido do conteúdo: posts do blog e apostilas (PDFs).
                  Tudo centralizado e com acesso protegido.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-xs text-white/60">Acesso</div>
                    <div className="mt-1 flex items-center gap-2 font-bold">
                      <IconShield />
                      Admin habilitado
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-xs text-white/60">Dica</div>
                    <div className="mt-1 text-sm text-white/80">
                      Controle por{" "}
                      <span className="font-semibold">profiles.is_admin</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/"
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
                >
                  Ver site
                </Link>
                <Link
                  href="/blog"
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
                >
                  Ver blog
                </Link>
                <Link
                  href="/apostilas"
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
                >
                  Ver apostilas
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* faixa azul */}
        <div className="h-3 bg-[#4fa3ff]" />

        {/* Cards */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Posts */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-white/20">
              <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#4fa3ff]/15 blur-3xl transition group-hover:bg-[#4fa3ff]/25" />
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-400 transition-all duration-500 group-hover:w-full" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/10">
                      <IconPosts />
                    </span>
                    <div>
                      <div className="text-lg font-extrabold">Posts</div>
                      <div className="text-sm text-white/70 mt-1">
                        Criar, editar, publicar e remover posts do Blog.
                      </div>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2 text-sm text-white/70">
                    <li>• Publicar destaque e conteúdo institucional</li>
                    <li>• Revisar imagem/preview e descrição</li>
                    <li>• Manter consistência visual</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/admin/posts"
                  className="rounded-xl bg-white text-black font-semibold px-4 py-3 hover:opacity-90 transition"
                >
                  Gerenciar posts
                </Link>

                <Link
                  href="/blog"
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
                >
                  Ver blog
                </Link>
              </div>
            </div>

            {/* Apostilas */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-white/20">
              <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl transition group-hover:bg-orange-400/18" />
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#4fa3ff] transition-all duration-500 group-hover:w-full" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/10">
                      <IconPdf />
                    </span>
                    <div>
                      <div className="text-lg font-extrabold">Apostilas</div>
                      <div className="text-sm text-white/70 mt-1">
                        Upload de PDFs, descrição e organização por matéria.
                      </div>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2 text-sm text-white/70">
                    <li>• Definir matéria: Matemática / Física / Química</li>
                    <li>• Tornar público ou privado</li>
                    <li>• Conferir título e descrição</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/admin/apostilas"
                  className="rounded-xl bg-white text-black font-semibold px-4 py-3 hover:opacity-90 transition"
                >
                  Gerenciar apostilas
                </Link>

                <Link
                  href="/apostilas"
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
                >
                  Ver apostilas
                </Link>
              </div>
            </div>
          </div>

          {/* Callout */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="text-sm text-white/80">
                <span className="font-semibold text-white">Segurança:</span>{" "}
                mantenha RLS e policies do Storage alinhadas. O front não
                substitui checagem no backend.
              </div>

              <Link
                href="/admin"
                className="self-start md:self-auto rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
              >
                Atualizar painel
              </Link>
            </div>
          </div>
        </div>

        {/* faixa laranja */}
        <div className="h-2 bg-orange-400" />
      </div>
    </div>
  );
}
