import { useTranslation } from 'react-i18next';
import styles from './Profile.module.css';

export function Profile() {
  const { t } = useTranslation();
  return (
    <section id="profile">
      <div className="container">
        <h2 className="section-title"><i className="fas fa-user" />{t('navbar.profile')}</h2>
        <div className={styles.grid}>
          <div className={styles.about}>
            <h3 className={styles.aboutTitle}>{t('profile.about_title')}</h3>
            <p className={styles.aboutDesc}>{t('profile.about_description')}</p>
          </div>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}><i className="fas fa-rocket" /></div>
              <div className={styles.statText}>
                <span className={styles.statLabel}>{t('profile.stats.now')}</span>
                <span className={styles.statValue}>React + NestJS + AWS</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}><i className="fas fa-crosshairs" /></div>
              <div className={styles.statText}>
                <span className={styles.statLabel}>{t('profile.stats.focus')}</span>
                <span className={styles.statValue}>{t('profile.stats.focus_value')}</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}><i className="fas fa-briefcase" /></div>
              <div className={styles.statText}>
                <span className={styles.statLabel}>Experiência</span>
                <span className={styles.statValue}>5+ anos como Full Stack</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
