'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import styles from './page.module.css';

const businessAreas = [
  {
    key: 'crudeOil',
    slug: 'crude-oil',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C12 2 4 8 4 14a8 8 0 1016 0c0-6-8-12-8-12z" />
      </svg>
    ),
    color: '#1a1a1a',
  },
  {
    key: 'copper',
    slug: 'copper',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12M6 12h12" />
      </svg>
    ),
    color: '#b87333',
  },
  {
    key: 'quartz',
    slug: 'quartz',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
        <line x1="12" y1="22" x2="12" y2="15.5" />
        <line x1="22" y1="8.5" x2="12" y2="15.5" />
        <line x1="2" y1="8.5" x2="12" y2="15.5" />
      </svg>
    ),
    color: '#9ca3af',
    featured: true,
  },
  {
    key: 'gold',
    slug: 'gold',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a4 4 0 00-8 0v2" />
      </svg>
    ),
    color: '#c9a962',
  },
];

export default function BusinessContent() {
  const t = useTranslations('businessPage');
  const tBusiness = useTranslations('business');
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

      {/* Intro Section */}
      <section className={styles.introSection}>
        <div className={styles.container}>
          <p className={styles.introText}>{t('intro')}</p>
        </div>
      </section>

      {/* Business Areas Grid */}
      <section className={styles.businessSection}>
        <div className={styles.container}>
          <div className={styles.businessGrid}>
            {businessAreas.map((area) => (
              <Link
                key={area.key}
                href={`/${locale}/business/${area.slug}`}
                className={`${styles.businessCard} ${area.featured ? styles.featuredCard : ''}`}
              >
                <div className={styles.cardIcon} style={{ color: area.color }}>
                  {area.icon}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{tBusiness(`${area.key}.title`)}</h3>
                  <span className={styles.cardSubtitle}>{tBusiness(`${area.key}.subtitle`)}</span>
                  <p className={styles.cardDescription}>{tBusiness(`${area.key}.description`)}</p>
                </div>
                <div className={styles.cardArrow}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                {area.featured && (
                  <span className={styles.featuredBadge}>{t('exclusive')}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.sectionTitle}>{t('why.title')}</h2>
          </div>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyNumber}>01</div>
              <h4 className={styles.whyTitle}>{t('why.network.title')}</h4>
              <p className={styles.whyText}>{t('why.network.text')}</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyNumber}>02</div>
              <h4 className={styles.whyTitle}>{t('why.expertise.title')}</h4>
              <p className={styles.whyText}>{t('why.expertise.text')}</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyNumber}>03</div>
              <h4 className={styles.whyTitle}>{t('why.trust.title')}</h4>
              <p className={styles.whyText}>{t('why.trust.text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>{t('cta.title')}</h2>
          <p className={styles.ctaText}>{t('cta.text')}</p>
          <Link href={`/${locale}/contact`} className={styles.ctaButton}>
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </main>
  );
}
