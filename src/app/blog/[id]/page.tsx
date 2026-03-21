"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPublicPostById } from "@/src/services/posts";
import { PostRow } from "@/src/@types/posts";

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
    <div className="flex min-h-full w-full flex-col bg-white text-[#0b1220]">
      <section className="relative overflow-hidden bg-[#040607] text-white">
        <div className="absolute inset-0 bg-[#040607]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(79,163,255,0.18),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(255,140,0,0.14),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.05),transparent_60%)]" />

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

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mr-2 text-sm text-white/75 transition hover:text-white"
          >
            <span aria-hidden>←</span> Retornar
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

              <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                {post.title}
              </h1>

              <div className="mt-3 text-sm text-white/70">
                {formatDatePt(post.created_at)}
              </div>
            </>
          )}
        </div>
      </section>

      <div className="h-2 w-full bg-[#4fa3ff]" />

      <section className="flex-1 bg-white text-[#0b1220]">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {loading && (
            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
              <div className="h-6 w-1/2 animate-pulse rounded bg-black/10" />
              <div className="mt-4 h-4 w-1/4 animate-pulse rounded bg-black/10" />
              <div className="mt-8 aspect-21/9 w-full animate-pulse rounded-4xl bg-black/10" />
              <div className="mt-8 space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-black/10" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-black/10" />
                <div className="h-4 w-10/12 animate-pulse rounded bg-black/10" />
                <div className="h-4 w-full animate-pulse rounded bg-black/10" />
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              <div className="font-bold">Erro ao carregar post</div>
              <div className="mt-1 text-sm opacity-90">{error}</div>
            </div>
          )}

          {!loading && !error && !post && (
            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
              <div className="text-lg font-extrabold">Post não encontrado</div>
              <div className="mt-2 text-sm text-[#0b1220]/70">
                O conteúdo que você tentou acessar não está disponível.
              </div>
            </div>
          )}

          {!loading && !error && post && (
            <>
              <header className="mx-auto max-w-4xl px-0 pb-8 text-center sm:pb-10">
                <div className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">
                    Blog
                  </span>
                  <span className="text-gray-300">•</span>
                  <time className="text-xs uppercase tracking-wide text-gray-500 sm:text-sm">
                    {formatDatePt(post.created_at)}
                  </time>
                </div>

                <h1 className="text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  {post.title}
                </h1>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-gray-400">
                  <span>Equipe STEM IME</span>
                  <div className="hidden h-px w-8 bg-gray-200 sm:block" />
                  <span>Publicação do blog</span>
                </div>
              </header>

              <div className="mx-auto max-w-6xl px-0">
                <div className="relative mb-10 aspect-21/9 w-full overflow-hidden rounded-4xl shadow-2xl sm:mb-12 lg:mb-16">
                  {post.cover_image_url ? (
                    <img
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      src={post.cover_image_url}
                      alt={post.title}
                    />
                  ) : (
                    <div className="h-full w-full bg-[radial-gradient(circle_at_15%_15%,rgba(79,163,255,0.20),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(255,140,0,0.16),transparent_55%),linear-gradient(135deg,#08111d,#142c4e)]" />
                  )}
                </div>

                <div className="mb-6 h-0.5 w-full bg-gray-200" />

                <article className="mx-auto max-w-4xl">
                  <div className="whitespace-pre-wrap text-left font-serif text-base leading-8 text-[#0b1220]/90 sm:text-[17px] md:text-[19px] md:leading-9 lg:text-justify">
                    {post.content}
                  </div>

                  <footer className="flex flex-col items-start justify-between gap-6 border-t border-gray-100 pb-16 pt-8 sm:pb-20 md:flex-row md:items-center">
                    <Link
                      href="/blog"
                      className="group inline-flex items-center gap-2 text-sm font-bold text-[#0b1220] transition-colors hover:text-orange-500"
                    >
                      <span className="transition-transform group-hover:-translate-x-1">
                        ←
                      </span>
                      Voltar para o Blog
                    </Link>

                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      STEM IME Blog
                    </div>
                  </footer>
                </article>
              </div>
            </>
          )}
        </div>
      </section>

      <div className="h-2 w-full bg-orange-400" />
    </div>
  );
}