import { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAppContext();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;

    setError("");
    setSuccess("");

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // 🔥 VALIDATION FUNCTION
  function validateForm() {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

    if (!formData.fullName || !nameRegex.test(formData.fullName)) {
      return "Enter a valid full name (only letters, min 3 characters).";
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      return "Enter a valid email address.";
    }

    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      return "Phone number must be exactly 10 digits.";
    }

    if (!formData.dob) {
      return "Please select your date of birth.";
    }

    if (!passwordRegex.test(formData.password)) {
      return "Password must have 6+ chars, 1 uppercase, 1 number, 1 special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    const result = await register({
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      dob: formData.dob,
      password: formData.password,
    });

    if (!result.ok) {
      setError(result.error || "Registration failed.");
      setLoading(false);
      return;
    }

    setSuccess("Registration successful! Redirecting to login...");

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      password: "",
      confirmPassword: "",
    });

    setLoading(false);
  }

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <div className={styles.registerLeft}>
          <h1>Get Started with Your Passport Application</h1>
          <p>
            Register here to begin your passport application process safely and
            securely.
          </p>
        </div>

        <div className={styles.registerRight}>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <h2>Register</h2>

            {error && <p className={styles.errorMsg}>{error}</p>}
            {success && <p className={styles.successMsg}>{success}</p>}

            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Strong password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className={styles.registerBtn}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            <p className={styles.loginText}>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
