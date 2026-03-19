import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import { ThemeSwitch } from '../ui/ThemeSwitch';
import { ToggleButton } from '../ui/ToggleButton';
import styles from './Navbar.module.css';

const SECTIONS = [
  { key: 'navbar.profile',                  id: 'profile',                  icon: 'fas fa-user' },
  { key: 'navbar.skills',                   id: 'skills',                   icon: 'fas fa-code' },
  { key: 'navbar.education',                id: 'education',                icon: 'fas fa-graduation-cap' },
  { key: 'navbar.projects',                 id: 'projects',                 icon: 'fas fa-folder-open' },
  { key: 'navbar.github_dashboard',         id: 'github-dashboard',         icon: 'fab fa-github' },
  { key: 'navbar.professional_experiences', id: 'professional-experiences', icon: 'fas fa-briefcase' },
];

export function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = SECTIONS.map(s => (
    <li key={s.id}>
      <button className={styles.navLink} onClick={() => scrollToSection(s.id)}>
        <i className={s.icon} />
        {t(s.key)}
      </button>
    </li>
  ));

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a
            className={styles.logo}
            href="/"
            onClick={e => { e.preventDefault(); scrollToSection('personal-data'); }}
          >
            Rodolfo <span>Silva</span>
          </a>

          <ul className={styles.desktopNav}>{navItems}</ul>

          <div className={styles.actions}>
            <ThemeSwitch />
            <ToggleButton />
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && createPortal(
        <>
          <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />
          <ul className={styles.mobileMenu}>{navItems}</ul>
        </>,
        document.body
      )}
    </>
  );
}
