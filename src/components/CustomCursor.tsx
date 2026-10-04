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

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      const target = e.target as HTMLElement;
      // Check for closest data-cursor attribute
      const cursorTarget = target.closest('[data-cursor]');
      
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor');
        if (text) {
          textEl.innerText = text;
          cursor.classList.add(styles.active);
        } else {
          cursor.classList.add(styles.hover);
        }
      } else {
        cursor.classList.remove(styles.active);
        cursor.classList.remove(styles.hover);
        textEl.innerText = '';
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    gsap.ticker.add(() => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      gsap.set(cursor, { x: cursorX, y: cursorY });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
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
