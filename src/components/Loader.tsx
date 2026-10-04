"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import styles from "./Loader.module.css";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if already loaded in this session
    if (sessionStorage.getItem("hasLoaded")) {
      setLoading(false);
      return;
    }

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Outro animation
        const tl = gsap.timeline({
          onComplete: () => {
            setLoading(false);
            sessionStorage.setItem("hasLoaded", "true");
          }
        });

        tl.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.inOut"
        })
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut"
        });
      }
      setProgress(currentProgress);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div ref={loaderRef} className={styles.loader}>
      <div ref={textRef} className={styles.content}>
        <h1 className={styles.title}>AJEY EDIT</h1>
        <p className={styles.subtitle}>CREATIVE EDITOR / MOTION DESIGNER</p>
        <div className={styles.progress}>
          {progress.toString().padStart(2, "0")} &mdash; 100
        </div>
      </div>
    </div>
  );
}
