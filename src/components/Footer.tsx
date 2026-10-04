import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>AJEY EDIT</h2>
          <p className={styles.tagline}>CUT. CREATE. CAPTIVATE.</p>
        </div>
        
        <div className={styles.links}>
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#process">Process</Link>
          <Link href="/#contact">Contact</Link>
        </div>

        <div className={styles.socials}>
          <a href="#" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://wa.me/917766036398" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="mailto:ajeyedit91@gmail.com">Email</a>
        </div>
      </div>
      
      <div className={`container ${styles.bottom}`}>
        <p>&copy; {new Date().getFullYear()} Ajey Edit. All rights reserved.</p>
      </div>
    </footer>
  );
}
