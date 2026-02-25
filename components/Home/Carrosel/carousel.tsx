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

  // Memoizamos o handleNext para que possa ser usado dentro do useEffect de forma segura
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Lógica de Autoplay
  useEffect(() => {
    if (isPaused) return; // Se o rato estiver em cima, não faz o auto-play

    const timer = setInterval(() => {
      handleNext();
    }, 3000); // Muda a cada 3 segundos

    // Limpeza do intervalo ao desmontar o componente ou mudar o estado
    return () => clearInterval(timer);
  }, [handleNext, isPaused]);

  return (
    <div className={styles.container}>
      <div
        className={styles.viewport}
        onMouseEnter={() => setIsPaused(true)} // Pausa ao passar o rato
        onMouseLeave={() => setIsPaused(false)} // Resume ao tirar o rato
      >
        {/* Track das Imagens */}
        <div
          className={styles.track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img) => (
            <div key={img.id} className={styles.slide}>
              <img src={img.url} alt={img.title} className={styles.image} />
              <div className={styles.caption}>
                <h3>{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Anterior */}
        <button
          onClick={handlePrev}
          className={`${styles.navButton} ${styles.prev}`} // Ambos dentro de ${styles...}
        >
          ←
        </button>

        {/* Botão Próximo */}
        <button
          onClick={handleNext}
          className={`${styles.navButton} ${styles.next}`} // Ambos dentro de ${styles...}
        >
          →
        </button>
      </div>

      {/* Pontinhos (Indicadores) */}
      <div className={styles.indicators}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`${styles.dot} ${currentIndex === i ? styles.dotActive : styles.dotInactive}`}
          />
        ))}
      </div>
    </div>
  );
}
