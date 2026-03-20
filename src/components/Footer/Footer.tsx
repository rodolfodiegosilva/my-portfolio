import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

const GithubIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const LinkedInIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const TwitterIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const InstagramIcon= () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;

const NAV_SECTIONS = [
  { id: 'personal-data', icon: 'fas fa-home',        labelKey: 'navbar.personal_data' },
  { id: 'profile',       icon: 'fas fa-user',         labelKey: 'navbar.profile' },
  { id: 'skills',        icon: 'fas fa-code',         labelKey: 'navbar.skills' },
  { id: 'experience',    icon: 'fas fa-briefcase',    labelKey: 'navbar.professional_experiences' },
  { id: 'projects',      icon: 'fas fa-folder-open',  labelKey: 'navbar.projects' },
  { id: 'github',        icon: 'fab fa-github',       labelKey: 'navbar.github_dashboard' },
];

const SOCIAL = [
  { href: 'https://github.com/rodolfodiegosilva',           Icon: GithubIcon,    label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/eng-rodolfo-diego/', Icon: LinkedInIcon,  label: 'LinkedIn' },
  { href: 'https://x.com/DiegoSeven_mcfc',                  Icon: TwitterIcon,   label: 'Twitter / X' },
  { href: 'https://www.instagram.com/rodolfodiegogomes',    Icon: InstagramIcon, label: 'Instagram' },
];

const STACK = ['React', 'TypeScript', 'Vite', 'AWS'];

export function Footer() {
  const { t } = useTranslation();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className={styles.footer}>
      <div className={styles.accent} />

      <div className="container">
        <div className={styles.main}>

          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <span className={styles.logoBox}>RS</span>
              <div>
                <p className={styles.name}>Rodolfo Silva</p>
                <p className={styles.role}>Full Stack Developer</p>
              </div>
            </div>
            <p className={styles.desc}>{t('footer.about_description')}</p>
            <p className={styles.location}>
              <i className="fas fa-map-marker-alt" />
              {t('footer.location_description')}
            </p>
            <div className={styles.social}>
              {SOCIAL.map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={styles.socialLink}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className={styles.navGroup}>
            <h5 className={styles.groupTitle}>Navigation</h5>
            <ul className={styles.navList}>
              {NAV_SECTIONS.map(({ id, icon, labelKey }) => (
                <li key={id}>
                  <button className={styles.navBtn} onClick={() => scrollTo(id)}>
                    <i className={icon} style={{ fontSize: '0.8rem' }} />
                    {t(labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.navGroup}>
            <h5 className={styles.groupTitle}>Contact</h5>
            <ul className={styles.navList}>
              <li>
                <a className={styles.navBtn} href={`mailto:${t('footer.contact_email')}`}>
                  <i className="fas fa-envelope" style={{ fontSize: '0.8rem' }} />
                  {t('footer.contact_email')}
                </a>
              </li>
              <li>
                <a className={styles.navBtn} href={t('footer.linkedin_link')} target="_blank" rel="noopener noreferrer">
                  <span className={styles.navBtnIcon}><LinkedInIcon /></span>
                  LinkedIn
                </a>
              </li>
              <li>
                <a className={styles.navBtn} href={t('footer.github_link')} target="_blank" rel="noopener noreferrer">
                  <span className={styles.navBtnIcon}><GithubIcon /></span>
                  GitHub
                </a>
              </li>
              <li className={styles.availBadge}>
                <span className={styles.dot} />
                Available for opportunities
              </li>
            </ul>
          </div>

        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Rodolfo Silva · {t('footer.rights')}
          </p>
          <div className={styles.stack}>
            {STACK.map(tech => (
              <span key={tech} className={styles.stackPill}>{tech}</span>
            ))}
          </div>
          <p className={styles.credit}>
            Made with <i className="fas fa-heart" /> in Manaus, Brazil
          </p>
        </div>
      </div>
    </footer>
  );
}
