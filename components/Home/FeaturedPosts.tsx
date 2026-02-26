"use client";

import { useEffect, useState } from "react";
import { listPublicPosts, PostRow } from "@/lib/posts";
import { Postagem } from "@/components/Home/Postagem";

function makeExcerpt(text: string, n = 220) {
  const t = (text ?? "").trim().replace(/\s+/g, " ");
  return t.length > n ? t.slice(0, n) + "…" : t;
}

export default function FeaturedPosts({ limit = 3 }: { limit?: number }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostRow[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await listPublicPosts();
      setPosts((data ?? []).slice(0, limit));
      setLoading(false);
    })();
  }, [limit]);

  if (loading) {
    return (
      <>
        {Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            className="h-[460px] w-full rounded-2xl border border-black/10 bg-black/5 animate-pulse"
          />
        ))}
      </>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="md:col-span-3 rounded-2xl border border-black/10 bg-white p-8 text-gray-700">
        Nenhuma postagem publicada ainda.
      </div>
    );
  }

  return (
    <>
      {posts.map((p) => (
        <Postagem
          key={p.id}
          href={`/blog/${p.id}`}
          title={p.title}
          date={p.created_at}
          excerpt={makeExcerpt(p.content)}
          coverUrl={p.cover_image_url}
          category={null}
        />
      ))}
    </>
  );
}
