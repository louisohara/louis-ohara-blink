import logo from "../../assets/Logo/InStock-Logo.svg";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = ({ currentUser }) => {
  return (
    <header className="header">
      <nav className="header__navbar">
        <div className="header__wrapper">
          <Link to="/" className="header__link">
            <img className="header__logo" src={logo} alt="Logo" />
          </Link>

          {/* <div className="header__container">
            <NavLink to={`/`} className="header__link">
              <div className="header__warehouse">ACTIVE NOW</div>
            </NavLink>
            <NavLink to="/users/friends" className="header__link">
              <div className="header__warehouse">ADD FRIENDS</div>
            </NavLink>
            <NavLink to={`/users/${currentUser.id}`} className="header__link">
              <div className="header__warehouse">POST</div>
            </NavLink>
          </div> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
