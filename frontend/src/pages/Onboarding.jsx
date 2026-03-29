import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionCard from "../components/SectionCard";
import FormInput from "../components/FormInput";
import { useAppContext } from "../context/AppContext";

export default function Onboarding() {
  const { user, updateUser } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user.name || "",
    dob: user.dob || "",
    city: user.city || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    updateUser(form);
    navigate("/dashboard");
  };

  return (
    <div className="page">
      <div className="container narrow">
        <SectionCard
          title="Welcome to Passport Services"
          subtitle="Before you begin, tell us a little about yourself."
        >
          <form onSubmit={handleContinue}>
            <FormInput
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <FormInput
              label="Date of Birth"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              type="date"
            />
            <FormInput
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />

            <div className="info-panel">
              <h4>Application overview</h4>
              <ul>
                <li>Time required: around 10–15 minutes</li>
                <li>Keep photo ID and address proof ready</li>
                <li>You can save your progress anytime</li>
              </ul>
            </div>

            <button type="submit" className="btn btn-primary full-width">
              Continue to Dashboard
            </button>
          </form>
        </SectionCard>
      </div>
    </div>
  );
}
