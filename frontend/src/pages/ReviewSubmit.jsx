import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import SaveStatus from "../components/SaveStatus";
import { useAppContext } from "../context/AppContext";
import styles from "./ReviewSubmit.module.css";

export default function ReviewSubmit() {
  const { application, getProgress, saveStatus, submitApplication } =
    useAppContext();

  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const personal = application.personal || {};
  const address = application.address || {};
  const identity = application.identity || {};
  const appointment = application.appointment || {};
  const documents = application.documents || {};

  const uploadedDocs = useMemo(
    () =>
      [
        {
          label: identity.dobDocument || "DOB Proof",
          file: documents.dobProofFile || documents.addressProof || null,
        },
        {
          label: identity.primaryIdentityDocument || "Identity Proof",
          file: documents.identityProofFile || documents.aadhaarFile || null,
        },
        {
          label: "Passport Size Photo",
          file: documents.photo || null,
        },
        {
          label: "Signature",
          file: documents.signatureFile || null,
        },
        {
          label: "Thumb Impression",
          file: documents.thumbImpressionFile || null,
        },
      ].filter((doc) => doc.file),
    [identity, documents],
  );

  const handleDownload = () => {
    window.print();
  };

  const handleSubmit = () => {
    if (!confirmed) return;
    submitApplication();
    navigate("/Dashboard");
  };

  const formatStateLabel = (value) => {
    const labels = {
      AndhraPradesh: "Andhra Pradesh",
      ArunachalPradesh: "Arunachal Pradesh",
      Chhattisgarh: "Chhattisgarh",
      HimachalPradesh: "Himachal Pradesh",
      JammuAndKashmir: "Jammu and Kashmir",
      MadhyaPradesh: "Madhya Pradesh",
      TamilNadu: "Tamil Nadu",
      UttarPradesh: "Uttar Pradesh",
      Uttarakhand: "Uttarakhand",
      WestBengal: "West Bengal",
      AndamanAndNicobarIslands: "Andaman and Nicobar Islands",
      DadraAndNagarHaveliAndDamanAndDiu:
        "Dadra and Nagar Haveli and Daman and Diu",
    };

    return labels[value] || value || "";
  };

  const formatFileSize = (size) => {
    if (!size && size !== 0) return "";
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const buildFields = (items) =>
    items.filter(
      (item) =>
        item.value !== undefined &&
        item.value !== null &&
        String(item.value).trim() !== "",
    );

  const personalFields = buildFields([
    { label: "Full Name", value: personal.fullName },
    { label: "Gender", value: personal.gender },
    { label: "Date of Birth", value: personal.dob },
    { label: "Birth City", value: personal.birthCity },
    { label: "Birth State", value: personal.birthState },
    { label: "Birth Country", value: personal.birthCountry },
    { label: "Father's Name", value: personal.fatherName },
    { label: "Mother's Name", value: personal.motherName },
    { label: "Guardian Name", value: personal.guardianName },
    { label: "Marital Status", value: personal.maritalStatus },
    { label: "Spouse Name", value: personal.spouseName },
    { label: "Mobile", value: personal.mobile },
    { label: "Email", value: personal.email, fullWidth: true },
  ]);

  const addressFields = buildFields([
    { label: "Address Line 1", value: address.addressLine1, fullWidth: true },
    { label: "Address Line 2", value: address.addressLine2, fullWidth: true },
    { label: "City", value: address.city },
    { label: "State", value: address.state },
    { label: "PIN Code", value: address.pincode },
  ]);

  const identityFields = buildFields([
    { label: "DOB Proof", value: identity.dobDocument },
    {
      label: "Primary Identity Document",
      value: identity.primaryIdentityDocument,
    },
    { label: "Citizenship Status", value: identity.citizenshipStatus },

    { label: "Birth Certificate No", value: identity.birthCertificateNumber },
    { label: "Issuing Authority", value: identity.birthCertificateAuthority },
    {
      label: "Birth Certificate Issue Date",
      value: identity.birthCertificateIssueDate,
    },

    { label: "10th Board", value: identity.sscBoard },
    { label: "10th School Name", value: identity.sscSchoolName },
    { label: "10th Register Number", value: identity.sscRegisterNumber },
    { label: "10th Year of Passing", value: identity.sscYearOfPassing },

    {
      label: "School Leaving Certificate No",
      value: identity.schoolLeavingCertificateNumber,
    },
    {
      label: "School Leaving School Name",
      value: identity.schoolLeavingSchoolName,
    },
    {
      label: "School Leaving Issue Year",
      value: identity.schoolLeavingIssueYear,
    },

    { label: "DOB PAN Number", value: identity.dobPanNumber },
    { label: "DOB Aadhaar Number", value: identity.dobAadhaarNumber },
    {
      label: "Previous Passport Number",
      value: identity.previousPassportNumber,
    },
    {
      label: "Previous Passport Issue Date",
      value: identity.previousPassportIssueDate,
    },

    { label: "Aadhaar Number", value: identity.aadhaarNumber },
    { label: "Name on Aadhaar", value: identity.aadhaarName },
    { label: "PAN Number", value: identity.panNumber },
    { label: "Name on PAN", value: identity.panName },
    { label: "Voter ID Number", value: identity.voterIdNumber },
    { label: "Voter Constituency", value: identity.voterConstituency },
    {
      label: "Driving License Number",
      value: identity.drivingLicenseNumber,
    },
    { label: "License Issue State", value: identity.licenseIssueState },
    { label: "License Expiry Date", value: identity.licenseExpiryDate },
  ]);

  const appointmentFields = buildFields([
    { label: "State / UT", value: formatStateLabel(appointment.state) },
    { label: "Passport Office", value: appointment.center },
    { label: "Date", value: appointment.date },
    { label: "Time Slot", value: appointment.slot },
  ]);

  const renderFieldGrid = (fields) => {
    if (!fields.length) {
      return (
        <p className={styles.emptyText}>No details added in this section.</p>
      );
    }

    return (
      <div className={styles.reviewGrid}>
        {fields.map((field) => (
          <p
            key={field.label}
            className={field.fullWidth ? styles.fullWidth : ""}
          >
            <strong>{field.label}:</strong> {field.value}
          </p>
        ))}
      </div>
    );
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
            <p className={styles.eyebrow}>Passport Application · Final Step</p>
            <h1 className={styles.title}>Review & Submit</h1>
            <p className={styles.subtitle}>
              Carefully review all entered details, uploaded documents, and
              appointment information before submitting your passport
              application.
            </p>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.stepBadge}>Final</div>
            <p className={styles.stepText}>Review Application</p>
          </div>
        </div>

        <div className={styles.formCard} id="review-print-area">
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Personal Details</h2>
            </div>
            {renderFieldGrid(personalFields)}
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Address Details</h2>
            </div>
            {renderFieldGrid(addressFields)}
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Identity Details</h2>
            </div>
            {renderFieldGrid(identityFields)}
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Appointment Details</h2>
            </div>
            {renderFieldGrid(appointmentFields)}
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Uploaded Documents</h2>
            </div>

            {uploadedDocs.length ? (
              <div className={styles.documentsGrid}>
                {uploadedDocs.map((doc) => {
                  const file = doc.file;
                  const isImage = file.type?.startsWith("image/");

                  return (
                    <div key={doc.label} className={styles.documentCard}>
                      <p className={styles.documentLabel}>{doc.label}</p>

                      {isImage ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={doc.label}
                          className={styles.documentImage}
                        />
                      ) : (
                        <div className={styles.fileBox}>
                          <span className={styles.fileIcon}>📄</span>
                          <div>
                            <p className={styles.fileName}>{file.name}</p>
                            <p className={styles.fileMeta}>
                              {file.type || "Document"} ·{" "}
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className={styles.emptyText}>No documents uploaded yet.</p>
            )}
          </section>

          <div className={styles.confirmBox}>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              <span>
                I confirm that all details and uploaded documents are correct
                and ready for final submission.
              </span>
            </label>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate("/application/appointment")}
            >
              Back
            </button>

            <button
              type="button"
              className={styles.ghostButton}
              onClick={handleDownload}
            >
              Download Application
            </button>

            <button
              type="button"
              className={styles.primaryButton}
              disabled={!confirmed}
              onClick={handleSubmit}
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
