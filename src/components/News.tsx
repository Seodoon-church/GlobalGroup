'use client';

import { useTranslations, useLocale } from 'next-intl';
import styles from './News.module.css';

const newsItems = [
  {
    key: 'article1',
    category: 'company',
    date: '2026-02-15',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    key: 'article2',
    category: 'market',
    date: '2026-02-08',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    key: 'article3',
    category: 'company',
    date: '2026-01-22',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
];

export default function News() {
  const t = useTranslations('newsSection');
  const locale = useLocale();

  return (
    <section className={styles.news}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.goldLine}></div>
          <h2 className={styles.sectionTitle}>{t('title')}</h2>
          <p className={styles.sectionSubtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {newsItems.map((item, index) => (
            <a
              key={item.key}
              href={`/${locale}/news`}
              className={styles.card}
              style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className={styles.cardTop}>
                <span className={`${styles.category} ${styles[item.category]}`}>
                  {t(`categories.${item.category}`)}
                </span>
                <span className={styles.date}>{item.date}</span>
              </div>
              <h3 className={styles.cardTitle}>{t(`${item.key}.title`)}</h3>
              <p className={styles.cardExcerpt}>{t(`${item.key}.excerpt`)}</p>
              <div className={styles.cardFooter}>
                <span className={styles.readMore}>
                  {t('readMore')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.viewAll}>
          <a href={`/${locale}/news`} className={styles.viewAllBtn}>
            {t('viewAll')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
