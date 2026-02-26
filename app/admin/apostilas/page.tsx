"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { isCurrentUserAdmin } from "@/lib/auth";
import {
  adminListAllApostilas,
  adminUploadPdf,
  createSignedDownloadUrl,
  FileRow,
  Subject,
} from "@/lib/apostilas";

function subjectLabel(s: Subject | null | undefined) {
  if (s === "matematica") return "Matemática";
  if (s === "fisica") return "Física";
  if (s === "quimica") return "Química";
  return "Geral";
}

function formatMB(bytes?: number | null) {
  if (!bytes) return "—";
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDatePt(dateLike: string) {
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR");
}

export default function AdminApostilasPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [files, setFiles] = useState<FileRow[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [subject, setSubject] = useState<Subject>("matematica");
  const [file, setFile] = useState<File | null>(null);

  // estrelas (vibe do site)
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        opacity: 0.12 + Math.random() * 0.5,
        blur: Math.random() * 1.2,
      })),
    [],
  );

  const total = files.length;
  const totalPublic = files.filter((f) => f.is_public).length;
  const totalPrivate = total - totalPublic;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  async function upload() {
    setError(null);
    setSuccess(null);

    if (!file) {
      setError("Selecione um PDF.");
      return;
    }

    setUploading(true);

    const { error } = await adminUploadPdf({
      file,
      title: title.trim() || undefined,
      description: description.trim() || undefined,
      is_public: isPublic,
      subject,
    });

    setUploading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Upload concluído!");
    setTitle("");
    setDescription("");
    setIsPublic(true);
    setSubject("matematica");
    setFile(null);

    await refresh();
  }

  async function adminDownload(f: FileRow) {
    setDownloadingId(f.id);

    const { data, error } = await createSignedDownloadUrl(f.object_path);

    setDownloadingId(null);

    if (error || !data?.signedUrl) {
      alert(error?.message ?? "Falha ao gerar link.");
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#040607] text-white flex items-center justify-center p-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
          Verificando permissão...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040607] text-white">
      {/* Fundo + glow */}
      <div className="absolute inset-0 bg-[#040607]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(79,163,255,0.18),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(255,140,0,0.14),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.05),transparent_60%)]" />

      {/* Estrelas */}
      <div className="absolute inset-0 opacity-70">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              filter: `blur(${s.blur}px)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
                <span className="inline-block h-2 w-2 rounded-full bg-orange-400" />
                STEM-IME · Admin
              </div>

              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                Apostilas
              </h1>
              <p className="mt-2 text-white/70 max-w-2xl leading-relaxed">
                Upload de PDFs com título/descrição, matéria e controle de
                visibilidade.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-xs text-white/60">Total</div>
                  <div className="text-lg font-bold">{total}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-xs text-white/60">Públicas</div>
                  <div className="text-lg font-bold">{totalPublic}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-xs text-white/60">Privadas</div>
                  <div className="text-lg font-bold">{totalPrivate}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href="/admin"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
              >
                Voltar pro Painel
              </Link>
              <Link
                href="/apostilas"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
              >
                Ver Público
              </Link>
            </div>
          </div>
        </div>

        {/* faixa azul */}
        <div className="h-3 bg-[#4fa3ff]" />

        <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
          {(error || success) && (
            <div className="space-y-2">
              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm">
                  {success}
                </div>
              )}
            </div>
          )}

          {/* Upload */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl p-6 shadow-sm">
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl transition group-hover:bg-orange-400/18" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-xl font-extrabold">Upload de PDF</div>
                  <div className="mt-1 text-sm text-white/70">
                    Defina matéria, título/descrição e se o arquivo ficará
                    público.
                  </div>
                </div>

                <div className="text-xs text-white/60">
                  Máximo 20MB · Apenas PDF
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-sm text-white/80">
                      Título (opcional)
                    </label>
                    <input
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none
                                 focus:border-[#4fa3ff] focus:ring-2 focus:ring-[#4fa3ff]/20"
                      placeholder="Ex.: Lista 1 — Cinemática"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm text-white/80">Matéria</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value as Subject)}
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none
                                 text-white
                                 focus:border-[#4fa3ff] focus:ring-2 focus:ring-[#4fa3ff]/20"
                    >
                      <option value="matematica">Matemática</option>
                      <option value="fisica">Física</option>
                      <option value="quimica">Química</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm text-white/80">
                    Descrição (opcional)
                  </label>
                  <textarea
                    className="w-full min-h-32 rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none
                               focus:border-[#4fa3ff] focus:ring-2 focus:ring-[#4fa3ff]/20"
                    placeholder="Uma frase curta explicando o conteúdo."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Arquivo */}
                <div className="grid gap-2">
                  <label className="text-sm text-white/80">PDF</label>

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
                      className="cursor-pointer rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm
                                 hover:border-white/30 hover:bg-white/10 transition"
                    >
                      Selecionar PDF
                    </label>

                    {file ? (
                      <div className="text-sm text-white/80">
                        <span className="font-semibold">{file.name}</span>
                        <span className="text-white/60">
                          {" "}
                          · {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm text-white/60">
                        Nenhum arquivo selecionado
                      </div>
                    )}

                    {file && (
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-100 hover:border-red-500/60 transition"
                      >
                        Remover
                      </button>
                    )}
                  </div>

                  <label className="mt-2 inline-flex items-center gap-2 text-sm text-white/80">
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="accent-orange-400"
                    />
                    Público
                  </label>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={upload}
                    disabled={!file || uploading}
                    className="rounded-xl bg-white text-black font-semibold px-5 py-3 hover:opacity-90 transition disabled:opacity-60"
                  >
                    {uploading ? "Enviando..." : "Enviar"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTitle("");
                      setDescription("");
                      setIsPublic(true);
                      setSubject("matematica");
                      setFile(null);
                      setError(null);
                      setSuccess(null);
                    }}
                    className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition"
                  >
                    Limpar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lista */}
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="text-sm font-semibold tracking-wider text-white/70 uppercase">
                  Arquivos
                </div>
                <div className="mt-1 text-2xl font-extrabold">
                  Apostilas enviadas
                </div>
              </div>

              <button
                onClick={refresh}
                disabled={loading}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm hover:border-white/30 hover:bg-white/10 transition disabled:opacity-60"
              >
                {loading ? "Atualizando..." : "Atualizar"}
              </button>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
                Carregando arquivos...
              </div>
            ) : files.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="text-lg font-extrabold">
                  Nenhum arquivo ainda
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Faça o primeiro upload usando o formulário acima.
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {files.map((f) => {
                  const busy = downloadingId === f.id;

                  return (
                    <div
                      key={f.id}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-white/20"
                    >
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-400 transition-all duration-500 group-hover:w-full" />

                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="text-lg font-extrabold truncate">
                              {f.title ?? f.original_name}
                            </div>

                            <span className="rounded-full px-3 py-1 text-xs font-bold border bg-white/5 border-white/10 text-white/80">
                              {subjectLabel(f.subject)}
                            </span>

                            <span
                              className={[
                                "rounded-full px-3 py-1 text-xs font-bold border",
                                f.is_public
                                  ? "bg-green-500/10 border-green-500/25 text-green-200"
                                  : "bg-white/5 border-white/10 text-white/70",
                              ].join(" ")}
                            >
                              {f.is_public ? "Público" : "Privado"}
                            </span>
                          </div>

                          <div className="mt-2 text-xs text-white/60">
                            {formatMB(f.size_bytes)} ·{" "}
                            {formatDatePt(f.created_at)}
                          </div>

                          {f.description && (
                            <div className="mt-3 text-sm text-white/70">
                              {f.description}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 md:justify-end">
                          <button
                            onClick={() => adminDownload(f)}
                            disabled={busy}
                            className="rounded-xl bg-white text-black font-semibold px-4 py-2 text-sm hover:opacity-90 transition disabled:opacity-60"
                          >
                            {busy ? "Gerando..." : "Baixar"}
                          </button>

                          {f.is_public && (
                            <Link
                              href="/apostilas"
                              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:border-white/30 hover:bg-white/10 transition"
                            >
                              Ver no público
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* faixa laranja */}
        <div className="h-2 bg-orange-400" />
      </div>
    </div>
  );
}
