"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listPublicPosts, PostRow } from "@/lib/posts";

export default function BlogPage() {
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

  if (loading) return <div className="p-10">Carregando...</div>;
  if (error) return <div className="p-10">Erro: {error}</div>;

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>

      <div className="grid gap-4">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/blog/${p.id}`}
            className="rounded-xl border border-white/10 bg-black/40 p-4 hover:border-white/20 transition"
          >
            <div className="text-xl font-semibold">{p.title}</div>
            <div className="text-sm opacity-70 mt-1">
              {new Date(p.created_at).toLocaleDateString("pt-BR")}
            </div>
            <div className="opacity-80 mt-3 line-clamp-3">{p.content}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
