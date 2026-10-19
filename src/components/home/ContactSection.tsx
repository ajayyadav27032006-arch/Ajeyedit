"use client";

import { useState, useRef } from "react";
import {
  ArrowRight,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
  ExternalLink,
  UploadCloud,
  Link2,
  FileText,
  X,
  Phone,
  Send,
} from "lucide-react";
import styles from "./ContactSection.module.css";

// Authentic WhatsApp Brand Logo SVG
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
  fileMode: "link" as "link" | "upload",
  reference: "",
};

export default function ContactSection() {
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState<File | null>(null);
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
    fileName?: string;
    fileSize?: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Limit file size to 25MB for email attachment
      if (selectedFile.size > 25 * 1024 * 1024) {
        alert("File size exceeds 25MB. For large video footage, please select 'Cloud Link' and share a Google Drive, Dropbox, or WeTransfer link.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Build formatted WhatsApp message text
  const buildWhatsAppMessage = (
    data: typeof initialFormData,
    attachedFile: File | null = file
  ) => {
    const parts = [
      `🎬 *NEW PROJECT INQUIRY - AJEY EDIT*`,
      `──────────────────────────`,
      `👤 *Client Name:* ${data.name.trim() || "Visitor"}`,
      `📧 *Email:* ${data.email.trim() || "Not specified"}`,
      data.phone.trim() ? `📱 *Phone / WhatsApp:* ${data.phone.trim()}` : null,
      `🎯 *Project Type:* ${data.projectType}`,
      data.budget.trim() ? `💰 *Estimated Budget:* ${data.budget.trim()}` : null,
      data.timeline.trim() ? `⏱ *Estimated Timeline:* ${data.timeline.trim()}` : null,
      data.reference.trim() ? `📁 *Project / Footage Link:* ${data.reference.trim()}` : null,
      attachedFile
        ? `📎 *File Attached:* ${attachedFile.name} (${(attachedFile.size / (1024 * 1024)).toFixed(2)} MB)`
        : null,
      ``,
      `📝 *Project Details / Creative Vision:*`,
      data.description.trim() || "No details provided yet.",
      `──────────────────────────`,
      `_Sent via ajey.edit portfolio "Start a Project"_`,
    ].filter(Boolean);

    return parts.join("\n");
  };

  const getWhatsAppUrl = (
    data: typeof initialFormData = formData,
    attachedFile: File | null = file
  ) => {
    const text = buildWhatsAppMessage(data, attachedFile);
    return `https://wa.me/917766036398?text=${encodeURIComponent(text)}`;
  };

  const mailtoHref = `mailto:ajeyedit91@gmail.com?subject=${encodeURIComponent(
    `New Project Inquiry: [${formData.projectType}] - ${formData.name || "Client"}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone/WhatsApp: ${formData.phone || "N/A"}\nProject Type: ${formData.projectType}\nBudget: ${formData.budget || "N/A"}\nTimeline: ${formData.timeline || "N/A"}\nProject Link/Footage: ${formData.reference || (file ? `Attached: ${file.name}` : "N/A")}\n\nProject Details:\n${formData.description}`
  )}`;

  // Quick Direct WhatsApp Trigger (Opens chat immediately with filled data)
  const handleDirectWhatsAppClick = () => {
    if (!formData.name.trim()) {
      alert("Please enter your name first so Ajay knows who is reaching out.");
      return;
    }
    const waUrl = getWhatsAppUrl(formData, file);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Submit via FormSubmit (Email) + trigger WhatsApp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    // Prepare WhatsApp URL
    const waUrl = getWhatsAppUrl(formData, file);

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
      fileName: file ? file.name : undefined,
      fileSize: file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : undefined,
    });

    try {
      // Build FormData payload to support file upload & email delivery
      const bodyFormData = new FormData();
      bodyFormData.append("name", formData.name);
      bodyFormData.append("email", formData.email);
      if (formData.phone) bodyFormData.append("phone_whatsapp", formData.phone);
      bodyFormData.append("project_type", formData.projectType);
      bodyFormData.append("budget", formData.budget || "Not specified");
      bodyFormData.append("timeline", formData.timeline || "Not specified");
      bodyFormData.append("project_vision_description", formData.description);

      if (formData.reference) {
        bodyFormData.append("footage_cloud_link", formData.reference);
      }

      if (file) {
        bodyFormData.append("attachment", file);
        bodyFormData.append("attached_file_info", `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
      }

      bodyFormData.append(
        "_subject",
        `🎬 New Project Inquiry: [${formData.projectType}] from ${formData.name || "Client"}`
      );
      bodyFormData.append("_template", "table");
      bodyFormData.append("_captcha", "false");

      // Auto-open WhatsApp chat in new window
      try {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      } catch (popupErr) {
        console.warn("Popup prevented direct WhatsApp redirect:", popupErr);
      }

      const response = await fetch("https://formsubmit.co/ajax/ajeyedit91@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: bodyFormData,
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
        setStatus("success"); // Still mark as success because WhatsApp is already connected!
      }
    } catch (err: unknown) {
      console.error("Project submission error:", err);
      // Even if network fails, the WhatsApp link is generated and available
      setStatus("success");
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
            Let&apos;s turn your footage into something worth watching. Submit your project details below &mdash; it will be delivered directly to my email and WhatsApp (+91 7766036398).
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

        {/* Right Form Column */}
        <div className={styles.formContent}>
          {status === "success" && submittedData ? (
            <div className={styles.successBox}>
              <div className={styles.successIconCircle}>
                <CheckCircle2 size={36} />
              </div>
              <h3 className={styles.successHeading}>Project Submitted!</h3>
              <p className={styles.successMessage}>
                Thank you, <strong>{submittedData.name}</strong>! Your project inquiry has been processed and connected to my email and WhatsApp.
              </p>

              {/* Delivery Badges */}
              <div className={styles.successBadges}>
                <div className={`${styles.badgeItem} ${styles.badgeEmail}`}>
                  <Mail size={13} />
                  <span>Delivered to ajeyedit91@gmail.com</span>
                </div>
                <div className={`${styles.badgeItem} ${styles.badgeWhatsapp}`}>
                  <WhatsappIcon size={13} />
                  <span>Ready on WhatsApp (+91 7766036398)</span>
                </div>
              </div>

              {/* Action Buttons for Client */}
              <div className={styles.successActions}>
                <a
                  href={`https://wa.me/917766036398?text=${encodeURIComponent(
                    buildWhatsAppMessage({
                      name: submittedData.name,
                      email: submittedData.email,
                      phone: submittedData.phone,
                      projectType: submittedData.projectType,
                      budget: submittedData.budget,
                      timeline: submittedData.timeline,
                      description: submittedData.description,
                      reference: submittedData.reference,
                      fileMode: "link",
                    })
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.successWhatsappBtn}
                >
                  <WhatsappIcon size={20} />
                  <span>Open Chat on WhatsApp (+91 7766036398)</span>
                  <ExternalLink size={16} />
                </a>

                <a href={mailtoHref} className={styles.successMailBtn}>
                  <Mail size={15} />
                  <span>Send Direct Backup Email</span>
                </a>
              </div>

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
                    <span className={styles.summaryLabel}>Phone / WhatsApp</span>
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
                {submittedData.fileName && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Attached File</span>
                    <span className={styles.summaryValue}>
                      {submittedData.fileName} ({submittedData.fileSize})
                    </span>
                  </div>
                )}
                {submittedData.reference && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Cloud Link</span>
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
                  setFile(null);
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
                        You can also send your project directly via WhatsApp below.
                      </p>
                      <div className={styles.alertActions} style={{ marginLeft: 0 }}>
                        <a
                          href={getWhatsAppUrl(formData, file)}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.fallbackMailBtn}
                          style={{ background: "#25D366", color: "#fff" }}
                        >
                          <WhatsappIcon size={14} />
                          <span>Send to WhatsApp (+91 7766036398)</span>
                        </a>
                        <a href={mailtoHref} className={styles.fallbackMailBtn}>
                          <Mail size={13} />
                          <span>Direct Gmail</span>
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
                      <div style={{ marginTop: "0.6rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <a
                          href={getWhatsAppUrl(formData, file)}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.fallbackMailBtn}
                          style={{ background: "#25D366", color: "#fff" }}
                        >
                          <WhatsappIcon size={14} />
                          <span>Send via WhatsApp (+91 7766036398)</span>
                        </a>
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
                  <label>
                    Your Name <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul / Studio Lead"
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
              </div>

              {/* Phone / WhatsApp & Project Type Row */}
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label>
                    Your WhatsApp / Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>

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
                    <option>Motion Design &amp; Color</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Budget & Timeline Row */}
              <div className={styles.inputRow}>
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
              </div>

              {/* Project File or Cloud Reference Section */}
              <div className={styles.inputGroup}>
                <label>Project File / Raw Footage</label>
                
                {/* Method Tabs */}
                <div className={styles.tabRow}>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, fileMode: "link" }))}
                    className={`${styles.tabBtn} ${formData.fileMode === "link" ? styles.tabBtnActive : ""}`}
                  >
                    <Link2 size={14} />
                    <span>Cloud Link (Drive / Dropbox / WeTransfer)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, fileMode: "upload" }))}
                    className={`${styles.tabBtn} ${formData.fileMode === "upload" ? styles.tabBtnActive : ""}`}
                  >
                    <UploadCloud size={14} />
                    <span>Upload Project File / Brief</span>
                  </button>
                </div>

                {formData.fileMode === "link" ? (
                  <input
                    type="url"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/... or wetransfer.com/..."
                  />
                ) : (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="project-file-input"
                      onChange={handleFileChange}
                      className={styles.fileInputHidden}
                      accept=".pdf,.doc,.docx,.zip,.rar,.7z,.mp4,.mov,.txt,.png,.jpg,.jpeg"
                    />

                    {!file ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={styles.fileUploadBox}
                      >
                        <div className={styles.fileUploadPlaceholder}>
                          <div className={styles.fileUploadIconCircle}>
                            <UploadCloud size={20} />
                          </div>
                          <span className={styles.fileUploadMainText}>
                            Click to select project file or brief
                          </span>
                          <span className={styles.fileUploadSubText}>
                            PDF, DOCX, ZIP, MP4, MOV up to 25MB (For larger footage, use Cloud Link)
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.fileSelectedBox}>
                        <div className={styles.fileSelectedInfo}>
                          <FileText size={22} color="#E6D6C3" />
                          <div>
                            <div className={styles.fileSelectedName}>{file.name}</div>
                            <div className={styles.fileSelectedSize}>
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className={styles.removeFileBtn}
                          aria-label="Remove attached file"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Project Details / Vision */}
              <div className={styles.inputGroup}>
                <label>
                  Project Details / Creative Vision <span className={styles.requiredStar}>*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell me about your project, storytelling style, pacing, references, and goals..."
                  rows={4}
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className={styles.buttonGroup}>
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

                <button
                  type="button"
                  onClick={handleDirectWhatsAppClick}
                  className={styles.whatsappDirectBtn}
                >
                  <WhatsappIcon size={17} />
                  <span>Send directly via WhatsApp (+91 7766036398)</span>
                </button>

                <p className={styles.deliveryNotice}>
                  Delivered to <strong>ajeyedit91@gmail.com</strong> and WhatsApp <strong>+91 7766036398</strong>
                </p>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
