'use client';

import { useTranslations } from 'next-intl';
import styles from './GlobalNetwork.module.css';

const locations = [
  { key: 'seoul', isHQ: true },
  { key: 'capeTown', isHQ: false },
  { key: 'accra', isHQ: false },
  { key: 'morogoro', isHQ: false, isQuartz: true },
  { key: 'dubai', isHQ: false },
  { key: 'dhaka', isHQ: false },
  { key: 'montreal', isHQ: false },
];

export default function GlobalNetwork() {
  const t = useTranslations('globalNetwork');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.goldLine}></div>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        {/* Location Cards */}
        <div className={styles.locationGrid}>
          {locations.map((loc) => (
            <div
              key={loc.key}
              className={`${styles.locationCard} ${loc.isHQ ? styles.hqCard : ''} ${loc.isQuartz ? styles.quartzCard : ''}`}
            >
              <div className={styles.cardHeader}>
                <span className={`${styles.cardDot} ${loc.isHQ ? styles.hqDot : ''} ${loc.isQuartz ? styles.quartzDot : ''}`}></span>
                <div>
                  <h4 className={styles.cardCity}>{t(`locations.${loc.key}.city`)}</h4>
                  <span className={styles.cardCountry}>{t(`locations.${loc.key}.country`)}</span>
                </div>
                {loc.isHQ && <span className={styles.badge}>HQ</span>}
                {loc.isQuartz && <span className={styles.badgeQuartz}>Quartz Hub</span>}
              </div>
              <span className={styles.cardRole}>{t(`locations.${loc.key}.role`)}</span>
              <p className={styles.cardDesc}>{t(`locations.${loc.key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
