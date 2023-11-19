import { Link } from "react-router-dom";
import axios from "axios";
import "./DisplayUsersActive.scss";

//TO DO - WORK OUT HOW TO DISPLAY CONSTANT NUMBER OF EMPTY PROFILES REGARDLESS OF PROPS

function DisplayUsersActive({ usersArray }) {
  // const sortedUsers = usersArray.slice().sort((a, b) => b.active - a.active);

  const sortedUsers = usersArray
    .slice()
    .sort((a, b) => b.expirationTime - a.expirationTime);

  return (
    <section className="display">
      {sortedUsers.slice(0, 9).map((user) => {
        if (user.active === 1) {
          return (
            <Link
              className="display__link"
              to={`/users/${user.id}/posts`}
              key={user.id}
            >
              <article className="profile">
                <div className="profile__wrapper">
                  <img
                    src={user.avatar_url}
                    alt="User Profile"
                    className="profile__image"
                  />
                </div>
                <p className="profile__name">{user.first_name}</p>
              </article>
            </Link>
          );
        } else if (user.active === 0) {
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
    </section>
  );
}

export default DisplayUsersActive;
