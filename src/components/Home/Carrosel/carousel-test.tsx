import React, { useMemo } from "react";
import styles from "./container-test.module.css";

type Img = {
  src: string;
  alt?: string;
};

type Props = {
  images: Img[];
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
  images,
  itemWidth = 220,
  itemHeight = 140,
  gap = 14,
  durationSec = 18,
  direction = "left",
  pauseOnHover = true,
  edgeFade = true,
}: Props) {
  const safe = images ?? [];

  // Duplicar para loop perfeito (2 “pistas” iguais)
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
      <div className={styles.track} aria-label="Infinite image slider">
        {doubled.map((img, i) => (
          <div className={styles.item} key={`${img.src}-${i}`}>
            <img className={styles.img} src={img.src} alt={img.alt ?? ""} />
            <div className="text-amber-50 mt-2">SESSÃO TAL</div>
          </div>
        ))}
      </div>
    </div>
  );
}