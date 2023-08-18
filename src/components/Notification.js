import "./Notification.css";

export default function Notification({ show }) {
  return (
    <div className={`notification ${show ? "show" : ""}`}>
      <p>🔔 You have already entered this letter.</p>
    </div>
  );
}
