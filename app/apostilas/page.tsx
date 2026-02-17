"use client";

import { useEffect, useState } from "react";
import {
  createSignedDownloadUrl,
  FileRow,
  listPublicApostilas,
} from "@/lib/apostilas";

export default function ApostilasPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<FileRow[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);

      const { data, error } = await listPublicApostilas();
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setFiles((data as any) ?? []);
      setLoading(false);
    }
    run();
  }, []);

  async function download(file: FileRow) {
    setDownloadingId(file.id);

    const { data, error } = await createSignedDownloadUrl(file.object_path);

    setDownloadingId(null);

    if (error || !data?.signedUrl) {
      alert(error?.message ?? "Falha ao gerar link.");
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  if (loading) return <div className="p-10">Carregando...</div>;
  if (error) return <div className="p-10">Erro: {error}</div>;

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Apostilas</h1>

      {files.length === 0 ? (
        <div className="opacity-70">Nenhuma apostila publicada ainda.</div>
      ) : (
        <div className="grid gap-3">
          {files.map((f) => (
            <div
              key={f.id}
              className="rounded-2xl border border-white/10 bg-black/40 p-5 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="font-semibold text-lg truncate">
                  {f.title ?? f.original_name}
                </div>
                {f.description && (
                  <div className="text-sm opacity-75 mt-1">{f.description}</div>
                )}
                <div className="text-xs opacity-60 mt-2">
                  {(f.size_bytes / (1024 * 1024)).toFixed(2)} MB ·{" "}
                  {new Date(f.created_at).toLocaleDateString("pt-BR")}
                </div>
              </div>

              <button
                onClick={() => download(f)}
                disabled={downloadingId === f.id}
                className="rounded-xl bg-white text-black font-semibold px-4 py-3 hover:opacity-90 transition disabled:opacity-60"
              >
                {downloadingId === f.id ? "Gerando link..." : "Baixar"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
