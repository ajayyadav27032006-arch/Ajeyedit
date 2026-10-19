"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, Volume2, VolumeX, Maximize, ExternalLink } from "lucide-react";
import styles from "./TestimonialsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && el && !el.paused) {
          el.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((err) => {
          console.error("Playback failed:", err);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(curr);
    if (dur > 0) {
      setProgress((curr / dur) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime =
      (parseFloat(e.target.value) / 100) * (videoRef.current.duration || 0);
    videoRef.current.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={`container ${styles.container}`}>
        <div className={`testimonial-anim ${styles.header}`}>
          <div className={styles.eyebrow}>
            <span>CREATOR TRUST</span>
          </div>
          <h2 className={styles.headline}>
            Client Words &amp; <span className={styles.impactBox}>Impact.</span>
          </h2>
          <p className={styles.subtext}>
            What creators and agency partners say about the speed, communication, and editing quality.
          </p>
        </div>

        <div className={`testimonial-anim ${styles.videoContainer}`}>
          <div className={styles.videoCard}>
            {/* Video Player Side */}
            <div className={styles.videoPlayerArea}>
              {/* Cinematic ambient backdrop */}
              <div
                className={styles.ambientBackdrop}
                style={{ backgroundImage: `url('/videos/creator-trust-poster.jpg')` }}
              />

              <video
                ref={videoRef}
                className={styles.videoElement}
                src="/videos/creator-trust.mp4"
                poster="/videos/creator-trust-poster.jpg"
                playsInline
                preload="none"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onClick={togglePlay}
              />

              {/* Initial / Paused Overlay */}
              {!isPlaying && (
                <div className={styles.playOverlay} onClick={togglePlay}>
                  <div className={styles.playCircle}>
                    <Play size={24} fill="#F7F3ED" />
                  </div>
                  <span className={styles.playText}>
                    {hasStarted ? "RESUME FEEDBACK" : "WATCH CLIENT FEEDBACK"}
                  </span>
                </div>
              )}

              {/* Sleek Floating Controls Bar */}
              <div
                className={`${styles.controlsBar} ${
                  isPlaying ? styles.controlsVisible : ""
                }`}
              >
                <button
                  type="button"
                  onClick={togglePlay}
                  className={styles.ctrlBtn}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} fill="#F7F3ED" />}
                </button>

                <div className={styles.progressContainer}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={progress}
                    onChange={handleSeek}
                    className={styles.progressBar}
                    aria-label="Seek video progress"
                  />
                </div>

                <span className={styles.timeDisplay}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <button
                  type="button"
                  onClick={toggleMute}
                  className={styles.ctrlBtn}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <button
                  type="button"
                  onClick={handleFullscreen}
                  className={styles.ctrlBtn}
                  aria-label="Fullscreen"
                >
                  <Maximize size={16} />
                </button>
              </div>
            </div>

            {/* Testimonial Quote & Info Side */}
            <div className={styles.quoteBox}>
              <div className={styles.trustBadge}>
                <span className={styles.pulseDot} />
                <span>VERIFIED CREATOR FEEDBACK</span>
              </div>

              <p className={styles.quote}>
                &ldquo;Ajey brings an incredible sense of pacing to every cut. He knows when to let a moment breathe and when to keep the audience hooked.&rdquo;
              </p>

              <div className={styles.author}>
                <strong>Content Director</strong>
                <span>The Real Knowledge</span>
              </div>

              <div className={styles.linksRow}>
                <a
                  href="https://drive.google.com/file/d/1a-D9v-zh5v9rTgwr0vPiELyTG9BxlLSH/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.driveLink}
                >
                  <ExternalLink size={14} />
                  <span>Open in Google Drive</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
