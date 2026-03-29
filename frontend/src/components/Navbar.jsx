import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === "/";

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={handleNavClick}>
          PassportSeva
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        <div
          className={`${styles.menuArea} ${menuOpen ? styles.menuOpen : ""}`}
        >
          <div className={styles.navLinks}>
            <Link to="/" onClick={handleNavClick}>
              Home
            </Link>

            <Link to="/DocumentsRequired" onClick={handleNavClick}>
              Documents Required
            </Link>

            {isHome && (
              <>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => scrollToSection("offices")}
                >
                  Offices
                </button>

                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => scrollToSection("help")}
                >
                  Help
                </button>
              </>
            )}

            {user.isLoggedIn && (
              <Link
                to="/dashboard"
                className={styles.dashboardLink}
                onClick={handleNavClick}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className={styles.actions}>
            {user.isLoggedIn ? (
              <button
                type="button"
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className={styles.loginButton}
                onClick={handleNavClick}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
