"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import Lenis from "lenis";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 1.6 }
    );
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === "/") {
      e.preventDefault();
      setIsOpen(false);
      
      const lenis = (window as unknown as { lenis?: Lenis }).lenis;
      
      if (targetId === "top") {
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

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

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <nav className={`${styles.navbar} container`}>
        <div className={`nav-item ${styles.logo}`}>
          <Link href="/" onClick={(e) => handleNavClick(e, "top")}>
            ajey.edit
          </Link>
        </div>

        <div className={styles.desktopLinks}>
          <Link className="nav-item" href="/#work" onClick={(e) => handleNavClick(e, "#work")}>Work</Link>
          <Link className="nav-item" href="/#about" onClick={(e) => handleNavClick(e, "#about")}>About</Link>
          <Link className="nav-item" href="/#services" onClick={(e) => handleNavClick(e, "#services")}>Services</Link>
          <Link className="nav-item" href="/#process" onClick={(e) => handleNavClick(e, "#process")}>Process</Link>
          <Link className="nav-item" href="/#contact" onClick={(e) => handleNavClick(e, "#contact")}>Contact</Link>
        </div>

        <div className={`nav-item ${styles.cta}`}>
          <Link href="/#contact" onClick={(e) => handleNavClick(e, "#contact")} className={styles.ctaButton}>
            <span>Let's Work</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <button 
          className={styles.mobileToggle} 
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <span>{isOpen ? "CLOSE" : "MENU"}</span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.mobileLinks}>
          <Link href="/#work" onClick={(e) => handleNavClick(e, "#work")}>Work</Link>
          <Link href="/#about" onClick={(e) => handleNavClick(e, "#about")}>About</Link>
          <Link href="/#services" onClick={(e) => handleNavClick(e, "#services")}>Services</Link>
          <Link href="/#process" onClick={(e) => handleNavClick(e, "#process")}>Process</Link>
          <Link href="/#contact" onClick={(e) => handleNavClick(e, "#contact")}>Contact</Link>
          <Link href="/#contact" onClick={(e) => handleNavClick(e, "#contact")} className={styles.mobileCta}>
            <span>Let's Work</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}
