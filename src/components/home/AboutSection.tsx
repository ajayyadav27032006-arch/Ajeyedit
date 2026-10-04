"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./AboutSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className={`section ${styles.section}`} ref={containerRef}>
      <div className={`container ${styles.container}`}>

        <div className={`about-content ${styles.imageContainer}`}>
          <Image
            src="/images/ajey-portrait.png"
            alt="Ajey Yadav Portrait"
            width={600}
            height={800}
            className={styles.image}
            priority
          />
        </div>

        <div className={`about-content ${styles.textContent}`}>
          <h2 className="text-h2">BEHIND THE EDIT.</h2>
          <p className="text-body">
            I'm <strong>Ajey Yadav</strong> &mdash; a freelance video editor based in Jaipur, Rajasthan. With 3 years of experience, I specialize in documentary-style and talking-head content. I combine storytelling, sound design, and motion graphics to turn raw footage into content that feels polished while maintaining the creator's original voice.
          </p>

          <div className={styles.details}>
            <div className={styles.column}>
              <h3 className={styles.label}>Experience</h3>
              <p>3 Years Editing<br />50+ Clients<br />Multiple Agencies</p>
            </div>

            <div className={styles.column}>
              <h3 className={styles.label}>Selected Clients</h3>
              <p>The Real Knowledge<br />Quickflo<br />PerfectV<br />Clothio, NPD, She Top</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
