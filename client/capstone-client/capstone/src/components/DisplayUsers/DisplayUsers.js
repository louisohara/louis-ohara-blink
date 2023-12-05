import { Link } from "react-router-dom";
import "./DisplayUsers.scss";

function DisplayUsers({ usersArray }) {
  const limit = 6;
  const remainder = limit - usersArray.length;
  const articlesArray = new Array(remainder).fill(null);
  return (
    <section className="display">
      <div className="display__inner">
        {usersArray.slice(0).map((user) => {
          return (
            <Link
              className="display__link"
              to={`/users/${user.id}`}
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
        })}
        {articlesArray.map((_, index) => (
          <article key={index} className="profile__empty">
            <div className="profile__wrapper">
              <div className="profile__inner"></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DisplayUsers;
