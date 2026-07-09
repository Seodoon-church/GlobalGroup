'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './GlobalNetwork.module.css';

type Kind = 'hq' | 'quartz' | 'std';

const OFFICES: {
  id: string;
  city: string;
  country: string;
  x: number;
  y: number;
  kind: Kind;
}[] = [
  { id: 'seoul', city: 'Seoul', country: 'South Korea', x: 85.3, y: 29.2, kind: 'hq' },
  { id: 'montreal', city: 'Montreal', country: 'Canada', x: 29.6, y: 24.7, kind: 'std' },
  { id: 'dubai', city: 'Dubai', country: 'UAE', x: 65.4, y: 36.0, kind: 'std' },
  { id: 'dhaka', city: 'Dhaka', country: 'Bangladesh', x: 75.1, y: 36.8, kind: 'std' },
  { id: 'accra', city: 'Accra', country: 'Ghana', x: 49.9, y: 46.9, kind: 'std' },
  { id: 'morogoro', city: 'Morogoro', country: 'Tanzania', x: 60.5, y: 53.8, kind: 'quartz' },
  { id: 'capeTown', city: 'Cape Town', country: 'South Africa', x: 55.1, y: 68.8, kind: 'std' },
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
            <div className={styles.roleBadge}>{t(`home.network.offices.${selected.id}.role`)}</div>
            <p className={styles.panelDesc}>{t(`home.network.offices.${selected.id}.desc`)}</p>
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
