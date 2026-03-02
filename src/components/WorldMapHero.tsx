'use client';

import styles from './WorldMapHero.module.css';

export default function WorldMapHero() {
  return (
    <div className={styles.container}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
        alt="World Map"
        className={styles.map}
      />
    </div>
  );
}
