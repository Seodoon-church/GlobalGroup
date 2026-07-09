'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './Leadership.module.css';

const executives = [
  { key: 'michaelLee', image: '/images/leadership/Michale-lee.jpeg' },
  { key: 'davidHan', image: '/images/leadership/david-han.jpeg' },
  { key: 'huhSeongphil', image: '/images/leadership/huh-seongphil.jpeg' },
  { key: 'kasseyPaul', image: '/images/leadership/dr-kassey-paul.jpeg' },
];

const advisors = [
  { key: 'byungheunJang', image: '/images/leadership/byungheun-jang.jpeg' },
  { key: 'seongtaekHong', image: '/images/leadership/seongtaek-hong.jpeg' },
  { key: 'kateLee', image: '/images/leadership/kate-lee.jpeg' },
];

const regional = [
  { key: 'ramiReddy', image: '/images/leadership/ramy-reddy.jpeg' },
  { key: 'ansahJoseph', image: '/images/leadership/ansah-joseph.jpeg' },
  { key: 'alexKakoma', image: '/images/leadership/Alex.jpeg' },
];

interface PersonCardProps {
  personKey: string;
  image: string;
  category: 'executives' | 'advisors' | 'regional';
}

function PersonCard({ personKey, image, category }: PersonCardProps) {
  const t = useTranslations('leadership');

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={t(`${category}.${personKey}.name`)}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          className={styles.profileImage}
        />
      </div>
      <div className={styles.cardContent}>
        <h4 className={styles.name}>{t(`${category}.${personKey}.name`)}</h4>
        <span className={styles.position}>{t(`${category}.${personKey}.position`)}</span>
        <p className={styles.description}>{t(`${category}.${personKey}.description`)}</p>
      </div>
    </div>
  );
}

export default function Leadership() {
  const t = useTranslations('leadership');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Executive Leadership */}
        <div className={styles.group}>
          <div className={styles.groupHeader}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.groupTitle}>{t('title')}</h2>
            <p className={styles.groupSubtitle}>{t('subtitle')}</p>
          </div>
          <div className={styles.grid}>
            {executives.map((person) => (
              <PersonCard
                key={person.key}
                personKey={person.key}
                image={person.image}
                category="executives"
              />
            ))}
          </div>
        </div>

        {/* Strategic Advisory */}
        <div className={styles.group}>
          <div className={styles.groupHeader}>
            <h3 className={styles.subGroupTitle}>{t('advisoryTitle')}</h3>
            <p className={styles.groupSubtitle}>{t('advisorySubtitle')}</p>
          </div>
          <div className={styles.grid}>
            {advisors.map((person) => (
              <PersonCard
                key={person.key}
                personKey={person.key}
                image={person.image}
                category="advisors"
              />
            ))}
          </div>
        </div>

        {/* Regional Directors */}
        <div className={styles.group}>
          <div className={styles.groupHeader}>
            <h3 className={styles.subGroupTitle}>{t('regionalTitle')}</h3>
            <p className={styles.groupSubtitle}>{t('regionalSubtitle')}</p>
          </div>
          <div className={styles.grid}>
            {regional.map((person) => (
              <PersonCard
                key={person.key}
                personKey={person.key}
                image={person.image}
                category="regional"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
