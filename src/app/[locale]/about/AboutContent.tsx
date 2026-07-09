'use client';

import { useTranslations, useLocale } from 'next-intl';
import styles from './page.module.css';

const STATS = [
  { value: '1987', key: 'established' },
  { value: '37', key: 'years' },
  { value: '25+', key: 'countries' },
  { value: '150+', key: 'partners' },
];

type Person = { id: string; name: string; img: string };

const EXECS: Person[] = [
  { id: 'michaelLee', name: 'Michael Lee', img: 'Michale-lee.jpeg' },
  { id: 'davidHan', name: 'David Han', img: 'david-han.jpeg' },
  { id: 'huhSeongphil', name: 'Dr. Huh, Seong-phil', img: 'huh-seongphil.jpeg' },
  { id: 'kasseyPaul', name: 'Dr. Kassey Chandra Sekhar Paul', img: 'dr-kassey-paul.jpeg' },
];
const ADVISORY: Person[] = [
  { id: 'byungheunJang', name: 'Byungheun Jang', img: 'byungheun-jang.jpeg' },
  { id: 'seongtaekHong', name: 'Dr. Seongtaek Hong', img: 'seongtaek-hong.jpeg' },
  { id: 'kateLee', name: 'Kate Lee', img: 'kate-lee.jpeg' },
];
const REGIONAL: Person[] = [
  { id: 'ramyReddy', name: 'Dr. Pallapolu Venkata Rami Reddy', img: 'ramy-reddy.jpeg' },
  { id: 'ansahJoseph', name: 'Ansah Joseph', img: 'ansah-joseph.jpeg' },
  { id: 'alexKakoma', name: 'Alex Chinyama Kakoma', img: 'Alex.jpeg' },
];

function initials(name: string) {
  const clean = name.replace(/^Dr\.\s*/i, '').trim().split(/\s+/).filter(Boolean);
  const first = clean[0] ? clean[0][0] : '';
  const last = clean.length > 1 ? clean[clean.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export default function AboutContent() {
  const t = useTranslations();
  const locale = useLocale();

  const groups = [
    { key: 'execs', people: EXECS, wide: true },
    { key: 'advisory', people: ADVISORY, wide: false },
    { key: 'regional', people: REGIONAL, wide: false },
  ];

  return (
    <main>
      {/* Page hero */}
      <section className={styles.pageHero}>
        <div className={styles.heroGlow} />
        <div className={styles.container}>
          <p className={styles.eyebrow}>{t('pages.company.hero.eyebrow')}</p>
          <h1 className={styles.heroTitle}>{t('pages.company.hero.title')}</h1>
          <p className={styles.heroLede}>{t('pages.company.hero.lede')}</p>
        </div>
      </section>

      {/* About */}
      <section id="about" className={styles.about}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div>
              <div className={styles.rule} />
              <h2 className={styles.aboutTitle}>{t('pages.company.about.title')}</h2>
              <p className={styles.aboutText}>{t('pages.company.about.p1')}</p>
              <p className={styles.aboutText}>{t('pages.company.about.p2')}</p>
            </div>
            <div className={styles.statsGrid}>
              {STATS.map((s) => (
                <div key={s.key} className={styles.statCell}>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{t(`home.stats.${s.key}`)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className={styles.leadership}>
        <div className={styles.container}>
          <div className={styles.headerLeft}>
            <div className={styles.rule} />
            <h2 className={styles.sectionTitle}>{t('pages.company.leadership.title')}</h2>
            <p className={styles.sectionSub}>{t('pages.company.leadership.subtitle')}</p>
          </div>

          {groups.map((g) => (
            <div key={g.key} className={styles.group}>
              <h3 className={styles.groupTitle}>{t(`pages.company.groups.${g.key}`)}</h3>
              <div className={`${styles.peopleGrid} ${g.wide ? styles.grid4 : styles.grid3}`}>
                {g.people.map((m) => (
                  <div key={m.id} className={styles.personCard}>
                    <div className={styles.portrait}>
                      <span className={styles.initials}>{initials(m.name)}</span>
                      <img
                        src={`/images/leadership/${m.img}`}
                        alt={m.name}
                        loading="lazy"
                        className={styles.portraitImg}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <div className={styles.personBody}>
                      <h4 className={styles.personName}>{m.name}</h4>
                      <div className={styles.personTitle}>{t(`pages.company.people.${m.id}.title`)}</div>
                      <p className={styles.personBio}>{t(`pages.company.people.${m.id}.bio`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaPanel}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaInner}>
              <p className={styles.ctaEyebrow}>{t('pages.company.cta.eyebrow')}</p>
              <h2 className={styles.ctaTitle}>{t('pages.company.cta.title')}</h2>
              <div className={styles.ctaActions}>
                <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                  {t('header.getConsultation')}
                </a>
                <a href={`/${locale}/business`} className={styles.btnOutline}>
                  {t('home.hero.ctaSecondary')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
