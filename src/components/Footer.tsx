"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import styles from "./Footer.module.css";
import Lenis from "lenis";

// Clean inline social icons
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"></polygon>
    </svg>
  );
}

function WhatsappIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        
        {/* Main Footer Row */}
        <div className={styles.topRow}>
          <div className={styles.brandCol}>
            <h2 className={styles.logo}>ajey.edit</h2>
            <p className={styles.roleText}>Independent Video Editor &amp; Motion Designer</p>
          </div>
          
          <div className={styles.navCol}>
            <Link href="/#work">Work</Link>
            <Link href="/#about">About</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#process">Process</Link>
            <Link href="/#contact">Contact</Link>
          </div>

          <div className={styles.actionCol}>
            <div className={styles.socialIcons}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <YoutubeIcon size={18} />
              </a>
              <a href="https://wa.me/917766036398" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <WhatsappIcon size={18} />
              </a>
            </div>

            <button onClick={scrollToTop} className={styles.scrollTopBtn} aria-label="Scroll to top">
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.taglineBlock}>
            <p className={styles.slogan}>
              CUT. CREATE. <span className={styles.captivateBlueMotion}>CAPTIVATE.</span>
            </p>
            <span className={styles.taglineDivider}>&bull;</span>
            <p className={styles.tagline}>
              Making every frame matter &mdash; Stories, Told Through <span className={styles.captivateBlueMotion}>Motion.</span>
            </p>
          </div>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} ajey.edit. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
