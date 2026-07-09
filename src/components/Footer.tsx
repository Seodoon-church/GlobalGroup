'use client';

import { useTranslations, useLocale } from 'next-intl';
import styles from './Footer.module.css';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const businessLinks = [
    { key: 'crudeOil', href: '/business/energy-fuels' },
    { key: 'quartz', href: '/business/quartz' },
    { key: 'copper', href: '/business/copper' },
    { key: 'gold', href: '/business/gold' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div>
            <div className={styles.brandRow}>
              <img src="/images/logo.png" alt="Global Group Korea" className={styles.footerLogo} />
            </div>
            <p className={styles.blurb}>{t('footer.brandBlurb')}</p>
          </div>

          {/* Business Areas */}
          <div>
            <div className={styles.colTitle}>{t('footer.businessAreas')}</div>
            <div className={styles.linkList}>
              {businessLinks.map((link) => (
                <a key={link.key} href={`/${locale}${link.href}`}>
                  {t(`business.${link.key}.title`)}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className={styles.colTitle}>{t('footer.company')}</div>
            <div className={styles.linkList}>
              <a href={`/${locale}/about`}>{t('nav.about')}</a>
              <a href={`/${locale}/about#leadership`}>{t('footer.leadership')}</a>
              <a href={`/${locale}#network`}>{t('footer.globalNetwork')}</a>
              <a href={`/${locale}/news`}>{t('nav.news')}</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className={styles.colTitle}>{t('footer.contactInfo')}</div>
            <div className={styles.linkList}>
              <span className={styles.address}>{t('footer.address')}</span>
              <a href="mailto:info@globalgroupkorea.com">info@globalgroupkorea.com</a>
              <a href="tel:+82-2-400-3084">+82-(0)2-400-3084</a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>{t('footer.copyright')}</span>
          <span>{t('footer.indicative')}</span>
        </div>
      </div>
    </footer>
  );
}
