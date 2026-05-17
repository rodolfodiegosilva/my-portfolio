import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProjectByName } from '../../hooks/useProjects';
import { Carousel } from '../ui/Carousel';
import { TechIcon } from '../../utils/techIcons';
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
  const highlights = [
    { label: pd.gallery, value: `${project.images.length} ${pd.screens}`, icon: 'fas fa-images' },
    { label: 'Stack', value: `${project.technologies.length} ${pd.technologies_count}`, icon: 'fas fa-layer-group' },
    { label: pd.delivery, value: project.link ? pd.project_online : pd.code_available, icon: 'fas fa-rocket' },
  ];

  return (
    <div className={styles.page}>
      <div className="container">
        <button className={styles.back} onClick={() => navigate('/')}>
          <i className="fas fa-arrow-left" /> Voltar
        </button>

        <section className={styles.hero}>
          <div className={styles.heroMain}>
            <div className={styles.kicker}>{pd.case_study}</div>
            <h1 className={styles.title}>{project.name}</h1>
            <p className={styles.desc}>{project.description}</p>

            <div className={styles.heroActions}>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <i className="fas fa-external-link-alt" /> Abrir projeto
                </a>
              )}
              {project.frontend && (
                <a href={project.frontend} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <i className="fab fa-github" /> Frontend
                </a>
              )}
              {project.backend && (
                <a href={project.backend} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <i className="fab fa-github" /> Backend
                </a>
              )}
            </div>

            <div className={styles.techPills}>
              {project.technologies.map(tech => (
                <span key={tech} className={styles.techPill}>
                  <TechIcon name={tech} className={styles.techIcon} size={14} />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <aside className={styles.summaryCard}>
            <p className={styles.summaryTitle}>{pd.quick_summary}</p>
            <div className={styles.summaryList}>
              {highlights.map(item => (
                <div key={item.label} className={styles.summaryItem}>
                  <span className={styles.summaryIcon}><i className={item.icon} /></span>
                  <div>
                    <p className={styles.summaryLabel}>{item.label}</p>
                    <p className={styles.summaryValue}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <div className={styles.showcase}>
          <div className={styles.carouselPanel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.sectionTitle}><i className="fas fa-images" /> {pd.showcase}</h2>
              <span className={styles.panelMeta}>{project.images.length} {pd.screenshots}</span>
            </div>
            <div className={styles.carousel}>
              <Carousel images={project.images} variant="showcase" thumbsCollapsible />
            </div>
          </div>
        </div>

        {(project.challenge || project.role_summary || project.outcome || project.wins?.length) && (
          <div className={styles.storyGrid}>
            {project.challenge && (
              <div className={styles.storyCard}>
                <p className={styles.storyTitle}>{pd.challenge}</p>
                <p className={styles.storyText}>{project.challenge}</p>
              </div>
            )}
            {project.role_summary && (
              <div className={styles.storyCard}>
                <p className={styles.storyTitle}>{pd.role}</p>
                <p className={styles.storyText}>{project.role_summary}</p>
              </div>
            )}
            {project.outcome && (
              <div className={styles.storyCard}>
                <p className={styles.storyTitle}>{pd.outcome}</p>
                <p className={styles.storyText}>{project.outcome}</p>
              </div>
            )}
            {project.wins?.length ? (
              <div className={styles.storyCard}>
                <p className={styles.storyTitle}>{pd.wins}</p>
                <ul className={styles.storyList}>
                  {project.wins.map(win => <li key={win}>{win}</li>)}
                </ul>
              </div>
            ) : null}
          </div>
        )}

        <div className={styles.grid}>
          {[
            { key: 'app_details', label: pd.frontend, icon: 'fas fa-laptop-code' },
            { key: 'api_details', label: pd.backend, icon: 'fas fa-server' },
          ].map(({ key, label, icon }) => {
            const details = project[key as keyof typeof project] as typeof project.app_details;
            if (!details) return null;
            return (
              <div key={key} className={styles.detailCard}>
                <div className={styles.detailHead}>
                  <h3 className={styles.detailTitle}><i className={icon} /> {label}</h3>
                  <span className={styles.detailBadge}>{details.technologies.length} itens</span>
                </div>
                <p className={styles.deployment}>{details.deployment}</p>

                <div className={styles.infoBlock}>
                  <p className={styles.blockTitle}>{pd.technologies}</p>
                  <div className={styles.detailPills}>
                    {details.technologies.map(t => <span key={t} className="badge">{t}</span>)}
                  </div>
                </div>

                {details.hosting && (
                  <div className={styles.infoBlock}>
                    <strong className={styles.infoTitle}><i className="fas fa-cloud" /> {pd.hosting}</strong>
                    <p>{details.hosting.description}</p>
                    <a href={details.hosting.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {details.hosting.url}
                    </a>
                  </div>
                )}

                {details.tests && (
                  <div className={styles.infoBlock}>
                    <strong className={styles.infoTitle}><i className="fas fa-vial" /> {pd.tests}</strong>
                    <p>{details.tests.type}</p>
                    <p className={styles.subtle}>{pd.tools}: {details.tests.libraries_tools.join(', ')}</p>
                    <p className={styles.subtle}>{details.tests.report_details}</p>
                    {details.tests.report_link && (
                      <a href={details.tests.report_link} target="_blank" rel="noopener noreferrer" className={styles.link}>{pd.view_report}</a>
                    )}
                  </div>
                )}

                {details.tests_aux?.length ? (
                  <div className={styles.infoBlock}>
                    <strong className={styles.infoTitle}><i className="fas fa-flask" /> {pd.tests}</strong>
                    <div className={styles.testList}>
                      {details.tests_aux.map(test => (
                        <div key={`${label}-${test.type}`} className={styles.testCard}>
                          <p className={styles.testType}>{test.type}</p>
                          <p className={styles.subtle}>{test.libraries_tools.join(', ')}</p>
                          <p className={styles.subtle}>{test.report_details}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
