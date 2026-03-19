import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../hooks/useIsMobile';
import { ShowMoreButton } from '../ui/ShowMoreButton';
import { Modal } from '../ui/Modal';
import type { Degree, CertTechnology, Course } from '../../types/education.types';
import styles from './Education.module.css';

const VISIBLE_CERTS = 4;

export function Education() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const [selectedTech, setSelectedTech] = useState<CertTechnology | null>(null);

  const degrees = t('education.degrees', { returnObjects: true }) as Degree[];
  const certifications = t('education.certifications', { returnObjects: true }) as { title: string; technologies: CertTechnology[] };

  const visibleTechs = isMobile && !expanded
    ? certifications.technologies?.slice(0, VISIBLE_CERTS)
    : certifications.technologies;

  return (
    <section id="education">
      <div className="container">
        <h2 className="section-title"><i className="fas fa-graduation-cap" />{t('education.title')}</h2>
        <div className={styles.layout}>
          <div className={styles.degrees}>
            {degrees.map((d, i) => (
              <div key={i} className={styles.degreeCard}>
                <div className={styles.degreeIcon}><i className="fas fa-university" /></div>
                <div className={styles.degreeInfo}>
                  <h3 className={styles.degreeTitle}>{d.degree}</h3>
                  <p className={styles.degreeInst}>{d.institution}</p>
                  <p className={styles.degreeYear}><i className="fas fa-calendar-alt" /> {d.year}</p>
                  <button className={styles.viewBtn} onClick={() => setSelectedDegree(d)}>
                    <i className="fas fa-eye" /> {t('education.view_details')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.certs}>
            <h3 className={styles.certsTitle}>{certifications.title}</h3>
            <div className={styles.certGrid}>
              {visibleTechs?.map((tech, i) => (
                <div key={i} className={styles.certCard}>
                  <div className={styles.certTop}>
                    <span className={styles.certName}>{tech.name}</span>
                    <span className={styles.certCount}>{tech.courses.length}</span>
                  </div>
                  <div className={styles.certPills}>
                    {tech.courses.slice(0, 2).map((c, j) => (
                      <span key={j} className="badge">{c.provider}</span>
                    ))}
                  </div>
                  <button className={styles.certViewBtn} onClick={() => setSelectedTech(tech)}>
                    <i className="fas fa-certificate" /> Ver certificados
                  </button>
                </div>
              ))}
            </div>
            {isMobile && (certifications.technologies?.length || 0) > VISIBLE_CERTS && (
              <ShowMoreButton expanded={expanded} onToggle={() => setExpanded(v => !v)} totalCount={certifications.technologies?.length || 0} visibleCount={VISIBLE_CERTS} />
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={!!selectedDegree} onClose={() => setSelectedDegree(null)} title={selectedDegree?.degree}>
        {selectedDegree && (
          <div className={styles.modalContent}>
            <p className={styles.modalInst}><i className="fas fa-university" /> {selectedDegree.institution}</p>
            <p className={styles.modalYear}><i className="fas fa-calendar-alt" /> {selectedDegree.year}</p>
            <p className={styles.modalDesc}>{selectedDegree.description}</p>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!selectedTech} onClose={() => setSelectedTech(null)} title={selectedTech?.name} wide>
        {selectedTech && (
          <div className={styles.courseList}>
            {selectedTech.courses.map((course: Course, i) => (
              <div key={i} className={styles.courseCard}>
                <div className={styles.courseHeader}>
                  <span className={styles.courseName}>{course.name}</span>
                  <span className={styles.courseProvider}>{course.provider}</span>
                </div>
                <p className={styles.courseIssued}><i className="fas fa-calendar-check" /> {course.issued}</p>
                <div className={styles.courseSkills}>
                  {course.skills.map(s => <span key={s} className="badge">{s}</span>)}
                </div>
                <a href={course.credentialUrl} target="_blank" rel="noopener noreferrer" className={styles.credentialLink}>
                  <i className="fas fa-external-link-alt" /> Ver credencial
                </a>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </section>
  );
}
