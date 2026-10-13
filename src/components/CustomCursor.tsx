"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    const textEl = cursorTextRef.current;
    if (!cursor || !textEl) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]');
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"]');
      
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor');
        if (text) {
          textEl.innerText = text;
          cursor.classList.add(styles.active);
          cursor.classList.remove(styles.hover);
        } else {
          cursor.classList.add(styles.hover);
          cursor.classList.remove(styles.active);
          textEl.innerText = '';
        }
      } else if (isInteractive) {
        cursor.classList.add(styles.hover);
        cursor.classList.remove(styles.active);
        textEl.innerText = '';
      } else {
        cursor.classList.remove(styles.active);
        cursor.classList.remove(styles.hover);
        textEl.innerText = '';
      }
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    const tickerCallback = () => {
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;
      gsap.set(cursor, { x: cursorX, y: cursorY });
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div ref={cursorRef} className={styles.cursor}>
      <div className={styles.dot}></div>
      <div ref={cursorTextRef} className={styles.text}></div>
    </div>
  );
}
