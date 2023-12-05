import "./DisplayUsersActive.scss";
import { useState } from "react";
import DisplayPost from "../DisplayPost/DisplayPost";

function DisplayUsersActive({ activeArray, currentUser }) {
  console.log(activeArray.length);
  const filteredArray = activeArray.filter((user) => user.active === 1);
  const sortedUsers = filteredArray.slice().sort((a, b) => b.active - a.active);

  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const limit = 6;
  const remainder = limit - sortedUsers.length;

  const articlesArray = new Array(remainder).fill(null);
  return (
    <section className="display-active display-active--alt">
      <div className="display-active__container">
        {sortedUsers.slice(0, 6).map((User) => {
          if (User.active === 1) {
            return (
              <article className="profile-active" key={User.id}>
                <div
                  className={
                    show && user === User
                      ? `profile-active__wrapper profile-active__wrapper--alt`
                      : `profile-active__wrapper`
                  }
                >
                  <img
                    src={User.avatar_url}
                    alt="User Profile"
                    className="profile-active__image"
                    onClick={() => {
                      handleShow();
                      setUser(User);
                    }}
                  />
                </div>
                <p className="profile-active__name">{User.first_name}</p>
              </article>
            );
          }
        })}
        {articlesArray.map((_, index) => (
          <article key={index} className="profile-active__empty">
            <div className="profile-active__wrapper">
              <div className="profile-active__inner"></div>
            </div>
          </article>
        ))}
      </div>

      {show && (
        // <div className="display-active__modal">
        <DisplayPost
          handleClose={handleClose}
          user={user}
          currentUser={currentUser}
        />
        // </div>
      )}
    </section>
  );
}

export default DisplayUsersActive;
