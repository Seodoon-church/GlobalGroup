'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import styles from './page.module.css';

const partnerTypes = [
  {
    key: 'trading',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3h18v18H3zM12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    key: 'logistics',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    key: 'financial',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    key: 'technical',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
];

const regions = ['africa', 'middleEast', 'asia', 'americas'];

const benefits = ['global', 'expertise', 'network'];

export default function PartnersContent() {
  const t = useTranslations('partnersPage');
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
          <div className={styles.introContent}>
            <h2 className={styles.introTitle}>{t('intro.title')}</h2>
            <p className={styles.introText}>{t('intro.text')}</p>
          </div>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section className={styles.typesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.sectionTitle}>{t('types.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('types.subtitle')}</p>
          </div>
          <div className={styles.typesGrid}>
            {partnerTypes.map((type) => (
              <div key={type.key} className={styles.typeCard}>
                <div className={styles.typeIcon}>{type.icon}</div>
                <h3 className={styles.typeTitle}>{t(`types.${type.key}.title`)}</h3>
                <p className={styles.typeText}>{t(`types.${type.key}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Partner Section */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.sectionTitle}>{t('featured.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('featured.subtitle')}</p>
          </div>
          <div className={styles.featuredCard}>
            <div className={styles.featuredBadge}>{t('featured.vish.badge')}</div>
            <div className={styles.featuredContent}>
              <div className={styles.featuredLogo}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                  <line x1="12" y1="22" x2="12" y2="15.5" />
                  <line x1="22" y1="8.5" x2="12" y2="15.5" />
                  <line x1="2" y1="8.5" x2="12" y2="15.5" />
                </svg>
              </div>
              <div className={styles.featuredInfo}>
                <h3 className={styles.featuredName}>{t('featured.vish.name')}</h3>
                <span className={styles.featuredLocation}>{t('featured.vish.location')}</span>
                <p className={styles.featuredDescription}>{t('featured.vish.description')}</p>
              </div>
            </div>
            <div className={styles.contractHighlights}>
              <h4 className={styles.contractTitle}>{t('featured.vish.contractTitle')}</h4>
              <div className={styles.contractGrid}>
                <div className={styles.contractItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <div>
                    <span className={styles.contractLabel}>{t('featured.vish.effectiveDateLabel')}</span>
                    <span className={styles.contractValue}>{t('featured.vish.effectiveDate')}</span>
                  </div>
                </div>
                <div className={styles.contractItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  <div>
                    <span className={styles.contractLabel}>{t('featured.vish.agreementTypeLabel')}</span>
                    <span className={styles.contractValue}>{t('featured.vish.agreementType')}</span>
                  </div>
                </div>
                <div className={styles.contractItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                  <div>
                    <span className={styles.contractLabel}>{t('featured.vish.exclusiveRightsLabel')}</span>
                    <span className={styles.contractValue}>{t('featured.vish.exclusiveRights')}</span>
                  </div>
                </div>
                <div className={styles.contractItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <div>
                    <span className={styles.contractLabel}>{t('featured.vish.contractTermLabel')}</span>
                    <span className={styles.contractValue}>{t('featured.vish.contractTerm')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Network Section */}
      <section className={styles.regionsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.sectionTitle}>{t('regions.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('regions.subtitle')}</p>
          </div>
          <div className={styles.regionsGrid}>
            {regions.map((region) => (
              <div key={region} className={styles.regionCard}>
                <h3 className={styles.regionName}>{t(`regions.${region}.region`)}</h3>
                <div className={styles.regionDetails}>
                  <span className={styles.regionCountries}>{t(`regions.${region}.countries`)}</span>
                  <span className={styles.regionFocus}>{t(`regions.${region}.focus`)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.sectionTitle}>{t('benefits.title')}</h2>
          </div>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <div key={benefit} className={styles.benefitCard}>
                <div className={styles.benefitNumber}>0{index + 1}</div>
                <h3 className={styles.benefitTitle}>{t(`benefits.${benefit}.title`)}</h3>
                <p className={styles.benefitText}>{t(`benefits.${benefit}.text`)}</p>
              </div>
            ))}
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
