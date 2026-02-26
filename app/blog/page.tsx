"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { listPublicPosts, PostRow } from "@/lib/posts";

function formatDatePt(dateLike: string) {
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR", { dateStyle: "long" });
}

function excerpt(text: string, n = 160) {
  const t = (text ?? "").trim().replace(/\s+/g, " ");
  if (t.length <= n) return t;
  return t.slice(0, n) + "…";
}

export default function BlogPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostRow[]>([]);

  //  vibe do site
  const stars = useMemo(
    () =>
      Array.from({ length: 65 }).map((_, i) => ({
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
    async function run() {
      setLoading(true);
      setError(null);

      const { data, error } = await listPublicPosts();
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setPosts(data ?? []);
      setLoading(false);
    }
    run();
  }, []);

  return (
    <div className="min-h-screen bg-[#040607] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
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

        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-12">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-orange-400" />
            STEMIME · Blog
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Blog
          </h1>
          <p className="mt-2 max-w-2xl text-white/70 leading-relaxed">
            Postagens, novidades e conteúdos do STEMIME.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-xs text-white/60">Publicações</div>
              <div className="text-lg font-bold">{posts.length}</div>
            </div>
          </div>
        </div>
      </section>

      {/* faixa azul */}
      <div className="h-3 bg-[#4fa3ff]" />

      {/* CONTEÚDO */}
      <section className="bg-white text-[#0b1220]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-sm font-semibold tracking-wider text-[#0b1220]/60 uppercase">
            Postagens
          </div>
          <h2 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight">
            Em destaque
          </h2>

          {/* estados */}
          {loading && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
                >
                  <div className="h-5 w-2/3 rounded bg-black/10 animate-pulse" />
                  <div className="mt-3 h-4 w-1/3 rounded bg-black/10 animate-pulse" />
                  <div className="mt-5 h-4 w-full rounded bg-black/10 animate-pulse" />
                  <div className="mt-2 h-4 w-5/6 rounded bg-black/10 animate-pulse" />
                  <div className="mt-7 h-10 w-full rounded-xl bg-black/10 animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              <div className="font-bold">Erro ao carregar posts</div>
              <div className="mt-1 text-sm opacity-90">{error}</div>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
              <div className="text-lg font-extrabold">Nenhum post ainda</div>
              <div className="mt-2 text-sm text-[#0b1220]/70">
                Em breve teremos novidades por aqui.
              </div>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.id}`}
                  className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition
                             hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-extrabold text-lg truncate">
                        {p.title}
                      </div>

                      <div className="mt-2 text-xs text-[#0b1220]/60">
                        {formatDatePt(p.created_at)}
                      </div>

                      <div className="mt-4 text-sm text-[#0b1220]/75">
                        {excerpt(p.content)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0b1220]">
                    Ler post
                    <span className="translate-x-0 transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                  <div className="pointer-events-none mt-5 h-0.5 w-0 bg-orange-400 transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* faixa laranja */}
      <div className="h-2 bg-orange-400" />
    </div>
  );
}
