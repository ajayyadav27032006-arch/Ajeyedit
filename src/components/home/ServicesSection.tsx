"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServicesSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    tag: "Narrative & Pacing",
    title: "Video Editing",
    desc: "Cinematic and engaging edits for brands, creators, and businesses with thoughtful pacing and narrative flow."
  },
  {
    num: "02",
    tag: "High Conversion",
    title: "Commercial & Ads",
    desc: "High-impact edits for product videos, brand films, and advertisements crafted for audience conversion."
  },
  {
    num: "03",
    tag: "Story & Depth",
    title: "Documentary Editing",
    desc: "Story-driven edits with emotional depth, multi-layered interviews, and clear narrative arcs."
  },
  {
    num: "04",
    tag: "Short Form & Hooks",
    title: "Social Media Reels",
    desc: "Short-form edits for Instagram, YouTube Shorts, and TikTok with high-retention hooks and dynamic rhythm."
  },
  {
    num: "05",
    tag: "Look & Atmosphere",
    title: "Color Grading",
    desc: "Professional color correction, look development, and cinematic grading that gives footage identity and tone."
  },
  {
    num: "06",
    tag: "Titles & Motion FX",
    title: "Motion Graphics",
    desc: "Clean typography, graphic transitions, visual effects, and animated assets designed to elevate storytelling."
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-header-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
        y: 25,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        clearProps: "all"
      });

      gsap.from(".services-grid-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className={styles.section} ref={containerRef}>
      <div className="container">

        <div className={`services-header-anim ${styles.header}`}>
          <div className={styles.eyebrow}>
            <span>CAPABILITIES & CRAFT</span>
          </div>
          <h2 className={styles.headline}>
            What I Bring to the <span className={styles.accent}>Timeline.</span>
          </h2>
        </div>
        
        <div className={`services-grid-anim ${styles.grid}`}>
          {services.map((service, idx) => (
            <div key={idx} className={styles.serviceCard}>
              <div className={styles.cardHeader}>
                <span className={styles.number}>{service.num}</span>
                <span className={styles.tag}>{service.tag}</span>
              </div>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.desc}>{service.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
