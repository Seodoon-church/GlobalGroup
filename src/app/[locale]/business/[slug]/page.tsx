import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const slugs = ['crude-oil', 'copper', 'quartz', 'gold'];
const locales = ['en', 'ko'];

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

const businessData: Record<string, {
  key: string;
  color: string;
  gradient: string;
}> = {
  'crude-oil': {
    key: 'crudeOil',
    color: '#1a1a1a',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
  },
  'copper': {
    key: 'copper',
    color: '#b87333',
    gradient: 'linear-gradient(135deg, #b87333 0%, #d4956a 100%)',
  },
  'quartz': {
    key: 'quartz',
    color: '#9ca3af',
    gradient: 'linear-gradient(135deg, #9ca3af 0%, #e5e7eb 100%)',
  },
  'gold': {
    key: 'gold',
    color: '#c9a962',
    gradient: 'linear-gradient(135deg, #c9a962 0%, #e0c98a 100%)',
  },
};

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BusinessDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('businessDetail');
  const tBusiness = await getTranslations('business');

  const business = businessData[slug];
  if (!business) {
    notFound();
  }

  const features = ['feature1', 'feature2', 'feature3', 'feature4'];
  const processes = ['process1', 'process2', 'process3', 'process4'];

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero} style={{ background: business.gradient }}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <Link href={`/${locale}/business`} className={styles.backLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t('backToBusiness')}
          </Link>
          <div className={styles.heroIcon}>
            {slug === 'crude-oil' && (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C12 2 4 8 4 14a8 8 0 1016 0c0-6-8-12-8-12z" />
              </svg>
            )}
            {slug === 'copper' && (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v12M6 12h12" />
              </svg>
            )}
            {slug === 'quartz' && (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                <line x1="12" y1="22" x2="12" y2="15.5" />
                <line x1="22" y1="8.5" x2="12" y2="15.5" />
                <line x1="2" y1="8.5" x2="12" y2="15.5" />
              </svg>
            )}
            {slug === 'gold' && (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a4 4 0 00-8 0v2" />
              </svg>
            )}
          </div>
          <span className={styles.heroSubtitle}>{tBusiness(`${business.key}.subtitle`)}</span>
          <h1 className={styles.heroTitle}>{tBusiness(`${business.key}.title`)}</h1>
          <p className={styles.heroDescription}>{tBusiness(`${business.key}.description`)}</p>
        </div>
      </section>

      {/* Overview Section */}
      <section className={styles.overviewSection}>
        <div className={styles.container}>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewContent}>
              <div className={styles.goldLine}></div>
              <h2 className={styles.sectionTitle}>{t(`${business.key}.overview.title`)}</h2>
              <p className={styles.overviewText}>{t(`${business.key}.overview.text1`)}</p>
              <p className={styles.overviewText}>{t(`${business.key}.overview.text2`)}</p>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{t(`${business.key}.stats.stat1.value`)}</span>
                <span className={styles.statLabel}>{t(`${business.key}.stats.stat1.label`)}</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{t(`${business.key}.stats.stat2.value`)}</span>
                <span className={styles.statLabel}>{t(`${business.key}.stats.stat2.label`)}</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{t(`${business.key}.stats.stat3.value`)}</span>
                <span className={styles.statLabel}>{t(`${business.key}.stats.stat3.label`)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.sectionTitle}>{t('features')}</h2>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={feature} className={styles.featureCard}>
                <div className={styles.featureNumber}>{String(index + 1).padStart(2, '0')}</div>
                <h4 className={styles.featureTitle}>{t(`${business.key}.features.${feature}.title`)}</h4>
                <p className={styles.featureText}>{t(`${business.key}.features.${feature}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.sectionTitleLight}>{t('process')}</h2>
          </div>
          <div className={styles.processTimeline}>
            {processes.map((process, index) => (
              <div key={process} className={styles.processItem}>
                <div className={styles.processStep}>{index + 1}</div>
                <div className={styles.processContent}>
                  <h4 className={styles.processTitle}>{t(`${business.key}.process.${process}.title`)}</h4>
                  <p className={styles.processText}>{t(`${business.key}.process.${process}.text`)}</p>
                </div>
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
