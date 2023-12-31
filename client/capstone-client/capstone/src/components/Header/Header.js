import logo from "../../assets/Logo/blink2.png";
import brand from "../../assets/Icons/venn.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <nav className="header__navbar">
        <div className="header__wrapper">
          <Link to="/" className="header__link">
            <img className="header__logo" src={logo} alt="Logo" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
