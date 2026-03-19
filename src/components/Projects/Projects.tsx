import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../../hooks/useProjects';
import { Modal } from '../ui/Modal';
import { Carousel } from '../ui/Carousel';
import type { Project } from '../../types/project.types';
import styles from './Projects.module.css';

export function Projects() {
  const { t } = useTranslation();
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title"><i className="fas fa-rocket" />{t('projects.title')}</h2>
        <div className={styles.grid}>
          {projects.map(p => (
            <div key={p.project} className={styles.card} onClick={() => setSelected(p)}>
              <div className={styles.imageWrap}>
                {p.image
                  ? <img src={p.image} alt={p.name} className={styles.cardImage} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  : <div className={styles.imageFallback}><i className="fas fa-code" /></div>
                }
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{p.name}</h3>
                <p className={styles.desc}>{p.description}</p>
                <div className={styles.tags}>
                  {p.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className={styles.tag}>{tech}</span>
                  ))}
                  {p.technologies.length > 4 && <span className={styles.tag}>+{p.technologies.length - 4}</span>}
                </div>
                <p className={styles.viewMore}><i className="fas fa-arrow-right" /> Ver projeto</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.name} wide>
        {selected && (
          <div className={styles.modalTop}>
            <Carousel images={selected.images} />
            <p className={styles.modalDesc}>{selected.description}</p>
            <div className={styles.modalTech}>
              <p className={styles.techTitle}>Tecnologias</p>
              <div className={styles.techPills}>
                {selected.technologies.map(tech => <span key={tech} className={styles.techPill}>{tech}</span>)}
              </div>
            </div>
            <div className={styles.modalLinks}>
              {selected.link && <a href={selected.link} target="_blank" rel="noopener noreferrer" className="btn-primary"><i className="fas fa-external-link-alt" /> Live Demo</a>}
              {selected.frontend && <a href={selected.frontend} target="_blank" rel="noopener noreferrer" className="btn-outline"><i className="fab fa-github" /> Frontend</a>}
              {selected.backend && <a href={selected.backend} target="_blank" rel="noopener noreferrer" className="btn-outline"><i className="fab fa-github" /> Backend</a>}
              <button className="btn-outline" onClick={() => { setSelected(null); navigate(`/project/${selected.project}`); }}>
                <i className="fas fa-info-circle" /> Detalhes completos
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
