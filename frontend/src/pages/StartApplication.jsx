import { Link } from "react-router-dom";
import styles from "./StartApplication.module.css";

export default function StartApplication() {
  const steps = [
    "Fill in your personal details",
    "Enter your current address information",
    "Provide identity and supporting details",
    "Upload the required documents",
    "Book your appointment and submit",
  ];

  const notes = [
    "Keep your Aadhaar or another valid identity proof ready",
    "Documents should be uploaded in PDF format( Max 1MB )",
    "Make sure to recheck the information you provide.",
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.heroCard}>
          <div className={styles.left}>
            <h1 className={styles.title}>
              Start Your New Passport Application
            </h1>
            <p className={styles.subtitle}>
              We have simplified the process into five clear steps so you can
              complete your application with confidence and clarity.
            </p>

            <div className={styles.buttonRow}>
              <Link to="/PersonalDetails" className={styles.primaryButton}>
                Begin Application
              </Link>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.progressCard}>
              <p className={styles.progressLabel}>Application Overview</p>
              <div className={styles.progressNumber}>5 Steps</div>
              <p className={styles.progressText}>
                Estimated time: 10–15 minutes
              </p>
            </div>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <section className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>Steps You Will Follow</h2>

            <div className={styles.stepsList}>
              {steps.map((step, index) => (
                <div key={index} className={styles.stepItem}>
                  <div className={styles.stepBadge}>{index + 1}</div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>Before You Continue</h2>

            <div className={styles.notesList}>
              {notes.map((note, index) => (
                <div key={index} className={styles.noteItem}>
                  <span className={styles.noteDot}></span>
                  <p>{note}</p>
                </div>
              ))}
            </div>

            <div className={styles.tipBox}>
              <h4>Helpful Tip</h4>
              <p>
                Make sure your documents are clear, up to date, and easy to
                read. This reduces delays during verification.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
