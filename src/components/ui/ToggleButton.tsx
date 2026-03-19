import { useLanguage } from '../../contexts/LanguageContext';
import styles from './ToggleButton.module.css';

export function ToggleButton() {
  const { isEnglish, setLanguage } = useLanguage();
  return (
    <button
      className={styles.btn}
      onClick={() => setLanguage(isEnglish ? 'pt' : 'en')}
      title={isEnglish ? 'Switch to Portuguese' : 'Mudar para Inglês'}
      aria-label="Toggle language"
    >
      <span className={styles.flag}>{isEnglish ? '🇺🇸' : '🇧🇷'}</span>
      <span className={styles.label}>{isEnglish ? 'EN' : 'PT'}</span>
    </button>
  );
}
