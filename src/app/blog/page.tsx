"use client";

import { useEffect, useMemo, useState } from "react";
import { listPublicPosts } from "@/src/services/posts";
import { PostRow } from "@/src/@types/posts";
import { Post } from "@/src/components/Blog/Post";
import { formatDatePt } from "@/src/lib/dataFormaters";
import { Button } from "@/src/components/ui/Button";
import { redirect } from "next/navigation";

export default function BlogPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostRow[]>([]);

  //  vibe do site
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

  const handleDestaque = () =>{
    redirect(`/blog/${posts[0].id}`)
  }

  return (
    <div className="min-h-screen bg-[#040607] text-white">
      {/* HERO */}

      {/*}
       <section className="relative overflow-hidden">
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

        <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-12">
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
      */}
      {posts[0] && (
        <section className="relative w-full max-full mx-auto  overflow-hidden  shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transition-all hover:border-white/20"
          style={{
          // backgroundSize: "cover",
          backgroundImage: "url(/background-escuro.jpg)",
        }}
        >
          <div className="flex flex-col md:flex-row min-h-125">
            {/* Coluna de Texto */}
            <div className="flex flex-col justify-center w-3/5 pl-70 gap-6 z-10]">
              <span className="inline-block w-fit px-4 py-1 text-[10px] font-bold tracking-[0.2em] text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                {"DESTAQUE"}
              </span>

              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                {posts[0].title}
              </h1>

              <p className="text-gray-400 font-medium flex items-center gap-3">
                <span className="w-12 h-px bg-indigo-500/50"></span>
                {formatDatePt(posts[0].created_at)}
              </p>

              <div className="mt-6">
                
                <Button onClick={handleDestaque} className="group flex items-center gap-3 px-8 py-6 rounded-2xl bg-white text-black transition-all hover:bg-indigo-500 hover:text-white hover:cursor-pointer hover:scale-105 active:scale-95 shadow-xl">
                  <span className="font-bold text-sm uppercase tracking-wider">
                    Ler Artigo
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Coluna da Imagem com Overlay para Escuro */}
            <div className="relative w-full h-125 overflow-hidden">
              {posts[0].cover_image_url && (
                <>
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] hover:scale-110"
                    src={posts[0].cover_image_url}
                    alt={posts[0].title}
                  />
                  {/* Overlay de Degradê para o Preto */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#010004] via-transparent to-transparent md:bg-linear-to-r w-full h-full pointer-events-none" />
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* faixa azul */}
      <div className="h-2 bg-[#4fa3ff]" />

      {/* CONTEÚDO */}
      <section className="bg-white text-[#0b1220]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-sm font-semibold tracking-wider text-[#0b1220]/60 uppercase">
            Postagens
          </div>
          <h2 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight">
            Confira nossos destaques
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
            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
              {posts.map((p) => (
                <Post key={p.id} p={p} />
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
