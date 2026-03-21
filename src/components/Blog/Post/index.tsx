import Link from "next/link";
import { PostRow } from "@/src/@types/posts";
import { formatDatePt } from "@/src/lib/dataFormaters";

function excerpt(text: string, n = 160) {
  const t = (text ?? "").trim().replace(/\s+/g, " ");
  if (t.length <= n) return t;
  return t.slice(0, n) + "…";
}

interface PostProps {
  p: PostRow;
}

const Post = ({ p }: PostProps) => {
  const hasImage = Boolean(p.cover_image_url && p.cover_image_url.trim() !== "");

  return (
    <Link
      href={`/blog/${p.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex aspect-16/10 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-[#f5f5f5]">
        {hasImage ? (
          <img
            className="h-full w-full scale-[1.4] object-cover transition-transform duration-500 group-hover:scale-[1.45]"
            src={p.cover_image_url!}
            alt={p.title}
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_15%_20%,rgba(255,140,0,0.20),transparent_55%),radial-gradient(circle_at_85%_20%,rgba(79,163,255,0.18),transparent_55%),linear-gradient(135deg,#f8fafc,#e5e7eb)]" />
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4">
        <div className="mt-3 text-xs text-[#0b1220]/60">
          {formatDatePt(p.created_at)}
        </div>

        <div className="mt-2 line-clamp-2 text-lg font-extrabold tracking-tight text-orange-500">
          {p.title}
        </div>

        <div className="mt-3 line-clamp-4 text-justify mx-0.5 text-sm leading-relaxed text-[#0b1220]/75">
          {excerpt(p.content)}
        </div>

        <div className="mt-auto pt-6">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-[#0b1220]">
            Ler post
            <span className="translate-x-0 transition group-hover:translate-x-1">
              →
            </span>
          </div>

          <div className="pointer-events-none mt-5 h-0.5 w-0 bg-orange-400 transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </Link>
  );
};

export { Post };