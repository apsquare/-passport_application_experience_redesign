import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProgressBar from "../components/ProgressBar";
import SaveStatus from "../components/SaveStatus";
import styles from "./AppointmentBooking.module.css";

const passportOfficesByState = {
  AndhraPradesh: [
    "PSK Visakhapatnam",
    "PSK Vijayawada",
    "PSK Tirupati",
    "POPSK Kurnool",
    "POPSK Rajahmundry",
  ],
  ArunachalPradesh: ["PSK Itanagar"],
  Assam: [
    "PSK Guwahati",
    "POPSK Silchar",
    "POPSK Tinsukia",
    "POPSK Nagaon",
    "POPSK Dhubri",
  ],
  Bihar: [
    "PSK Patna",
    "POPSK Muzaffarpur",
    "POPSK Bhagalpur",
    "POPSK Gaya",
    "POPSK Purnea",
  ],
  Chhattisgarh: [
    "PSK Raipur",
    "POPSK Bilaspur",
    "POPSK Durg",
    "POPSK Rajnandgaon",
  ],
  Goa: ["PSK Panaji"],
  Gujarat: [
    "PSK Mithakali, Ahmedabad",
    "PSK Vijay Cross Road, Ahmedabad",
    "PSK Rajkot",
    "PSK Vadodara",
    "POPSK Surat",
    "POPSK Bhavnagar",
    "POPSK Jamnagar",
  ],
  Haryana: [
    "PSK Ambala",
    "POPSK Karnal",
    "POPSK Hisar",
    "POPSK Faridabad",
    "POPSK Gurugram",
  ],
  HimachalPradesh: [
    "PSK Shimla",
    "POPSK Dharamshala",
    "POPSK Mandi",
    "POPSK Hamirpur",
  ],
  Jharkhand: [
    "PSK Ranchi",
    "POPSK Jamshedpur",
    "POPSK Dhanbad",
    "POPSK Bokaro",
  ],
  Karnataka: [
    "PSK Bengaluru, Lalbagh",
    "PSK Bengaluru, Sai Arcade",
    "PSK Mangaluru",
    "PSK Hubli-Dharwad",
    "PSLK Kalaburagi",
    "POPSK Mysuru",
    "POPSK Shivamogga",
    "POPSK Belagavi",
  ],
  Kerala: [
    "PSK Kochi",
    "PSK Kozhikode",
    "POPSK Kottayam",
    "POPSK Palakkad",
    "POPSK Chengannur",
  ],
  MadhyaPradesh: [
    "PSK Bhopal",
    "PSK Indore",
    "POPSK Gwalior",
    "POPSK Jabalpur",
    "POPSK Sagar",
  ],
  Maharashtra: [
    "PSK Mumbai South",
    "PSK Mumbai North",
    "PSK Pune",
    "PSK Nagpur",
    "PSK Nashik",
    "POPSK Kolhapur",
    "POPSK Aurangabad",
    "POPSK Solapur",
  ],
  Manipur: ["PSK Imphal"],
  Meghalaya: ["PSK Shillong"],
  Mizoram: ["PSK Aizawl"],
  Nagaland: ["PSK Dimapur"],
  Odisha: [
    "PSK Bhubaneswar",
    "POPSK Cuttack",
    "POPSK Sambalpur",
    "POPSK Berhampur",
    "POPSK Rourkela",
  ],
  Punjab: [
    "PSK Amritsar",
    "PSK Jalandhar",
    "POPSK Ludhiana",
    "POPSK Patiala",
    "POPSK Bathinda",
  ],
  Rajasthan: [
    "PSK Jaipur",
    "PSK Jodhpur",
    "POPSK Ajmer",
    "POPSK Kota",
    "POPSK Alwar",
    "POPSK Bikaner",
  ],
  Sikkim: ["POPSK Gangtok"],
  TamilNadu: [
    "PSK Chennai",
    "PSK Coimbatore",
    "PSK Madurai",
    "POPSK Salem",
    "POPSK Tiruchirappalli",
    "POPSK Vellore",
  ],
  Telangana: [
    "PSK Hyderabad, Begumpet",
    "PSK Ameerpet",
    "POPSK Warangal",
    "POPSK Khammam",
    "POPSK Nalgonda",
    "POPSK Karimnagar",
  ],
  Tripura: ["POPSK Agartala"],
  UttarPradesh: [
    "PSK Lucknow",
    "PSK Ghaziabad",
    "PSK Kanpur",
    "POPSK Prayagraj",
    "POPSK Varanasi",
    "POPSK Gorakhpur",
    "POPSK Agra",
  ],
  Uttarakhand: ["PSK Dehradun", "POPSK Haldwani", "POPSK Roorkee"],
  WestBengal: [
    "PSK Kolkata",
    "POPSK Siliguri",
    "POPSK Asansol",
    "POPSK Berhampore",
    "POPSK Malda",
  ],

  AndamanAndNicobarIslands: ["POPSK Port Blair"],
  Chandigarh: ["PSK Chandigarh"],
  DadraAndNagarHaveliAndDamanAndDiu: ["POPSK Daman", "POPSK Silvassa"],
  Delhi: [
    "PSK Herald House",
    "PSK Shalimar Place",
    "PSK R K Puram",
    "POPSK Janakpuri",
    "POPSK Nehru Place",
  ],
  JammuAndKashmir: ["PSK Jammu", "PSK Srinagar"],
  Ladakh: ["POPSK Leh"],
  Lakshadweep: ["POPSK Kavaratti"],
  Puducherry: ["POPSK Puducherry"],
};

const timeSlots = ["09:30 AM", "11:00 AM", "02:00 PM", "03:30 PM"];

function formatStateLabel(value) {
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

  return labels[value] || value;
}

function formatDateLabel(date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toInputDate(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getNextThreeWorkingDays() {
  const dates = [];
  const current = new Date();
  current.setHours(0, 0, 0, 0);

  current.setDate(current.getDate() + 1); // exclude today

  while (dates.length < 3) {
    const day = current.getDay(); // 0 Sun, 6 Sat

    if (day !== 0 && day !== 6) {
      dates.push(new Date(current));
    }

    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export default function AppointmentBooking() {
  const { application, updateApplicationSection, getProgress, saveStatus } =
    useAppContext();

  const navigate = useNavigate();
  const data = application.appointment || {};

  const [showPreview, setShowPreview] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const states = useMemo(() => Object.keys(passportOfficesByState).sort(), []);

  const availableCenters = useMemo(() => {
    return passportOfficesByState[data.state] || [];
  }, [data.state]);

  const allowedDates = useMemo(() => getNextThreeWorkingDays(), []);
  const allowedDateOptions = useMemo(
    () =>
      allowedDates.map((date) => ({
        value: toInputDate(date),
        label: formatDateLabel(date),
      })),
    [allowedDates],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      updateApplicationSection("appointment", {
        state: value,
        center: "",
      });
      setConfirmed(false);
      return;
    }

    updateApplicationSection("appointment", {
      [name]: value,
    });

    setConfirmed(false);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleContinue = () => {
    if (!confirmed) return;
    navigate("/ReviewSubmit");
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
            <p className={styles.eyebrow}>Passport Application · Step 5</p>
            <h1 className={styles.title}>Book Appointment</h1>
            <p className={styles.subtitle}>
              Select the state you live in, choose an available passport office,
              then pick one of the next three working days and a time slot.
            </p>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.stepBadge}>Step 5</div>
            <p className={styles.stepText}>Appointment Booking</p>
          </div>
        </div>

        <form className={styles.formCard} onSubmit={handlePreview}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Appointment Details</h2>

            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label htmlFor="state">
                  State / UT You Live In
                  <span className={styles.required}>*</span>
                </label>
                <select
                  id="state"
                  name="state"
                  value={data.state || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your state / UT</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {formatStateLabel(state)}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="center">
                  Passport Office
                  <span className={styles.required}>*</span>
                </label>
                <select
                  id="center"
                  name="center"
                  value={data.center || ""}
                  onChange={handleChange}
                  required
                  disabled={!data.state}
                >
                  <option value="">
                    {data.state
                      ? "Select a passport office"
                      : "Select state / UT first"}
                  </option>
                  {availableCenters.map((center) => (
                    <option key={center} value={center}>
                      {center}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="date">
                  Appointment Date
                  <span className={styles.required}>*</span>
                </label>
                <select
                  id="date"
                  name="date"
                  value={data.date || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a working day</option>
                  {allowedDateOptions.map((dateOption) => (
                    <option key={dateOption.value} value={dateOption.value}>
                      {dateOption.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="slot">
                  Time Slot
                  <span className={styles.required}>*</span>
                </label>
                <select
                  id="slot"
                  name="slot"
                  value={data.slot || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate("/application/documents")}
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
              <h3>Preview Appointment Details</h3>
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
                <strong>State / UT:</strong>{" "}
                {data.state ? formatStateLabel(data.state) : "-"}
              </p>
              <p>
                <strong>Passport Office:</strong> {data.center || "-"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {data.date
                  ? allowedDateOptions.find((item) => item.value === data.date)
                      ?.label || data.date
                  : "-"}
              </p>
              <p>
                <strong>Time Slot:</strong> {data.slot || "-"}
              </p>
            </div>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              <span>
                I confirm that the above appointment details are correct.
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
                Confirm & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
