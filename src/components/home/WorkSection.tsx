"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, ArrowRight } from "lucide-react";
import styles from "./WorkSection.module.css";

gsap.registerPlugin(ScrollTrigger);

interface VideoItem {
  id: string;
  url: string;
  title: string;
  category: string;
  categoryTag: string;
  year: string;
  type: "horizontal" | "vertical";
}

const allProjects: VideoItem[] = [
  // YT Long Videos
  {
    id: "yt-1",
    url: "https://drive.google.com/file/d/1uaUT_Qo4O3Ml7m8BnxayvHOQ6h0dIbj9/preview",
    title: "Brand Commercial & Story",
    category: "yt-long",
    categoryTag: "Commercial / Documentary",
    year: "2025",
    type: "horizontal"
  },
  {
    id: "yt-2",
    url: "https://drive.google.com/file/d/1Xha_P5K8t14Jjh8Spcoy0tq0c1xVMq6D/preview",
    title: "YouTube Documentary",
    category: "yt-long",
    categoryTag: "Documentary Edit",
    year: "2025",
    type: "horizontal"
  },
  {
    id: "yt-3",
    url: "https://drive.google.com/file/d/1L9XOI3exkFI_sWUScVOEdjGZIzQkWJtO/preview",
    title: "Product Video Showcase",
    category: "yt-long",
    categoryTag: "Documentary Film",
    year: "2026",
    type: "horizontal"
  },
  {
    id: "yt-4",
    url: "https://drive.google.com/file/d/19sbRO3M1uIF4a5e_8JB2Y9QgswzIxKLG/preview",
    title: "Long-Form Narrative",
    category: "yt-long",
    categoryTag: "Creator Showcase",
    year: "2026",
    type: "horizontal"
  },

  // Reel Videos
  {
    id: "reel-1",
    url: "https://drive.google.com/file/d/1AugRQ9fSoYDVhJmD87FLgH4OOrUImB9F/preview",
    title: "Social Media Reels #1",
    category: "reels",
    categoryTag: "Short-Form / Hook",
    year: "2026",
    type: "vertical"
  },
  {
    id: "reel-2",
    url: "https://drive.google.com/file/d/13lYJq1yfOCSfJ1gFQ5mSkdRlM0Z3y47r/preview",
    title: "Cinematic Reel Edit #2",
    category: "reels",
    categoryTag: "Pacing & Motion",
    year: "2026",
    type: "vertical"
  },
  {
    id: "reel-3",
    url: "https://drive.google.com/file/d/1yHvY916SXqKe23D5kmHAb0avTUrkSHiH/preview",
    title: "Travel & Lifestyle Reel",
    category: "reels",
    categoryTag: "Sound Design",
    year: "2026",
    type: "vertical"
  },
  {
    id: "reel-4",
    url: "https://drive.google.com/file/d/1z94riTAxQIHeFqzG3hPgZetY4Tk31pOQ/preview",
    title: "Viral Creator Reel",
    category: "reels",
    categoryTag: "Dynamic Cuts",
    year: "2026",
    type: "vertical"
  },
  {
    id: "reel-5",
    url: "https://drive.google.com/file/d/1Omkc5o8QUxBHsGWVlC8SiIPtUV62X5zz/preview",
    title: "High-Energy Reel",
    category: "reels",
    categoryTag: "AI with Story",
    year: "2026",
    type: "vertical"
  },

  // AI Videos
  {
    id: "ai-1",
    url: "https://drive.google.com/file/d/19QTsV9hyM3WcrOpiHHyke-LOH5yY0GZ1/preview",
    title: "AI Cinematic Journey",
    category: "ai-videos",
    categoryTag: "AI & VFX",
    year: "2026",
    type: "horizontal"
  },
  {
    id: "ai-2",
    url: "https://drive.google.com/file/d/1YtKfnsPaMF3jf_DSX9Yh5JUvuHVraq9U/preview",
    title: "Futuristic Motion Story",
    category: "ai-videos",
    categoryTag: "Creative Concept",
    year: "2026",
    type: "horizontal"
  },
  {
    id: "ai-3",
    url: "https://drive.google.com/file/d/1Xtk8bFM0lwZgw5Lf40551rgc30dsU1Da/preview",
    title: "AI Visual Worldbuilding",
    category: "ai-videos",
    categoryTag: "AI Storytelling",
    year: "2026",
    type: "horizontal"
  },
  {
    id: "ai-4",
    url: "https://drive.google.com/file/d/1ysRcaahIYSFlSzC-5hNz8RMvUmcw8QWx/preview",
    title: "AI Video Transformation",
    category: "ai-videos",
    categoryTag: "AI Art",
    year: "2026",
    type: "horizontal"
  },
  {
    id: "ai-5",
    url: "https://drive.google.com/file/d/1dcX4qJedZOzeoAgXScRYxRKh65w72YND/preview",
    title: "Experimental AI Narrative",
    category: "ai-videos",
    categoryTag: "AI creative",
    year: "2026",
    type: "horizontal"
  }
];

const filterTabs = [
  { id: "all", label: "All" },
  { id: "yt-long", label: "Commercial / YouTube" },
  { id: "reels", label: "Social Media Reels" },
  { id: "ai-videos", label: "AI Videos" }
];

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = activeFilter === "all"
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-header-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className={styles.section} ref={containerRef}>
      <div className="container">

        {/* Section Header */}
        <div className={`work-header-anim ${styles.topRow}`}>
          <div>
            <div className={styles.eyebrow}>
              <span>PORTFOLIO SELECTION</span>
            </div>
            <h2 className={styles.headline}>
              Selected <span className={styles.projectBox}>Projects.</span>
            </h2>
          </div>

          <a href="#contact" className={styles.viewAllBtn}>
            <span>Start a Project</span>
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Category Filter Tabs */}
        <div className={styles.filterBar}>
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`${styles.filterBtn} ${activeFilter === tab.id ? styles.filterBtnActive : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className={styles.projectGrid}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`${styles.projectCard} ${project.type === 'vertical' ? styles.verticalCard : styles.horizontalCard}`}
            >
              <div className={styles.videoWrapper}>
                {/* Original Google Drive video iframe - URL preserved exactly */}
                <iframe
                  src={project.url}
                  className={styles.iframe}
                  allow="autoplay"
                  allowFullScreen
                  title={project.title}
                ></iframe>
              </div>

              <div className={styles.cardInfo}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <span className={styles.yearBadge}>{project.year}</span>
                </div>
                <div className={styles.cardSub}>
                  <span className={styles.categoryBadge}>{project.categoryTag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
