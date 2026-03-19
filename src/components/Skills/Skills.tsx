import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../hooks/useIsMobile';
import { ShowMoreButton } from '../ui/ShowMoreButton';
import styles from './Skills.module.css';

interface Skill { name: string; description: string; level: string; }

const LEVEL_MAP: Record<string, number> = { Advanced: 100, Intermediate: 66, Beginner: 33 };

const LEVEL_CLASS: Record<string, string> = {
  Advanced:     'Advanced',
  Intermediate: 'Intermediate',
  Beginner:     'Beginner',
};

const ICON_MAP: Record<string, string> = {
  JavaScript:   'devicon-javascript-plain',
  TypeScript:   'devicon-typescript-plain',
  React:        'devicon-react-original',
  Angular:      'devicon-angularjs-plain',
  NodeJS:       'devicon-nodejs-plain',
  Java:         'devicon-java-plain',
  SpringBoot:   'devicon-spring-plain',
  Python:       'devicon-python-plain',
  MySQL:        'devicon-mysql-plain',
  PostgreSQL:   'devicon-postgresql-plain',
  MongoDB:      'devicon-mongodb-plain',
  Docker:       'devicon-docker-plain',
  Linux:        'devicon-linux-plain',
  Git:          'devicon-git-plain',
  PHP:          'devicon-php-plain',
  Laravel:      'devicon-laravel-plain',
  SQL:          'fas fa-database',
  Cypress:      'fas fa-vial',
  AWS:          'fab fa-aws',
  'HTML & CSS': 'devicon-html5-plain',
};

const VISIBLE_MOBILE = 5;

export function Skills() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);
  const skills = t('skills.list', { returnObjects: true }) as Skill[];
  const levels = t('skills.levels', { returnObjects: true }) as Record<string, string>;

  const visible = isMobile && !expanded ? skills.slice(0, VISIBLE_MOBILE) : skills;

  const getLevelClass = (level: string) => {
    const key = LEVEL_CLASS[level];
    if (key === 'Advanced')     return { badge: styles.levelAdvanced,     bar: styles.barAdvanced };
    if (key === 'Intermediate') return { badge: styles.levelIntermediate, bar: styles.barIntermediate };
    return                             { badge: styles.levelBeginner,     bar: styles.barBeginner };
  };

  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title"><i className="fas fa-code" />{t('skills.title')}</h2>
        <div className={styles.grid}>
          {visible.map((skill) => {
            const cls = getLevelClass(skill.level);
            return (
              <div key={skill.name} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap}>
                    <span className={`${styles.icon} ${ICON_MAP[skill.name] || 'fas fa-cog'}`} />
                  </div>
                  <div className={styles.info}>
                    <span className={styles.name}>{skill.name}</span>
                    <span className={`${styles.levelBadge} ${cls.badge}`}>
                      {levels[skill.level] || skill.level}
                    </span>
                  </div>
                </div>
                <p className={styles.desc}>{skill.description}</p>
                <div className={styles.barBg}>
                  <div className={`${styles.bar} ${cls.bar}`} style={{ width: `${LEVEL_MAP[skill.level] || 50}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        {isMobile && skills.length > VISIBLE_MOBILE && (
          <ShowMoreButton expanded={expanded} onToggle={() => setExpanded(v => !v)} totalCount={skills.length} visibleCount={VISIBLE_MOBILE} />
        )}
      </div>
    </section>
  );
}
