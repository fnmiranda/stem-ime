import Link from "next/link";
import {PostRow} from "@/src/@types/posts"
import { formatDatePt } from "@/src/lib/dataFormaters";

function excerpt(text: string, n = 160) {
  const t = (text ?? "").trim().replace(/\s+/g, " ");
  if (t.length <= n) return t;
  return t.slice(0, n) + "…";
}

interface PostProps{
  p: PostRow;
}

const Post = ({p}: PostProps) => {
  let imagemUrl = "";
  if(p.cover_image_url){
    imagemUrl = p.cover_image_url
  }

  return (
    <Link
      href={`/blog/${p.id}`}
      className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition
                             hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="font-extrabold text-lg truncate">{p.title}</div>
          <div className="flex w-124 h-70 justify-center items-center bg-gray-400 mt-2">
            {!p.cover_image_url || p.cover_image_url !=="" && (
              <img className=" w-full h-70" src={p.cover_image_url} alt="imagem" />
            )
            }
          </div>

          <div className="mt-2 text-xs text-[#0b1220]/60">
            {formatDatePt(p.created_at)}
          </div>

          <div className="mt-4 text-sm text-[#0b1220]/75">
            {excerpt(p.content)}
          </div>
        </div>
      </div>

      <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0b1220]">
        Ler post
        <span className="translate-x-0 transition group-hover:translate-x-1">
          →
        </span>
      </div>

      <div className="pointer-events-none mt-5 h-0.5 w-0 bg-orange-400 transition-all duration-500 group-hover:w-full" />
    </Link>
  );
};

export {Post};