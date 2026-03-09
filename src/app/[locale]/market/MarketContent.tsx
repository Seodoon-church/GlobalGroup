'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './page.module.css';

// TradingView 위젯을 클라이언트 사이드에서만 로드
const TradingViewTicker = dynamic(
  () => import('@/components/TradingViewWidget').then((mod) => mod.TradingViewTicker),
  { ssr: false, loading: () => <div className={styles.widgetLoading}>Loading ticker...</div> }
);

const TradingViewMiniChart = dynamic(
  () => import('@/components/TradingViewWidget').then((mod) => mod.TradingViewMiniChart),
  { ssr: false, loading: () => <div className={styles.chartLoading}></div> }
);

const TradingViewMarketOverview = dynamic(
  () => import('@/components/TradingViewWidget').then((mod) => mod.TradingViewMarketOverview),
  { ssr: false, loading: () => <div className={styles.marketOverviewLoading}>Loading market data...</div> }
);

const commodityCharts = [
  {
    key: 'gold',
    symbol: 'COMEX:GC1!',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a4 4 0 00-8 0v2" />
      </svg>
    ),
  },
  {
    key: 'copper',
    symbol: 'COMEX:HG1!',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12M6 12h12" />
      </svg>
    ),
  },
  {
    key: 'oil',
    symbol: 'NYMEX:CL1!',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C12 2 4 8 4 14a8 8 0 1016 0c0-6-8-12-8-12z" />
      </svg>
    ),
  },
];

const insights = ['global', 'energy', 'minerals'];

export default function MarketContent() {
  const t = useTranslations('marketPage');
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

      {/* Ticker Tape Section */}
      <section className={styles.tickerSection}>
        <TradingViewTicker colorTheme="dark" />
      </section>

      {/* Overview Section */}
      <section className={styles.overviewSection}>
        <div className={styles.container}>
          <div className={styles.overviewContent}>
            <h2 className={styles.overviewTitle}>{t('overview.title')}</h2>
            <p className={styles.overviewText}>{t('overview.text')}</p>
          </div>
        </div>
      </section>

      {/* Live Prices Section - Mini Charts */}
      <section className={styles.pricesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.sectionTitle}>{t('prices.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('prices.subtitle')}</p>
          </div>
          <div className={styles.chartsGrid}>
            {commodityCharts.map((commodity) => (
              <div key={commodity.key} className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <div className={styles.chartIcon}>{commodity.icon}</div>
                  <div className={styles.chartInfo}>
                    <h3 className={styles.commodityName}>{t(`prices.${commodity.key}.name`)}</h3>
                    <span className={styles.commoditySymbol}>{t(`prices.${commodity.key}.symbol`)}</span>
                  </div>
                </div>
                <div className={styles.chartContainer}>
                  <TradingViewMiniChart
                    symbol={commodity.symbol}
                    height={180}
                    colorTheme="light"
                    dateRange="3M"
                    isTransparent={true}
                  />
                </div>
              </div>
            ))}
            {/* Quartz - No live market data */}
            <div className={`${styles.chartCard} ${styles.quartzCard}`}>
              <div className={styles.chartHeader}>
                <div className={styles.chartIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                    <line x1="12" y1="22" x2="12" y2="15.5" />
                    <line x1="22" y1="8.5" x2="12" y2="15.5" />
                    <line x1="2" y1="8.5" x2="12" y2="15.5" />
                  </svg>
                </div>
                <div className={styles.chartInfo}>
                  <h3 className={styles.commodityName}>{t('prices.quartz.name')}</h3>
                  <span className={styles.commoditySymbol}>{t('prices.quartz.symbol')}</span>
                </div>
              </div>
              <div className={styles.quartzContent}>
                <p className={styles.quartzNote}>{t('prices.quartz.note')}</p>
                <Link href={`/${locale}/contact`} className={styles.quartzButton}>
                  {t('prices.quartz.contact')}
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.pricesMeta}>
            <p className={styles.pricesNote}>{t('prices.note')}</p>
          </div>
        </div>
      </section>

      {/* Market Overview Section */}
      <section className={styles.marketOverviewSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.sectionTitle}>{t('marketOverview.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('marketOverview.subtitle')}</p>
          </div>
          <div className={styles.marketOverviewWidget}>
            <TradingViewMarketOverview height={550} colorTheme="light" />
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className={styles.insightsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.sectionTitle}>{t('insights.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('insights.subtitle')}</p>
          </div>
          <div className={styles.insightsGrid}>
            {insights.map((insight, index) => (
              <div key={insight} className={styles.insightCard}>
                <div className={styles.insightNumber}>0{index + 1}</div>
                <h3 className={styles.insightTitle}>{t(`insights.${insight}.title`)}</h3>
                <p className={styles.insightText}>{t(`insights.${insight}.text`)}</p>
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
