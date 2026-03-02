'use client';

import { useTranslations } from 'next-intl';
import styles from './Stats.module.css';

const statsData = [
  { key: 'countries', icon: '🌍' },
  { key: 'partners', icon: '🤝' },
  { key: 'experience', icon: '📈' },
  { key: 'volume', icon: '💰' },
];

export default function Stats() {
  const t = useTranslations('stats');

  return (
    <section className={styles.stats}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <div className={styles.goldLine}></div>
          <h2>{t('title')}</h2>
        </div>

        <div className={styles.grid}>
          {statsData.map((item, index) => (
            <div
              key={item.key}
              className={styles.statCard}
              style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className={styles.statIcon}>{item.icon}</div>
              <div className={styles.statValue}>{t(`${item.key}Value`)}</div>
              <div className={styles.statLabel}>{t(item.key)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
