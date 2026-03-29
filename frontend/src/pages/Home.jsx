import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import heroImage from "../assets/hero1.png";
import emblem from "../assets/emblem.svg";

const officeGroups = [
  {
    region: "Karnataka / Bengaluru Region",
    offices: [
      "POPSK Ballari",
      "POPSK Belagavi",
      "POPSK Mysuru",
      "POPSK Tumkuru",
      "POPSK Udupi",
      "Post Office PSK Jalahalli",
    ],
  },
  {
    region: "Tamil Nadu / Chennai Region",
    offices: [
      "Post Office PSK Chennai GPO",
      "Post Office PSK Kancheepuram",
      "Post Office PSK Tiruvallur",
      "POPSK Cuddalore",
      "POPSK Vellore",
      "Post Office PSK Chidambaram",
    ],
  },
  {
    region: "North East / Islands",
    offices: [
      "Post Office PSK Tezpur",
      "Post Office PSK Tinsukia",
      "Post Office PSK Tura",
      "POPSK Port Blair",
    ],
  },
];

const helpItems = [
  {
    title: "National Call Centre",
    value: "1800-258-1800",
    note: "Toll-free Passport Seva helpline",
  },
  {
    title: "Support Availability",
    value: "24x7",
    note: "Call centre support with grievance registration",
  },
  {
    title: "Languages Supported",
    value: "17 Languages",
    note: "Citizen support through the National Call Centre",
  },
  {
    title: "Office Network",
    value: "37 RPOs · 93 PSKs · 450+ POPSKs",
    note: "Nationwide Passport Seva network",
  },
];

const faqs = [
  {
    question: "How do I start my passport application on this website?",
    answer:
      "Click on 'Create Account' to create an account, then follow the guided steps to fill your personal, address, and identity details.",
  },
  {
    question: "Do I need to complete everything at once?",
    answer:
      "No. Your progress is automatically saved, so you can come back anytime and continue from where you left off.",
  },
  {
    question: "What details do I need to fill in the application?",
    answer:
      "You will need to provide personal details, address information, identity proof details, and upload required documents.",
  },
  {
    question: "Can I preview my application before submitting?",
    answer:
      "Yes. Before moving to the next step, you can preview your entered details and confirm them for accuracy.",
  },
  {
    question: "How do I track my application status?",
    answer:
      "Use the 'Login' option and navigate to your dashboard to view real-time updates on your application progress.",
  },
  {
    question: "What happens after I submit my application?",
    answer:
      "Once submitted, your application will be processed and you will be guided to book an appointment for verification.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <div className={styles.govtRow}>
            <img
              src={emblem}
              alt="Government of India Emblem"
              className={styles.emblem}
            />
            <p className={styles.govtText}>Government of India</p>
          </div>

          <h1 className={styles.title}>Passport Seva</h1>

          <p className={styles.subtitle}>
            Apply for your passport securely and efficiently through the
            official digital portal. Complete your application, upload
            documents, and track your progress in one place.
          </p>

          <div className={styles.actions}>
            <button
              className={styles.primaryButton}
              onClick={() => navigate("/register")}
            >
              Register
            </button>

            <button
              className={styles.secondaryButton}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </section>

      <section id="offices" className={styles.infoSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Passport Offices</p>
            <h2 className={styles.sectionTitle}>
              Post Office Passport Seva Kendras
            </h2>
            <p className={styles.sectionText}>
              A few official POPSK locations from the Passport Seva network are
              listed below for quick reference.
            </p>
          </div>

          <div className={styles.officeGrid}>
            {officeGroups.map((group) => (
              <div key={group.region} className={styles.infoCard}>
                <h3 className={styles.cardTitle}>{group.region}</h3>
                <ul className={styles.officeList}>
                  {group.offices.map((office) => (
                    <li key={office}>{office}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="help" className={styles.infoSectionAlt}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Help & Support</p>
            <h2 className={styles.sectionTitle}>Helpline Information</h2>
            <p className={styles.sectionText}>
              Reach Passport Seva support for assistance, service guidance, and
              grievance registration.
            </p>
          </div>

          <div className={styles.helpGrid}>
            {helpItems.map((item) => (
              <div key={item.title} className={styles.helpCard}>
                <p className={styles.helpLabel}>{item.title}</p>
                <h3 className={styles.helpValue}>{item.value}</h3>
                <p className={styles.helpNote}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Need More Clarity?</p>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionText}>
              Quick answers to common passport application questions.
            </p>
          </div>

          <div className={styles.faqGrid}>
            {faqs.map((faq) => (
              <div key={faq.question} className={styles.faqCard}>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
