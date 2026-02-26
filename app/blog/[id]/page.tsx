"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPublicPostById, PostRow } from "@/lib/posts";

function formatDatePt(dateLike: string) {
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR", { dateStyle: "long" });
}

export default function BlogPostPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<PostRow | null>(null);

  // estrelas (mesma vibe das outras páginas)
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

      const { data, error } = await getPublicPostById(id);
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setPost(data);
      setLoading(false);
    }
    run();
  }, [id]);

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

        <div className="relative max-w-4xl mx-auto px-6 pt-14 pb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white transition"
          >
            <span aria-hidden>←</span> Voltar para o Blog
          </Link>

          {loading ? (
            <div className="mt-8 text-white/70">Carregando...</div>
          ) : error ? (
            <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm">
              Erro: {error}
            </div>
          ) : !post ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
              Post não encontrado.
            </div>
          ) : (
            <>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
                <span className="inline-block h-2 w-2 rounded-full bg-orange-400" />
                Blog STEMIME
              </div>

              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                {post.title}
              </h1>

              <div className="mt-3 text-sm text-white/70">
                {formatDatePt(post.created_at)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* faixa azul */}
      <div className="h-3 bg-[#4fa3ff]" />

      {/* CONTEÚDO */}
      {!loading && !error && post && (
        <section className="bg-white text-[#0b1220]">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <article className="rounded-2xl border border-black/10 bg-white p-7 md:p-10 shadow-sm">
              <div className="prose prose-neutral max-w-none">
                {/* mantém parágrafos/linhas do texto original */}
                <div className="whitespace-pre-wrap leading-relaxed text-[15px] md:text-[16px] text-[#0b1220]/85">
                  {post.content}
                </div>
              </div>
            </article>

            <div className="mt-8 flex justify-between items-center">
              <Link
                href="/blog"
                className="text-sm font-bold text-[#0b1220] hover:opacity-70 transition"
              >
                ← Voltar
              </Link>

              <div className="h-1 w-24 bg-orange-400 rounded-full" />
            </div>
          </div>
        </section>
      )}

      {/* faixa laranja */}
      <div className="h-2 bg-orange-400" />
    </div>
  );
}
