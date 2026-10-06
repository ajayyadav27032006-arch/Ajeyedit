"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WorkSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: "yt-long",
    title: "YT Long Videos",
    type: "horizontal",
    videos: [
      "https://drive.google.com/file/d/1uaUT_Qo4O3Ml7m8BnxayvHOQ6h0dIbj9/preview",
      "https://drive.google.com/file/d/1Xha_P5K8t14Jjh8Spcoy0tq0c1xVMq6D/preview",
      "https://drive.google.com/file/d/1L9XOI3exkFI_sWUScVOEdjGZIzQkWJtO/preview",
      "https://drive.google.com/file/d/19sbRO3M1uIF4a5e_8JB2Y9QgswzIxKLG/preview"
    ]
  },
  {
    id: "reels",
    title: "Reel Videos",
    type: "vertical",
    videos: [
      "https://drive.google.com/file/d/1AugRQ9fSoYDVhJmD87FLgH4OOrUImB9F/preview",
      "https://drive.google.com/file/d/13lYJq1yfOCSfJ1gFQ5mSkdRlM0Z3y47r/preview",
      "https://drive.google.com/file/d/1yHvY916SXqKe23D5kmHAb0avTUrkSHiH/preview",
      "https://drive.google.com/file/d/1z94riTAxQIHeFqzG3hPgZetY4Tk31pOQ/preview",
      "https://drive.google.com/file/d/1Omkc5o8QUxBHsGWVlC8SiIPtUV62X5zz/preview"
    ]
  },
  {
    id: "ai-videos",
    title: "AI Videos",
    type: "horizontal",
    videos: [
      "https://drive.google.com/file/d/19QTsV9hyM3WcrOpiHHyke-LOH5yY0GZ1/preview",
      "https://drive.google.com/file/d/1YtKfnsPaMF3jf_DSX9Yh5JUvuHVraq9U/preview",
      "https://drive.google.com/file/d/1Xtk8bFM0lwZgw5Lf40551rgc30dsU1Da/preview",
      "https://drive.google.com/file/d/1ysRcaahIYSFlSzC-5hNz8RMvUmcw8QWx/preview",
      "https://drive.google.com/file/d/1dcX4qJedZOzeoAgXScRYxRKh65w72YND/preview"
    ]
  }
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

      gsap.from(".category-block", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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
      </div>

      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <div key={category.id} className={`category-block ${styles.categoryBlock}`}>
            <div className="container">
              <h3 className={styles.categoryTitle}>{category.title}</h3>
            </div>
            
            <div className={styles.scrollContainer}>
              <div className={styles.scrollTrack}>
                {category.videos.map((url, idx) => (
                  <div 
                    key={idx} 
                    className={`${styles.videoWrapper} ${category.type === 'vertical' ? styles.verticalVideo : styles.horizontalVideo}`}
                  >
                    <iframe 
                      src={url} 
                      className={styles.iframe}
                      allow="autoplay"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
