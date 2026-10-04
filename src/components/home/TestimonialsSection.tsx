"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./TestimonialsSection.module.css";

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
      
      gsap.from(".testimonial-video", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" ref={containerRef}>
      <div className={`container ${styles.container}`}>
        <h2 className="text-h2 testimonial-header">TESTIMONIAL</h2>
        
        <div className={`testimonial-video ${styles.videoContainer}`}>
          {/* Placeholder for video */}
          <div className={styles.videoPlaceholder}>
            <div className={styles.playIndicator}>PLAY TESTIMONIAL</div>
          </div>
          {/* 
            To use a real video:
            <video src="/assets/testimonial.mp4" controls playsInline />
          */}
        </div>
      </div>
    </section>
  );
}
