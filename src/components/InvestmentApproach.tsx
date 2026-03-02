'use client';

import { useTranslations } from 'next-intl';
import styles from './InvestmentApproach.module.css';

const approaches = [
  {
    key: 'research',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        <path d="M10 7v6m-3-3h6" />
      </svg>
    ),
  },
  {
    key: 'partnership',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    key: 'risk',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function InvestmentApproach() {
  const t = useTranslations('investment');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.goldLine}></div>
          <h2 className={styles.title}>{t('title')}</h2>
        </div>

        <div className={styles.grid}>
          {approaches.map((approach, index) => (
            <div
              key={approach.key}
              className={styles.card}
              style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className={styles.iconWrapper}>
                {approach.icon}
              </div>
              <h3 className={styles.cardTitle}>{t(`${approach.key}.title`)}</h3>
              <p className={styles.cardDescription}>{t(`${approach.key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
