import Link from "next/link";
import styles from "./ProjectPage.module.css";
import { ArrowRight } from "lucide-react";

// Placeholder data fetcher
function getProjectBySlug(slug: string) {
  return {
    title: slug === "project-01" ? "The Art of Pacing" : 
           slug === "project-02" ? "Creator Life" : 
           slug === "project-03" ? "Visual Hooks" : 
           slug === "project-04" ? "Brand Story" : "Grow It Right: Show-off Jiju",
    category: slug === "project-01" ? "DOCUMENTARY" : 
              slug === "project-05" ? "COMMERCIAL" : "LONG-FORM",
    year: "2024",
    client: slug === "project-05" ? "Grow It Right" : "Creator / Brand",
    role: "Lead Editor",
    description: slug === "project-05" 
      ? "A commercial edit for 'Grow It Right' featuring the 'Show-off Jiju' narrative. The edit required precise comedic timing and pacing to land the punchline about XIRR versus basic returns."
      : "A comprehensive look at the process of editing this specific project. The objective was to maintain high retention while delivering an emotional narrative that kept the audience hooked from the first frame.",
    script: slug === "project-05" 
      ? "Grow It Right presents... Show-off Jiju.\n\nHar family function mein Jiju ka ek hi dialogue—\n'₹10 lakh lagaye the, aaj ₹15 lakh hai. 50% return, boss!'\nPoora khandaan impressed.\n\nBas ek chhoti si baat Jiju bata nahi rahe—\nye 50% return 5 saal mein aaya hai.\nSaalana hisaab lagao, toh bana sirf lagbhag 8.4%.\n\nInterval ke baad—Jiju pahunche GroRight.\nHumari team ne unke har fund ka XIRR nikala—yaani asli saalana return.\nUse benchmark se compare kiya, aur jo funds peeche the, unka review kiya.\n\nAb Jiju 50% nahi bolte.\nXIRR bolte hain.\nAapka asli return kitna hai, pata hai?\n\nPortfolio review ke liye GroRight ko call karein.\nGrow It Right.\n\nMutual fund investments are subject to market risks. Read all scheme related documents carefully."
      : "",
    skills: ["Video Editing", "Motion Design", "Story Structure", "Sound Design", "Color", "Post Production"],
    approach: {
      pacing: slug === "project-05" ? "Fast-paced comedic timing for the dialogue, slowing down for the dramatic 'interval' reveal." : "The pacing was designed to mimic the heartbeat of the story, fast during the action and letting the emotional moments breathe.",
      storytelling: slug === "project-05" ? "Structured the narrative around the protagonist's overconfidence leading to the educational punchline about XIRR." : "Reconstructed the narrative from raw interviews to build a cohesive three-act structure.",
      visualRhythm: slug === "project-05" ? "Used motion graphics to visually break down the math behind the 50% vs 8.4% return to educate the audience." : "Synced hard cuts to the beat while keeping smooth J/L cuts for dialogues.",
    },
    deliverables: "1x Hero Commercial (1m), 3x Shorts",
    nextProject: slug === "project-05" ? "project-01" : `project-0${parseInt(slug.split('-')[1]) + 1}`,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  return (
    <div className={styles.page}>
      
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroMeta}>
            <span>{project.category}</span>
            <span>&mdash;</span>
            <span>{project.year}</span>
          </div>
          <h1 className="text-h1">{project.title}</h1>
          <div className={styles.heroDetails}>
            <p><strong>Client:</strong> {project.client}</p>
            <p><strong>Role:</strong> {project.role}</p>
          </div>
        </div>
        
        <div className={`container ${styles.heroVideoContainer}`}>
          <div className={styles.heroVideoPlaceholder} >
            [ MAIN PROJECT VIDEO ]
          </div>
        </div>
      </section>

      {/* The Project */}
      <section className="section">
        <div className={`container ${styles.twoCol}`}>
          <div><h2 className="text-h3">THE PROJECT</h2></div>
          <div className={styles.content}>
            <p className="text-body">{project.description}</p>
            
            {project.script && (
              <div style={{ marginTop: "3rem", padding: "2rem", backgroundColor: "#0a0a0a", borderRadius: "8px" }}>
                <h4 style={{ marginBottom: "1rem", color: "var(--accent-red)" }}>COMMERCIAL SCRIPT</h4>
                <p className="text-body" style={{ whiteSpace: "pre-wrap", fontSize: "0.9rem", fontStyle: "italic", opacity: 0.9 }}>
                  {project.script}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Details & Roles */}
      <section className="section" style={{ backgroundColor: "#0a0a0a" }}>
        <div className={`container ${styles.twoCol}`}>
          <div><h2 className="text-h3">PROJECT DETAILS</h2></div>
          <div className={styles.contentGrid}>
            <div>
              <h3 className={styles.label}>Client</h3>
              <p>{project.client}</p>
            </div>
            <div>
              <h3 className={styles.label}>Category</h3>
              <p>{project.category}</p>
            </div>
            <div>
              <h3 className={styles.label}>Deliverables</h3>
              <p>{project.deliverables}</p>
            </div>
            <div>
              <h3 className={styles.label}>Year</h3>
              <p>{project.year}</p>
            </div>
          </div>
        </div>
        
        <div className={`container ${styles.twoCol}`} style={{ marginTop: "4rem" }}>
          <div><h2 className="text-h3">MY ROLE</h2></div>
          <div className={styles.rolesList}>
            {project.skills.map(skill => <span key={skill} className={styles.pill}>{skill}</span>)}
          </div>
        </div>
      </section>

      {/* Editing Approach */}
      <section className="section">
        <div className={`container ${styles.twoCol}`}>
          <div><h2 className="text-h3">EDITING APPROACH</h2></div>
          <div className={styles.content}>
            <div className={styles.approachBlock}>
              <h4>Pacing</h4>
              <p>{project.approach.pacing}</p>
            </div>
            <div className={styles.approachBlock}>
              <h4>Storytelling</h4>
              <p>{project.approach.storytelling}</p>
            </div>
            <div className={styles.approachBlock}>
              <h4>Visual Rhythm</h4>
              <p>{project.approach.visualRhythm}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="section">
        <div className="container">
          <h2 className="text-h3" style={{ textAlign: "center", marginBottom: "3rem" }}>BEFORE &mdash; AFTER</h2>
          <div className={styles.beforeAfter}>
            <div className={styles.baPlaceholder}>[ RAW FOOTAGE ]</div>
            <div className={styles.baArrow}>&darr;</div>
            <div className={styles.baPlaceholder}>[ FINAL EDIT ]</div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className={`section ${styles.nextProject}`}>
        <div className="container text-center">
          <p className={styles.label}>UP NEXT</p>
          <Link href={`/work/${project.nextProject}`} className={styles.nextLink} >
            <h2 className="text-h1">NEXT STORY <ArrowRight size={40} className={styles.nextIcon} /></h2>
          </Link>
        </div>
      </section>

    </div>
  );
}
