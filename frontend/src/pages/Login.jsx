import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SectionCard from "../components/SectionCard";
import FormInput from "../components/FormInput";
import { useAppContext } from "../context/AppContext";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAppContext();

  const [form, setForm] = useState({
    email: "hire-me@anshumat.org",
    password: "HireMe@2025!",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    const result = await login(
      form.email.trim().toLowerCase(),
      form.password.trim(),
    );

    if (result.ok) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Invalid credentials. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <div className={styles.loginWrapper}>
          {/* LEFT PANEL */}
          <div className={styles.leftPanel}>
            <p className={styles.tag}>Passport Service Portal</p>
            <h1 className={styles.heading}>Welcome Back</h1>
            <p className={styles.subtext}>
              Sign in to continue your passport application, review submitted
              details, and track your progress securely.
            </p>

            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h3>Secure Access</h3>
                <p>Your information is protected and available only to you.</p>
              </div>

              <div className={styles.infoCard}>
                <h3>Easy Tracking</h3>
                <p>View your application steps and updates in one place.</p>
              </div>

              <div className={styles.infoCard}>
                <h3>Fast Process</h3>
                <p>Resume your application without starting over again.</p>
              </div>
            </div>
          </div>

          <div className={styles.rightPanel}>
            <SectionCard
              title="Login to PassportCare"
              subtitle="Enter your registered email and password to continue."
            >
              <form onSubmit={handleSubmit} className={styles.form}>
                <FormInput
                  label="Email Address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  autoComplete="email"
                />

                <FormInput
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  autoComplete="current-password"
                />

                {error && <p className={styles.error}>{error}</p>}

                <button
                  className={styles.loginButton}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <p className={styles.registerText}>
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className={styles.registerLink}>
                    Create one
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
