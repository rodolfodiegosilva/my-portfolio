import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../../hooks/useProjects';
import { Modal } from '../ui/Modal';
import { Carousel } from '../ui/Carousel';
import { TechIcon } from '../../utils/techIcons';
import type { Project } from '../../types/project.types';
import styles from './Projects.module.css';

export function Projects() {
  const { t } = useTranslation();
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Project | null>(null);

  const renderProjectCard = (p: Project) => {
    const headlineStack = [p.app_details?.technologies?.[0], p.api_details?.technologies?.[0]]
      .filter(Boolean)
      .join(' + ');

    return (
      <div key={p.project} className={styles.card} onClick={() => setSelected(p)}>
        <div className={styles.imageWrap}>
          {p.image
            ? <img src={p.image} alt={p.name} className={styles.cardImage} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            : <div className={styles.imageFallback}><i className="fas fa-code" /></div>
          }
          <div className={styles.imageOverlay} />
          <div className={styles.imageMeta}>
            <span className={styles.imageBadge}>Web + API</span>
            <span className={styles.imageBadge}><i className="fas fa-images" /> {p.images.length}</span>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.header}>
            <h3 className={styles.title}>{p.name}</h3>
            {headlineStack && <p className={styles.stackLine}>{headlineStack}</p>}
          </div>
          <p className={styles.desc}>{p.description}</p>
          <div className={styles.tags}>
            {p.technologies.slice(0, 4).map(tech => (
              <span key={tech} className={styles.tag}>
                <TechIcon name={tech} className={styles.tagIcon} size={11} />
                {tech}
              </span>
            ))}
            {p.technologies.length > 4 && <span className={styles.tag}>+{p.technologies.length - 4}</span>}
          </div>
          <div className={styles.quickLinks}>
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.quickLink} onClick={e => e.stopPropagation()}>
                <i className="fas fa-globe" /> Site
              </a>
            )}
            {p.frontend && (
              <a href={p.frontend} target="_blank" rel="noopener noreferrer" className={styles.quickLink} onClick={e => e.stopPropagation()}>
                <i className="fab fa-github" /> Código
              </a>
            )}
          </div>
          <p className={styles.viewMore}><i className="fas fa-arrow-right" /> Ver projeto</p>
        </div>
      </div>
    );
  };

  return (
    <section id="projects">
      <div className="container">
        <div className={styles.sectionShell}>
          <div className={styles.sectionHead}>
            <div>
              <h2 className="section-title"><i className="fas fa-rocket" />{t('projects.title')}</h2>
              <p className={styles.sectionDesc}>
                Produtos web e plataformas completas com foco em experiência, arquitetura escalável e entrega em produção.
              </p>
            </div>
          <div className={styles.sectionStat}>
            <span className={styles.sectionStatValue}>{projects.length}</span>
            <span className={styles.sectionStatLabel}>projetos em destaque</span>
          </div>
        </div>
          <div className={styles.grid}>
            {projects.map(p => renderProjectCard(p))}
          </div>
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.name} wide>
        {selected && (
          <div className={styles.modalTop}>
            <div className={styles.modalCarouselWrap}>
              <button type="button" className={styles.modalClose} onClick={() => setSelected(null)} aria-label="Fechar modal do projeto">
                <span aria-hidden="true" className={styles.modalCloseGlyph}>×</span>
              </button>
              <Carousel images={selected.images} />
            </div>
            <p className={styles.modalDesc}>{selected.description}</p>
            <div className={styles.modalTech}>
              <p className={styles.techTitle}>Tecnologias</p>
              <div className={styles.techPills}>
                {selected.technologies.map(tech => (
                  <span key={tech} className={styles.techPill}>
                    <TechIcon name={tech} className={styles.pillIcon} size={13} />
                    {tech}
                  </span>
                ))}
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
