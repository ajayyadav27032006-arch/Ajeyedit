"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./AboutSection.module.css";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) {
      lenis.scrollTo('#contact', { offset: -90 });
    } else {
      const target = document.querySelector('#contact');
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="about" className={`section ${styles.section}`} ref={containerRef}>
      <div className={`container ${styles.container}`}>

        {/* Text Content Column */}
        <div className={`about-anim ${styles.textContent}`}>
          <div className={styles.eyebrow}>
            <span>BEHIND THE EDIT</span>
          </div>

          <h2 className={styles.headline}>
            More Than<br />
            Just <span className={styles.accent}>the Cut.</span>
          </h2>


          <p className={styles.bioParagraph}>
            I'm <strong>Ajey Yadav</strong> &mdash; a freelance video editor based in Jaipur, Rajasthan. With 3 years of experience, I specialize in documentary-style and talking-head content. I combine storytelling, sound design, and motion graphics to turn raw footage into content that feels polished while maintaining the creator's authentic voice.
          </p>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Experience</span>
              <p className={styles.metaValue}>3+ Years Editing<br />50+ Happy Clients<br />Creative Agencies</p>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Selected Clients</span>
              <p className={styles.metaValue}>The Real Knowledge<br />Quickflo &middot; PerfectV<br />Clothio &middot; NPD &middot; She Top</p>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Tools</span>
              <p className={styles.metaValue}>DaVinci Resolve &middot; Premiere Pro<br />After Effects &middot; Photoshop<br />Claude &middot; Gemini Omni</p>
            </div>
          </div>

          <div className={styles.ctaWrap}>
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className={styles.ctaBtn}
            >
              <span>Let's Work Together</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Editorial Photo Presentation Column */}
        <div className={`about-anim ${styles.photoWrapper}`}>
          {/* Layered background accent cards */}
          <div className={styles.backdropNavy}></div>
          <div className={styles.backdropInferno}></div>

          {/* Existing Portrait Image - Exact src and dimensions preserved */}
          <div className={styles.imageContainer}>
            <Image
              src="/images/ajey-portrait.png"
              alt="Ajey Yadav Portrait"
              width={600}
              height={800}
              className={styles.image}
              priority
            />
          </div>

          {/* Artistic Editorial Badge */}
          <div className={styles.signatureBadge}>
            <span className={styles.badgeLine1}>Edit. Create.</span>
            <span className={styles.badgeLine2}>Tell Stories.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
