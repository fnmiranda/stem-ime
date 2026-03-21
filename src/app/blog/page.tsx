"use client";

import { useEffect, useState } from "react";
import { listPublicPosts } from "@/src/services/posts";
import { PostRow } from "@/src/@types/posts";
import { Post } from "@/src/components/Blog/Post";
import { formatDatePt } from "@/src/lib/dataFormaters";
import { Button } from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";

export default function BlogPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostRow[]>([]);

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

  const featuredPost = posts[0];

  function handleDestaque() {
    if (!featuredPost) return;
    router.push(`/blog/${featuredPost.id}`);
  }

  return (
    <div className="flex min-h-full w-full flex-col bg-white text-[#0b1220]">
      {featuredPost && (
        <section
          className="relative w-full overflow-hidden bg-[#040607] text-white"
          style={{
            backgroundImage: "url(/oficial-background.jpeg)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-[#040607]/55" />

          <div className="relative mx-auto w-full max-w-400">
            <div className="grid min-h-125 grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
              <div className="relative z-10 flex flex-col justify-center gap-5 px-5 py-8 sm:px-8 md:px-10 lg:px-12 xl:px-16">
                <span className="inline-block w-fit rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">
                  DESTAQUE
                </span>

                <h1 className="max-w-[12ch] text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {featuredPost.title}
                </h1>

                <p className="flex items-center gap-3 font-bold text-gray-200">
                  <span className="h-px w-12 bg-indigo-500/50" />
                  {formatDatePt(featuredPost.created_at)}
                </p>

                <div className="mt-2">
                  <Button
                    onClick={handleDestaque}
                    className="group inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-black shadow-xl transition-all hover:scale-105 hover:cursor-pointer hover:bg-indigo-500 hover:text-white active:scale-95 sm:px-8 sm:py-5"
                  >
                    <span className="text-sm font-bold uppercase tracking-wider">
                      Ler Artigo
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
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

              <div className="relative min-h-72 overflow-hidden sm:min-h-88 lg:min-h-125">
                {featuredPost.cover_image_url ? (
                  <>
                    <img
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] hover:scale-110"
                      src={featuredPost.cover_image_url}
                      alt={featuredPost.title}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#142c4e]/70 via-transparent to-transparent lg:bg-linear-to-r lg:from-[#040607] lg:via-[#040607]/55 lg:to-transparent" />

                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(79,163,255,0.14),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(255,140,0,0.12),transparent_26%)]" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(79,163,255,0.20),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(255,140,0,0.16),transparent_55%),linear-gradient(135deg,#08111d,#142c4e)]" />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="h-2 w-full bg-[#4fa3ff]" />

      <section className="flex-1 bg-white text-[#0b1220]">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-sm font-semibold uppercase tracking-wider text-[#0b1220]/60">
            Postagens
          </div>

          <h2 className="mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">
            Confira nossos destaques
          </h2>

          {loading && (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
                >
                  <div className="h-5 w-2/3 animate-pulse rounded bg-black/10" />
                  <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-black/10" />
                  <div className="mt-5 h-4 w-full animate-pulse rounded bg-black/10" />
                  <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-black/10" />
                  <div className="mt-7 h-10 w-full animate-pulse rounded-xl bg-black/10" />
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
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Post key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="h-2 w-full bg-orange-400" />
    </div>
  );
}