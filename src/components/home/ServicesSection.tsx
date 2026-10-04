"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServicesSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "DOCUMENTARY EDITING",
    desc: "Story-driven editing focused on narrative structure, pacing, B-roll, sound design and visual progression."
  },
  {
    title: "TALKING-HEAD EDITING",
    desc: "Dynamic editing using pacing, jump cuts, B-roll, captions, motion graphics and sound design to maintain viewer attention."
  },
  {
    title: "YOUTUBE EDITING",
    desc: "Long-form content structured around storytelling, retention, pacing and visual engagement."
  },
  {
    title: "SHORT-FORM EDITING",
    desc: "Reels and short-form content optimized for fast pacing, strong hooks, visual transitions and social-media viewing."
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" ref={containerRef}>
      <div className={`container ${styles.container}`}>
        <h2 className={`text-h2 ${styles.header}`}>WHAT I DO</h2>
        
        <div className={styles.grid}>
          {services.map((service, idx) => (
            <div key={idx} className={`service-item ${styles.serviceCard}`}>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.desc}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
