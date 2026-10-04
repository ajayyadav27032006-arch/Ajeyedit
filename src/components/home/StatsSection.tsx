"use client";

import styles from "./StatsSection.module.css";

const textElement = (
  <>
    <span className={styles.statText}>
      <span className={styles.highlight}>50+</span> Clients Served
    </span>
    <span className={styles.separator}>&middot;</span>
    <span className={styles.statText}>
      <span className={styles.highlight}>1,000+</span> Videos Crafted
    </span>
    <span className={styles.separator}>&middot;</span>
    <span className={styles.statText}>
      <span className={styles.highlight}>10M+</span> Organic Views
    </span>
    <span className={styles.separator}>&middot;</span>
  </>
);

export default function StatsSection() {
  return (
    <section className={styles.stats}>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          {textElement}
          {textElement}
        </div>
        <div className={styles.marqueeContent} aria-hidden="true">
          {textElement}
          {textElement}
        </div>
      </div>
    </section>
  );
}
