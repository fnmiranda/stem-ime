import React, { useMemo } from "react";
import styles from "./container-test.module.css";

type Info = {
  title: string;
  src: string;
  alt?: string;
  content: string;
};

type Props = {
  infos: Info[];
  /** largura do card (px) */
  itemWidth?: number;
  /** altura do card (px) */
  itemHeight?: number;
  /** espaço entre cards (px) */
  gap?: number;
  /** duração do loop completo (s). Menor = mais rápido */
  durationSec?: number;
  /** direção do scroll */
  direction?: "left" | "right";
  /** pausa quando passa o mouse */
  pauseOnHover?: boolean;
  /** bordas com fade (deixa estilo mais “premium”) */
  edgeFade?: boolean;
};

export default function InfiniteImageSlider({
  infos,
  itemWidth = 220,
  itemHeight = 140,
  gap = 14,
  durationSec = 18,
  direction = "left",
  pauseOnHover = true,
  edgeFade = true,
}: Props) {
  const safe = infos ?? [];
  const doubled = useMemo(() => [...safe, ...safe], [safe]);

  if (safe.length === 0) return null;

  return (
    <div
      className={[
        styles.wrapper,
        pauseOnHover ? styles.pauseOnHover : "",
        edgeFade ? styles.edgeFade : "",
      ].join(" ")}
      style={
        {
          ["--itemW" as string]: `${itemWidth}px`,
          ["--itemH" as string]: `${itemHeight}px`,
          ["--gap" as string]: `${gap}px`,
          ["--duration" as string]: `${durationSec}s`,
          ["--dir" as string]: direction === "left" ? 1 : -1,
        } as React.CSSProperties
      }
    >
      <div className={styles.track} aria-label="Slider infinito de diretorias">
        {doubled.map((info, i) => (
          <article className={styles.item} key={`${info.src}-${i}`}>
            <div className="relative w-full overflow-hidden rounded-t-[1.25rem]">
              <img
                className={styles.img}
                src={info.src}
                alt={info.alt ?? info.title}
                loading="lazy"
                draggable={false}
              />
            </div>

            <div className="flex flex-1 flex-col px-4 pb-5 pt-3 sm:px-5">
              <h3 className="text-center text-sm text-black font-bold tracking-wide sm:text-base">
                {info.title}
              </h3>

              <p className="mt-3 text-justify text-black text-sm leading-relaxed ">
                {info.content}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}