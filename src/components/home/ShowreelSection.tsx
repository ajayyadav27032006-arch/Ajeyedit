"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ShowreelSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ShowreelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(videoWrapperRef.current, {
        scale: 1,
        borderRadius: "0px",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={`container ${styles.header}`}>
        <h2 className="text-h1">WATCH THE WORK.</h2>
      </div>
      
      <div className={styles.videoWrapper} ref={videoWrapperRef}>
        <div className={styles.placeholderBg}>
          <div className={styles.playBtn}>PLAY</div>
        </div>
        {/*
          <video src="/assets/showreel/main-reel.mp4" controls={false} className={styles.video} />
        */}
      </div>
    </section>
  );
}
