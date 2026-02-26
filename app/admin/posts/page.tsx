"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { isCurrentUserAdmin } from "@/lib/auth";

type PostRow = {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
  created_at: string;
};

function formatDatePt(dateLike: string) {
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function excerpt(text: string, n = 130) {
  const t = (text ?? "").trim().replace(/\s+/g, " ");
  if (t.length <= n) return t;
  return t.slice(0, n) + "…";
}

export default function AdminPostsPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(true);

  const [posts, setPosts] = useState<PostRow[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);

  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Estrelas (mesma vibe)
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

  async function refresh() {
    setLoading(true);
    setError(null);

    // ⚠️ Ajuste aqui se o teu schema for diferente
    const { data, error } = await supabase
      .from("posts")
      .select("id,title,content,is_published,created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setPosts((data as any) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    if (!checking) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checking]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const t = title.trim();
    const c = content.trim();

    if (!t) return setError("Digite um título.");
    if (!c) return setError("Digite o conteúdo.");

    setBusyId("create");

    // ⚠️ Ajuste aqui se o teu schema for diferente
    const { error } = await supabase.from("posts").insert([
      {
        title: t,
        content: c,
        is_published: published,
      },
    ]);

    setBusyId(null);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Post criado com sucesso!");
    setTitle("");
    setContent("");
    setPublished(true);
    refresh();
  }

  async function togglePublish(p: PostRow) {
    setError(null);
    setSuccess(null);
    setBusyId(p.id);

    const { error } = await supabase
      .from("posts")
      .update({ is_published: !p.is_published })
      .eq("id", p.id);

    setBusyId(null);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(p.is_published ? "Post despublicado." : "Post publicado!");
    refresh();
  }

  async function removePost(p: PostRow) {
    const ok = window.confirm(
      `Tem certeza que deseja deletar o post "${p.title}"? Essa ação não pode ser desfeita.`,
    );
    if (!ok) return;

    setError(null);
    setSuccess(null);
    setBusyId(p.id);

    const { error } = await supabase.from("posts").delete().eq("id", p.id);

    setBusyId(null);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Post deletado.");
    refresh();
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#040607] text-white flex items-center justify-center p-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
          Verificando permissão...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040607] text-white">
      {/* Fundo */}
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

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
                <span className="inline-block h-2 w-2 rounded-full bg-orange-400" />
                STEM-IME · Admin
              </div>

              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                Posts
              </h1>
              <p className="mt-2 text-white/70 max-w-2xl leading-relaxed">
                Crie, edite e publique posts do blog com consistência visual.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-xs text-white/60">Total</div>
                  <div className="text-lg font-bold">{posts.length}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-xs text-white/60">Publicados</div>
                  <div className="text-lg font-bold">
                    {posts.filter((p) => p.is_published).length}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href="/admin"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
              >
                Voltar pro Painel
              </Link>
              <Link
                href="/blog"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
              >
                Ver Blog
              </Link>
            </div>
          </div>
        </div>

        <div className="h-3 bg-[#4fa3ff]" />

        {/* Conteúdo */}
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
          {(error || success) && (
            <div className="space-y-2">
              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm">
                  {success}
                </div>
              )}
            </div>
          )}

          {/* Criar post */}
          <form
            onSubmit={handleCreate}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl p-6 shadow-sm"
          >
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#4fa3ff]/15 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="text-xl font-extrabold">Criar post</div>
                  <div className="mt-1 text-sm text-white/70">
                    Preencha o título e o conteúdo. Você pode publicar agora ou
                    depois.
                  </div>
                </div>

                <label className="inline-flex items-center gap-2 text-sm text-white/80">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="accent-orange-400"
                  />
                  Publicado
                </label>
              </div>

              <div className="mt-5 grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm text-white/80">Título</label>
                  <input
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none
                               focus:border-[#4fa3ff] focus:ring-2 focus:ring-[#4fa3ff]/20"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Digite um título claro e curto"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm text-white/80">Conteúdo</label>
                  <textarea
                    className="w-full min-h-45 rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none
                               focus:border-[#4fa3ff] focus:ring-2 focus:ring-[#4fa3ff]/20"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escreva o conteúdo do post..."
                    required
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={busyId === "create"}
                    className="rounded-xl bg-white text-black font-semibold px-5 py-3 hover:opacity-90 transition disabled:opacity-60"
                  >
                    {busyId === "create" ? "Criando..." : "Criar"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTitle("");
                      setContent("");
                      setPublished(true);
                      setError(null);
                      setSuccess(null);
                    }}
                    className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
                  >
                    Limpar
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Lista */}
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="text-sm font-semibold tracking-wider text-white/70 uppercase">
                  Posts
                </div>
                <div className="mt-1 text-2xl font-extrabold">
                  Gerenciar posts
                </div>
              </div>

              <button
                onClick={refresh}
                disabled={loading}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition disabled:opacity-60"
              >
                {loading ? "Atualizando..." : "Atualizar"}
              </button>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
                Carregando posts...
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="text-lg font-extrabold">Nenhum post ainda</div>
                <div className="mt-2 text-sm text-white/70">
                  Crie seu primeiro post no formulário acima.
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {posts.map((p) => (
                  <div
                    key={p.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-white/20"
                  >
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-400 transition-all duration-500 group-hover:w-full" />

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="text-lg font-extrabold truncate">
                            {p.title}
                          </div>

                          <span
                            className={[
                              "rounded-full px-3 py-1 text-xs font-bold border",
                              p.is_published
                                ? "bg-green-500/10 border-green-500/25 text-green-200"
                                : "bg-white/5 border-white/10 text-white/70",
                            ].join(" ")}
                          >
                            {p.is_published ? "Publicado" : "Rascunho"}
                          </span>
                        </div>

                        <div className="mt-2 text-xs text-white/60">
                          {formatDatePt(p.created_at)}
                        </div>

                        <div className="mt-3 text-sm text-white/70">
                          {excerpt(p.content)}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {/* Ajuste as rotas se o teu projeto usar outra */}
                        <Link
                          href="/blog"
                          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:border-white/30 hover:bg-white/10 transition"
                        >
                          Ver
                        </Link>

                        <Link
                          href={`/admin/posts/${p.id}`}
                          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:border-white/30 hover:bg-white/10 transition"
                        >
                          Editar
                        </Link>

                        <button
                          onClick={() => togglePublish(p)}
                          disabled={busyId === p.id}
                          className="rounded-xl bg-white text-black font-semibold px-4 py-2 text-sm hover:opacity-90 transition disabled:opacity-60"
                        >
                          {busyId === p.id
                            ? "Salvando..."
                            : p.is_published
                              ? "Despublicar"
                              : "Publicar"}
                        </button>

                        <button
                          onClick={() => removePost(p)}
                          disabled={busyId === p.id}
                          className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-100 hover:border-red-500/60 transition disabled:opacity-60"
                        >
                          Deletar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="h-2 bg-orange-400" />
      </div>
    </div>
  );
}
