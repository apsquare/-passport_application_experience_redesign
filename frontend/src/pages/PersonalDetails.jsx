import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProgressBar from "../components/ProgressBar";
import SaveStatus from "../components/SaveStatus";
import styles from "./PersonalDetails.module.css";

export default function PersonalDetails() {
  const { application, updateApplicationSection, getProgress, saveStatus } =
    useAppContext();

  const navigate = useNavigate();
  const data = application.personal || {};

  const [confirmed, setConfirmed] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    updateApplicationSection("personal", {
      [name]: value,
    });

    setConfirmed(false);
  };

  const handlePreviewSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <ProgressBar progress={getProgress()} />
          <SaveStatus status={saveStatus} time={application.lastSavedAt} />
        </div>

        <div className={styles.heroCard}>
          <div className={styles.heroLeft}>
            <p className={styles.eyebrow}>Passport Application · Step 1</p>
            <h1 className={styles.title}>Personal Details</h1>
            <p className={styles.subtitle}>
              Fill in your personal details carefully before moving to address
              and identity verification.
            </p>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.stepBadge}>Step 1</div>
            <p className={styles.stepText}>Personal Information</p>
          </div>
        </div>

        <form className={styles.formCard} onSubmit={handlePreviewSubmit}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Basic Identity Details</h2>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={data.fullName || ""}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={data.gender || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="dob">Date of Birth</label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={data.dob || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="birthCity">Place of Birth - City</label>
                <input
                  id="birthCity"
                  name="birthCity"
                  type="text"
                  value={data.birthCity || ""}
                  onChange={handleChange}
                  placeholder="Enter city of birth"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="birthState">Place of Birth - State</label>
                <input
                  id="birthState"
                  name="birthState"
                  type="text"
                  value={data.birthState || ""}
                  onChange={handleChange}
                  placeholder="Enter state of birth"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="birthCountry">Place of Birth - Country</label>
                <input
                  id="birthCountry"
                  name="birthCountry"
                  type="text"
                  value={data.birthCountry || ""}
                  onChange={handleChange}
                  placeholder="Enter country of birth"
                  required
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Family Details</h2>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label htmlFor="fatherName">Father’s Full Name</label>
                <input
                  id="fatherName"
                  name="fatherName"
                  type="text"
                  value={data.fatherName || ""}
                  onChange={handleChange}
                  placeholder="Enter father's full name"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="motherName">Mother’s Full Name</label>
                <input
                  id="motherName"
                  name="motherName"
                  type="text"
                  value={data.motherName || ""}
                  onChange={handleChange}
                  placeholder="Enter mother's full name"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="guardianName">Legal Guardian (if minor)</label>
                <input
                  id="guardianName"
                  name="guardianName"
                  type="text"
                  value={data.guardianName || ""}
                  onChange={handleChange}
                  placeholder="Enter guardian name if applicable"
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Marital Details</h2>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label htmlFor="maritalStatus">Marital Status</label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  value={data.maritalStatus || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select marital status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              {data.maritalStatus === "Married" && (
                <div className={styles.inputGroup}>
                  <label htmlFor="spouseName">Spouse Name</label>
                  <input
                    id="spouseName"
                    name="spouseName"
                    type="text"
                    value={data.spouseName || ""}
                    onChange={handleChange}
                    placeholder="Enter spouse name"
                    required
                  />
                </div>
              )}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Details</h2>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={data.mobile || ""}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email || ""}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>
          </section>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button className={styles.secondaryButton} type="submit">
              Preview & Continue
            </button>
          </div>
        </form>
      </div>

      {showPreview && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowPreview(false)}
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>Preview Your Details</h3>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setShowPreview(false)}
              >
                ×
              </button>
            </div>

            <div className={styles.previewGrid}>
              <p>
                <strong>Name:</strong> {data.fullName || "-"}
              </p>
              <p>
                <strong>Gender:</strong> {data.gender || "-"}
              </p>
              <p>
                <strong>Date of Birth:</strong> {data.dob || "-"}
              </p>
              <p>
                <strong>Place of Birth:</strong>{" "}
                {[data.birthCity, data.birthState, data.birthCountry]
                  .filter(Boolean)
                  .join(", ") || "-"}
              </p>
              <p>
                <strong>Father's Name:</strong> {data.fatherName || "-"}
              </p>
              <p>
                <strong>Mother's Name:</strong> {data.motherName || "-"}
              </p>
              <p>
                <strong>Guardian:</strong> {data.guardianName || "-"}
              </p>
              <p>
                <strong>Marital Status:</strong> {data.maritalStatus || "-"}
              </p>
              {data.maritalStatus === "Married" && (
                <p>
                  <strong>Spouse Name:</strong> {data.spouseName || "-"}
                </p>
              )}
              <p>
                <strong>Mobile:</strong> {data.mobile || "-"}
              </p>
              <p>
                <strong>Email:</strong> {data.email || "-"}
              </p>
            </div>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              <span>
                I confirm that all the above personal details are correct.
              </span>
            </label>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setShowPreview(false)}
              >
                Edit Details
              </button>

              <button
                type="button"
                className={styles.primaryButton}
                disabled={!confirmed}
                onClick={() => navigate("/AddressDetails")}
              >
                Confirm and Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
