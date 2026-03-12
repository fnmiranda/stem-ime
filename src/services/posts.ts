import { supabase } from "@/src/services/supabaseClient";

type Ok<T> = { data: T; error: null };
type Err = { data: null; error: { message: string } };

const BUCKET_NAME = "post-covers";

const POSTS_SELECT =
  "id,title,content,cover_image_url,cover_image_path,is_published,created_at,updated_at";

function extractObjectPathFromPublicUrl(publicUrl: string): string | null {
  try {
    const decoded = decodeURIComponent(publicUrl);
    const match = decoded.match(
      /\/storage\/v1\/object\/public\/post-covers\/(.+)$/,
    );

    if (!match?.[1]) return null;

    return match[1].split("?")[0].replace(/^\/+/, "");
  } catch {
    return null;
  }
}

async function removePostCoverByPath(objectPath: string) {
  return supabase.storage.from(BUCKET_NAME).remove([objectPath]);
}

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
    return {
      data: null,
      error: { message: "Imagem muito grande (máx 3MB)." },
    };
  }

  const safeName = file.name.replaceAll(" ", "_");
  const objectPath = `covers/${new Date().getFullYear()}/${Date.now()}_${safeName}`;

  const upload = await supabase.storage
    .from(BUCKET_NAME)
    .upload(objectPath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (upload.error) {
    return { data: null, error: { message: upload.error.message } };
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(objectPath);

  if (!data?.publicUrl) {
    return {
      data: null,
      error: { message: "Falha ao obter URL pública da imagem." },
    };
  }

  return {
    data: {
      publicUrl: data.publicUrl,
      objectPath,
    },
    error: null,
  };
}

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
  cover_image_path?: string | null;
  is_published?: boolean;
}) {
  return supabase
    .from("posts")
    .insert([
      {
        title: payload.title,
        content: payload.content,
        cover_image_url: payload.cover_image_url ?? null,
        cover_image_path: payload.cover_image_path ?? null,
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
    cover_image_path: string | null;
    is_published: boolean;
  }>,
) {
  const { data: currentPost, error: fetchError } = await supabase
    .from("posts")
    .select("id,cover_image_url,cover_image_path")
    .eq("id", id)
    .single();

  if (fetchError) {
    return { data: null, error: fetchError };
  }

  const currentPath =
    currentPost.cover_image_path ||
    (currentPost.cover_image_url
      ? extractObjectPathFromPublicUrl(currentPost.cover_image_url)
      : null);

  const incomingPath =
    payload.cover_image_path !== undefined
      ? payload.cover_image_path
      : currentPost.cover_image_path;

  const incomingUrl =
    payload.cover_image_url !== undefined
      ? payload.cover_image_url
      : currentPost.cover_image_url;

  const { data: updatedPost, error: updateError } = await supabase
    .from("posts")
    .update(payload)
    .eq("id", id)
    .select(POSTS_SELECT)
    .single();

  if (updateError) {
    return { data: null, error: updateError };
  }

  const shouldDeleteOldCover =
    !!currentPath &&
    ((incomingPath === null && incomingUrl === null) ||
      (incomingPath !== null &&
        incomingPath !== undefined &&
        incomingPath !== currentPath));

  if (shouldDeleteOldCover && currentPath) {
    const { error: storageError } = await removePostCoverByPath(currentPath);

    if (storageError) {
      return { data: null, error: storageError };
    }
  }

  return { data: updatedPost, error: null };
}
const { data } = await supabase.auth.getSession();
console.log("SESSION USER:", data.session?.user?.id);
export async function adminDeletePost(id: string) {
  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("id, cover_image_path")
    .eq("id", id)
    .single();

  if (fetchError) {
    return { data: null, error: fetchError };
  }

  const objectPath = post.cover_image_path?.trim();

  if (objectPath) {
    const { data: removed, error: storageError } = await supabase.storage
      .from("post-covers")
      .remove([objectPath]);

    console.log("DELETE PATH:", objectPath);
    console.log("DELETE RESULT:", removed);
    console.log("DELETE ERROR:", storageError);

    if (storageError) {
      return { data: null, error: storageError };
    }
  }

  return supabase.from("posts").delete().eq("id", id);
}
