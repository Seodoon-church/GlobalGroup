'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Header.module.css';
import { TradingViewTicker } from './TradingViewWidget';

// Live market ticker symbols (real-time via TradingView)
const TICKER_SYMBOLS = [
  { proName: 'TVC:UKOIL', title: 'Brent' },
  { proName: 'TVC:USOIL', title: 'WTI' },
  { proName: 'TVC:GOLD', title: 'Gold' },
  { proName: 'COMEX:HG1!', title: 'Copper' },
  { proName: 'TVC:SILVER', title: 'Silver' },
  { proName: 'TVC:PLATINUM', title: 'Platinum' },
  { proName: 'NYMEX:NG1!', title: 'Nat Gas' },
  { proName: 'FX_IDC:USDKRW', title: 'USD/KRW' },
];

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'sw', label: 'Kiswahili' },
];

const NAV = [
  { key: 'home', href: '' },
  { key: 'company', href: '/about' },
  { key: 'business', href: '/business' },
  { key: 'news', href: '/news' },
  { key: 'contact', href: '/contact' },
];

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath || `/${newLocale}`);
    setIsLangOpen(false);
  };

  // strip locale prefix to compare route
  const rest = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
  const activeKey =
    rest.startsWith('/about') || rest.startsWith('/company') ? 'company'
    : rest.startsWith('/business') ? 'business'
    : rest.startsWith('/news') ? 'news'
    : rest.startsWith('/contact') ? 'contact'
    : rest === '/' ? 'home'
    : '';

  return (
    <div className={styles.wrapper}>
      {/* Live market ticker (real-time via TradingView) */}
      <div className={styles.tickerBar}>
        <div className={styles.tickerInner}>
          <span className={styles.tickerLabel}>{t('header.markets')}</span>
          <div className={styles.tickerWidget}>
            <TradingViewTicker
              colorTheme="dark"
              isTransparent
              showSymbolLogo={false}
              symbols={TICKER_SYMBOLS}
            />
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <header className={styles.header}>
        <div className={styles.container}>
          <a href={`/${locale}`} className={styles.logo} aria-label="Global Group Korea">
            <img src="/images/logo.png" alt="Global Group Korea" className={styles.logoImg} />
          </a>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            {NAV.map((item) => (
              <a
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`${styles.navLink} ${activeKey === item.key ? styles.navActive : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
            <a href={`/${locale}/contact`} className={styles.ctaMobile}>
              {t('header.getConsultation')}
            </a>
          </nav>

          <div className={styles.actions}>
            <div className={styles.langWrapper}>
              <button
                className={styles.langBtn}
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-label="Language"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>{locale.toUpperCase()}</span>
              </button>
              {isLangOpen && (
                <div className={styles.langDropdown}>
                  {LANGS.map((lang) => (
                    <button
                      key={lang.code}
                      className={`${styles.langOption} ${locale === lang.code ? styles.langActive : ''}`}
                      onClick={() => switchLocale(lang.code)}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href={`/${locale}/contact`} className={styles.cta}>
              {t('header.getConsultation')}
            </a>

            <button
              className={styles.menuToggle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}></span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
