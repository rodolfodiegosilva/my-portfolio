import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeSwitch.module.css';

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className={`${styles.btn} ${isDark ? styles.isDark : styles.isLight}`}
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isDark ? 'Modo claro' : 'Modo escuro'}
      aria-pressed={isDark}
    >
      <span className={`${styles.iconWrap} ${styles.moonWrap}`} aria-hidden="true">
        <i className="fas fa-moon" />
      </span>
      <span className={`${styles.iconWrap} ${styles.sunWrap}`} aria-hidden="true">
        <i className="fas fa-sun" />
      </span>
    </button>
  );
}
