"use client";

import { useEffect, useMemo, useState } from "react";
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

  // estrelas (mesma vibe das outras páginas)
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

        <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mr-4 text-sm text-white/75 hover:text-white transition"
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
        <section className="bg-white text-[#0b1220] min-h-screen">
  {/* Header do Post: Título e Informações antes da imagem */}
  <header className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
    <div className="flex items-center justify-center gap-2 mb-6">
      <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
        {"Gestão"}
      </span>
      <span className="text-gray-300">•</span>
      <time className="text-sm text-gray-500 uppercase tracking-wide">
        {formatDatePt(post.created_at)}
      </time>
    </div>
    
    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-8">
      {post.title}
    </h1>

    <div className="flex items-center justify-center gap-4 text-sm font-medium text-gray-400">
      <span>Por Equipe Papo de Gestão</span>
      <div className="w-8 h-px bg-gray-200"></div>
      <span>5 min de leitura</span>
    </div>
  </header>

  <div className="max-w-6xl mx-auto px-4">
    {/* Imagem de Destaque com Proporção Cinema e Bordas Arredondadas */}
    <div className="relative aspect-21/9 w-full overflow-hidden rounded-2rem shadow-2xl mb-16">
      {post.cover_image_url && (
        <img 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
          src={post.cover_image_url} 
          alt={post.title}
        />
      )}
    </div>

    {/* Corpo do Texto */}
    <article className="max-w-5xl mx-auto">
      <div className="prose prose-lg prose-neutral prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-img:rounded-3xl">
        <div className="whitespace-pre-wrap text-[17px] md:text-[19px] text-[#0b1220]/90 font-serif leading-relaxed">
          {post.content}
        </div>
      </div>

      {/* Rodapé do Artigo */}
      <footer className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 pb-20">
        <Link
          href="/blog"
          className="group flex items-center gap-2 text-sm font-bold text-[#0b1220] hover:text-orange-500 transition-colors"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> 
          Voltar para o Blog
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Compartilhar</span>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-orange-500 hover:text-white cursor-pointer transition-all">
              <span className="text-xs">in</span>
            </div>
            {/* Adicione outros ícones sociais aqui */}
          </div>
        </div>
      </footer>
    </article>
  </div>
</section>
      )}

      {/* faixa laranja */}
      <div className="h-2 bg-orange-400" />
    </div>
  );
}
