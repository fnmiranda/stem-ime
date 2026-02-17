"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isCurrentUserAdmin } from "@/lib/auth";
import {
  adminCreatePost,
  adminDeletePost,
  adminListAllPosts,
  adminUpdatePost,
  PostRow,
} from "@/lib/posts";
import { supabase } from "@/lib/supabaseClient";

type EditState = {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
};

export default function AdminPostsPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [posts, setPosts] = useState<PostRow[]>([]);

  // criar
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  // editar
  const [editing, setEditing] = useState<EditState | null>(null);
  const [saving, setSaving] = useState(false);

  const canCreate = useMemo(
    () => title.trim().length > 0 && content.trim().length > 0,
    [title, content],
  );

  async function refresh() {
    setLoading(true);
    setError(null);

    const { data, error } = await adminListAllPosts();
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setPosts(data ?? []);
    setLoading(false);
  }
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
      refresh();
    }
    guard();
  }, [router]);

  async function createPost() {
    setError(null);
    setSuccess(null);

    if (!canCreate) {
      setError("Preencha título e conteúdo.");
      return;
    }

    const { error } = await adminCreatePost({
      title,
      content,
      is_published: isPublished,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setTitle("");
    setContent("");
    setIsPublished(true);
    setSuccess("Post criado!");
    await refresh();
  }

  async function togglePublish(p: PostRow) {
    setError(null);
    setSuccess(null);

    const { error } = await adminUpdatePost(p.id, {
      is_published: !p.is_published,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Status atualizado!");
    await refresh();
  }

  async function removePost(id: string) {
    setError(null);
    setSuccess(null);

    const { error } = await adminDeletePost(id);
    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Post deletado!");
    await refresh();
  }

  function startEdit(p: PostRow) {
    setSuccess(null);
    setError(null);
    setEditing({
      id: p.id,
      title: p.title,
      content: p.content,
      is_published: p.is_published,
    });
  }

  function cancelEdit() {
    setEditing(null);
  }

  async function saveEdit() {
    if (!editing) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    if (!editing.title.trim() || !editing.content.trim()) {
      setSaving(false);
      setError("Título e conteúdo não podem ficar vazios.");
      return;
    }

    const { error } = await adminUpdatePost(editing.id, {
      title: editing.title,
      content: editing.content,
      is_published: editing.is_published,
    });

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Post salvo!");
    setEditing(null);
    await refresh();
  }

  if (checking) return <div className="p-10">Verificando permissão...</div>;

  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase opacity-70">
              STEM-IME · Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold">Posts</h1>
            <p className="mt-2 text-sm opacity-80">
              Crie, edite e publique posts do blog.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-white/15 px-4 py-3 text-sm hover:border-white/30 transition"
          >
            Voltar pro Painel
          </Link>
        </div>

        {(error || success) && (
          <div className="space-y-2">
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm">
                {success}
              </div>
            )}
          </div>
        )}

        {/* Criar */}
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 space-y-3">
          <div className="text-lg font-semibold">Criar post</div>

          <input
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full min-h-40 rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
            placeholder="Conteúdo"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <label className="flex items-center gap-2 text-sm opacity-80">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            Publicado
          </label>

          <button
            onClick={createPost}
            disabled={!canCreate}
            className="rounded-xl bg-white text-black font-semibold px-5 py-3 hover:opacity-90 transition disabled:opacity-60"
          >
            Criar
          </button>
        </div>

        {/* Lista */}
        <div className="space-y-3">
          <div className="text-lg font-semibold">Posts</div>

          {loading ? (
            <div>Carregando...</div>
          ) : posts.length === 0 ? (
            <div className="opacity-70">Ainda não há posts.</div>
          ) : (
            <div className="grid gap-3">
              {posts.map((p) => {
                const isEditingThis = editing?.id === p.id;

                return (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5"
                  >
                    {/* header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-lg font-semibold truncate">
                          {p.title}
                        </div>
                        <div className="text-xs opacity-70 mt-1">
                          {new Date(p.created_at).toLocaleString("pt-BR")} ·{" "}
                          {p.is_published ? "Publicado" : "Rascunho"}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-end">
                        <Link
                          href={`/blog/${p.id}`}
                          className="rounded-lg border border-white/15 px-3 py-2 text-sm hover:border-white/30 transition"
                        >
                          Ver
                        </Link>

                        {!isEditingThis && (
                          <button
                            onClick={() => startEdit(p)}
                            className="rounded-lg border border-white/15 px-3 py-2 text-sm hover:border-white/30 transition"
                          >
                            Editar
                          </button>
                        )}

                        <button
                          onClick={() => togglePublish(p)}
                          className="rounded-lg border border-white/15 px-3 py-2 text-sm hover:border-white/30 transition"
                        >
                          {p.is_published ? "Despublicar" : "Publicar"}
                        </button>

                        <button
                          onClick={() => removePost(p.id)}
                          className="rounded-lg border border-red-500/30 px-3 py-2 text-sm hover:border-red-500/50 transition"
                        >
                          Deletar
                        </button>
                      </div>
                    </div>

                    {/* editor */}
                    {isEditingThis && (
                      <div className="mt-4 space-y-3">
                        <input
                          className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
                          value={editing.title}
                          onChange={(e) =>
                            setEditing((prev) =>
                              prev ? { ...prev, title: e.target.value } : prev,
                            )
                          }
                        />

                        <textarea
                          className="w-full min-h-40 rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/25"
                          value={editing.content}
                          onChange={(e) =>
                            setEditing((prev) =>
                              prev
                                ? { ...prev, content: e.target.value }
                                : prev,
                            )
                          }
                        />

                        <label className="flex items-center gap-2 text-sm opacity-80">
                          <input
                            type="checkbox"
                            checked={editing.is_published}
                            onChange={(e) =>
                              setEditing((prev) =>
                                prev
                                  ? { ...prev, is_published: e.target.checked }
                                  : prev,
                              )
                            }
                          />
                          Publicado
                        </label>

                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            disabled={saving}
                            className="rounded-xl bg-white text-black font-semibold px-5 py-3 hover:opacity-90 transition disabled:opacity-60"
                          >
                            {saving ? "Salvando..." : "Salvar"}
                          </button>

                          <button
                            onClick={cancelEdit}
                            disabled={saving}
                            className="rounded-xl border border-white/15 px-5 py-3 text-sm hover:border-white/30 transition disabled:opacity-60"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
