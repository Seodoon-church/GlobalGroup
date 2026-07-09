'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import WorldMapHero from './WorldMapHero';

// Fuel items use hardcoded labels (product names, identical across locales) so the
// homepage builds safely for all locales without new translation keys. Metals resolve
// their titles from the `business` namespace.
const businessItems: { key?: string; label?: string; icon: string; color: string }[] = [
  { label: 'EN590 10ppm Diesel', icon: '⛽', color: '#1a1a1a' },
  { label: 'Jet A-1', icon: '✈️', color: '#2d4a63' },
  { label: 'Crude Oil', icon: '🛢️', color: '#1a1a1a' },
  { key: 'quartz', icon: '💎', color: '#a8a8a8' },
  { key: 'copper', icon: '🔶', color: '#b87333' },
  { key: 'gold', icon: '🥇', color: '#c9a962' },
];

export default function Hero() {
  const t = useTranslations('hero');
  const tBusiness = useTranslations('business');
  const tStats = useTranslations('stats');
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % businessItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background Image with Overlay - disabled for testing */}
      {/* <div className={styles.bgImage}></div> */}
      {/* <div className={styles.overlay}></div> */}

      {/* World Map Background */}
      <WorldMapHero />

      {/* Floating Particles - disabled */}
      {/* <div className={styles.particles}>
        {[...Array(15)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}></div>
        ))}
      </div> */}

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tagline}>
            <span className={styles.taglineIcon}>◆</span>
            Hub of the World
            <span className={styles.taglineIcon}>◆</span>
          </div>

          <h1 className={styles.title}>{t('title')}</h1>

          <h2 className={styles.subtitle}>{t('subtitle')}</h2>

          <p className={styles.description}>{t('description')}</p>

          <p className={styles.description2}>{t('description2')}</p>

          {/* Rolling Banner */}
          <div className={styles.rollingBanner}>
            <div className={styles.bannerTrack}>
              {businessItems.map((item, index) => {
                const label = item.label ?? tBusiness(`${item.key}.title`);
                return (
                  <div
                    key={(item.key ?? item.label) as string}
                    className={`${styles.bannerItem} ${index === activeIndex ? styles.bannerItemActive : ''}`}
                  >
                    <span className={styles.bannerIcon}>{item.icon}</span>
                    <span className={styles.bannerText}>{label}</span>
                  </div>
                );
              })}
            </div>
            <div className={styles.bannerIndicators}>
              {businessItems.map((item, index) => (
                <button
                  key={(item.key ?? item.label) as string}
                  className={`${styles.bannerDot} ${index === activeIndex ? styles.bannerDotActive : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={item.label ?? tBusiness(`${item.key}.title`)}
                />
              ))}
            </div>
          </div>

          <div className={styles.buttons}>
            <a href={`/${locale}/contact`} className={styles.btnPrimary}>
              <span className={styles.btnIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </span>
              {t('cta')}
            </a>
            <a href={`/${locale}/business`} className={styles.btnOutline}>
              {t('exploreBusiness')}
              <span className={styles.btnArrow}>→</span>
            </a>
          </div>

          {/* Stats row */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{tStats('countriesValue')}</span>
              <span className={styles.statLabel}>{tStats('countries')}</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{tStats('partnersValue')}</span>
              <span className={styles.statLabel}>{tStats('partners')}</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{tStats('volumeValue')}</span>
              <span className={styles.statLabel}>{tStats('volume')}</span>
            </div>
          </div>
        </div>

        {/* Years of Excellence Badge */}
        <div className={styles.yearsBadge}>
          <div className={styles.badgeGlow}></div>
          <span className={styles.yearsNumber}>{tStats('experienceValue')}</span>
          <span className={styles.yearsText}>{t('yearsExcellence')}</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>SCROLL</span>
      </div>
    </section>
  );
}
