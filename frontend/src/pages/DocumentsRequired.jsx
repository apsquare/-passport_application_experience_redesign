import styles from "./DocumentsRequired.module.css";

export default function DocumentsRequired() {
  const sources = [
    {
      title: "Aadhaar Card",
      desc: "Download or update your Aadhaar details online.",
      link: "https://uidai.gov.in/",
    },
    {
      title: "Metriculation Certificate",
      desc: "Download you metriculation certificate from DigiLocker",
      link: "https://www.digilocker.gov.in/",
    },
    {
      title: "Voter ID",
      desc: "Register or download your voter ID.",
      link: "https://voters.eci.gov.in/",
    },
    {
      title: "Birth Certificate",
      desc: "Apply through municipal authority.",
      link: "https://crsorgi.gov.in/",
    },
    {
      title: "Driving License",
      desc: "Manage your driving license.",
      link: "https://parivahan.gov.in/",
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Documents Required for Passport Verification</h1>
          <p>
            Ensure you have the following documents ready before applying. This
            will help speed up your application process.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Proof of Identity (ANY ONE required)</h2>
            <ul>
              <li>Aadhaar Card</li>
              <li>Voter ID</li>
              <li>PAN Card</li>
              <li>Driving License</li>
              <li>Government ID card</li>
            </ul>

            <div className={styles.howToGet}>
              <h4>How to get it?</h4>
              <p>
                Aadhaar can be downloaded from UIDAI website. PAN can be applied
                online via NSDL. Voter ID can be obtained through election
                portal.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Proof of Date of Birth (ANY ONE required)</h2>
            <ul>
              <li>Birth Certificate</li>
              <li>10th Marksheet (SSC Certificate)</li>
              <li>PAN Card</li>
              <li>Aadhaar Card</li>
            </ul>

            <div className={styles.howToGet}>
              <h4>How to get it?</h4>
              <p>
                {" "}
                Birth certificate can be issued from municipal office. 10th
                marksheet is provided by your school board.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Proof of Address (ANY ONE required)</h2>
            <ul>
              <li>Aadhaar Card</li>
              <li>Electricity Bill</li>
              <li>Water Bill</li>
              <li>Bank Passbook</li>
              <li>Rent Agreement</li>
              <li>Voter ID</li>
              <li>Gas Connection Bill</li>
            </ul>

            <div className={styles.howToGet}>
              <h4>How to get it?</h4>
              <p>
                Utility bills are issued monthly. Bank passbook can be obtained
                from your bank. Rent agreements must be notarized.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <h2>5. Additional (Based on Case)</h2>
            <ul>
              <li>For minors - Parents’ passport copy</li>
              <li>
                For married applicants - Marriage Certificate (optional in many
                cases)
              </li>
              <li>For name change - Gazette Notification / Affidavit</li>
              <li>For government employees - Identity Certificate</li>
            </ul>

            <div className={styles.howToGet}>
              <h4>How to get it?</h4>
              <p>
                Utility bills are issued monthly. Bank passbook can be obtained
                from your bank. Rent agreements must be notarized.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.sourcesSection}>
          <h2 className={styles.sectionTitle}>Where to Get These Documents</h2>

          <div className={styles.sourcesGrid}>
            {sources.map((item, index) => (
              <div key={index} className={styles.sourceCard}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sourceBtn}
                >
                  Visit Website →
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tipBox}>
          💡 Tip: Keep both original and photocopies ready during verification.
        </div>
      </div>
    </div>
  );
}
