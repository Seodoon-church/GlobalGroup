'use client';

import { useTranslations } from 'next-intl';
import styles from './page.module.css';

const ARTICLES = [
  { id: 'a1', type: 'market', date: '2026-02-08' },
  { id: 'a2', type: 'company', date: '2026-01-22' },
];

export default function NewsContent() {
  const t = useTranslations();

  const badgeCls = (type: string) =>
    `${styles.badge} ${type === 'market' ? styles.badgeMarket : styles.badgeCompany}`;

  return (
    <main>
      {/* Page hero */}
      <section className={styles.pageHero}>
        <div className={styles.heroGlow} />
        <div className={styles.container}>
          <p className={styles.eyebrow}>{t('pages.news.hero.eyebrow')}</p>
          <h1 className={styles.heroTitle}>{t('pages.news.hero.title')}</h1>
          <p className={styles.heroLede}>{t('pages.news.hero.lede')}</p>
        </div>
      </section>

      {/* Featured */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <a href="#" className={styles.featured}>
            <div className={styles.featuredImg}>
              <span className={styles.imgDot} />
            </div>
            <div className={styles.featuredBody}>
              <div className={styles.metaRow}>
                <span className={badgeCls('company')}>{t('pages.news.badge.company')}</span>
                <span className={styles.date}>2026-02-15</span>
              </div>
              <h2 className={styles.featuredTitle}>{t('pages.news.feature.title')}</h2>
              <p className={styles.featuredExcerpt}>{t('pages.news.feature.excerpt')}</p>
              <span className={styles.readLink}>{t('pages.news.readStory')} →</span>
            </div>
          </a>
        </div>
      </section>

      {/* Article list */}
      <section className={styles.listSection}>
        <div className={styles.container}>
          <div className={styles.listGrid}>
            {ARTICLES.map((a) => (
              <a key={a.id} href="#" className={styles.card}>
                <div className={styles.metaRow}>
                  <span className={badgeCls(a.type)}>{t(`pages.news.badge.${a.type}`)}</span>
                  <span className={styles.date}>{a.date}</span>
                </div>
                <h3 className={styles.cardTitle}>{t(`pages.news.articles.${a.id}.title`)}</h3>
                <p className={styles.cardExcerpt}>{t(`pages.news.articles.${a.id}.excerpt`)}</p>
                <span className={styles.readLinkSm}>{t('pages.news.readMore')} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
