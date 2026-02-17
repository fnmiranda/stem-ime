"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPublicPostById, PostRow } from "@/lib/posts";
import Link from "next/link";

export default function BlogPostPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<PostRow | null>(null);

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

  if (loading) return <div className="p-10">Carregando...</div>;
  if (error) return <div className="p-10">Erro: {error}</div>;
  if (!post) return <div className="p-10">Post não encontrado.</div>;

  return (
    <div className="p-10 space-y-4 max-w-3xl">
      <Link href="/blog" className="text-sm opacity-80 hover:opacity-100">
        ← Voltar
      </Link>

      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="text-sm opacity-70">
        {new Date(post.created_at).toLocaleDateString("pt-BR")}
      </div>

      <div className="whitespace-pre-wrap leading-relaxed opacity-90">
        {post.content}
      </div>
    </div>
  );
}
