export default function ProgressBar({ progress }) {
  return (
    <div className="progress-wrapper">
      <div className="progress-label">
        <span>Application Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
