'use client';

import { useTranslations, useLocale } from 'next-intl';
import styles from './Business.module.css';

const businessData: {
  key: string;
  slug: string;
  icon: string;
  gradient: string;
  accent: string;
  featured?: boolean;
  badge?: string;
}[] = [
  {
    key: 'crudeOil',
    slug: 'energy-fuels',
    icon: '⛽',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)',
    accent: '#c9a962',
    featured: true,
    badge: 'Flagship',
  },
  {
    key: 'quartz',
    slug: 'quartz',
    icon: '💎',
    gradient: 'linear-gradient(135deg, #a8a8a8 0%, #d4d4d4 100%)',
    accent: '#7c8aa0',
    featured: true,
    badge: 'Exclusive',
  },
  {
    key: 'copper',
    slug: 'copper',
    icon: '🔶',
    gradient: 'linear-gradient(135deg, #b87333 0%, #da8a47 100%)',
    accent: '#b87333',
  },
  {
    key: 'gold',
    slug: 'gold',
    icon: '🥇',
    gradient: 'linear-gradient(135deg, #c9a962 0%, #e0c98a 100%)',
    accent: '#c9a962',
  },
];

export default function Business() {
  const t = useTranslations('business');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <section className={styles.business}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <div className={styles.goldLine}></div>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {businessData.map((item, index) => (
            <div
              key={item.key}
              className={`${styles.card} ${item.featured ? styles.featured : ''}`}
              style={{ '--accent-color': item.accent, '--delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              {item.featured && item.badge && <span className={styles.flagshipBadge}>{item.badge}</span>}
              <div className={styles.cardIcon} style={{ background: item.gradient }}>
                <span>{item.icon}</span>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{t(`${item.key}.title`)}</h3>
                <span className={styles.cardSubtitle}>{t(`${item.key}.subtitle`)}</span>
                <p className={styles.cardDescription}>{t(`${item.key}.description`)}</p>

                <a href={`/${locale}/business/${item.slug}`} className={styles.cardLink}>
                  <span>{tCommon('learnMore')}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </div>

              <div className={styles.cardDecoration}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
