"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./carousel.module.css";
import { PostRow } from "@/src/@types/posts";
import { listPublicPosts } from "@/src/services/posts";

const images = [
  {
    id: 1,
    url: "/images/inicial/img1.jpeg",
    title: "Reunião histórica",
  },
  {
    id: 2,
    url: "/images/inicial/img2.jpg",
    title: "Exposição em Copacabana",
  },
  {
    id: 3,
    url: "/images/inicial/img3.jpeg",
    title: "Mentoria nas escolas",
  },
  {
    id: 4,
    url: "/images/inicial/img4.jpeg",
    title: "1º Simpósio Brasileiro de Mulheres",
  },
];

export default function SimpleCarousel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [numberPosts, setNumberPosts] = useState<number>(2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);

      const { data, error } = await listPublicPosts();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setPosts(data ?? []);
      setNumberPosts(images.length)
      setLoading(false);
    }

    run();
  }, []);


  const handleNext = useCallback(() => {
    // if (posts.length === 0) return;
    setCurrentIndex((prev) => (prev === numberPosts - 1 ? 0 : prev + 1));
  }, [numberPosts]);

  const handlePrev = useCallback(() => {
    // if (posts.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? numberPosts - 1 : prev - 1));
  }, [numberPosts]);

  useEffect(() => {
    if (isPaused || images.length === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [handleNext, isPaused, images.length]);


  return (
    <div className={styles.container}>
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
              {img.url !==null &&(
                <img
                  src={img.url}
                  alt={img.title}
                  className={styles.image}
                  loading="lazy"
                  draggable={false}
                />
              )}
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

      <div className={styles.indicators} aria-label="Indicadores do carrossel">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`${styles.dot} ${
              currentIndex === i ? styles.dotActive : styles.dotInactive
            }`}
            aria-label={`Ir para slide ${i + 1}: ${img.title}`}
            aria-pressed={currentIndex === i}
          />
        ))}
      </div>
    </div>
  );
}