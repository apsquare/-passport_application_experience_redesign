import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SectionCard from "../components/SectionCard";
import FormInput from "../components/FormInput";
import { useAppContext } from "../context/AppContext";
import styles from "./CreateAccount.module.css";

export default function CreateAccount() {
  const navigate = useNavigate();
  const { register } = useAppContext();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    passportNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.passportNumber ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userData = {
      fullName: form.fullName,
      email: form.email.trim().toLowerCase(),
      passportNumber: form.passportNumber.trim().toUpperCase(),
      password: form.password,
    };

    const ok = register(userData);

    if (!ok) {
      setError("An account with this email or passport number already exists.");
      return;
    }

    setSuccess("Account created successfully. You can now log in.");
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  }

  return (
    <div className={styles.page}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftPanel}>
            <p className={styles.badge}>Passport Service Portal</p>
            <h1 className={styles.heading}>Create Your Account</h1>
            <p className={styles.subtext}>
              Register securely to begin your passport application, save your
              progress, and return later using your registered credentials.
            </p>

            <div className={styles.featureList}>
              <div className={styles.featureCard}>
                <h3>Secure Registration</h3>
                <p>Your account helps protect and organize your application.</p>
              </div>

              <div className={styles.featureCard}>
                <h3>Continue Anytime</h3>
                <p>
                  Log back in later and continue exactly where you left off.
                </p>
              </div>

              <div className={styles.featureCard}>
                <h3>Easy Access</h3>
                <p>
                  Use your registered email and passport number details for
                  identification.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.rightPanel}>
            <SectionCard
              title="Create Account"
              subtitle="Fill in your details to register for PassportCare."
            >
              <form onSubmit={handleSubmit} className={styles.form}>
                <FormInput
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your full name"
                />

                <FormInput
                  label="Email Address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your email"
                />

                <FormInput
                  label="Passport Number"
                  name="passportNumber"
                  value={form.passportNumber}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your passport number"
                />

                <FormInput
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Create a password"
                />

                <FormInput
                  label="Confirm Password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  type="password"
                  placeholder="Re-enter your password"
                />

                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}

                <button type="submit" className={styles.submitButton}>
                  Create Account
                </button>

                <p className={styles.loginText}>
                  Already have an account?{" "}
                  <Link to="/login" className={styles.loginLink}>
                    Login
                  </Link>
                </p>
              </form>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
