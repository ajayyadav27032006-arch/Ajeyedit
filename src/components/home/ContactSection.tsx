"use client";

import { useState } from "react";
import {
  ArrowRight,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import styles from "./ContactSection.module.css";

// Authentic WhatsApp Brand Logo SVG (for left social links & contact card)
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

const initialFormData = {
  name: "",
  email: "",
  phone: "",
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
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    phone: string;
    projectType: string;
    budget: string;
    timeline: string;
    description: string;
    reference: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mailtoHref = `mailto:ajeyedit91@gmail.com?subject=${encodeURIComponent(
    `New Project Inquiry: [${formData.projectType}] - ${formData.name || "Client"}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\nProject Type: ${formData.projectType}\nBudget: ${formData.budget || "N/A"}\nTimeline: ${formData.timeline || "N/A"}\nFootage/Drive Link: ${formData.reference || "N/A"}\n\nProject Details:\n${formData.description}`
  )}`;

  // Submit strictly via Email (FormSubmit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    // Save submitted data for confirmation screen
    setSubmittedData({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectType: formData.projectType,
      budget: formData.budget,
      timeline: formData.timeline,
      description: formData.description,
      reference: formData.reference,
    });

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
          phone: formData.phone || "Not provided",
          projectType: formData.projectType,
          budget: formData.budget || "Not specified",
          timeline: formData.timeline || "Not specified",
          description: formData.description,
          reference: formData.reference || "None provided",
          _subject: `New Project Inquiry: [${formData.projectType}] from ${formData.name || "Client"}`,
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
            <span>LET&apos;S WORK TOGETHER</span>
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

            <a
              href="https://wa.me/917766036398"
              target="_blank"
              rel="noreferrer"
              className={styles.contactCard}
            >
              <div className={styles.contactIconCircle} style={{ background: "#25D366" }}>
                <WhatsappIcon size={20} />
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
              style={{ color: "#4ade80" }}
            >
              <WhatsappIcon size={19} />
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

        {/* Right Form Column - Start a Project */}
        <div className={styles.formContent}>
          {status === "success" && submittedData ? (
            <div className={styles.successBox}>
              <div className={styles.successIconCircle}>
                <CheckCircle2 size={36} />
              </div>
              <h3 className={styles.successHeading}>Project Inquiry Sent!</h3>
              <p className={styles.successMessage}>
                Thank you, <strong>{submittedData.name}</strong>! Your project details have been sent directly to{" "}
                <strong>ajeyedit91@gmail.com</strong>. I&apos;ll review your footage &amp; vision and get back to you within 24 hours.
              </p>

              {/* Summary Details */}
              <div className={styles.successSummary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Client</span>
                  <span className={styles.summaryValue}>{submittedData.name}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Email</span>
                  <span className={styles.summaryValue}>{submittedData.email}</span>
                </div>
                {submittedData.phone && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Phone</span>
                    <span className={styles.summaryValue}>{submittedData.phone}</span>
                  </div>
                )}
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Project Type</span>
                  <span className={styles.summaryValue}>{submittedData.projectType}</span>
                </div>
                {submittedData.timeline && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Timeline</span>
                    <span className={styles.summaryValue}>{submittedData.timeline}</span>
                  </div>
                )}
                {submittedData.budget && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Budget</span>
                    <span className={styles.summaryValue}>{submittedData.budget}</span>
                  </div>
                )}
                {submittedData.reference && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Footage Link</span>
                    <span className={styles.summaryValue} style={{ wordBreak: "break-all" }}>
                      {submittedData.reference}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setFormData(initialFormData);
                  setStatus("idle");
                  setSubmittedData(null);
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
                        Please open your Gmail inbox and click <strong>&quot;Activate Form&quot;</strong>.
                        Once confirmed, every project inquiry will arrive instantly in your inbox!
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
                      <p style={{ margin: 0 }}>{statusMessage || "Delivery encountered a temporary issue."}</p>
                      <div style={{ marginTop: "0.6rem" }}>
                        <a href={mailtoHref} className={styles.fallbackMailBtn}>
                          <Mail size={13} />
                          <span>Send directly to ajeyedit91@gmail.com</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Name & Email Row */}
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="client-name">
                    Your Name <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul / Studio Lead"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="client-email">
                    Email Address <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. client@brand.com"
                    required
                  />
                </div>
              </div>

              {/* Phone & Project Type Row */}
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="client-phone">
                    Phone Number <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="client-project-type">Project Type</label>
                  <select
                    id="client-project-type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    <option>Documentary Editing</option>
                    <option>Long-form YouTube</option>
                    <option>Commercial / Ad Film</option>
                    <option>Social Media Reels</option>
                    <option>Motion Design &amp; Color</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Budget & Timeline Row */}
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="client-budget">Estimated Budget</label>
                  <input
                    id="client-budget"
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g. $1,000 / ₹50,000"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="client-timeline">Estimated Timeline</label>
                  <input
                    id="client-timeline"
                    type="text"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    placeholder="e.g. 1-2 weeks"
                  />
                </div>
              </div>

              {/* Footage / Drive Reference Link (Up) */}
              <div className={styles.inputGroup}>
                <label htmlFor="client-reference">Footage / Drive Reference Link</label>
                <input
                  id="client-reference"
                  type="url"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/... or wetransfer.com/..."
                />
              </div>

              {/* Project Details / Vision (Down - Optional) */}
              <div className={styles.inputGroup}>
                <label htmlFor="client-description">
                  Project Details / Creative Vision
                </label>
                <textarea
                  id="client-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell me about your project, storytelling style, pacing, references, and goals..."
                  rows={4}
                />
              </div>

              {/* Submit Button - Strictly "Start a Project" (Email Only) */}
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
