"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { isCurrentUserAdmin } from "@/lib/auth";
import {
  PostRow,
  adminCreatePost,
  adminDeletePost,
  adminListAllPosts,
  adminUpdatePost,
} from "@/lib/posts";

function formatDatePt(dateLike: string) {
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function excerpt(text: string, n = 160) {
  const t = (text ?? "").trim().replace(/\s+/g, " ");
  if (t.length <= n) return t;
  return t.slice(0, n) + "…";
}

async function uploadCoverToSupabase(file: File) {
  if (!file.type.startsWith("image/")) {
    return {
      data: null,
      error: { message: "Envie uma imagem (PNG/JPG/WebP)." } as any,
    };
  }

  // limite pra não pesar o site
  if (file.size > 3 * 1024 * 1024) {
    return { data: null, error: { message: "Máx. 3MB." } as any };
  }

  const safeName = file.name.replaceAll(" ", "_");
  const objectPath = `covers/${new Date().getFullYear()}/${Date.now()}_${safeName}`;

  const upload = await supabase.storage
    .from("post-covers")
    .upload(objectPath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (upload.error) return upload;

  const { data } = supabase.storage
    .from("post-covers")
    .getPublicUrl(objectPath);

  return {
    data: { publicUrl: data.publicUrl, objectPath },
    error: null as any,
  };
}

export default function AdminPostsPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [posts, setPosts] = useState<PostRow[]>([]);

  // form (criar/editar)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // estrelas (vibe do site)
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

  async function refresh() {
    setLoading(true);
    setError(null);

    const { data, error } = await adminListAllPosts();
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

  // revoga URL de preview
  useEffect(() => {
    return () => {
      if (coverPreview?.startsWith("blob:")) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setContent("");
    setIsPublished(true);
    setCoverFile(null);
    setCoverPreview(null);
  }

  function startEdit(p: PostRow) {
    setEditingId(p.id);
    setTitle(p.title ?? "");
    setContent(p.content ?? "");
    setIsPublished(!!p.is_published);

    setCoverFile(null);
    setCoverPreview(p.cover_image_url ?? null);

    setError(null);
    setSuccess(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const t = title.trim();
    const c = content.trim();

    if (!t) return setError("Digite um título.");
    if (!c) return setError("Digite o conteúdo.");

    setBusyId(editingId ? `save:${editingId}` : "create");

    // capa: se escolheu arquivo novo, faz upload e pega URL pública
    let coverUrl: string | null =
      (editingId
        ? posts.find((x) => x.id === editingId)?.cover_image_url
        : null) ?? null;

    if (coverFile) {
      const up = await uploadCoverToSupabase(coverFile);
      if (up.error) {
        setBusyId(null);
        setError(up.error.message);
        return;
      }
      if (up.error || !up.data?.publicUrl) {
        setBusyId(null);
        setError(up.error?.message ?? "Falha ao enviar a capa.");
        return;
      }
      coverUrl = up.data.publicUrl;
    }

    if (!editingId) {
      const { error } = await adminCreatePost({
        title: t,
        content: c,
        cover_image_url: coverUrl,
        is_published: isPublished,
      });

      setBusyId(null);

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess("Post criado!");
      resetForm();
      refresh();
      return;
    }

    const { error } = await adminUpdatePost(editingId, {
      title: t,
      content: c,
      cover_image_url: coverUrl,
      is_published: isPublished,
    });

    setBusyId(null);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Post atualizado!");
    resetForm();
    refresh();
  }

  async function togglePublish(p: PostRow) {
    setError(null);
    setSuccess(null);
    setBusyId(p.id);

    const { error } = await adminUpdatePost(p.id, {
      is_published: !p.is_published,
    });

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
      `Tem certeza que deseja deletar "${p.title}"?\nEssa ação não pode ser desfeita.`,
    );
    if (!ok) return;

    setError(null);
    setSuccess(null);
    setBusyId(`del:${p.id}`);

    const { error } = await adminDeletePost(p.id);

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

  const total = posts.length;
  const totalPublished = posts.filter((p) => p.is_published).length;

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
                STEMIME · Admin
              </div>

              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                Posts
              </h1>
              <p className="mt-2 text-white/70 max-w-2xl leading-relaxed">
                Crie posts com capa, publique/despublique e mantenha o blog com
                identidade visual.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-xs text-white/60">Total</div>
                  <div className="text-lg font-bold">{total}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-xs text-white/60">Publicados</div>
                  <div className="text-lg font-bold">{totalPublished}</div>
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

        {/* Faixa azul */}
        <div className="h-3 bg-[#4fa3ff]" />

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

          {/* Form Criar/Editar */}
          <form
            onSubmit={handleSubmit}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl p-6 shadow-sm"
          >
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl transition group-hover:bg-orange-400/18" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-xl font-extrabold">
                    {editingId ? "Editar post" : "Criar post"}
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    {editingId
                      ? "Atualize título, conteúdo e capa. Você pode publicar ou deixar como rascunho."
                      : "Preencha título, conteúdo e adicione uma capa para ficar no estilo da Home."}
                  </div>
                </div>

                <label className="inline-flex items-center gap-2 text-sm text-white/80">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="accent-orange-400"
                  />
                  Publicado
                </label>
              </div>

              <div className="mt-6 grid gap-4">
                {/* Capa */}
                <div className="grid gap-2">
                  <label className="text-sm text-white/80">
                    Capa do post (opcional)
                  </label>

                  <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <input
                      id="coverInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0] ?? null;
                        setCoverFile(f);

                        if (coverPreview?.startsWith("blob:"))
                          URL.revokeObjectURL(coverPreview);

                        if (f) setCoverPreview(URL.createObjectURL(f));
                        else
                          setCoverPreview(
                            editingId
                              ? (posts.find((x) => x.id === editingId)
                                  ?.cover_image_url ?? null)
                              : null,
                          );
                      }}
                    />

                    <label
                      htmlFor="coverInput"
                      className="cursor-pointer rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm
                                 hover:border-white/30 hover:bg-white/10 transition self-start"
                    >
                      Selecionar imagem
                    </label>

                    <div className="text-xs text-white/60">
                      PNG/JPG/WebP · até 3MB
                    </div>

                    {coverPreview && (
                      <button
                        type="button"
                        onClick={() => {
                          if (coverPreview?.startsWith("blob:"))
                            URL.revokeObjectURL(coverPreview);
                          setCoverFile(null);
                          setCoverPreview(null);
                        }}
                        className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-100 hover:border-red-500/60 transition self-start"
                      >
                        Remover capa
                      </button>
                    )}
                  </div>

                  <div className="mt-2 rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
                    <div className="relative w-full aspect-video bg-black/20">
                      {coverPreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={coverPreview}
                          alt="Prévia da capa"
                          className="h-full w-full object-cover"
                          draggable={false}
                        />
                      ) : (
                        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(79,163,255,0.18),transparent_55%),radial-gradient(circle_at_85%_40%,rgba(255,140,0,0.14),transparent_55%)]" />
                      )}
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-sm text-white/80">Título</label>
                    <input
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none
                                 focus:border-[#4fa3ff] focus:ring-2 focus:ring-[#4fa3ff]/20"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex.: Mulheres na Ciência — Shannon Walker"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm text-white/80">Ação</label>
                    <div className="flex gap-3 flex-wrap">
                      <button
                        type="submit"
                        disabled={
                          busyId === "create" ||
                          (editingId ? busyId === `save:${editingId}` : false)
                        }
                        className="rounded-xl bg-white text-black font-semibold px-5 py-3 hover:opacity-90 transition disabled:opacity-60"
                      >
                        {editingId
                          ? busyId === `save:${editingId}`
                            ? "Salvando..."
                            : "Salvar"
                          : busyId === "create"
                            ? "Criando..."
                            : "Criar"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          resetForm();
                          setError(null);
                          setSuccess(null);
                        }}
                        className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
                      >
                        Limpar
                      </button>

                      {editingId && (
                        <button
                          type="button"
                          onClick={() => resetForm()}
                          className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
                        >
                          Cancelar edição
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm text-white/80">Conteúdo</label>
                  <textarea
                    className="w-full min-h-50 rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none
                               focus:border-[#4fa3ff] focus:ring-2 focus:ring-[#4fa3ff]/20"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escreva o conteúdo do post..."
                    required
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Lista de Posts */}
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="text-sm font-semibold tracking-wider text-white/70 uppercase">
                  Posts
                </div>
                <div className="mt-1 text-2xl font-extrabold">Gerenciar</div>
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
                {posts.map((p) => {
                  const isBusy = busyId === p.id || busyId === `del:${p.id}`;
                  return (
                    <div
                      key={p.id}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-white/20"
                    >
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-400 transition-all duration-500 group-hover:w-full" />

                      <div className="flex flex-col md:flex-row gap-4 md:items-start md:justify-between">
                        <div className="flex gap-4 min-w-0">
                          <div className="h-20 w-28 rounded-xl overflow-hidden border border-white/10 bg-black/20 shrink-0">
                            {p.cover_image_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={p.cover_image_url}
                                alt={p.title}
                                className="h-full w-full object-cover"
                                draggable={false}
                              />
                            ) : (
                              <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(79,163,255,0.18),transparent_55%),radial-gradient(circle_at_85%_40%,rgba(255,140,0,0.14),transparent_55%)]" />
                            )}
                          </div>

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
                        </div>

                        <div className="flex flex-wrap gap-2 md:justify-end">
                          <Link
                            href={`/blog/${p.id}`}
                            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:border-white/30 hover:bg-white/10 transition"
                          >
                            Ver
                          </Link>

                          <button
                            onClick={() => startEdit(p)}
                            disabled={isBusy}
                            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:border-white/30 hover:bg-white/10 transition disabled:opacity-60"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => togglePublish(p)}
                            disabled={isBusy}
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
                            disabled={isBusy}
                            className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-100 hover:border-red-500/60 transition disabled:opacity-60"
                          >
                            {busyId === `del:${p.id}`
                              ? "Deletando..."
                              : "Deletar"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Faixa laranja */}
        <div className="h-2 bg-orange-400" />
      </div>
    </div>
  );
}
