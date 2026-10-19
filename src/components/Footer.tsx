"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const lenis = (window as unknown as { lenis?: Lenis }).lenis;
      if (lenis) {
        lenis.scrollTo(targetId, { offset: -90 });
      } else {
        const target = document.querySelector(targetId);
        if (target) {
          const y = target.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }
  };

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
            <Link href="/#work" onClick={(e) => handleNavClick(e, "#work")}>Work</Link>
            <Link href="/#about" onClick={(e) => handleNavClick(e, "#about")}>About</Link>
            <Link href="/#services" onClick={(e) => handleNavClick(e, "#services")}>Services</Link>
            <Link href="/#process" onClick={(e) => handleNavClick(e, "#process")}>Process</Link>
            <Link href="/#contact" onClick={(e) => handleNavClick(e, "#contact")}>Contact</Link>
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
