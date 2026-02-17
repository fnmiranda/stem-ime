"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { isCurrentUserAdmin } from "@/lib/auth";
import { PostRow } from "@/lib/posts";

export default function AdminPostPreviewPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<PostRow | null>(null);

  useEffect(() => {
    async function run() {
      const ok = await isCurrentUserAdmin();
      if (!ok) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .select(
          "id,title,content,cover_image_url,is_published,created_at,updated_at",
        )
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setPost(data as PostRow);
      setLoading(false);
    }

    run();
  }, [id, router]);

  if (loading) return <div className="p-10">Carregando...</div>;
  if (error) return <div className="p-10">Erro: {error}</div>;
  if (!post) return <div className="p-10">Post não encontrado.</div>;

  return (
    <div className="p-10">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/admin/posts"
            className="text-sm opacity-80 hover:opacity-100"
          >
            ← Voltar
          </Link>

          <span className="text-xs opacity-70">
            {post.is_published ? "Publicado" : "Rascunho"}
          </span>
        </div>

        <h1 className="text-3xl font-bold">{post.title}</h1>

        <div className="text-sm opacity-70">
          Criado: {new Date(post.created_at).toLocaleString("pt-BR")}
          {" · "}
          Atualizado: {new Date(post.updated_at).toLocaleString("pt-BR")}
        </div>

        <div className="whitespace-pre-wrap leading-relaxed opacity-90">
          {post.content}
        </div>

        <div className="pt-4">
          <Link
            href={`/blog/${post.id}`}
            className="rounded-xl border border-white/15 px-4 py-3 text-sm hover:border-white/30 transition inline-block"
          >
            Abrir no Blog (só se publicado)
          </Link>
        </div>
      </div>
    </div>
  );
}
