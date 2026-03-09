'use client';

import { useTranslations, useLocale } from 'next-intl';
import styles from './page.module.css';

const articles = [
  {
    key: 'article1',
    category: 'company',
    date: '2026-02-15',
  },
  {
    key: 'article2',
    category: 'market',
    date: '2026-02-08',
  },
  {
    key: 'article3',
    category: 'company',
    date: '2026-01-22',
  },
  {
    key: 'article4',
    category: 'market',
    date: '2026-01-10',
  },
];

export default function NewsContent() {
  const t = useTranslations('newsPage');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.goldLine}></div>
          <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
          <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
        </div>
      </section>

      {/* Articles Section */}
      <section className={styles.articlesSection}>
        <div className={styles.container}>
          <div className={styles.articlesGrid}>
            {articles.map((article, index) => (
              <article
                key={article.key}
                className={styles.articleCard}
                style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
              >
                <div className={styles.articleImagePlaceholder}>
                  <div className={styles.articleIcon}>
                    {article.category === 'company' ? (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    ) : (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className={styles.articleContent}>
                  <div className={styles.articleMeta}>
                    <span className={`${styles.category} ${styles[article.category]}`}>
                      {t(`categories.${article.category}`)}
                    </span>
                    <span className={styles.date}>{article.date}</span>
                  </div>
                  <h2 className={styles.articleTitle}>{t(`${article.key}.title`)}</h2>
                  <p className={styles.articleExcerpt}>{t(`${article.key}.excerpt`)}</p>
                  <p className={styles.articleBody}>{t(`${article.key}.body`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{t('cta.title')}</h2>
            <p className={styles.ctaText}>{t('cta.text')}</p>
            <a href={`/${locale}/contact`} className={styles.ctaBtn}>
              {tCommon('contactUs')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
