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
  itemWidth?: number;
  itemHeight?: number;
  gap?: number;
  durationSec?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
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
          ["--itemW" as any]: `${itemWidth}px`,
          ["--itemH" as any]: `${itemHeight}px`,
          ["--gap" as any]: `${gap}px`,
          ["--duration" as any]: `${durationSec}s`,
          ["--dir" as any]: direction === "left" ? 1 : -1,
        } as React.CSSProperties
      }
    >
      <div className={styles.track} aria-label="Carrossel infinito de diretorias">
        {doubled.map((info, i) => (
          <article className={styles.item} key={`${info.src}-${i}`}>
            <div className={styles.imageWrap}>
              <img
                className={styles.img}
                src={info.src}
                alt={info.alt ?? info.title}
                loading="lazy"
                draggable={false}
              />
            </div>

            <div className="mt-3 px-2 text-center text-sm font-bold tracking-wide text-amber-50 sm:text-base">
              {info.title}
            </div>

            <div className="mt-2 px-2 pb-2 text-justify text-xs leading-relaxed text-amber-50/90 sm:px-3 sm:text-sm">
              {info.content}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}