import { supabase } from "@/lib/supabaseClient";

export type FileRow = {
  id: string;
  title: string | null;
  description: string | null;
  original_name: string;
  object_path: string;
  mime_type: string;
  size_bytes: number;
  is_public: boolean;
  created_at: string;
};

export async function listPublicApostilas() {
  return supabase
    .from("files")
    .select(
      "id,title,description,original_name,object_path,mime_type,size_bytes,is_public,created_at",
    )
    .eq("is_public", true)
    .order("created_at", { ascending: false });
}

export async function adminListAllApostilas() {
  return supabase
    .from("files")
    .select(
      "id,title,description,original_name,object_path,mime_type,size_bytes,is_public,created_at",
    )
    .order("created_at", { ascending: false });
}

export async function createSignedDownloadUrl(objectPath: string) {
  return supabase.storage.from("apostilas").createSignedUrl(objectPath, 120);
}

export async function adminUploadPdf(params: {
  file: File;
  title?: string;
  description?: string;
  is_public?: boolean;
}) {
  const { file, title, description, is_public } = params;

  if (file.type !== "application/pdf") {
    return { data: null, error: { message: "Apenas arquivos PDF." } as any };
  }
  if (file.size > 20 * 1024 * 1024) {
    return { data: null, error: { message: "Máximo 20MB." } as any };
  }

  const safeName = file.name.replaceAll(" ", "_");
  const objectPath = `pdfs/${new Date().getFullYear()}/${Date.now()}_${safeName}`;

  // 1) upload no storage
  const upload = await supabase.storage
    .from("apostilas")
    .upload(objectPath, file, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (upload.error) return upload;

  // 2) metadados no banco (uploader_id vem do trigger)
  return supabase
    .from("files")
    .insert([
      {
        bucket: "apostilas",
        object_path: objectPath,
        original_name: file.name,
        mime_type: file.type,
        size_bytes: file.size,
        title: title ?? null,
        description: description ?? null,
        is_public: is_public ?? true,
      },
    ])
    .select()
    .single();
}
