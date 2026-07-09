import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locales } from '../../../../../i18n';
import { BASE_URL } from '@/lib/constants';
import styles from './page.module.css';

// 'energy-fuels' is the canonical slug; 'crude-oil' is kept as an alias so existing
// links/bookmarks continue to resolve to the same (expanded) content.
const slugs = ['energy-fuels', 'crude-oil', 'copper', 'quartz', 'gold'];

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
  'energy-fuels': {
    key: 'energyFuels',
    color: '#0a1628',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)',
  },
  'crude-oil': {
    key: 'energyFuels',
    color: '#0a1628',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)',
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

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const tBusiness = await getTranslations({ locale, namespace: 'business' });

  const business = businessData[slug];
  if (!business) return {};

  const languages: Record<string, string> = {};
  locales.forEach(loc => {
    languages[loc] = `${BASE_URL}/${loc}/business/${slug}/`;
  });
  languages['x-default'] = `${BASE_URL}/en/business/${slug}/`;

  return {
    title: tBusiness(`${business.key}.title`),
    description: tBusiness(`${business.key}.description`),
    alternates: {
      canonical: `${BASE_URL}/${locale}/business/${slug}/`,
      languages,
    },
    openGraph: {
      title: tBusiness(`${business.key}.title`),
      description: tBusiness(`${business.key}.description`),
    },
  };
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

  const isQuartz = slug === 'quartz';
  const features = isQuartz
    ? ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6']
    : ['feature1', 'feature2', 'feature3', 'feature4'];
  const processes = ['process1', 'process2', 'process3', 'process4'];

  // Product line-ups per business (rendered as a spec section). Full specs are static PDFs.
  // NOTE: High-Purity Quartz (HPQ) spec table is intentionally held pending VKICL/SGS
  // confirmed values, so quartz is not listed here yet.
  const productMap: Record<string, { key: string; pdf: string }[]> = {
    energyFuels: [
      { key: 'en590', pdf: '/specs/GGK-EN590-10ppm-ULSD.pdf' },
      { key: 'jetA1', pdf: '/specs/GGK-Jet-A1.pdf' },
      { key: 'crude', pdf: '/specs/GGK-Crude-Oil.pdf' },
    ],
  };
  const products = productMap[business.key] ?? [];
  const specRows = ['spec1', 'spec2', 'spec3', 'spec4', 'spec5', 'spec6'];

  const chemicalData = [
    { param: 'SiO₂ (%)', result: '+99.99 – +99.9' },
    { param: 'Fe₂O₃ (ppm)', result: '0.0002 – 0.0043' },
    { param: 'Al₂O₃ (ppm)', result: '0.0021 – 0.0046' },
    { param: 'Na₂O (ppm)', result: '0.0001 – 0.0004' },
    { param: 'K₂O (ppm)', result: '0.0002 – 0.0009' },
    { param: 'CaO (ppm)', result: '0.0004 – 0.0005' },
    { param: 'MgO (ppm)', result: '0.0002 – 0.0004' },
    { param: 'Ti (ppm)', result: '0.0005 – 0.0008' },
  ];

  const mineLocations = [
    { key: 'kwaluguru', count: 10 },
    { key: 'magali', count: 5 },
    { key: 'msongozi', count: 3 },
  ];

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
            {(slug === 'energy-fuels' || slug === 'crude-oil') && (
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
              {isQuartz && (
                <div className={`${styles.statCard} ${styles.statCardExclusive}`}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a962" strokeWidth="1.5" style={{ marginBottom: '8px' }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span className={styles.statValue}>{t('quartz.stats.stat4.value')}</span>
                  <span className={styles.statLabel}>{t('quartz.stats.stat4.label')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products / Specification Section */}
      {products.length > 0 && (
        <section className={styles.productsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.goldLine}></div>
              <h2 className={styles.sectionTitle}>{t(`${business.key}.products.title`)}</h2>
              <p className={styles.productsIntro}>{t(`${business.key}.products.intro`)}</p>
            </div>
            <div className={`${styles.productsGrid} ${products.length === 1 ? styles.productsGridSingle : ''}`}>
              {products.map((p) => (
                <div key={p.key} className={styles.productCard}>
                  <h3 className={styles.productTitle}>{t(`${business.key}.products.${p.key}.title`)}</h3>
                  <p className={styles.productTagline}>{t(`${business.key}.products.${p.key}.tagline`)}</p>
                  <table className={styles.specTable}>
                    <tbody>
                      {specRows.map((s) => (
                        <tr key={s}>
                          <th>{t(`${business.key}.products.${p.key}.${s}.label`)}</th>
                          <td>{t(`${business.key}.products.${p.key}.${s}.value`)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <a href={p.pdf} className={styles.specLink} target="_blank" rel="noopener noreferrer">
                    {t(`${business.key}.products.fullSpec`)}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quartz-Only: Gallery Section */}
      {isQuartz && (
        <section className={styles.gallerySection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.goldLine}></div>
              <h2 className={styles.sectionTitle}>{t('quartz.gallery.title')}</h2>
              <p className={styles.sectionSubtitle}>{t('quartz.gallery.subtitle')}</p>
            </div>
            <div className={styles.galleryIntro}>
              <p className={styles.galleryIntroText}>{t('quartz.gallery.intro')}</p>
              <div className={styles.partnerBadge}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                {t('quartz.gallery.partnerLabel')}
              </div>
            </div>
            <div className={styles.galleryGrid}>
              <div className={styles.galleryItem}>
                <img
                  src="/images/quartz/mining-site.jpg"
                  alt={t('quartz.gallery.photo1')}
                  className={styles.galleryImage}
                  loading="lazy"
                />
                <div className={styles.galleryCaption}>{t('quartz.gallery.photo1')}</div>
              </div>
              <div className={styles.galleryItem}>
                <img
                  src="/images/quartz/quartz-samples.jpg"
                  alt={t('quartz.gallery.photo2')}
                  className={styles.galleryImage}
                  loading="lazy"
                />
                <div className={styles.galleryCaption}>{t('quartz.gallery.photo2')}</div>
              </div>
              <div className={styles.galleryItem}>
                <img
                  src="/images/quartz/shipping-logistics.jpg"
                  alt={t('quartz.gallery.photo3')}
                  className={styles.galleryImage}
                  loading="lazy"
                />
                <div className={styles.galleryCaption}>{t('quartz.gallery.photo3')}</div>
              </div>
              <div className={styles.galleryItem}>
                <img
                  src="/images/quartz/chemical-analysis.jpg"
                  alt={t('quartz.gallery.photo4')}
                  className={styles.galleryImage}
                  loading="lazy"
                />
                <div className={styles.galleryCaption}>{t('quartz.gallery.photo4')}</div>
              </div>
            </div>
            <div className={styles.videoGrid}>
              <div className={styles.videoItem}>
                <video
                  className={styles.videoPlayer}
                  controls
                  preload="metadata"
                  playsInline
                  poster="/images/quartz/mining-site.jpg"
                >
                  <source src="/images/quartz/quartz-mining-1.mp4" type="video/mp4" />
                </video>
                <div className={styles.videoCaption}>{t('quartz.gallery.video1')}</div>
              </div>
              <div className={styles.videoItem}>
                <video
                  className={styles.videoPlayer}
                  controls
                  preload="metadata"
                  playsInline
                  poster="/images/quartz/quartz-samples.jpg"
                >
                  <source src="/images/quartz/quartz-mining-2.mp4" type="video/mp4" />
                </video>
                <div className={styles.videoCaption}>{t('quartz.gallery.video2')}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quartz-Only: Chemical Analysis Section */}
      {isQuartz && (
        <section className={styles.analysisSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.goldLine}></div>
              <h2 className={styles.sectionTitle}>{t('quartz.chemicalAnalysis.title')}</h2>
              <p className={styles.sectionSubtitle}>{t('quartz.chemicalAnalysis.subtitle')}</p>
            </div>
            <div className={styles.analysisTableWrapper}>
              <table className={styles.analysisTable}>
                <thead>
                  <tr>
                    <th>{t('quartz.chemicalAnalysis.parameter')}</th>
                    <th>{t('quartz.chemicalAnalysis.result')}</th>
                  </tr>
                </thead>
                <tbody>
                  {chemicalData.map((row) => (
                    <tr key={row.param}>
                      <td>{row.param}</td>
                      <td>{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.ecBadge}>
                <span className={styles.ecLabel}>{t('quartz.chemicalAnalysis.ec')}</span>
                <span className={styles.ecValue}>&lt; 4 μS/cm</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quartz-Only: Mining & Logistics Section */}
      {isQuartz && (
        <section className={styles.miningSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.goldLine}></div>
              <h2 className={styles.sectionTitleLight}>{t('quartz.mining.title')}</h2>
              <p className={styles.sectionSubtitleLight}>{t('quartz.mining.subtitle')}</p>
            </div>
            <div className={styles.miningGrid}>
              {mineLocations.map((loc) => (
                <div key={loc.key} className={styles.mineCard}>
                  <div className={styles.mineCount}>{loc.count}</div>
                  <h4 className={styles.mineName}>{t(`quartz.mining.${loc.key}.name`)}</h4>
                  <p className={styles.mineRegion}>{t(`quartz.mining.${loc.key}.region`)}</p>
                </div>
              ))}
            </div>
            <div className={styles.logisticsFlow}>
              <div className={styles.logisticsStep}>
                <div className={styles.logisticsIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                  </svg>
                </div>
                <span>{t('quartz.mining.mineLabel')}</span>
              </div>
              <div className={styles.logisticsArrow}>
                <span>12-15 km</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <div className={styles.logisticsStep}>
                <div className={styles.logisticsIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                </div>
                <span>{t('quartz.mining.highway')}</span>
              </div>
              <div className={styles.logisticsArrow}>
                <span>250 km</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <div className={styles.logisticsStep}>
                <div className={styles.logisticsIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 20h20M5 20V10l7-8 7 8v10" /><rect x="9" y="14" width="6" height="6" />
                  </svg>
                </div>
                <span>{t('quartz.mining.port')}</span>
              </div>
              <div className={styles.logisticsArrow}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <div className={styles.logisticsStep}>
                <div className={styles.logisticsIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                </div>
                <span>{t('quartz.mining.global')}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quartz-Only: Production Capacity Section */}
      {isQuartz && (
        <section className={styles.productionSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.goldLine}></div>
              <h2 className={styles.sectionTitle}>{t('quartz.production.title')}</h2>
              <p className={styles.sectionSubtitle}>{t('quartz.production.subtitle')}</p>
            </div>
            <div className={styles.productionGrid}>
              <div className={styles.productionCard}>
                <div className={styles.productionIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a4 4 0 00-8 0v2" />
                  </svg>
                </div>
                <h4 className={styles.productionTitle}>{t('quartz.production.boulders.title')}</h4>
                <div className={styles.productionSpec}>
                  <span className={styles.specLabel}>{t('quartz.production.sizeLabel')}</span>
                  <span className={styles.specValue}>{t('quartz.production.boulders.size')}</span>
                </div>
                <div className={styles.productionSpec}>
                  <span className={styles.specLabel}>{t('quartz.production.capacityLabel')}</span>
                  <span className={styles.specValue}>{t('quartz.production.boulders.capacity')}</span>
                </div>
              </div>
              <div className={styles.productionCard}>
                <div className={styles.productionIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                    <line x1="12" y1="22" x2="12" y2="15.5" />
                  </svg>
                </div>
                <h4 className={styles.productionTitle}>{t('quartz.production.lumps.title')}</h4>
                <div className={styles.productionSpec}>
                  <span className={styles.specLabel}>{t('quartz.production.sizeLabel')}</span>
                  <span className={styles.specValue}>{t('quartz.production.lumps.size')}</span>
                </div>
                <div className={styles.productionSpec}>
                  <span className={styles.specLabel}>{t('quartz.production.capacityLabel')}</span>
                  <span className={styles.specValue}>{t('quartz.production.lumps.capacity')}</span>
                </div>
              </div>
            </div>
            <p className={styles.productionNote}>{t('quartz.production.scalable')}</p>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.sectionTitle}>{t('features')}</h2>
          </div>
          <div className={`${styles.featuresGrid} ${isQuartz ? styles.featuresGridWide : ''}`}>
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
