'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';

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

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'business', href: '/business' },
    { key: 'market', href: '/market' },
    { key: 'partners', href: '/partners' },
    { key: 'news', href: '/news' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href={`/${locale}`} className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="Global Group Korea"
            width={160}
            height={60}
            priority
            className={styles.logoImage}
          />
        </a>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`/${locale}${item.href === '/' ? '' : item.href}`}
              className={styles.navLink}
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.langWrapper}>
            <button
              className={styles.langBtn}
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span>{locale.toUpperCase()}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {isLangOpen && (
              <div className={styles.langDropdown}>
                {[
                  { code: 'en', flag: '🇺🇸', label: 'English' },
                  { code: 'ko', flag: '🇰🇷', label: '한국어' },
                  { code: 'ja', flag: '🇯🇵', label: '日本語' },
                  { code: 'zh', flag: '🇨🇳', label: '中文' },
                  { code: 'fr', flag: '🇫🇷', label: 'Français' },
                  { code: 'ar', flag: '🇦🇪', label: 'العربية' },
                  { code: 'hi', flag: '🇮🇳', label: 'हिन्दी' },
                  { code: 'bn', flag: '🇧🇩', label: 'বাংলা' },
                  { code: 'sw', flag: '🇹🇿', label: 'Kiswahili' },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    className={`${styles.langOption} ${locale === lang.code ? styles.active : ''}`}
                    onClick={() => switchLocale(lang.code)}
                  >
                    <span className={styles.flag}>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href={`/${locale}/contact`} className={styles.contactBtn}>
            {t('common.contactUs')}
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
  );
}
