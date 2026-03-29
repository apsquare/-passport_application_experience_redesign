import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProgressBar from "../components/ProgressBar";
import SaveStatus from "../components/SaveStatus";
import styles from "./PersonalDetails.module.css";

export default function AddressVerification() {
  const { application, updateApplicationSection, getProgress, saveStatus } =
    useAppContext();

  const navigate = useNavigate();
  const data = application.address || {};

  const [showPreview, setShowPreview] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    updateApplicationSection("address", {
      [name]: value,
    });

    setConfirmed(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleContinue = () => {
    if (!confirmed) return;
    navigate("/IdentityDetails");
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
            <p className={styles.eyebrow}>Passport Application · Step 2</p>
            <h1 className={styles.title}>Address Details</h1>
            <p className={styles.subtitle}>
              Provide your present residential address carefully. These details
              will be used for communication and verification.
            </p>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.stepBadge}>Step 2</div>
            <p className={styles.stepText}>Address Information</p>
          </div>
        </div>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Address Information</h2>
            <div className={styles.grid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label htmlFor="addressLine1">Address Line 1</label>
                <input
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  value={data.addressLine1 || ""}
                  onChange={handleChange}
                  placeholder="House No, Street, Area"
                  required
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label htmlFor="addressLine2">Address Line 2</label>
                <input
                  id="addressLine2"
                  name="addressLine2"
                  type="text"
                  value={data.addressLine2 || ""}
                  onChange={handleChange}
                  placeholder="Landmark, locality, apartment"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={data.city || ""}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={data.state || ""}
                  onChange={handleChange}
                  placeholder="Enter state"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="pincode">PIN Code</label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={data.pincode || ""}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                  required
                />
              </div>
            </div>
          </section>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate("/StartApplication")}
            >
              Back
            </button>

            <button type="submit" className={styles.primaryButton}>
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
              <h3>Preview Address Details</h3>
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
                <strong>Address Line 1:</strong> {data.addressLine1 || "-"}
              </p>
              <p>
                <strong>Address Line 2:</strong> {data.addressLine2 || "-"}
              </p>
              <p>
                <strong>City:</strong> {data.city || "-"}
              </p>
              <p>
                <strong>State:</strong> {data.state || "-"}
              </p>
              <p>
                <strong>PIN Code:</strong> {data.pincode || "-"}
              </p>
            </div>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              <span>
                I confirm that all the above address details are correct.
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
                onClick={handleContinue}
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
