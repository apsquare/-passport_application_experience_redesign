import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import documentImage from "../assets/documents.svg";

export default function Dashboard() {
  const { user, application, getProgress } = useAppContext();
  const navigate = useNavigate();

  // 🔥 FIX: redirect ONLY after checking user properly
  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      navigate("/login");
    }
  }, [user, navigate]);

  const status = application?.status || "Draft";
  const isSubmitted = status.toLowerCase() === "submitted";

  const goToStart = () => {
    navigate("/StartApplication");
  };

  const goToDocs = () => {
    navigate("/DocumentsRequired");
  };

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.dashboardContainer}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.heading}>Welcome, {user?.name || "User"}!</h1>
          </div>
        </div>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardLeft}>
              <h3 className={styles.cardTitle}>User Details</h3>

              <p>
                <strong>Name:</strong> {user?.name || "Not available"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "Not available"}
              </p>
              <p>
                <strong>Date of Birth:</strong> {user?.dob || "Not available"}
              </p>
              <p>
                <strong>Application Status:</strong> {status}
              </p>

              {isSubmitted && (
                <div className={styles.submittedBox}>
                  <h4 className={styles.submittedTitle}>
                    Submission Completed
                  </h4>
                  <p className={styles.submittedText}>
                    Your passport application has been submitted successfully.
                    Please keep your appointment information ready for the next
                    step.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.cardRight}>
              <div className={styles.clickable} onClick={goToDocs}>
                <img
                  className={styles.documentImage}
                  src={documentImage}
                  alt="Documents Required"
                />
                <span className={styles.documentText}>
                  View Documents Required
                </span>
              </div>

              {!isSubmitted ? (
                <button className={styles.primaryButton} onClick={goToStart}>
                  Continue Application
                </button>
              ) : (
                <div className={styles.appointmentCard}>
                  <div className={styles.appointmentHeader}>
                    <h4>Appointment Details</h4>
                  </div>

                  <div className={styles.appointmentGrid}>
                    <div className={styles.appointmentItem}>
                      <span className={styles.label}>Passport Office</span>
                      <span className={styles.value}>
                        {application?.appointment?.center || "Not selected"}
                      </span>
                    </div>

                    <div className={styles.appointmentItem}>
                      <span className={styles.label}>Date</span>
                      <span className={styles.value}>
                        {application?.appointment?.date || "Not selected"}
                      </span>
                    </div>

                    <div className={styles.appointmentItem}>
                      <span className={styles.label}>Time Slot</span>
                      <span className={styles.value}>
                        {application?.appointment?.slot || "Not selected"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressTop}>
            <h3>Application Progress</h3>
            <span className={styles.progressValue}>
              {isSubmitted ? "100%" : `${getProgress()}%`}
            </span>
          </div>

          <div className={styles.progressBarOuter}>
            <div
              className={styles.progressBarInner}
              style={{
                width: isSubmitted ? "100%" : `${getProgress()}%`,
              }}
            ></div>
          </div>

          <p className={styles.progressText}>
            {isSubmitted
              ? "Your application is complete and has been submitted."
              : "Complete the remaining steps to submit your passport application."}
          </p>

          <p className={styles.lastSavedText}>
            <strong>Last Saved:</strong>{" "}
            {application?.lastSavedAt || "Not saved yet"}
          </p>
        </div>
      </div>
    </div>
  );
}
