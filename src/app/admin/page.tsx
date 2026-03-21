"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isCurrentUserAdmin } from "@/src/services/auth";
import { supabase } from "@/src/services/supabaseClient";

function IconPosts() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="text-white"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      <div className="flex min-h-screen items-center justify-center bg-[#040607] px-4 text-white">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
          Verificando permissão...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040607] text-white">
      <div className="absolute inset-0 bg-[#040607]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(79,163,255,0.20),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(255,140,0,0.16),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.06),transparent_60%)]" />

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

      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
              <span className="inline-block h-2 w-2 rounded-full bg-orange-400" />
              STEMIME · Admin
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                  Painel
                </h1>

                <p className="mt-2 max-w-2xl leading-relaxed text-white/70">
                  Controle rápido do conteúdo: posts do blog e apostilas
                  (PDFs). Tudo centralizado e com acesso protegido.
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

              <div className="flex flex-wrap gap-2">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  Ver site
                </Link>

                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  Ver blog
                </Link>

                <Link
                  href="/apostilas"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  Ver apostilas
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="h-3 bg-[#4fa3ff]" />

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-6 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/20">
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#4fa3ff]/15 blur-3xl transition group-hover:bg-[#4fa3ff]/25" />
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-400 transition-all duration-500 group-hover:w-full" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                        <IconPosts />
                      </span>

                      <div>
                        <div className="text-lg font-extrabold">Posts</div>
                        <div className="mt-1 text-sm text-white/70">
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
                    className="relative z-10 inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/10"
                    href="/admin/posts"
                    // className="relative z-10 inline-flex min-h-12 items-center justify-center rounded-xl px-4 py-3 font-semibold text-[#0b1220] transition hover:opacity-90"
                  >
                    Gerenciar posts
                  </Link>

                  <Link
                    href="/blog"
                    className="relative z-10 inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    Ver blog
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-6 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/20">
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl transition group-hover:bg-orange-400/18" />
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#4fa3ff] transition-all duration-500 group-hover:w-full" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                        <IconPdf />
                      </span>

                      <div>
                        <div className="text-lg font-extrabold">Apostilas</div>
                        <div className="mt-1 text-sm text-white/70">
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
                    className="relative z-10 inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/10"
                    // className="relative z-10 inline-flex min-h-12 items-center justify-center rounded-xl  px-4 py-3 font-semibold text-[#0b1220] transition hover:opacity-90"
                  >
                    Gerenciar apostilas
                  </Link>

                  <Link
                    href="/apostilas"
                    className="relative z-10 inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    Ver apostilas
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-white/80">
                <span className="font-semibold text-white">Segurança:</span>{" "}
                mantenha RLS e policies do Storage alinhadas. O front não
                substitui checagem no backend.
              </div>

              <Link
                href="/admin"
                className="inline-flex self-start rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/30 hover:bg-white/10 md:self-auto"
              >
                Atualizar painel
              </Link>
            </div>
          </div>
        </div>

        <div className="h-2 bg-orange-400" />
      </div>
    </div>
  );
}