'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './CopperSupplyChain.module.css';

const ITEMS = ['production', 'routes', 'midstream', 'outlook'];

export default function CopperSupplyChain() {
  const t = useTranslations('businessDetail');
  const [open, setOpen] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.rule} />
          <h2 className={styles.title}>{t('copper.supplyChain.title')}</h2>
          <p className={styles.subtitle}>{t('copper.supplyChain.subtitle')}</p>
        </div>

        <div className={styles.figure}>
          <img
            src="/images/business/copper-supply-chain.jpg"
            alt={t('copper.supplyChain.imageAlt')}
            className={styles.infographic}
            loading="lazy"
          />
        </div>

        <div className={styles.accordion}>
          {ITEMS.map((key, i) => {
            const isOpen = open === i;
            return (
              <div key={key} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.itemTitle}>{t(`copper.supplyChain.items.${key}.title`)}</span>
                  <span className={styles.chevron} aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className={styles.panel}>
                    <p className={styles.body}>{t(`copper.supplyChain.items.${key}.body`)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
