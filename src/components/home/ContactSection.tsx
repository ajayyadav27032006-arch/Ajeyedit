"use client";

import { useState } from "react";
import { ArrowRight, Mail, CheckCircle2, AlertCircle, Loader2, RotateCcw, ExternalLink } from "lucide-react";
import styles from "./ContactSection.module.css";
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

const initialFormData = {
  name: "",
  email: "",
  projectType: "Documentary Editing",
  budget: "",
  timeline: "",
  description: "",
  reference: "",
};

export default function ContactSection() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<"idle" | "submitting" | "activation_needed" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mailtoHref = `mailto:ajeyedit91@gmail.com?subject=${encodeURIComponent(
    `New Project Inquiry: [${formData.projectType}] - ${formData.name || "Client"}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nBudget: ${formData.budget || "N/A"}\nTimeline: ${formData.timeline || "N/A"}\nReference/Footage Link: ${formData.reference || "N/A"}\n\nProject Details:\n${formData.description}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/ajeyedit91@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          budget: formData.budget || "Not specified",
          timeline: formData.timeline || "Not specified",
          description: formData.description,
          reference: formData.reference || "None provided",
          _subject: `New Project Inquiry: [${formData.projectType}] from ${formData.name || "Portfolio Visitor"}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json();

      if (data.success === "true" || data.success === true) {
        setStatus("success");
      } else if (
        data.message &&
        (data.message.toLowerCase().includes("activation") ||
          data.message.toLowerCase().includes("activate"))
      ) {
        setStatus("activation_needed");
        setStatusMessage(
          data.message ||
            "FormSubmit requires one-time activation. Please check your Gmail (ajeyedit91@gmail.com) and click 'Activate Form'."
        );
      } else {
        setStatus("error");
        setStatusMessage(data.message || "Failed to deliver inquiry. Please email directly or try again.");
      }
    } catch (err: unknown) {
      console.error("Project submission error:", err);
      setStatus("error");
      setStatusMessage("Could not connect to submission service. Please use the direct mail button below.");
    }
  };

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
            Let&apos;s turn your footage into something worth watching. Whether you have raw interviews, high-energy reels &mdash; I&apos;m ready to collaborate.
          </p>

          <div className={styles.contactCards}>
            <a href="mailto:ajeyedit91@gmail.com" className={styles.contactCard}>
              <div className={styles.contactIconCircle}>
                <Mail size={18} />
              </div>
              <div className={styles.contactDetails}>
                <span className={styles.contactLabel}>Direct Gmail</span>
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
          {status === "success" ? (
            <div className={styles.successBox}>
              <div className={styles.successIconCircle}>
                <CheckCircle2 size={36} />
              </div>
              <h3 className={styles.successHeading}>Project Inquiry Sent!</h3>
              <p className={styles.successMessage}>
                Thank you, <strong>{formData.name}</strong>! Your project details have been sent directly to{" "}
                <strong>ajeyedit91@gmail.com</strong>. I&apos;ll review your footage &amp; vision and get back to you within 24 hours.
              </p>

              <div className={styles.successSummary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Project Type</span>
                  <span className={styles.summaryValue}>{formData.projectType}</span>
                </div>
                {formData.timeline && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Timeline</span>
                    <span className={styles.summaryValue}>{formData.timeline}</span>
                  </div>
                )}
                {formData.budget && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Budget</span>
                    <span className={styles.summaryValue}>{formData.budget}</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setFormData(initialFormData);
                  setStatus("idle");
                }}
                className={styles.resetBtn}
              >
                <RotateCcw size={15} />
                <span>Submit Another Project</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              {status === "activation_needed" && (
                <div className={`${styles.alertBox} ${styles.alertWarning}`}>
                  <div className={styles.alertContent}>
                    <AlertCircle size={20} />
                    <div style={{ flex: 1 }}>
                      <strong>Action Required for ajeyedit91@gmail.com</strong>
                      <p style={{ margin: "0.35rem 0 0.6rem 0" }}>
                        FormSubmit has sent a one-time activation email to <strong>ajeyedit91@gmail.com</strong>.
                        Please open your Gmail inbox (or spam folder) and click <strong>&quot;Activate Form&quot;</strong>.
                        Once clicked, every project inquiry will immediately land in your inbox!
                      </p>
                      <div className={styles.alertActions} style={{ marginLeft: 0 }}>
                        <a
                          href="https://mail.google.com"
                          target="_blank"
                          rel="noreferrer"
                          className={styles.fallbackMailBtn}
                        >
                          <ExternalLink size={13} />
                          <span>Open Gmail</span>
                        </a>
                        <a href={mailtoHref} className={styles.fallbackMailBtn}>
                          <Mail size={13} />
                          <span>Send via Direct Email</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className={`${styles.alertBox} ${styles.alertError}`}>
                  <div className={styles.alertContent}>
                    <AlertCircle size={20} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0 }}>{statusMessage}</p>
                      <div style={{ marginTop: "0.6rem" }}>
                        <a href={mailtoHref} className={styles.fallbackMailBtn}>
                          <Mail size={13} />
                          <span>Click here to send directly to ajeyedit91@gmail.com</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.inputGroup}>
                <label>
                  Your Name <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul / Brand Creator"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>
                  Email Address <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. client@brand.com"
                  required
                />
              </div>

              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label>Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                  >
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
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g. $1,000 / ₹50,000"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Estimated Timeline</label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="e.g. 1-2 weeks"
                />
              </div>

              <div className={styles.inputGroup}>
                <label>
                  Project Details / Creative Vision <span className={styles.requiredStar}>*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell me about your footage, vision, references, and goals..."
                  rows={4}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Footage / Drive Reference Link</label>
                <input
                  type="url"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className={styles.submitBtn}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={17} className={styles.spinner} />
                    <span>Sending Project Details...</span>
                  </>
                ) : (
                  <>
                    <span>Start a Project</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
