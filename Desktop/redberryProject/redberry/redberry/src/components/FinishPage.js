import confetti from "../imgs/confetti.png";
import { Link } from "react-router-dom";
export default function FinishPage() {
  return (
    <div className="finish-container">
      <div className="finish-popup">
        <img src={confetti} className="confetti" />
        <h2 className="finish-text">ჩანაწერი დამატებულია!</h2>
        <Link to="/list">
          <button className="goto-list">სიაში გადაყვანა</button>
        </Link>
        <Link to="/" className="goto-main">
          <h3>მთავარი</h3>
        </Link>
      </div>
    </div>
  );
}
