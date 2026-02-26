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
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-black/10 shadow-xl bg-[#fbf6e8]
                 transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-white">
        {coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 origin-center"
            alt={title}
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_15%_20%,rgba(255,140,0,0.35),transparent_55%),radial-gradient(circle_at_85%_20%,rgba(79,163,255,0.25),transparent_55%)]" />
        )}

        <div className="absolute inset-x-0 bottom-0 h-2 bg-white/80" />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-orange-600">
            {formatDatePt(date)}
          </span>
          {category && <span className="text-black/60">— {category}</span>}
        </div>

        <div className="mt-3 text-xl font-extrabold tracking-tight text-[#0b1220]">
          {title}
        </div>

        <div className="mt-4 text-sm text-[#0b1220]/80 leading-relaxed line-clamp-5">
          {excerpt}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0b1220]">
          Ler mais{" "}
          <span className="transition group-hover:translate-x-1">→</span>
        </div>

        <div className="pointer-events-none mt-5 h-[2px] w-0 bg-orange-400 transition-all duration-500 group-hover:w-full" />
      </div>
    </Link>
  );
};

export { Postagem };
