import { Link } from "react-router-dom";
import axios from "axios";
import "./DisplayUsersActive.scss";
import { useState } from "react";
import DisplayPost from "../DisplayPost/DisplayPost";

function DisplayUsersActive({ activeArray, currentUser }) {
  const sortedUsers = activeArray.slice().sort((a, b) => b.active - a.active);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const limit = 6;
  const remainder = limit - sortedUsers.length - currentUser.active;

  const articlesArray = new Array(remainder).fill(null);
  return (
    <section className="display-active display-active--alt">
      <div className="display-active__container">
        {currentUser.active === 1 ? (
          <article className="profile profile--alt">
            <div className="profile__wrapper profile__wrapper--alt">
              <img
                src={currentUser.avatar_url}
                alt="Your Profile"
                className="profile__image profile__image--alt"
                onClick={() => {
                  handleShow();
                  setUser(currentUser);
                }}
              />
            </div>
            <p className="profile__name profile__name--alt">
              {currentUser.first_name}
            </p>
          </article>
        ) : (
          ""
        )}
        {sortedUsers.slice(0, 6).map((user) => {
          if (user.active === 1) {
            return (
              <article className="profile">
                <div className="profile__wrapper">
                  <img
                    src={user.avatar_url}
                    alt="User Profile"
                    className="profile__image"
                    onClick={() => {
                      handleShow();
                      setUser(user);
                    }}
                  />
                </div>
                <p className="profile__name">{user.first_name}</p>
              </article>
            );
          }
        })}
        {articlesArray.map((_, index) => (
          <article key={index} className="profile__empty">
            <div className="profile__wrapper">
              <div className="profile__inner"></div>
            </div>
          </article>
        ))}
      </div>

      {show && (
        <div className="display-active__modal">
          <DisplayPost
            handleClose={handleClose}
            user={user}
            currentUser={currentUser}
          />
        </div>
      )}
    </section>
  );
}

export default DisplayUsersActive;
