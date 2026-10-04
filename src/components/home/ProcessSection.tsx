"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProcessSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const processes = [
  { step: "01", title: "DISCOVER", desc: "Understand the story, audience, objective and raw footage." },
  { step: "02", title: "BUILD", desc: "Structure the narrative, pacing and visual flow." },
  { step: "03", title: "REFINE", desc: "Motion design, sound, color, transitions and detail." },
  { step: "04", title: "DELIVER", desc: "Final polish, export and delivery." }
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line drawing animation
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1
          }
        }
      );

      // Timeline items reveal
      gsap.utils.toArray(".process-item").forEach((item: any, i) => {
        gsap.from(item, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className={`section ${styles.processSection}`} ref={containerRef}>
      <div className="container">
        <h2 className={`text-h2 ${styles.header}`}>FROM RAW TO REFINED.</h2>
        
        <div className={styles.timeline}>
          <div className={styles.lineBg}></div>
          <div className={styles.lineFill} ref={lineRef}></div>
          
          <div className={styles.steps}>
            {processes.map((p, idx) => (
              <div key={idx} className={`process-item ${styles.item}`}>
                <div className={styles.dot}></div>
                <div className={styles.content}>
                  <span className={styles.stepNum}>{p.step} &mdash; {p.title}</span>
                  <p className={styles.desc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
