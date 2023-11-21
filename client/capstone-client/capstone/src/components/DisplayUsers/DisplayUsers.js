import { Link } from "react-router-dom";
import "./DisplayUsers.scss";

//DISPLAYS FRIENDS

function DisplayUsers({ usersArray }) {
  // const sortedUsers = usersArray.slice().sort((a, b) => b.active - a.active);

  return (
    <section className="display">
      {usersArray.slice(0).map((user) => {
        // if (user.active === 1) {
        // console.log(user.active === 1);
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
      {usersArray === [] ? (
        <article className="profile__empty">
          <div className="profile__wrapper">
            <div className="profile__inner"></div>
          </div>
        </article>
      ) : (
        ""
      )}
      {/* // ); */}
      {/* // } */}
      {/* // return null; */}
      {/* // })} */}
    </section>
  );
}

export default DisplayUsers;
