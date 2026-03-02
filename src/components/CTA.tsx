'use client';

import { useTranslations, useLocale } from 'next-intl';
import styles from './CTA.module.css';

export default function CTA() {
  const t = useTranslations('cta');
  const locale = useLocale();

  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>
          <a href={`/${locale}/contact`} className={styles.button}>
            {t('button')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        <div className={styles.decoration}>
          <div className={styles.circle}></div>
          <div className={styles.circle2}></div>
        </div>
      </div>
    </section>
  );
}
