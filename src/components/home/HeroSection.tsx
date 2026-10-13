"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./HeroSection.module.css";
import Lenis from "lenis";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".hero-line", {
        yPercent: 100,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power4.out"
      })
        .from(".hero-sub", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6")
        .from(".hero-desc", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6")
        .from(".hero-cta", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        }, "-=0.6")
        .from(".hero-status", {
          y: 15,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) {
      lenis.scrollTo(targetId, { offset: -90 });
    } else {
      const target = document.querySelector(targetId);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <section className={styles.hero} ref={containerRef}>
      {/* Static Hero Background Image - Exact 16:9 proportion, not animated, not stretched or zoomed */}
      <div className={styles.bgWrapper}>
        <Image
          src="/hero-bg.png"
          alt="Hero Background"
          fill
          priority
          className={styles.bgImage}
          sizes="100vw"
        />
      </div>
      <div className={styles.overlayGradient}></div>

      <div className={`container ${styles.container}`}>
        <div className={styles.textContent}>

          <h1 className={styles.headline}>
            <div className={styles.lineOverflow}>
              <span className="hero-line">CUT.</span>
            </div>
            <div className={styles.lineOverflow}>
              <span className="hero-line">CREATE.</span>
            </div>
            <div className={styles.lineOverflow}>
              <span className={`hero-line ${styles.captivateBox}`}>CAPTIVATE.</span>
            </div>
          </h1>

          <h2 className={`hero-sub ${styles.subheadline}`}>
            Making every frame matter.
          </h2>

          <p className={`hero-desc ${styles.description}`}>
            I'm Ajey Edit &mdash; a video editor and motion designer creating documentary, long-form and short-form content built around storytelling, pacing and visual impact.
          </p>

          <div className={styles.ctas}>
            <a
              href="#work"
              onClick={(e) => handleScrollTo(e, '#work')}
              className={`hero-cta ${styles.primaryCta}`}
            >
              <span>Explore My Work</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className={`hero-cta ${styles.secondaryCta}`}
            >
              <span>Let's Talk</span>
            </a>
          </div>

          <div className={`hero-status ${styles.statusBadge}`}>
            <span className={styles.pulseDot}></span>
            <span>Available for freelance projects</span>
          </div>

        </div>
      </div>
    </section>
  );
}
