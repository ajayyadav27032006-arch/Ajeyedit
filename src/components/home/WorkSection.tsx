"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import styles from "./WorkSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: "01", title: "The Art of Pacing", category: "DOCUMENTARY", year: "2025", slug: "project-01" },
  { id: "02", title: "Creator Life", category: "LONG-FORM", year: "2025", slug: "project-02" },
  { id: "03", title: "Visual Hooks", category: "SHORT-FORM", year: "2024", slug: "project-03" },
  { id: "04", title: "Brand Story", category: "PERSONAL BRAND", year: "2024", slug: "project-04" },
  { id: "05", title: "Commercial Impact", category: "BRAND / COMMERCIAL", year: "2024", slug: "project-05" },
  { id: "06", title: "Cinematic Reel", category: "MONTAGE", year: "2023", slug: "project-06" },
];

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(".work-card", {
        scrollTrigger: {
          trigger: ".work-list",
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="section" ref={containerRef}>
      <div className="container">
        <div className={`work-header ${styles.header}`}>
          <h2 className="text-h2">SELECTED WORK</h2>
          <p className="text-body">Stories, ideas and brands &mdash; shaped frame by frame.</p>
        </div>

        <div className={`work-list ${styles.grid}`}>
          {projects.map((project) => (
            <Link 
              href={`/work/${project.slug}`} 
              key={project.id} 
              className={`work-card ${styles.card}`}

            >
              <div className={styles.thumbnailContainer}>
                {/* 
                  Real Video implementation:
                  <video src={`/assets/projects/${project.slug}/preview.mp4`} muted loop playsInline className={styles.video} />
                */}
                <div className={styles.placeholderBg}></div>
                <div className={styles.hoverOverlay}></div>
              </div>
              <div className={styles.meta}>
                <div className={styles.metaTop}>
                  <span className={styles.projectId}>PROJECT {project.id}</span>
                  <span className={styles.category}>{project.category}</span>
                </div>
                <h3 className={styles.title}>{project.title}</h3>
                <div className={styles.metaBottom}>
                  <span className={styles.year}>{project.year}</span>
                  <span className={styles.viewLink}>VIEW PROJECT &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
