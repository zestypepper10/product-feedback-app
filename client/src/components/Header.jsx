import { Link } from "react-router-dom";
import iconPlus from "../assets/icons/icon-plus.svg";

function Header() {
  return (
    <header className="page-header">
      <div className="page-header__text">
        <p className="page-header__eyebrow">Feedback Board</p>
        <h1>Product Feedback</h1>
      </div>
      <Link to="/new" className="button button--primary">
        <img src={iconPlus} alt="" aria-hidden="true" />
        Add Feedback
      </Link>
    </header>
  );
}

export default Header;
