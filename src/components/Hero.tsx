'use client';

import { useTranslations, useLocale } from 'next-intl';
import styles from './Hero.module.css';

const STATS = [
  { value: '1987', key: 'established' },
  { value: '37', key: 'years' },
  { value: '25+', key: 'countries' },
  { value: '150+', key: 'partners' },
];

export default function Hero() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className={styles.hero}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
        alt=""
        aria-hidden="true"
        className={styles.mapBg}
      />
      <div className={styles.scrimA} />
      <div className={styles.scrimB} />

      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>◆ {t('home.hero.eyebrow')}</p>
          <h1 className={styles.title}>{t('home.hero.title')}</h1>
          <p className={styles.lede}>{t('home.hero.lede')}</p>
          <div className={styles.actions}>
            <a href={`/${locale}/contact`} className={styles.btnPrimary}>
              {t('header.getConsultation')}
            </a>
            <a href={`/${locale}/business`} className={styles.btnOutline}>
              {t('home.hero.ctaSecondary')} →
            </a>
          </div>
          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.key} className={styles.stat}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{t(`home.stats.${s.key}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
