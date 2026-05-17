import { useTranslation } from 'react-i18next';
import styles from './Profile.module.css';

export function Profile() {
  const { t } = useTranslation();
  const pillars = t('profile.pillars', { returnObjects: true }) as Array<{ title: string; description: string; icon: string }>;
  const wins = t('profile.wins', { returnObjects: true }) as string[];

  return (
    <section id="profile">
      <div className="container">
        <div className={styles.shell}>
          <h2 className="section-title"><i className="fas fa-user" />{t('navbar.profile')}</h2>
          <div className={styles.grid}>
            <div className={styles.about}>
              <h3 className={styles.aboutTitle}>{t('profile.about_title')}</h3>
              <p className={styles.aboutDesc}>{t('profile.about_description')}</p>

              <div className={styles.pillars}>
                {pillars.map((pillar) => (
                  <div key={pillar.title} className={styles.pillarCard}>
                    <div className={styles.pillarIcon}><i className={pillar.icon} /></div>
                    <div>
                      <p className={styles.pillarTitle}>{pillar.title}</p>
                      <p className={styles.pillarDesc}>{pillar.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.side}>
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
                    <span className={styles.statLabel}>{t('profile.stats.experience')}</span>
                    <span className={styles.statValue}>{t('profile.stats.experience_value')}</span>
                  </div>
                </div>
              </div>

              <div className={styles.winsCard}>
                <p className={styles.winsTitle}>{t('profile.recent_wins')}</p>
                <ul className={styles.winsList}>
                  {wins.map((win) => (
                    <li key={win} className={styles.winItem}>
                      <span className={styles.winDot} />
                      <span>{win}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
