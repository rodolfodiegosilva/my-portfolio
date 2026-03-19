import { useTranslation } from 'react-i18next';
import { useGithub } from '../../hooks/useGithub';
import styles from './GithubDashboard.module.css';

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME as string;

const ACT_ICONS: Record<string, string> = {
  PushEvent:            'fa-code-branch',
  PullRequestEvent:     'fa-code-pull-request',
  IssuesEvent:          'fa-exclamation-circle',
  CreateEvent:          'fa-plus',
  WatchEvent:           'fa-star',
  ForkEvent:            'fa-code-fork',
};

export function GithubDashboard() {
  const { t } = useTranslation();
  const { repos, activities, loading, error } = useGithub();

  return (
    <section id="github-dashboard">
      <div className="container">
        <h2 className="section-title"><i className="fab fa-github" />{t('github_dashboard.title')}</h2>

        <div className={styles.chartWrap}>
          <p className={styles.chartTitle}><i className="fas fa-calendar-check" /> Contribuições no último ano</p>
          <div className={styles.chart}>
            <img
              src={`https://ghchart.rshah.org/2ea8ff/${USERNAME}`}
              alt="GitHub contribution chart"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>

        {loading && <p className={styles.loading}><i className="fas fa-spinner fa-spin" /> Carregando...</p>}
        {error && <p className={styles.error}><i className="fas fa-exclamation-circle" /> {error}</p>}

        {!loading && !error && (
          <div className={styles.mainLayout}>
            <div className={styles.reposSection}>
              <div className={styles.repoGrid}>
                {repos.map(repo => (
                  <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.repoCard} style={{ textDecoration: 'none' }}>
                    <div className={styles.repoTop}>
                      <span className={styles.repoName}>{repo.name}</span>
                      {repo.language && <span className={styles.repoLang}>{repo.language}</span>}
                    </div>
                    {repo.description && <p className={styles.repoDesc}>{repo.description}</p>}
                    <div className={styles.repoMeta}>
                      <span className={styles.repoStat}><i className="fas fa-star" /> {repo.stargazers_count}</span>
                      <span className={styles.repoStat}><i className="fas fa-code-branch" /> {repo.forks_count}</span>
                      {repo.open_issues_count > 0 && <span className={styles.repoStat}><i className="fas fa-circle-dot" /> {repo.open_issues_count}</span>}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {activities.length > 0 && (
              <div className={styles.activityCard}>
                <p className={styles.actTitle}><i className="fas fa-history" /> {t('github_dashboard.activity_overview')}</p>
                <div className={styles.actList}>
                  {activities.slice(0, 8).map(act => (
                    <div key={act.id} className={styles.actItem}>
                      <div className={styles.actDot}>
                        <i className={`fas ${ACT_ICONS[act.type] || 'fa-circle'}`} />
                      </div>
                      <div className={styles.actBody}>
                        <span className={styles.actRepo}>{act.repo.name.split('/')[1]}</span>
                        <span className={styles.actMsg}>{act.type.replace('Event', '')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
