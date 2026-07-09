'use client';

import { useTranslations, useLocale } from 'next-intl';
import styles from './Business.module.css';

const CARDS = [
  { key: 'energyFuels', slug: 'energy-fuels', accent: '#1a1a1a', tag: 'Flagship' },
  { key: 'quartz', slug: 'quartz', accent: '#8f8f8f', tag: 'Exclusive' },
  { key: 'copper', slug: 'copper', accent: '#b87333', tag: '' },
  { key: 'gold', slug: 'gold', accent: '#c9a962', tag: '' },
];

export default function Business() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section id="areas" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.rule} />
          <h2 className={styles.title}>{t('home.areas.title')}</h2>
          <p className={styles.subtitle}>{t('home.areas.subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {CARDS.map((c) => (
            <a
              key={c.key}
              href={`/${locale}/business/${c.slug}`}
              className={styles.card}
              style={{ borderTopColor: c.accent }}
            >
              <div className={styles.cardTop}>
                <span className={styles.icon} style={{ background: c.accent }}>
                  <span className={styles.iconDot} />
                </span>
                {c.tag && <span className={styles.tag}>{c.tag}</span>}
              </div>
              <div className={styles.category}>{t(`home.areas.cards.${c.key}.category`)}</div>
              <h3 className={styles.name}>{t(`home.areas.cards.${c.key}.name`)}</h3>
              <p className={styles.short}>{t(`home.areas.cards.${c.key}.short`)}</p>
              <span className={styles.more}>{t('common.learnMore')} →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
