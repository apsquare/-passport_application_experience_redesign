export default function SaveStatus({ status, time }) {
  return (
    <div className="save-status">
      <strong>{status}</strong>
      {time ? <span> • Last saved at {time}</span> : null}
    </div>
  );
}
