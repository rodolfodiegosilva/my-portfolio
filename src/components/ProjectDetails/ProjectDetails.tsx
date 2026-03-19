import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProjectByName } from '../../hooks/useProjects';
import { Carousel } from '../ui/Carousel';
import styles from './ProjectDetails.module.css';

export function ProjectDetails() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const project = useProjectByName(name || '');

  if (!project) return (
    <div className={styles.notFound}>
      <p>Projeto não encontrado.</p>
      <button className="btn-primary" onClick={() => navigate('/')}>← Voltar</button>
    </div>
  );

  const pd = t('projects.projectDetails', { returnObjects: true }) as Record<string, string>;

  return (
    <div className={styles.page}>
      <div className="container">
        <button className={styles.back} onClick={() => navigate('/')}>
          <i className="fas fa-arrow-left" /> Voltar
        </button>

        <h1 className={styles.title}>{project.name}</h1>
        <p className={styles.desc}>{project.description}</p>

        <div className={styles.carousel}>
          <Carousel images={project.images} />
        </div>

        <div className={styles.techSection}>
          <h2 className={styles.sectionTitle}><i className="fas fa-tags" /> {pd.technologies}</h2>
          <div className={styles.techPills}>
            {project.technologies.map(tech => (
              <span key={tech} className={styles.techPill}>
                <img src={`/icons/${tech.toLowerCase().replace(/\s/g, '-')}.svg`} alt={tech} className={styles.techIcon} onError={e => (e.currentTarget.style.display = 'none')} />
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {[
            { key: 'app_details', label: pd.frontend, icon: 'fas fa-laptop-code' },
            { key: 'api_details', label: pd.backend, icon: 'fas fa-server' },
          ].map(({ key, label, icon }) => {
            const details = project[key as keyof typeof project] as typeof project.app_details;
            if (!details) return null;
            return (
              <div key={key} className={styles.detailCard}>
                <h3 className={styles.detailTitle}><i className={icon} /> {label}</h3>
                <p className={styles.deployment}>{details.deployment}</p>
                <div className={styles.techPills}>
                  {details.technologies.map(t => <span key={t} className="badge">{t}</span>)}
                </div>
                {details.hosting && (
                  <div className={styles.hosting}>
                    <strong><i className="fas fa-cloud" /> {pd.hosting}:</strong>
                    <p>{details.hosting.description}</p>
                    <a href={details.hosting.url} target="_blank" rel="noopener noreferrer" className={styles.link}>{details.hosting.url}</a>
                  </div>
                )}
                {details.tests && (
                  <div className={styles.tests}>
                    <strong><i className="fas fa-vial" /> {pd.tests}:</strong>
                    <p>{details.tests.type} — {details.tests.libraries_tools.join(', ')}</p>
                    {details.tests.report_link && (
                      <a href={details.tests.report_link} target="_blank" rel="noopener noreferrer" className={styles.link}>Ver relatório</a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
