import { Link } from "react-router-dom";
import SectionCard from "../components/SectionCard";
import { useAppContext } from "../context/AppContext";

export default function Success() {
  const { application } = useAppContext();

  return (
    <div className="page">
      <div className="container narrow">
        <SectionCard
          title="Application Submitted Successfully"
          subtitle="Your passport application has been recorded."
        >
          <div className="success-box">
            <p>
              <strong>Application ID:</strong> {application.applicationId}
            </p>
            <p>
              <strong>Status:</strong> {application.status}
            </p>
            <p>
              <strong>Submitted At:</strong> {application.submittedAt}
            </p>
            <p>
              <strong>Appointment:</strong> {application.appointment.center},{" "}
              {application.appointment.date}, {application.appointment.slot}
            </p>
          </div>

          <div className="info-panel">
            <h4>Next steps</h4>
            <ul>
              <li>Keep your application ID safe</li>
              <li>Visit the selected center on time</li>
              <li>Carry original supporting documents</li>
            </ul>
          </div>

          <div className="actions">
            <Link className="btn btn-outline" to="/dashboard">
              Go to Dashboard
            </Link>
            <button className="btn btn-primary" onClick={() => window.print()}>
              Download / Print Receipt
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
