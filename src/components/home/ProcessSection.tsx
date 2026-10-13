"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Search, Layers, Sliders, Send } from "lucide-react";
import styles from "./ProcessSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const processes = [
  { 
    step: "01", 
    title: "Discover", 
    desc: "Understand the brief, audience, creative vision, and unpack the raw footage.",
    Icon: Search
  },
  { 
    step: "02", 
    title: "Structure", 
    desc: "Organize the takes, build narrative pacing, and establish the visual rhythm.",
    Icon: Layers
  },
  { 
    step: "03", 
    title: "Refine", 
    desc: "Craft dynamic cuts, motion graphics, audio design, and cinematic color grade.",
    Icon: Sliders
  },
  { 
    step: "04", 
    title: "Deliver", 
    desc: "Collaborative review, iteration feedback, and final master exports in all formats.",
    Icon: Send
  }
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-step-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all"
      });

      gsap.from(".process-flower-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
        x: 40,
        y: -15,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className={styles.section} ref={containerRef}>
      {/* Decorative Botanical Blossom on the right side */}
      <div className={`process-flower-anim ${styles.flowerWrapper}`} aria-hidden="true">
        <Image
          src="/images/cherry-blossom.png"
          alt="Cherry Blossom Branch"
          width={480}
          height={384}
          className={styles.flowerImage}
        />
      </div>

      <div className={`container ${styles.container}`}>

        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span>WORKFLOW & METHOD</span>
          </div>
          <h2 className={styles.headline}>
            From Footage to <span className={styles.accent}>Final Story.</span>
          </h2>
        </div>
        
        <div className={styles.processGrid}>
          {processes.map((p, idx) => {
            const IconComponent = p.Icon;
            return (
              <div key={idx} className={`process-step-anim ${styles.stepCard}`}>
                <div className={styles.topMeta}>
                  <span className={styles.stepNum}>{p.step}</span>
                  <div className={styles.iconCircle}>
                    <IconComponent size={20} />
                  </div>
                </div>

                <h3 className={styles.stepTitle}>{p.title}</h3>
                <p className={styles.stepDesc}>{p.desc}</p>
                
                {idx < processes.length - 1 && (
                  <div className={styles.connectorLine} aria-hidden="true"></div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
