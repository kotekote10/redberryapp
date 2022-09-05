import startimg from "../imgs/starterpage.png";
import logoimg from "../imgs/redberrylogo.png";
import phonestart from "../imgs/phonestart.png";
import { Link } from "react-router-dom";
export default function StartPage() {
  return (
    <div className="starter-page">
      <img src={phonestart} className="phone-img" />
      <img
        src={logoimg}
        alt="Should show an image here."
        className="starter-logo"
      />
      <img
        src={startimg}
        alt="Should show an image here."
        className="starter-img"
      />
      <div className="starter-buttons">
        <Link to="/stuff">
          <button className="starter-add">ჩანაწერების დამატება</button>
        </Link>
        <Link to="/list">
          <button className="starter-list">ჩანაწერების სია</button>
        </Link>
      </div>
    </div>
  );
}
