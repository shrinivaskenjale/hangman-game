import "./Popup.css";

export default function Popup({ message, onClick }) {
  return (
    <div className="popup-container show">
      <div className="popup">
        <h2>{message}</h2>
        <button type="button" onClick={onClick}>
          play again
        </button>
      </div>
    </div>
  );
}
