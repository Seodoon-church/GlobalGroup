'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './page.module.css';

const milestones = [
  { year: '1987', key: 'founded' },
  { year: '1995', key: 'africa' },
  { year: '2005', key: 'middleEast' },
  { year: '2015', key: 'expansion' },
  { year: '2023', key: 'quartz' },
];

const values = [
  {
    key: 'trust',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: 'global',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    key: 'excellence',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    key: 'partnership',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  const t = useTranslations('aboutPage');

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.goldLine}></div>
          <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
          <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
        </div>
      </section>

      {/* CEO Message */}
      <section className={styles.ceoSection}>
        <div className={styles.container}>
          <div className={styles.ceoGrid}>
            <div className={styles.ceoImageWrapper}>
              <Image
                src="/images/leadership/chairman350.jpeg"
                alt="Michael Lee - Chairman"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className={styles.ceoImage}
              />
            </div>
            <div className={styles.ceoContent}>
              <div className={styles.goldLine}></div>
              <h2 className={styles.sectionTitle}>{t('ceo.title')}</h2>
              <div className={styles.ceoMessage}>
                <p>{t('ceo.message1')}</p>
                <p>{t('ceo.message2')}</p>
                <p>{t('ceo.message3')}</p>
              </div>
              <div className={styles.ceoSignature}>
                <span className={styles.ceoName}>{t('ceo.name')}</span>
                <span className={styles.ceoPosition}>{t('ceo.position')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className={styles.visionSection}>
        <div className={styles.container}>
          <div className={styles.visionGrid}>
            <div className={styles.visionCard}>
              <div className={styles.visionIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className={styles.visionTitle}>{t('vision.title')}</h3>
              <p className={styles.visionText}>{t('vision.text')}</p>
            </div>
            <div className={styles.visionCard}>
              <div className={styles.visionIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
              </div>
              <h3 className={styles.visionTitle}>{t('mission.title')}</h3>
              <p className={styles.visionText}>{t('mission.text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.sectionTitle}>{t('values.title')}</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((value) => (
              <div key={value.key} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h4 className={styles.valueTitle}>{t(`values.${value.key}.title`)}</h4>
                <p className={styles.valueText}>{t(`values.${value.key}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className={styles.historySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.sectionTitle}>{t('history.title')}</h2>
          </div>
          <div className={styles.timeline}>
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{milestone.year}</div>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineTitle}>{t(`history.${milestone.key}.title`)}</h4>
                  <p className={styles.timelineText}>{t(`history.${milestone.key}.text`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
