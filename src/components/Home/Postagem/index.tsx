import Link from "next/link";

type Props = {
  href: string;
  title: string;
  date: string;
  excerpt: string;
  coverUrl?: string | null;
  category?: string | null;
};

function formatDatePt(dateLike: string) {
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const Postagem = ({
  href,
  title,
  date,
  excerpt,
  coverUrl,
  category,
}: Props) => {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#fbf6e8] shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative w-full overflow-hidden bg-white aspect-16/10">
        {coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl}
            className="h-full w-full origin-center object-cover transition-transform duration-300 group-hover:scale-105"
            alt={title}
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_15%_20%,rgba(255,140,0,0.35),transparent_55%),radial-gradient(circle_at_85%_20%,rgba(79,163,255,0.25),transparent_55%)]" />
        )}

        <div className="absolute inset-x-0 bottom-0 h-2 bg-white/80" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-orange-600">
              {formatDatePt(date)}
            </span>
            {category && <span className="text-black/60">— {category}</span>}
          </div>

          <div className="mt-3 text-lg font-extrabold tracking-tight text-[#0b1220] sm:text-xl">
            {title}
          </div>

          <div className="mt-4 text-sm leading-relaxed text-[#0b1220]/80 line-clamp-5">
            {excerpt}
          </div>
        </div>

        <div className="mt-6">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-[#0b1220]">
            Ler mais
            <span className="transition group-hover:translate-x-1">→</span>
          </div>
          <div className="pointer-events-none mt-5 h-0.5 w-0 bg-orange-400 transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </Link>
  );
};

export { Postagem };