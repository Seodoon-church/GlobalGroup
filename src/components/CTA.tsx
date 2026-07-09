'use client';

import { useTranslations, useLocale } from 'next-intl';
import styles from './CTA.module.css';

export default function CTA() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.glow} />
          <div className={styles.inner}>
            <p className={styles.eyebrow}>{t('home.cta.eyebrow')}</p>
            <h2 className={styles.title}>{t('home.cta.title')}</h2>
            <p className={styles.text}>{t('home.cta.text')}</p>
            <div className={styles.actions}>
              <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                {t('home.cta.primary')}
              </a>
              <a href={`/${locale}/business`} className={styles.btnOutline}>
                {t('home.cta.secondary')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
