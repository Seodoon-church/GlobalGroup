'use client';

import { useTranslations, useLocale } from 'next-intl';
import styles from './page.module.css';

const TRADE = ['step1', 'step2', 'step3', 'step4'];

const COMMODITIES = [
  { key: 'energyFuels', slug: 'energy-fuels', accent: '#1a1a1a', accentText: '#8a6d2f' },
  { key: 'quartz', slug: 'quartz', accent: '#8f8f8f', accentText: '#6c757d' },
  { key: 'copper', slug: 'copper', accent: '#b87333', accentText: '#a05e28' },
  { key: 'gold', slug: 'gold', accent: '#c9a962', accentText: '#a88a3d' },
];

const SUPPLY_FLOW = ['flow1', 'flow2', 'flow3'];

export default function BusinessContent() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main>
      {/* Page hero */}
      <section className={styles.pageHero}>
        <div className={styles.heroGlow} />
        <div className={styles.container}>
          <p className={styles.eyebrow}>{t('pages.business.hero.eyebrow')}</p>
          <h1 className={styles.heroTitle}>{t('pages.business.hero.title')}</h1>
          <p className={styles.heroLede}>{t('pages.business.hero.lede')}</p>
        </div>
      </section>

      {/* How a trade works */}
      <section className={styles.tradeSection}>
        <div className={styles.container}>
          <div className={styles.headerLeft}>
            <div className={styles.rule} />
            <h2 className={styles.sectionTitleLight}>{t('pages.business.trade.title')}</h2>
            <p className={styles.sectionSubLight}>{t('pages.business.trade.subtitle')}</p>
          </div>
          <div className={styles.tradeGrid}>
            {TRADE.map((s, i) => (
              <div key={s} className={styles.tradeStep}>
                <div className={styles.tradeStepTop}>
                  <span className={styles.tradeNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.tradeLine} />
                </div>
                <h3 className={styles.tradeStepTitle}>{t(`pages.business.trade.${s}.title`)}</h3>
                <p className={styles.tradeStepText}>{t(`pages.business.trade.${s}.detail`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commodity detail sections */}
      {COMMODITIES.map((c, i) => {
        const dark = i % 2 === 1;
        const imgFirst = i % 2 === 0;
        const sectionCls = `${styles.commodity} ${dark ? styles.commodityDark : i === 0 ? styles.commodityWhite : styles.commoditySubtle}`;
        return (
          <section key={c.key} id={c.slug} className={sectionCls}>
            <div className={styles.container}>
              <div className={styles.commodityRow}>
                <div
                  className={`${styles.commodityImg} ${imgFirst ? '' : styles.imgSecond}`}
                  style={{ background: `linear-gradient(135deg, ${c.accent}22, ${c.accent}0a)` }}
                >
                  <span className={styles.imgDot} style={{ background: c.accent }} />
                </div>
                <div className={imgFirst ? '' : styles.textFirst}>
                  <div className={`${styles.chip} ${dark ? styles.chipDark : ''}`}>
                    <span className={styles.chipDot} style={{ background: c.accent }} />
                    <span>{t(`pages.business.commodities.${c.key}.category`)}</span>
                  </div>
                  <h2 className={styles.commodityName}>{t(`pages.business.commodities.${c.key}.name`)}</h2>
                  <p className={styles.commodityLong}>{t(`pages.business.commodities.${c.key}.long`)}</p>
                  <div className={styles.points}>
                    {['p1', 'p2', 'p3'].map((p) => (
                      <div key={p} className={styles.point}>
                        <span className={styles.pointDash} style={{ color: c.accentText }}>—</span>
                        <span>{t(`pages.business.commodities.${c.key}.${p}`)}</span>
                      </div>
                    ))}
                  </div>
                  <a href={`/${locale}/business/${c.slug}`} className={styles.commodityLink}>
                    {t('common.learnMore')} →
                  </a>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Quartz exclusive supply chain */}
      <section className={styles.supply}>
        <div className={styles.container}>
          <div className={styles.supplyHeader}>
            <div className={styles.chipCenter}>
              <span className={styles.chipDot} style={{ background: '#8f8f8f' }} />
              <span>{t('pages.business.supply.eyebrow')}</span>
            </div>
            <h2 className={styles.sectionTitle}>{t('pages.business.supply.title')}</h2>
            <p className={styles.sectionSub}>{t('pages.business.supply.subtitle')}</p>
          </div>
          <div className={styles.supplyStats}>
            <div className={styles.supplyStat}>
              <div className={styles.supplyStatValue}>18</div>
              <div className={styles.supplyStatLabel}>{t('pages.business.supply.stat1')}</div>
            </div>
            <div className={styles.supplyStat}>
              <div className={styles.supplyStatValue}>18M<span className={styles.unit}> t</span></div>
              <div className={styles.supplyStatLabel}>{t('pages.business.supply.stat2')}</div>
            </div>
            <div className={styles.supplyStat}>
              <div className={styles.supplyStatValue}>100<span className={styles.unit}>%</span></div>
              <div className={styles.supplyStatLabel}>{t('pages.business.supply.stat3')}</div>
            </div>
          </div>
          <div className={styles.supplyFlow}>
            {SUPPLY_FLOW.map((f, i) => (
              <div key={f} className={styles.flowItem}>
                <div className={styles.flowCard}>
                  <div className={styles.flowStep}>{String(i + 1).padStart(2, '0')}</div>
                  <div className={styles.flowTitle}>{t(`pages.business.supply.${f}.title`)}</div>
                  <p className={styles.flowText}>{t(`pages.business.supply.${f}.detail`)}</p>
                </div>
                {i < SUPPLY_FLOW.length - 1 && <span className={styles.flowArrow}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaPanel}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaInner}>
              <p className={styles.ctaEyebrow}>{t('pages.business.cta.eyebrow')}</p>
              <h2 className={styles.ctaTitle}>{t('pages.business.cta.title')}</h2>
              <p className={styles.ctaText}>{t('pages.business.cta.text')}</p>
              <div className={styles.ctaActions}>
                <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                  {t('header.getConsultation')}
                </a>
                <a href={`/${locale}#network`} className={styles.btnOutline}>
                  {t('pages.business.cta.secondary')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
