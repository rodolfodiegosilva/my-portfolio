import styles from './ShowMoreButton.module.css';

interface ShowMoreButtonProps {
  expanded: boolean;
  onToggle: () => void;
  totalCount: number;
  visibleCount: number;
  labelMore?: string;
  labelLess?: string;
}

export function ShowMoreButton({ expanded, onToggle, totalCount, visibleCount, labelMore = 'Ver mais', labelLess = 'Ver menos' }: ShowMoreButtonProps) {
  const hidden = totalCount - visibleCount;
  return (
    <div className={styles.wrap}>
      <button className={styles.btn} onClick={onToggle} aria-expanded={expanded}>
        {expanded
          ? <><i className="fas fa-chevron-up" />{labelLess}</>
          : <><i className="fas fa-chevron-down" />{labelMore} <span className={styles.count}>+{hidden}</span></>
        }
      </button>
    </div>
  );
}
