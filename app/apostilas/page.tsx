"use client";

import { useEffect, useMemo, useState } from "react";
import ApostilasFilters, { SortKey } from "@/components/ApostilasFilters";
import {
  createSignedDownloadUrl,
  FileRow,
  listPublicApostilas,
  Subject,
} from "@/lib/apostilas";

function formatMB(bytes?: number | null) {
  if (!bytes || bytes <= 0) return "—";
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDatePt(dateLike: string) {
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR");
}

function getTitle(f: FileRow) {
  return (f.title ?? f.original_name ?? "Arquivo").trim();
}

function subjectLabel(s: Subject | null | undefined) {
  if (s === "matematica") return "Matemática";
  if (s === "fisica") return "Física";
  if (s === "quimica") return "Química";
  return "Geral";
}

export default function ApostilasPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<FileRow[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // ✅ estados do filtro (usados pelo componente)
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);

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

  // ✅ aplica filtros + ordenação
  const shownFiles = useMemo(() => {
    const q = query.trim().toLowerCase();
    const selected = new Set(selectedSubjects);

    const filtered = files.filter((f) => {
      // matéria
      if (selected.size > 0) {
        if (!f.subject) return false;
        if (!selected.has(f.subject)) return false;
      }

      // busca
      if (!q) return true;
      const t = getTitle(f).toLowerCase();
      const d = (f.description ?? "").toLowerCase();
      const n = (f.original_name ?? "").toLowerCase();
      return t.includes(q) || d.includes(q) || n.includes(q);
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sort === "az") {
        return getTitle(a).localeCompare(getTitle(b), "pt-BR", {
          sensitivity: "base",
        });
      }
      if (sort === "size") {
        return (b.size_bytes ?? 0) - (a.size_bytes ?? 0);
      }
      // recent
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    return sorted;
  }, [files, query, sort, selectedSubjects]);

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

  return (
    <div className="min-h-screen bg-[#040607]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#040607]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(79,163,255,0.22),transparent_55%),radial-gradient(circle_at_85%_20%,rgba(255,140,0,0.18),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-12">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-orange-400" />
            Biblioteca STEMIME
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Apostilas
          </h1>
          <p className="mt-2 max-w-2xl text-white/70 leading-relaxed">
            Filtre por matéria, busque pelo conteúdo e baixe os materiais
            publicados.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-xs text-white/60">Total publicadas</div>
              <div className="text-lg font-bold text-white">{files.length}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-xs text-white/60">Mostrando</div>
              <div className="text-lg font-bold text-white">
                {shownFiles.length}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-3 bg-[#4fa3ff]" />

      {/* CONTEÚDO */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-sm font-semibold tracking-wider text-[#0b1220]/60 uppercase">
            Biblioteca
          </div>
          <h2 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight text-[#0b1220]">
            Materiais disponíveis
          </h2>

          {/* ✅ AQUI o componente é usado */}
          <div className="mt-6">
            <ApostilasFilters
              query={query}
              onQueryChange={setQuery}
              sort={sort}
              onSortChange={setSort}
              selected={selectedSubjects}
              onSelectedChange={setSelectedSubjects}
            />
          </div>

          {loading && <div className="mt-8">Carregando...</div>}

          {!loading && error && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              <div className="font-bold">Erro ao carregar apostilas</div>
              <div className="mt-1 text-sm opacity-90">{error}</div>
            </div>
          )}

          {!loading && !error && shownFiles.length === 0 && (
            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
              <div className="text-lg font-extrabold text-[#0b1220]">
                Nenhuma apostila encontrada
              </div>
              <div className="mt-2 text-sm text-[#0b1220]/70">
                Ajuste os filtros ou a busca.
              </div>
            </div>
          )}

          {!loading && !error && shownFiles.length > 0 && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shownFiles.map((f) => {
                const busy = downloadingId === f.id;

                return (
                  <div
                    key={f.id}
                    className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition
                               hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="min-w-0">
                      <div className="font-extrabold text-[#0b1220] truncate">
                        {getTitle(f)}
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#0b1220]/60">
                        <span className="rounded-full black px-2 py-1 font-bold">
                          {subjectLabel(f.subject)}
                        </span>
                        <span>{formatMB(f.size_bytes)}</span>
                        <span>·</span>
                        <span>{formatDatePt(f.created_at)}</span>
                      </div>

                      {f.description && (
                        <div className="mt-3 text-sm text-[#0b1220]/75 line-clamp-3">
                          {f.description}
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={() => download(f)}
                        disabled={busy}
                        className="w-full rounded-xl bg-[#0b1220] text-white font-bold px-4 py-3 transition
                                   hover:opacity-90 disabled:opacity-60"
                      >
                        {busy ? "Gerando link..." : "Baixar"}
                      </button>
                    </div>

                    <div className="pointer-events-none mt-5 h-0.5 w-0 bg-orange-400 transition-all duration-500 group-hover:w-full" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <div className="h-2 bg-orange-400" />
    </div>
  );
}
