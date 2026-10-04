"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 2 } // wait for loader if initial
    );
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === "/") {
      e.preventDefault();
      setIsOpen(false);
      // @ts-ignore
      const lenis = window.lenis;
      
      if (targetId === "top") {
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (lenis) {
        lenis.scrollTo(targetId, { offset: -100 });
      } else {
        const target = document.querySelector(targetId);
        if (target) {
          const y = target.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      <nav className={`${styles.navbar} container`}>
        <div className={`nav-item ${styles.logo}`}>
          <Link href="/" onClick={(e) => handleNavClick(e, 'top')}>AJEY EDIT</Link>
        </div>

        <div className={styles.desktopLinks}>
          <Link className="nav-item" href="/#work" onClick={(e) => handleNavClick(e, '#work')}>Work</Link>
          <Link className="nav-item" href="/#about" onClick={(e) => handleNavClick(e, '#about')}>About</Link>
          <Link className="nav-item" href="/#process" onClick={(e) => handleNavClick(e, '#process')}>Process</Link>
          <Link className="nav-item" href="/#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</Link>
        </div>

        <div className={`nav-item ${styles.cta}`}>
          <Link href="/#contact" onClick={(e) => handleNavClick(e, '#contact')} className="btn-primary">
            Let's Talk <ArrowRight size={16} />
          </Link>
        </div>

        <button className={styles.mobileToggle} onClick={toggleMenu}>
          {isOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
        <div className={styles.mobileLinks}>
          <Link href="/#work" onClick={(e) => handleNavClick(e, '#work')}>Work</Link>
          <Link href="/#about" onClick={(e) => handleNavClick(e, '#about')}>About</Link>
          <Link href="/#process" onClick={(e) => handleNavClick(e, '#process')}>Process</Link>
          <Link href="/#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</Link>
          <Link href="/#contact" onClick={(e) => handleNavClick(e, '#contact')} className={styles.mobileCta}>Let's Talk <ArrowRight size={16} /></Link>
        </div>
      </div>
    </>
  );
}
