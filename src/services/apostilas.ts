import { supabase } from "@/src/services/supabaseClient";

export type Subject = "matematica" | "fisica" | "quimica";

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

  // ✅ novo
  subject: Subject | null;

  // (você já usa isso no insert)
  bucket?: string;
};

export async function listPublicApostilas() {
  return supabase
    .from("files")
    .select(
      "id,title,description,original_name,object_path,mime_type,size_bytes,is_public,created_at,subject,bucket",
    )
    .eq("bucket", "apostilas")
    .eq("is_public", true)
    .order("created_at", { ascending: false });
}

export async function adminListAllApostilas() {
  return supabase
    .from("files")
    .select(
      "id,title,description,original_name,object_path,mime_type,size_bytes,is_public,created_at,subject,bucket",
    )
    .eq("bucket", "apostilas")
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
  subject?: Subject | null; // ✅ novo
}) {
  const { file, title, description, is_public, subject } = params;

  if (file.type !== "application/pdf") {
    return { data: null, error: { message: "Apenas arquivos PDF." } as any };
  }
  if (file.size > 20 * 1024 * 1024) {
    return { data: null, error: { message: "Máximo 20MB." } as any };
  }

  if (
    subject != null &&
    subject !== "matematica" &&
    subject !== "fisica" &&
    subject !== "quimica"
  ) {
    return { data: null, error: { message: "Matéria inválida." } as any };
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

  // 2) metadados no banco
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

        // ✅ novo
        subject: subject ?? null,
      },
    ])
    .select()
    .single();
}
