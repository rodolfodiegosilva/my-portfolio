import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h4 className={styles.heading}>Rodolfo Silva</h4>
            <p className={styles.about}>{t('footer.about_description')}</p>
            <p className={styles.location}><i className="fas fa-map-marker-alt" /> {t('footer.location_description')}</p>
            <div className={styles.social}>
              <a href={t('footer.github_link')}   target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github" /></a>
              <a href={t('footer.linkedin_link')} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>
              <a href={t('footer.twitter_link')}  target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter" /></a>
              <a href={t('footer.instagram_link')}target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            </div>
          </div>

          <div className={styles.linkGroup}>
            <h5 className={styles.linkTitle}>{t('footer.links')}</h5>
            <ul className={styles.linkList}>
              <li><button onClick={() => document.getElementById('personal-data')?.scrollIntoView({ behavior: 'smooth' })}>
                <i className="fas fa-home" />{t('footer.home')}
              </button></li>
              <li><button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                <i className="fas fa-folder-open" />{t('footer.projects')}
              </button></li>
              <li><a href={`mailto:${t('footer.contact_email')}`}>
                <i className="fas fa-envelope" />{t('footer.contact')}
              </a></li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h5 className={styles.linkTitle}>{t('footer.social')}</h5>
            <ul className={styles.linkList}>
              <li><a href={t('footer.github_link')} target="_blank" rel="noopener noreferrer"><i className="fab fa-github" /> GitHub</a></li>
              <li><a href={t('footer.linkedin_link')} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /> LinkedIn</a></li>
              <li><a href={t('footer.twitter_link')} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /> Twitter</a></li>
              <li><a href={t('footer.instagram_link')} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /> Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} Rodolfo Silva. {t('footer.rights')}</p>
          <p className={styles.credit}>Made with <i className="fas fa-heart" style={{ color: '#ff4d6d' }} /> using React + Vite</p>
        </div>
      </div>
    </footer>
  );
}
