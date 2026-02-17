"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isCurrentUserAdmin } from "@/lib/auth";
import {
  adminListAllApostilas,
  adminUploadPdf,
  createSignedDownloadUrl,
  FileRow,
} from "@/lib/apostilas";

export default function AdminApostilasPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [files, setFiles] = useState<FileRow[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);

    const { data, error } = await adminListAllApostilas();
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setFiles((data as any) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    async function guard() {
      const ok = await isCurrentUserAdmin();
      if (!ok) {
        router.replace("/login");
        return;
      }
      setChecking(false);
      refresh();
    }
    guard();
  }, [router]);

  async function upload() {
    setError(null);
    setSuccess(null);

    if (!file) {
      setError("Selecione um PDF.");
      return;
    }

    const { data, error } = await adminUploadPdf({
      file,
      title: title.trim() || undefined,
      description: description.trim() || undefined,
      is_public: isPublic,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Upload concluído!");
    setTitle("");
    setDescription("");
    setIsPublic(true);
    setFile(null);

    await refresh();
  }

  async function adminDownload(f: FileRow) {
    const { data, error } = await createSignedDownloadUrl(f.object_path);
    if (error || !data?.signedUrl) {
      alert(error?.message ?? "Falha ao gerar link.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  if (checking) return <div className="p-10">Verificando permissão...</div>;

  return (
    <div className="p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase opacity-70">
              STEM-IME · Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold">Apostilas</h1>
            <p className="mt-2 text-sm opacity-80">
              Upload de PDFs com título/descrição e controle de visibilidade.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/admin"
              className="rounded-xl border border-white/15 px-4 py-3 text-sm hover:border-white/30 transition"
            >
              Voltar pro Painel
            </Link>
            <Link
              href="/apostilas"
              className="rounded-xl border border-white/15 px-4 py-3 text-sm hover:border-white/30 transition"
            >
              Ver Público
            </Link>
          </div>
        </div>

        {(error || success) && (
          <div className="space-y-2">
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm">
                {success}
              </div>
            )}
          </div>
        )}

        {/* Upload */}
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 space-y-3">
          <div className="text-lg font-semibold">Upload de PDF</div>

          <input
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
            placeholder="Título (opcional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full min-h-32 rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex items-center gap-3">
            {/* Seletor de arquivo bonito */}
            <div className="flex flex-col gap-2">
              <label className="text-sm opacity-80">PDF</label>

              {/* input real escondido */}
              <input
                id="pdfInput"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />

              <div className="flex items-center gap-3 flex-wrap">
                <label
                  htmlFor="pdfInput"
                  className="cursor-pointer rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm
                 hover:border-white/30 transition"
                >
                  Selecionar PDF
                </label>

                {file ? (
                  <div className="text-sm opacity-85">
                    <span className="font-semibold">{file.name}</span>
                    <span className="opacity-70">
                      {" "}
                      · {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                ) : (
                  <div className="text-sm opacity-60">
                    Nenhum arquivo selecionado (apenas PDF, até 20MB)
                  </div>
                )}

                {file && (
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="rounded-xl border border-red-500/30 px-3 py-2 text-xs hover:border-red-500/50 transition"
                  >
                    Remover
                  </button>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm opacity-80 mt-1">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                Público
              </label>
            </div>
          </div>

          <button
            onClick={upload}
            disabled={!file}
            className="rounded-xl bg-white text-black font-semibold px-5 py-3 hover:opacity-90 transition disabled:opacity-60"
          >
            Enviar
          </button>
        </div>

        {/* Lista */}
        <div className="space-y-3">
          <div className="text-lg font-semibold">Arquivos</div>

          {loading ? (
            <div>Carregando...</div>
          ) : files.length === 0 ? (
            <div className="opacity-70">Nenhum arquivo ainda.</div>
          ) : (
            <div className="grid gap-3">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-lg truncate">
                      {f.title ?? f.original_name}
                    </div>
                    {f.description && (
                      <div className="text-sm opacity-75 mt-1">
                        {f.description}
                      </div>
                    )}
                    <div className="text-xs opacity-60 mt-2">
                      {(f.size_bytes / (1024 * 1024)).toFixed(2)} MB ·{" "}
                      {f.is_public ? "Público" : "Privado"}
                    </div>
                  </div>

                  <button
                    onClick={() => adminDownload(f)}
                    className="rounded-xl border border-white/15 px-4 py-3 text-sm hover:border-white/30 transition"
                  >
                    Baixar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
