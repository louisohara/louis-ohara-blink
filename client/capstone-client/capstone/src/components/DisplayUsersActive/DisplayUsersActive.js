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
  const remainder = limit - sortedUsers.length;

  const articlesArray = new Array(remainder).fill(null);
  return (
    <section className="display">
      {sortedUsers.slice(0, 6).map((user) => {
        //BELOW CODE ENSURES THAT ONLY THE USER'S FRIENDS ARE SHOWN ON THE PAGE AND NOT CURRENT USER
        if (user.active === 1 && currentUser.id !== user.id) {
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

      {show && (
        <DisplayPost
          handleClose={handleClose}
          user={user}
          currentUser={currentUser}
        />
      )}
    </section>
  );
}

export default DisplayUsersActive;
