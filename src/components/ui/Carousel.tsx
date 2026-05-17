import { useEffect, useState } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
  images: string[];
  variant?: 'default' | 'showcase';
  thumbsCollapsible?: boolean;
}

export function Carousel({
  images,
  variant = 'default',
  thumbsCollapsible = false,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [thumbsExpanded, setThumbsExpanded] = useState(false);

  if (!images.length) return null;

  useEffect(() => {
    setCurrent(0);
    setTouchStart(null);
    setTouchEnd(null);
    setThumbsExpanded(false);
  }, [images]);

  const prev = () => setCurrent(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === images.length - 1 ? 0 : i + 1));
  const isShowcase = variant === 'showcase';
  const minSwipeDistance = 40;

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(event.targetTouches[0]?.clientX ?? null);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(event.targetTouches[0]?.clientX ?? null);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) next();
    if (distance < -minSwipeDistance) prev();
  };

  return (
    <div className={`${styles.carousel} ${isShowcase ? styles.showcase : ''}`}>
      <div
        className={styles.viewport}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
          <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={prev} aria-label="Anterior">
            <span aria-hidden="true" className={styles.arrowGlyph}>‹</span>
          </button>
          <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={next} aria-label="Próximo">
            <span aria-hidden="true" className={styles.arrowGlyph}>›</span>
          </button>
          <div className={styles.dots}>
            {images.map((_, i) => (
              <button
                type="button"
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
        <div className={styles.thumbSection}>
          {thumbsCollapsible && (
            <button
              type="button"
              className={styles.thumbToggle}
              onClick={() => setThumbsExpanded(value => !value)}
              aria-expanded={thumbsExpanded}
              aria-label={thumbsExpanded ? 'Recolher miniaturas' : 'Expandir miniaturas'}
            >
              <span aria-hidden="true" className={`${styles.thumbToggleGlyph} ${thumbsExpanded ? styles.thumbToggleGlyphOpen : ''}`}>
                <svg viewBox="0 0 24 24" className={styles.thumbToggleIcon}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>
          )}

          {(!thumbsCollapsible || thumbsExpanded) && (
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
      )}
    </div>
  );
}
