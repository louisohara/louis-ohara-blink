import { Link } from "react-router-dom";
import axios from "axios";
import "./DisplayUsersActive.scss";
import { useState } from "react";
import DisplayPost from "../DisplayPost/DisplayPost";

//TO DO - WORK OUT HOW TO DISPLAY CONSTANT NUMBER OF EMPTY PROFILES REGARDLESS OF PROPS

function DisplayUsersActive({ usersArray, activeArray, currentUser }) {
  // const sortedUsers = usersArray.slice().sort((a, b) => b.active - a.active);

  const sortedUsers = activeArray.slice().sort((a, b) => b.active - a.active);
  const [show, setShow] = useState(false);
  //ADDITION
  const [user, setUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className="display">
      {sortedUsers.slice(0, 6).map((user) => {
        if (user.active === 1) {
          return (
            // <Link
            //   className="display__link"
            //   to={`/users/${user.id}/posts`}
            //   key={user.id}
            // >
            <article className="profile">
              <div className="profile__wrapper">
                <img
                  src={user.avatar_url}
                  alt="User Profile"
                  className="profile__image"
                  // ADDITION
                  onClick={() => {
                    handleShow();
                    setUser(user);
                  }}
                />
              </div>
              <p className="profile__name">{user.first_name}</p>
            </article>
            // </Link>
          );
          // } else if (user.active === 0) {
        }
      })}{" "}
      {usersArray.slice(0, 9).map((user) => {
        {
          return (
            <article className="profile__empty" key={user.id}>
              <div className="profile__wrapper">
                <div className="profile__inner"></div>
              </div>
            </article>
          );
        }
        return null;
      })}
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
