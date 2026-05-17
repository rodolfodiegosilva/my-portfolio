import { useState } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
  images: string[];
  variant?: 'default' | 'showcase';
}

export function Carousel({ images, variant = 'default' }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  if (!images.length) return null;

  const prev = () => setCurrent(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === images.length - 1 ? 0 : i + 1));
  const isShowcase = variant === 'showcase';

  return (
    <div className={`${styles.carousel} ${isShowcase ? styles.showcase : ''}`}>
      <div className={styles.viewport}>
      <div className={styles.track} style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Slide ${i + 1}`} className={styles.slide} />
        ))}
      </div>

      {isShowcase && (
        <div className={styles.counter}>
          <span>{String(current + 1).padStart(2, '0')}</span>
          <span className={styles.counterDivider}>/</span>
          <span>{String(images.length).padStart(2, '0')}</span>
        </div>
      )}

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

      {isShowcase && images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`${styles.thumb} ${i === current ? styles.thumbActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Abrir slide ${i + 1}`}
            >
              <img src={src} alt="" className={styles.thumbImage} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
