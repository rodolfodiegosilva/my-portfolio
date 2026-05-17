import { useTranslation } from 'react-i18next';
import styles from './PersonalData.module.css';

export function PersonalData() {
  const { t } = useTranslation();
  const cvLink = 'https://my-portifolio-images.s3.us-east-2.amazonaws.com/CV/Rodolfo_Silva_CV.pdf';
  const highlights = [
    { label: 'Stack', value: 'React, NestJS, AWS', icon: 'fas fa-layer-group' },
    { label: 'Experiência', value: '5+ anos', icon: 'fas fa-briefcase' },
    { label: 'Base', value: 'Manaus, Brasil', icon: 'fas fa-location-dot' },
  ];

  return (
    <section id="personal-data">
      <div className="container">
        <div className={styles.hero}>
          <div className={styles.text}>
            <div className={styles.copyPanel}>
              <p className={styles.greeting}>👋 Olá, eu sou</p>
              <h1 className={styles.name}>{t('personal_data.name')}</h1>
              <p className={styles.profession}>{t('personal_data.profession')}</p>
              <p className={styles.description}>{t('personal_data.description')}</p>

              <div className={styles.actions}>
                <a href={cvLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <i className="fas fa-download" /> Download CV
                </a>
                <a href="https://github.com/rodolfodiegosilva" target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <i className="fab fa-github" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/eng-rodolfo-diego/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <i className="fab fa-linkedin" /> LinkedIn
                </a>
              </div>

              <div className={styles.highlightGrid}>
                {highlights.map(item => (
                  <div key={item.label} className={styles.highlightCard}>
                    <span className={styles.highlightIcon}><i className={item.icon} /></span>
                    <div>
                      <p className={styles.highlightLabel}>{item.label}</p>
                      <p className={styles.highlightValue}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.imageWrap}>
            <div className={styles.imageCard}>
              <img
                src={t('personal_data.img_profile')}
                alt={t('personal_data.name')}
                className={styles.avatar}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
