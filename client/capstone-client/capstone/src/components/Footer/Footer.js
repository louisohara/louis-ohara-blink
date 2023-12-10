import add from "../../assets/Icons/addition.png";
import network from "../../assets/Icons/global-network.png";
import friends from "../../assets/Icons/friends.png";
import "./Footer.scss";

import { NavLink } from "react-router-dom";

const Footer = ({ currentUser, active }) => {
  return (
    <footer className="footer">
      <nav className="footer__navbar">
        <div className="footer__wrapper">
          <div className="footer__container">
            <NavLink
              to={currentUser ? "/active" : "/"}
              className="footer__link"
            >
              <div className="footer__image-container">
                <img
                  src={network}
                  alt="Link to active friends"
                  className="footer__icon"
                />
                {active && active.length > 0 ? (
                  <div className="footer__active">{active.length}</div>
                ) : (
                  ""
                )}
              </div>
            </NavLink>
            <NavLink
              to={currentUser ? `/users/${currentUser.id}` : "/"}
              className="footer__link"
            >
              <div className="footer__image-container">
                <img
                  src={add}
                  alt="Link to create post page"
                  className="footer__icon"
                />
              </div>
            </NavLink>
            <NavLink
              to={currentUser ? "/friends" : "/"}
              className="footer__link"
            >
              <div className="footer__image-container">
                <img
                  src={friends}
                  alt="Link to add friends"
                  className="footer__icon"
                />
              </div>
            </NavLink>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
