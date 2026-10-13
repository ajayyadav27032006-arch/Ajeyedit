"use client";

import { ArrowRight, Mail, Phone } from "lucide-react";
import styles from "./ContactSection.module.css";

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

export default function ContactSection() {
  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className={`container ${styles.container}`}>

        {/* Left Editorial Info Column */}
        <div className={styles.textContent}>
          <div className={styles.eyebrow}>
            <span>LET'S WORK TOGETHER</span>
          </div>

          <h2 className={styles.headline}>
            Have a Story<br />
            <span className={styles.highlightBox}>in Mind?</span>
          </h2>

          <p className={styles.subtitle}>
            Let's turn your footage into something worth watching. Whether you have raw interviews, high-energy reels &mdash; I'm ready to collaborate.
          </p>

          <div className={styles.contactCards}>
            <a href="mailto:ajeyedit91@gmail.com" className={styles.contactCard}>
              <div className={styles.contactIconCircle}>
                <Mail size={18} />
              </div>
              <div className={styles.contactDetails}>
                <span className={styles.contactLabel}>Your Email</span>
                <span className={styles.contactValue}>ajeyedit91@gmail.com</span>
              </div>
            </a>

            <a href="https://wa.me/917766036398" target="_blank" rel="noreferrer" className={styles.contactCard}>
              <div className={styles.contactIconCircle}>
                <WhatsappIcon size={18} />
              </div>
              <div className={styles.contactDetails}>
                <span className={styles.contactLabel}>WhatsApp Direct</span>
                <span className={styles.contactValue}>+91 7766036398</span>
              </div>
            </a>
          </div>

          <div className={styles.socialRow}>
            <a
              href="https://wa.me/917766036398"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="WhatsApp"
            >
              <WhatsappIcon size={18} />
            </a>
            <a
              href="mailto:ajeyedit91@gmail.com"
              className={styles.socialLink}
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="YouTube"
            >
              <YoutubeIcon size={18} />
            </a>
          </div>
        </div>

        {/* Right Form Column */}
        <div className={styles.formContent}>
          <form action="https://formsubmit.co/ajeyedit91@gmail.com" method="POST" className={styles.form}>
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="New Project Inquiry - Ajey Edit Portfolio" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className={styles.inputGroup}>
              <label>Your Name</label>
              <input type="text" name="name" placeholder="Ajey / Creator" required />
            </div>

            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input type="email" name="email" placeholder="hello@brand.com" required />
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Project Type</label>
                <select name="projectType">
                  <option>Documentary Editing</option>
                  <option>Long-form YouTube</option>
                  <option>Commercial / Ad Film</option>
                  <option>Social Media Reels</option>
                  <option>Motion Design & Color</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Estimated Budget</label>
                <input type="text" name="budget" placeholder="e.g. $1,000 / ₹50,000" />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Estimated Timeline</label>
              <input type="text" name="timeline" placeholder="e.g. 1-2 weeks" />
            </div>

            <div className={styles.inputGroup}>
              <label>Project Details / Creative Vision</label>
              <textarea name="description" placeholder="Tell me about your footage, vision, and timeline goals..." rows={4} required></textarea>
            </div>

            <div className={styles.inputGroup}>
              <label>Footage / Drive Reference Link</label>
              <input type="url" name="reference" placeholder="https://drive.google.com/..." />
            </div>

            <button type="submit" className={styles.submitBtn}>
              <span>Start a Project</span>
              <ArrowRight size={17} />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
