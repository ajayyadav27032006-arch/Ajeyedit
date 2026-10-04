"use client";

import { ArrowRight } from "lucide-react";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        
        <div className={styles.textContent}>
          <h2 className="text-h1">HAVE A<br/>STORY TO<br/><span className={styles.accent}>TELL?</span></h2>
          <p className="text-body">Let's turn your footage into something people remember.</p>
          
          <div className={styles.info}>
            <p><strong>Email</strong><br/><a href="mailto:ajeyedit91@gmail.com">ajeyedit91@gmail.com</a></p>
            <p><strong>Phone</strong><br/><a href="https://wa.me/917766036398" target="_blank" rel="noreferrer">+91 7766036398</a></p>
            <p><strong>Social</strong><br/>
              <a href="[INSTAGRAM LINK]">Instagram</a> &mdash; <a href="https://wa.me/917766036398" target="_blank" rel="noreferrer">WhatsApp</a>
            </p>
          </div>
        </div>

        <div className={styles.formContent}>
          <form action="https://formsubmit.co/ajeyedit91@gmail.com" method="POST" className={styles.form}>
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="New Project Inquiry - Ajey Edit" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className={styles.inputGroup}>
              <label>Name</label>
              <input type="text" name="name" placeholder="John Doe" required />
            </div>
            
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="email" name="email" placeholder="john@example.com" required />
            </div>
            
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Project Type</label>
                <select name="projectType">
                  <option>Documentary</option>
                  <option>Long-form YouTube</option>
                  <option>Short-form / Reels</option>
                  <option>Motion Design</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Budget</label>
                <input type="text" name="budget" placeholder="e.g. $1,000 or ₹50,000" />
              </div>
            </div>
            
            <div className={styles.inputGroup}>
              <label>Timeline</label>
              <input type="text" name="timeline" placeholder="e.g. 2 weeks" />
            </div>
            
            <div className={styles.inputGroup}>
              <label>Project Description</label>
              <textarea name="description" placeholder="Tell me about your project..." rows={4} required></textarea>
            </div>
            
            <div className={styles.inputGroup}>
              <label>Reference / Drive Link</label>
              <input type="url" name="reference" placeholder="https://" />
            </div>
            
            <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
              SEND PROJECT <ArrowRight size={16} />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
