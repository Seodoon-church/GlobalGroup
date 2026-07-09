'use client';

import { useTranslations } from 'next-intl';
import styles from './InvestmentApproach.module.css';

const STEPS = ['step1', 'step2', 'step3'];

export default function InvestmentApproach() {
  const t = useTranslations();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.rule} />
          <h2 className={styles.title}>{t('home.approach.title')}</h2>
          <p className={styles.subtitle}>{t('home.approach.subtitle')}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.connector} />
          {STEPS.map((s, i) => (
            <div key={s} className={styles.card}>
              <div className={styles.num}>{String(i + 1).padStart(2, '0')}</div>
              <h3 className={styles.cardTitle}>{t(`home.approach.${s}.title`)}</h3>
              <p className={styles.cardText}>{t(`home.approach.${s}.detail`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
