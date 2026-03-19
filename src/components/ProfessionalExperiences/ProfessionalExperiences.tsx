import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../hooks/useIsMobile';
import { ShowMoreButton } from '../ui/ShowMoreButton';
import { Modal } from '../ui/Modal';
import styles from './ProfessionalExperiences.module.css';

interface Experience { position: string; company: string; period: string; type?: string; responsibilities: string[]; stacks: string; }

const VISIBLE_MOBILE = 3;

export function ProfessionalExperiences() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Experience | null>(null);

  const experiences = t('professionalExperiences.experiences', { returnObjects: true }) as Experience[];
  const cvLink = t('professionalExperiences.cv_link');

  const visible = isMobile && !expanded ? experiences.slice(0, VISIBLE_MOBILE) : experiences;

  return (
    <section id="professional-experiences">
      <div className="container">
        <h2 className="section-title"><i className="fas fa-briefcase" />{t('professionalExperiences.title')}</h2>

        <div className={`${styles.list} ${styles.timeline}`}>
          {visible.map((exp, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.header}>
                <div className={styles.titleGroup}>
                  <h3 className={styles.role}>{exp.position}</h3>
                  <p className={styles.company}><i className="fas fa-building" />{exp.company}</p>
                </div>
                <div className={styles.meta}>
                  <span className={styles.period}><i className="fas fa-calendar-alt" />{exp.period}</span>
                  {exp.type && <span className={styles.type}>{exp.type}</span>}
                </div>
              </div>

              <div className={styles.stackPreview}>
                {exp.stacks.split(',').slice(0, 6).map(s => (
                  <span key={s} className={styles.stackPill}>{s.trim()}</span>
                ))}
              </div>

              <div className={styles.footer}>
                <button className={styles.viewBtn} onClick={() => setSelected(exp)}>
                  <i className="fas fa-eye" /> {t('professionalExperiences.view_details')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {isMobile && experiences.length > VISIBLE_MOBILE && (
          <ShowMoreButton expanded={expanded} onToggle={() => setExpanded(v => !v)} totalCount={experiences.length} visibleCount={VISIBLE_MOBILE} />
        )}

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <a href={cvLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <i className="fas fa-download" /> {t('professionalExperiences.download_cv')}
          </a>
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected ? `${selected.position} — ${selected.company}` : ''} wide>
        {selected && (
          <>
            <div className={styles.modalSection}>
              <p className={styles.modalLabel}><i className="fas fa-calendar-alt" /> Período</p>
              <p className={styles.modalText}>{selected.period}</p>
            </div>
            <div className={styles.modalSection}>
              <p className={styles.modalLabel}>Responsabilidades</p>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {selected.responsibilities.map((r, i) => (
                  <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{r}</li>
                ))}
              </ul>
            </div>
            <div className={styles.modalSection}>
              <p className={styles.modalLabel}>{t('professionalExperiences.stacks')}</p>
              <div className={styles.modalTechPills}>
                {selected.stacks.split(',').map(s => (
                  <span key={s} className={styles.modalTechPill}>{s.trim()}</span>
                ))}
              </div>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
