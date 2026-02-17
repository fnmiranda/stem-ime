import { supabase } from "@/lib/supabaseClient";

export type PostRow = {
  id: string;
  title: string;
  content: string;
  cover_image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export async function listPublicPosts() {
  return supabase
    .from("posts")
    .select(
      "id,title,content,cover_image_url,is_published,created_at,updated_at",
    )
    .eq("is_published", true)
    .order("created_at", { ascending: false });
}

export async function getPublicPostById(id: string) {
  return supabase
    .from("posts")
    .select(
      "id,title,content,cover_image_url,is_published,created_at,updated_at",
    )
    .eq("id", id)
    .eq("is_published", true)
    .single();
}

export async function adminListAllPosts() {
  return supabase
    .from("posts")
    .select(
      "id,title,content,cover_image_url,is_published,created_at,updated_at",
    )
    .order("created_at", { ascending: false });
}

export async function adminCreatePost(payload: {
  title: string;
  content: string;
  cover_image_url?: string | null;
  is_published?: boolean;
}) {
  return supabase
    .from("posts")
    .insert([
      {
        title: payload.title,
        content: payload.content,
        cover_image_url: payload.cover_image_url ?? null,
        is_published: payload.is_published ?? true,
      },
    ])
    .select()
    .single();
}

export async function adminUpdatePost(
  id: string,
  payload: Partial<{
    title: string;
    content: string;
    cover_image_url: string | null;
    is_published: boolean;
  }>,
) {
  return supabase.from("posts").update(payload).eq("id", id).select().single();
}

export async function adminDeletePost(id: string) {
  return supabase.from("posts").delete().eq("id", id);
}
