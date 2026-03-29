import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProgressBar from "../components/ProgressBar";
import SaveStatus from "../components/SaveStatus";
import styles from "./IdentityDetails.module.css";

export default function IdentityDetails() {
  const { application, updateApplicationSection, getProgress, saveStatus } =
    useAppContext();

  const navigate = useNavigate();
  const data = application.identity || {};

  const [showPreview, setShowPreview] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const dobDocument = data.dobDocument || "";
  const primaryIdentityDocument = data.primaryIdentityDocument || "";

  const getDobReferenceNumber = (values) => {
    switch (values.dobDocument) {
      case "Birth Certificate":
        return values.birthCertificateNumber || "";
      case "10th Marks Card":
        return values.sscRegisterNumber || "";
      case "School Leaving Certificate":
        return values.schoolLeavingCertificateNumber || "";
      case "PAN Card":
        return values.dobPanNumber || "";
      case "Aadhaar Card":
        return values.dobAadhaarNumber || "";
      case "Previous Passport":
        return values.previousPassportNumber || "";
      default:
        return "";
    }
  };

  const getPrimaryIdentityReferenceNumber = (values) => {
    switch (values.primaryIdentityDocument) {
      case "Aadhaar Card":
        return values.aadhaarNumber || "";
      case "PAN Card":
        return values.panNumber || "";
      case "Voter ID":
        return values.voterIdNumber || "";
      case "Driving License":
        return values.drivingLicenseNumber || "";
      default:
        return "";
    }
  };

  const getDerivedIdentityFields = (values) => {
    return {
      passportType: values.dobDocument || "",
      reason: values.citizenshipStatus || "",
      aadhaar:
        getPrimaryIdentityReferenceNumber(values) ||
        values.primaryIdentityDocument ||
        "",
      pan: getDobReferenceNumber(values) || values.dobDocument || "",
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedValues = {
      ...data,
      [name]: value,
    };

    updateApplicationSection("identity", {
      [name]: value,
      ...getDerivedIdentityFields(updatedValues),
    });

    setConfirmed(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedValues = {
      ...data,
    };

    updateApplicationSection("identity", {
      ...getDerivedIdentityFields(updatedValues),
    });

    setShowPreview(true);
  };

  const handleContinue = () => {
    if (!confirmed) return;
    navigate("/DocumentUpload");
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
            <p className={styles.eyebrow}>Passport Application · Step 3</p>
            <h1 className={styles.title}>Identity Details</h1>
            <p className={styles.subtitle}>
              Provide your date of birth proof and primary identity details
              carefully. These documents will be used for verification during
              passport processing.
            </p>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.stepBadge}>Step 3</div>
            <p className={styles.stepText}>Identity Verification</p>
          </div>
        </div>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Date of Birth Proof</h2>
            <div className={styles.grid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label htmlFor="dobDocument">
                  Accepted DOB Document
                  <span className={styles.required}>*</span>
                </label>
                <select
                  id="dobDocument"
                  name="dobDocument"
                  value={dobDocument}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select DOB proof document</option>
                  <option value="Birth Certificate">
                    Birth Certificate (Municipal Authority / Registrar)
                  </option>
                  <option value="10th Marks Card">
                    10th Marks Card / SSC Certificate
                  </option>
                  <option value="School Leaving Certificate">
                    School Leaving Certificate
                  </option>

                  <option value="Previous Passport">Previous Passport</option>
                </select>
              </div>

              {dobDocument === "Birth Certificate" && (
                <>
                  <div className={styles.inputGroup}>
                    <label htmlFor="birthCertificateNumber">
                      Birth Certificate Number
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="birthCertificateNumber"
                      name="birthCertificateNumber"
                      type="text"
                      value={data.birthCertificateNumber || ""}
                      onChange={handleChange}
                      placeholder="Enter certificate number"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="birthCertificateAuthority">
                      Issuing Authority
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="birthCertificateAuthority"
                      name="birthCertificateAuthority"
                      type="text"
                      value={data.birthCertificateAuthority || ""}
                      onChange={handleChange}
                      placeholder="Municipal Authority / Registrar"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="birthCertificateIssueDate">
                      Issue Date
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="birthCertificateIssueDate"
                      name="birthCertificateIssueDate"
                      type="date"
                      value={data.birthCertificateIssueDate || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              {dobDocument === "10th Marks Card" && (
                <>
                  <div className={styles.inputGroup}>
                    <label htmlFor="sscBoard">
                      Board / University
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="sscBoard"
                      name="sscBoard"
                      type="text"
                      value={data.sscBoard || ""}
                      onChange={handleChange}
                      placeholder="Enter board name"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="sscSchoolName">
                      School Name
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="sscSchoolName"
                      name="sscSchoolName"
                      type="text"
                      value={data.sscSchoolName || ""}
                      onChange={handleChange}
                      placeholder="Enter school name"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="sscRegisterNumber">
                      Register / Roll Number
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="sscRegisterNumber"
                      name="sscRegisterNumber"
                      type="text"
                      value={data.sscRegisterNumber || ""}
                      onChange={handleChange}
                      placeholder="Enter register number"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="sscYearOfPassing">
                      Year of Passing
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="sscYearOfPassing"
                      name="sscYearOfPassing"
                      type="number"
                      value={data.sscYearOfPassing || ""}
                      onChange={handleChange}
                      placeholder="Enter year of passing"
                      required
                    />
                  </div>
                </>
              )}

              {dobDocument === "School Leaving Certificate" && (
                <>
                  <div className={styles.inputGroup}>
                    <label htmlFor="schoolLeavingCertificateNumber">
                      Certificate Number
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="schoolLeavingCertificateNumber"
                      name="schoolLeavingCertificateNumber"
                      type="text"
                      value={data.schoolLeavingCertificateNumber || ""}
                      onChange={handleChange}
                      placeholder="Enter certificate number"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="schoolLeavingSchoolName">
                      School Name
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="schoolLeavingSchoolName"
                      name="schoolLeavingSchoolName"
                      type="text"
                      value={data.schoolLeavingSchoolName || ""}
                      onChange={handleChange}
                      placeholder="Enter school name"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="schoolLeavingIssueYear">
                      Year of Issue
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="schoolLeavingIssueYear"
                      name="schoolLeavingIssueYear"
                      type="number"
                      value={data.schoolLeavingIssueYear || ""}
                      onChange={handleChange}
                      placeholder="Enter issue year"
                      required
                    />
                  </div>
                </>
              )}

              {dobDocument === "PAN Card" && (
                <div className={styles.inputGroup}>
                  <label htmlFor="dobPanNumber">
                    PAN Number
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="dobPanNumber"
                    name="dobPanNumber"
                    type="text"
                    value={data.dobPanNumber || ""}
                    onChange={handleChange}
                    placeholder="Enter PAN number"
                    maxLength={10}
                    required
                  />
                </div>
              )}

              {dobDocument === "Aadhaar Card" && (
                <div className={styles.inputGroup}>
                  <label htmlFor="dobAadhaarNumber">
                    Aadhaar Number
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="dobAadhaarNumber"
                    name="dobAadhaarNumber"
                    type="text"
                    value={data.dobAadhaarNumber || ""}
                    onChange={handleChange}
                    placeholder="Enter 12-digit Aadhaar number"
                    maxLength={12}
                    required
                  />
                </div>
              )}

              {dobDocument === "Previous Passport" && (
                <>
                  <div className={styles.inputGroup}>
                    <label htmlFor="previousPassportNumber">
                      Previous Passport Number
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="previousPassportNumber"
                      name="previousPassportNumber"
                      type="text"
                      value={data.previousPassportNumber || ""}
                      onChange={handleChange}
                      placeholder="Enter passport number"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="previousPassportIssueDate">
                      Issue Date
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="previousPassportIssueDate"
                      name="previousPassportIssueDate"
                      type="date"
                      value={data.previousPassportIssueDate || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Primary Identity Document</h2>
            <div className={styles.grid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label htmlFor="primaryIdentityDocument">
                  Primary Identity Document
                  <span className={styles.required}>*</span>
                </label>
                <select
                  id="primaryIdentityDocument"
                  name="primaryIdentityDocument"
                  value={primaryIdentityDocument}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select identity document</option>
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Voter ID">Voter ID (EPIC Card)</option>
                  <option value="Driving License">Driving License</option>
                </select>
              </div>

              {primaryIdentityDocument === "Aadhaar Card" && (
                <>
                  <div className={styles.inputGroup}>
                    <label htmlFor="aadhaarNumber">
                      Aadhaar Number
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="aadhaarNumber"
                      name="aadhaarNumber"
                      type="text"
                      value={data.aadhaarNumber || ""}
                      onChange={handleChange}
                      placeholder="Enter 12-digit Aadhaar number"
                      maxLength={12}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="aadhaarName">
                      Name on Aadhaar
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="aadhaarName"
                      name="aadhaarName"
                      type="text"
                      value={data.aadhaarName || ""}
                      onChange={handleChange}
                      placeholder="Enter full name as per Aadhaar"
                      required
                    />
                  </div>
                </>
              )}

              {primaryIdentityDocument === "PAN Card" && (
                <>
                  <div className={styles.inputGroup}>
                    <label htmlFor="panNumber">
                      PAN Number
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="panNumber"
                      name="panNumber"
                      type="text"
                      value={data.panNumber || ""}
                      onChange={handleChange}
                      placeholder="Enter PAN number"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="panName">
                      Name on PAN
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="panName"
                      name="panName"
                      type="text"
                      value={data.panName || ""}
                      onChange={handleChange}
                      placeholder="Enter full name as per PAN"
                      required
                    />
                  </div>
                </>
              )}

              {primaryIdentityDocument === "Voter ID" && (
                <>
                  <div className={styles.inputGroup}>
                    <label htmlFor="voterIdNumber">
                      Voter ID Number
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="voterIdNumber"
                      name="voterIdNumber"
                      type="text"
                      value={data.voterIdNumber || ""}
                      onChange={handleChange}
                      placeholder="Enter EPIC number"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="voterConstituency">
                      Constituency
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="voterConstituency"
                      name="voterConstituency"
                      type="text"
                      value={data.voterConstituency || ""}
                      onChange={handleChange}
                      placeholder="Enter constituency"
                      required
                    />
                  </div>
                </>
              )}

              {primaryIdentityDocument === "Driving License" && (
                <>
                  <div className={styles.inputGroup}>
                    <label htmlFor="drivingLicenseNumber">
                      Driving License Number
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="drivingLicenseNumber"
                      name="drivingLicenseNumber"
                      type="text"
                      value={data.drivingLicenseNumber || ""}
                      onChange={handleChange}
                      placeholder="Enter license number"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="licenseIssueState">
                      Issuing State
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="licenseIssueState"
                      name="licenseIssueState"
                      type="text"
                      value={data.licenseIssueState || ""}
                      onChange={handleChange}
                      placeholder="Enter issuing state"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="licenseExpiryDate">
                      Expiry Date
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="licenseExpiryDate"
                      name="licenseExpiryDate"
                      type="date"
                      value={data.licenseExpiryDate || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              General Verification Details
            </h2>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label htmlFor="citizenshipStatus">
                  Citizenship Status
                  <span className={styles.required}>*</span>
                </label>
                <select
                  id="citizenshipStatus"
                  name="citizenshipStatus"
                  value={data.citizenshipStatus || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="Indian by Birth">Indian by Birth</option>
                  <option value="Indian by Descent">Indian by Descent</option>
                  <option value="Naturalized Citizen">
                    Naturalized Citizen
                  </option>
                </select>
              </div>
            </div>
          </section>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate("/AddressDetails")}
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
              <h3>Preview Identity Details</h3>
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
                <strong>DOB Proof:</strong> {data.dobDocument || "-"}
              </p>
              <p>
                <strong>Primary Identity Document:</strong>{" "}
                {data.primaryIdentityDocument || "-"}
              </p>
              <p>
                <strong>Citizenship Status:</strong>{" "}
                {data.citizenshipStatus || "-"}
              </p>
            </div>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              <span>
                I confirm that all the above identity details are correct.
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
