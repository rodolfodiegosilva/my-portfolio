import { useState } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
  images: string[];
}

export function Carousel({ images }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  if (!images.length) return null;

  const prev = () => setCurrent(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className={styles.carousel}>
      <div className={styles.track} style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Slide ${i + 1}`} className={styles.slide} />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button className={`${styles.arrow} ${styles.prev}`} onClick={prev} aria-label="Anterior">
            <i className="fas fa-chevron-left" />
          </button>
          <button className={`${styles.arrow} ${styles.next}`} onClick={next} aria-label="Próximo">
            <i className="fas fa-chevron-right" />
          </button>
          <div className={styles.dots}>
            {images.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
