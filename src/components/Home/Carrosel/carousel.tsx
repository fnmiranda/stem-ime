"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./carousel.module.css";

const images = [
  {
    id: 1,
    url: "https://www.institutodeengenharia.org.br/site/wp-content/uploads/2020/02/mulher.jpg",
    title: "Simpósio Brasileiro",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    title: "Exposição em Copacabana",
  },
  {
    id: 3,
    url: "https://gabrielaganem.com/wp-content/uploads/2018/03/85d1ca1c7a0c7ed6ff562f436b6e3792.jpg",
    title: "Mulheres na Consultoria",
  },
];

export default function SimpleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [handleNext, isPaused]);

  return (
    <section className={styles.container} aria-label="Carrossel de fotos em destaque">
      <div
        className={styles.viewport}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img) => (
            <div key={img.id} className={styles.slide}>
              <img
                src={img.url}
                alt={img.title}
                className={styles.image}
                loading="lazy"
                draggable={false}
              />
              <div className={styles.caption}>
                <h3>{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handlePrev}
          className={`${styles.navButton} ${styles.prev}`}
          aria-label="Imagem anterior"
        >
          ←
        </button>

        <button
          type="button"
          onClick={handleNext}
          className={`${styles.navButton} ${styles.next}`}
          aria-label="Próxima imagem"
        >
          →
        </button>
      </div>

      <div className={styles.indicators}>
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`${styles.dot} ${
              currentIndex === i ? styles.dotActive : styles.dotInactive
            }`}
            aria-label={`Ir para a imagem ${i + 1}: ${img.title}`}
            aria-pressed={currentIndex === i}
          />
        ))}
      </div>
    </section>
  );
}