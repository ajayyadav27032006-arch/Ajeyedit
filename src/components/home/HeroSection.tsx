"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./HeroSection.module.css";
import Lenis from "lenis";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Frame scrubbing logic
  // Neutral forward-facing position is the middle frame (60)
  const currentFrameRef = useRef(60);
  const targetFrameRef = useRef(60);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // We have 120 frames
    const TOTAL_FRAMES = 120;
    const CENTER_FRAME = 60;

    // Cache to prevent recreating image objects
    const imgCache = new Map<number, HTMLImageElement>();

    const getFramePath = (frameNum: number) => {
      const padded = frameNum.toString().padStart(6, '0');
      return `/frames/frame_${padded}.png`;
    };

    // Preload center frames for responsiveness
    for (let i = CENTER_FRAME - 5; i <= CENTER_FRAME + 5; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      imgCache.set(i, img);
    }

    const drawFrame = (frameNum: number) => {
      let img = imgCache.get(frameNum);
      
      if (!img) {
        img = new Image();
        img.src = getFramePath(frameNum);
        imgCache.set(frameNum, img);
      }

      const render = () => {
        // "object-fit: cover" logic for canvas
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      };

      if (img.complete) {
        render();
      } else {
        img.onload = render;
      }
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        drawFrame(Math.round(currentFrameRef.current));
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const fraction = currentX / window.innerWidth;
      
      let nextFrame = Math.round(fraction * TOTAL_FRAMES);
      nextFrame = Math.max(1, Math.min(TOTAL_FRAMES, nextFrame));
      
      targetFrameRef.current = nextFrame;
    };

    const handleMouseLeave = () => {
      // Return to neutral forward-facing position
      targetFrameRef.current = CENTER_FRAME;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;
    let lastRenderedFrame = -1;

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      // smooth interpolation / lerp for organic movement
      currentFrameRef.current += diff * 0.08; 
      
      const roundedFrame = Math.round(currentFrameRef.current);
      if (roundedFrame !== lastRenderedFrame) {
        drawFrame(roundedFrame);
        lastRenderedFrame = roundedFrame;
      }
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    
    renderLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 }); // Wait for loader

      tl.from(".hero-line", {
        yPercent: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out"
      })
      .from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .from(".hero-desc", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.6");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={containerRef}>
      <canvas ref={canvasRef} className={styles.canvasBackground}></canvas>
      <div className={`container ${styles.container}`}>
        <div className={styles.textContent}>
          <h1 className={styles.headline}>
            <div className={styles.lineOverflow}><span className="hero-line">CUT.</span></div>
            <div className={styles.lineOverflow}><span className="hero-line">CREATE.</span></div>
            <div className={styles.lineOverflow}><span className="hero-line">CAPTIVATE.</span></div>
          </h1>
          
          <h2 className={`hero-sub ${styles.subheadline}`}>Making every frame matter.</h2>
          
          <p className={`hero-desc text-body ${styles.description}`}>
            I'm Ajey Edit &mdash; a video editor and motion designer creating documentary, long-form and short-form content built around storytelling, pacing and visual impact.
          </p>
          
          <div className={styles.ctas}>
            <a href="#work" onClick={(e) => {
              e.preventDefault();
              const lenis = (window as unknown as { lenis?: Lenis }).lenis;
              lenis?.scrollTo('#work', { offset: -100 });
            }} className={`hero-cta btn-primary`}>
              VIEW MY WORK <ArrowRight size={16} />
            </a>
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              const lenis = (window as unknown as { lenis?: Lenis }).lenis;
              lenis?.scrollTo('#contact', { offset: -100 });
            }} className={`hero-cta btn-primary ${styles.secondaryCta}`}>
              LET'S WORK TOGETHER <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
