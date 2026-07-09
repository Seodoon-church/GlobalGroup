'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './GlobalNetwork.module.css';

type Kind = 'hq' | 'quartz' | 'std';

const OFFICES: {
  city: string;
  country: string;
  role: string;
  desc: string;
  x: number;
  y: number;
  kind: Kind;
}[] = [
  { city: 'Seoul', country: 'South Korea', role: 'Headquarters', x: 85.3, y: 29.2, kind: 'hq', desc: 'Finance, general affairs, administration and international business development.' },
  { city: 'Montreal', country: 'Canada', role: 'North America Office', x: 29.6, y: 24.7, kind: 'std', desc: 'North American operations and market access.' },
  { city: 'Dubai', country: 'UAE', role: 'Middle East Office', x: 65.4, y: 36.0, kind: 'std', desc: 'Trade finance, logistics and energy-sector partnerships.' },
  { city: 'Dhaka', country: 'Bangladesh', role: 'South Asia Office', x: 75.1, y: 36.8, kind: 'std', desc: 'South Asian market development and partnerships.' },
  { city: 'Accra', country: 'Ghana', role: 'West Africa Office', x: 49.9, y: 46.9, kind: 'std', desc: 'Mining, agriculture and infrastructure sectors.' },
  { city: 'Morogoro', country: 'Tanzania', role: 'Quartz Production Hub', x: 60.5, y: 53.8, kind: 'quartz', desc: 'Exclusive partnership with VISH KVARTZ INTANZ — 18 quartz mines, 18M-tonne reserves, worldwide distribution rights. Export via Dar es Salaam Port.' },
  { city: 'Cape Town', country: 'South Africa', role: 'Africa Regional Office', x: 55.1, y: 68.8, kind: 'std', desc: 'Southern Africa operations and regional coordination.' },
];

const STATS = [
  { value: '25+', key: 'statCountries' },
  { value: '150+', key: 'statPartners' },
  { value: '$2B+', key: 'statVolume' },
  { value: '37', key: 'statYears' },
];

export default function GlobalNetwork() {
  const t = useTranslations();
  const [sel, setSel] = useState(0);
  const selected = OFFICES[sel];

  return (
    <section id="network" className={styles.section}>
      <div className={styles.glow} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.rule} />
          <h2 className={styles.title}>{t('home.network.title')}</h2>
          <p className={styles.subtitle}>{t('home.network.subtitle')}</p>
        </div>

        <div className={styles.mapLayout}>
          <div className={styles.mapWrap}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
              alt="World map"
              className={styles.map}
            />
            {OFFICES.map((o, i) => {
              const isSel = i === sel;
              const cls = [
                styles.pin,
                o.kind === 'hq' ? styles.pinHq : '',
                o.kind === 'quartz' ? styles.pinQuartz : '',
                isSel ? styles.pinSel : '',
              ].join(' ');
              return (
                <button
                  key={o.city}
                  className={cls}
                  style={{ left: `${o.x}%`, top: `${o.y}%` }}
                  onClick={() => setSel(i)}
                  aria-label={o.city}
                >
                  <span className={styles.ring} />
                  <span className={styles.dot} />
                  <span className={styles.pinLabel}>{o.city}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <h3 className={styles.panelCity}>{selected.city}</h3>
              <span className={styles.panelCountry}>{selected.country}</span>
            </div>
            <div className={styles.roleBadge}>{selected.role}</div>
            <p className={styles.panelDesc}>{selected.desc}</p>
            <p className={styles.tapHint}>{t('home.network.tapHint')} →</p>
          </div>
        </div>

        <div className={styles.statsBand}>
          {STATS.map((s) => (
            <div key={s.key} className={styles.statCell}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{t(`home.network.${s.key}`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
