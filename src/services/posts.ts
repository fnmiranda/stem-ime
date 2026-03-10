import { supabase } from "@/src/services/supabaseClient";

import {PostRow} from "@/src/@types/posts"

type Ok<T> = { data: T; error: null };
type Err = { data: null; error: { message: string } };

export async function uploadPostCover(
  file: File,
): Promise<Ok<{ publicUrl: string; objectPath: string }> | Err> {
  if (!file.type.startsWith("image/")) {
    return {
      data: null,
      error: { message: "Envie uma imagem (PNG/JPG/WebP)." },
    };
  }

  if (file.size > 3 * 1024 * 1024) {
    return { data: null, error: { message: "Imagem muito grande (máx 3MB)." } };
  }

  const safeName = file.name.replaceAll(" ", "_");
  const objectPath = `covers/${new Date().getFullYear()}/${Date.now()}_${safeName}`;

  const upload = await supabase.storage
    .from("post-covers")
    .upload(objectPath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (upload.error) {
    return { data: null, error: { message: upload.error.message } };
  }

  const { data } = supabase.storage
    .from("post-covers")
    .getPublicUrl(objectPath);

  if (!data?.publicUrl) {
    return {
      data: null,
      error: { message: "Falha ao obter URL pública da imagem." },
    };
  }

  return { data: { publicUrl: data.publicUrl, objectPath }, error: null };
}

const POSTS_SELECT =
  "id,title,content,cover_image_url,is_published,created_at,updated_at";

export async function listPublicPosts() {
  return supabase
    .from("posts")
    .select(POSTS_SELECT)
    .eq("is_published", true)
    .order("created_at", { ascending: false });
}

export async function getPublicPostById(id: string) {
  return supabase
    .from("posts")
    .select(POSTS_SELECT)
    .eq("id", id)
    .eq("is_published", true)
    .single();
}

export async function adminListAllPosts() {
  return supabase
    .from("posts")
    .select(POSTS_SELECT)
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
    .select(POSTS_SELECT)
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
  return supabase
    .from("posts")
    .update(payload)
    .eq("id", id)
    .select(POSTS_SELECT)
    .single();
}

export async function adminDeletePost(id: string) {
  return supabase.from("posts").delete().eq("id", id);
}
