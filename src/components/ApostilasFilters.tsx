"use client";

import { Subject } from "@/src/services/apostilas";

export type SortKey = "recent" | "az" | "size";

const SUBJECTS: { key: Subject; label: string }[] = [
  { key: "matematica", label: "Matemática" },
  { key: "fisica", label: "Física" },
  { key: "quimica", label: "Química" },
];

type Props = {
  query: string;
  onQueryChange: (v: string) => void;

  sort: SortKey;
  onSortChange: (v: SortKey) => void;

  selected: Subject[]; // multi-select
  onSelectedChange: (v: Subject[]) => void;
};

export default function ApostilasFilters({
  query,
  onQueryChange,
  sort,
  onSortChange,
  selected,
  onSelectedChange,
}: Props) {
  const anySelected = selected.length > 0;

  function toggleSubject(s: Subject) {
    if (selected.includes(s)) onSelectedChange(selected.filter((x) => x !== s));
    else onSelectedChange([...selected, s]);
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur-md p-5 shadow-sm">
      {/* Linha 1: Busca + Ordenação */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        {/* Busca */}
        <div className="w-full md:max-w-105">
          <div className="text-xs font-semibold tracking-wider text-[#0b1220]/60 uppercase">
            Buscar
          </div>

          <div className="mt-2 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40">
              {/* ícone lupa */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Buscar por título, descrição..."
              className="w-full rounded-xl border border-black/10 bg-black/5 pl-10 pr-4 py-3 text-sm outline-none
                         placeholder:text-black/40
                         focus:border-[#4fa3ff] focus:ring-2 focus:ring-[#4fa3ff]/20"
            />
          </div>
        </div>

        {/* Ordenação */}
        <div className="w-full md:w-55">
          <div className="text-xs font-semibold tracking-wider text-[#0b1220]/60 uppercase">
            Ordenar
          </div>

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="mt-2 w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-sm outline-none
             text-[#0b1220] font-semibold
             focus:border-[#4fa3ff] focus:ring-2 focus:ring-[#4fa3ff]/20"
          >
            <option value="recent" className="text-[#0b1220]">
              Mais recentes
            </option>
            <option value="az" className="text-[#0b1220]">
              A–Z
            </option>
            <option value="size" className="text-[#0b1220]">
              Maior tamanho
            </option>
          </select>
        </div>
      </div>

      {/* Linha 2: Seletor de Matérias */}
      <div className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-semibold tracking-wider text-[#0b1220]/60 uppercase">
            Matérias
          </div>

          {anySelected && (
            <button
              onClick={() => onSelectedChange([])}
              className="text-xs font-bold text-[#0b1220]/60 hover:text-[#0b1220] transition"
            >
              Limpar
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {/* Botão “Todas” */}
          <button
            onClick={() => onSelectedChange([])}
            className={[
              "rounded-full px-4 py-2 text-sm font-bold border transition",
              !anySelected
                ? "bg-[#0b1220] text-white border-[#0b1220]"
                : "bg-black/5 text-[#0b1220] border-black/10 hover:border-black/20",
            ].join(" ")}
          >
            Todas
          </button>

          {SUBJECTS.map((s) => {
            const active = selected.includes(s.key);
            return (
              <button
                key={s.key}
                onClick={() => toggleSubject(s.key)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-bold border transition",
                  active
                    ? "bg-[#0b1220] text-white border-[#0b1220]"
                    : "bg-black/5 text-[#0b1220] border-black/10 hover:border-black/20",
                ].join(" ")}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <div className="mt-3 text-xs text-[#0b1220]/55">
          Dica: você pode selecionar mais de uma matéria.
        </div>
      </div>
    </div>
  );
}
