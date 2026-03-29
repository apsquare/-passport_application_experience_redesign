import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProgressBar from "../components/ProgressBar";
import SaveStatus from "../components/SaveStatus";
import styles from "./DocumentUpload.module.css";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export default function DocumentUpload() {
  const { application, updateApplicationSection, getProgress, saveStatus } =
    useAppContext();

  const navigate = useNavigate();

  const identity = application.identity || {};
  const documents = application.documents || {};

  const [showPreview, setShowPreview] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState({});

  const dobDocument = identity.dobDocument || "DOB Proof";
  const primaryIdentityDocument =
    identity.primaryIdentityDocument || "Primary Identity Proof";

  const uploadFields = useMemo(() => {
    return [
      {
        key: "dobProofFile",
        title: dobDocument,
        subtitle: "Upload the date of birth proof you selected earlier.",
        accept: ".pdf,.jpg,.jpeg,.png",
      },
      {
        key: "identityProofFile",
        title: primaryIdentityDocument,
        subtitle: "Upload the primary identity proof you selected earlier.",
        accept: ".pdf,.jpg,.jpeg,.png",
      },
      {
        key: "photo",
        title: "Passport Size Photo",
        subtitle: "Upload a recent passport size photograph.",
        accept: ".jpg,.jpeg,.png",
      },
      {
        key: "signatureFile",
        title: "Signature",
        subtitle: "Upload a clear scan or image of your signature.",
        accept: ".jpg,.jpeg,.png",
      },
      {
        key: "thumbImpressionFile",
        title: "Thumb Impression",
        subtitle: "Upload a clear image of your thumb impression.",
        accept: ".jpg,.jpeg,.png",
      },
    ];
  }, [dobDocument, primaryIdentityDocument]);

  const formatFileSize = (size) => {
    if (!size && size !== 0) return "";
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getValidCompletedUploadsCount = () => {
    return uploadFields.filter(
      (field) => documents[field.key] && !errors[field.key],
    ).length;
  };

  const getLiveProgress = () => {
    const baseProgress = getProgress();
    const completedUploads = getValidCompletedUploadsCount();
    const uploadRatio = completedUploads / uploadFields.length;

    const boostedProgress =
      baseProgress + Math.round((100 - baseProgress) * uploadRatio);

    return Math.min(100, Math.max(baseProgress, boostedProgress));
  };

  const progress = getLiveProgress();

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files?.[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        [name]: `File size exceeds 2 MB. Selected file is ${formatFileSize(
          file.size,
        )}.`,
      }));

      const resetPayload = {
        [name]: null,
      };

      if (name === "dobProofFile") resetPayload.addressProof = null;
      if (name === "identityProofFile") resetPayload.aadhaarFile = null;
      if (name === "photo") resetPayload.photo = null;

      updateApplicationSection("documents", resetPayload);

      e.target.value = "";
      setConfirmed(false);
      return;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    const payload = {
      [name]: file,
    };

    if (name === "dobProofFile") {
      payload.addressProof = file;
    }

    if (name === "identityProofFile") {
      payload.aadhaarFile = file;
    }

    if (name === "photo") {
      payload.photo = file;
    }

    updateApplicationSection("documents", payload);
    setConfirmed(false);
  };

  const allFilesPresent = uploadFields.every((field) => documents[field.key]);
  const hasAnyErrors = Object.values(errors).some(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!allFilesPresent || hasAnyErrors) return;

    setShowPreview(true);
  };

  const handleContinue = () => {
    if (!confirmed) return;
    navigate("/AppointmentBooking");
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <ProgressBar progress={progress} />
          <SaveStatus status={saveStatus} time={application.lastSavedAt} />
        </div>

        <div className={styles.heroCard}>
          <div className={styles.heroLeft}>
            <p className={styles.eyebrow}>Passport Application · Step 4</p>
            <h1 className={styles.title}>Document Upload</h1>
            <p className={styles.subtitle}>
              Upload the selected birth proof, selected identity proof, passport
              size photo, signature, and thumb impression. Each file must be
              under 2 MB.
            </p>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.stepBadge}>Step 4</div>
            <p className={styles.stepText}>Upload Documents</p>
            <p className={styles.liveProgressText}>Progress: {progress}%</p>
          </div>
        </div>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Required Uploads</h2>

            <div className={styles.uploadGrid}>
              {uploadFields.map((field) => {
                const selectedFile = documents[field.key];

                return (
                  <div key={field.key} className={styles.uploadCard}>
                    <div className={styles.uploadCardTop}>
                      <h3 className={styles.uploadTitle}>{field.title}</h3>
                      <p className={styles.uploadSubtitle}>{field.subtitle}</p>
                    </div>

                    <label className={styles.uploadBox}>
                      <input
                        type="file"
                        name={field.key}
                        accept={field.accept}
                        onChange={handleFileChange}
                        required
                      />
                      <span className={styles.uploadLabel}>Choose file</span>
                      <span className={styles.uploadHint}>
                        PDF, JPG, JPEG, PNG · Max 2 MB
                      </span>
                    </label>

                    {selectedFile && !errors[field.key] && (
                      <div className={styles.fileInfo}>
                        <span className={styles.fileName}>
                          {selectedFile.name}
                        </span>
                        <span className={styles.fileSize}>
                          {formatFileSize(selectedFile.size)}
                        </span>
                      </div>
                    )}

                    {errors[field.key] && (
                      <p className={styles.errorText}>{errors[field.key]}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <div className={styles.noteBox}>
            <p>
              Make sure all uploaded files are clear, readable, and smaller than
              2 MB. Blurry or oversized files may lead to rejection.
            </p>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate("/IdentityDetails")}
            >
              Back
            </button>

            <button
              type="submit"
              className={styles.primaryButton}
              disabled={!allFilesPresent || hasAnyErrors}
            >
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
              <h3>Preview Uploaded Documents</h3>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setShowPreview(false)}
              >
                ×
              </button>
            </div>

            <div className={styles.previewGrid}>
              {uploadFields.map((field) => {
                const file = documents[field.key];

                if (!file) {
                  return (
                    <p key={field.key}>
                      <strong>{field.title}:</strong> -
                    </p>
                  );
                }

                const isImage = file.type.startsWith("image/");
                const previewURL = URL.createObjectURL(file);

                return (
                  <div key={field.key} className={styles.previewItem}>
                    <p className={styles.previewLabel}>
                      <strong>{field.title}</strong>
                    </p>

                    {isImage ? (
                      <img
                        src={previewURL}
                        alt={field.title}
                        className={styles.previewImage}
                      />
                    ) : (
                      <div className={styles.previewFile}>📄 {file.name}</div>
                    )}
                  </div>
                );
              })}
            </div>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              <span>
                I confirm that all uploaded documents are correct and clearly
                visible.
              </span>
            </label>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setShowPreview(false)}
              >
                Edit Uploads
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
