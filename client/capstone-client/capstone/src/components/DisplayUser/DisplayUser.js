import "../DisplayUsers/DisplayUsers.scss";
import "./DisplayUser.scss";

function DisplayUser({ user }) {
  return (
    <article className="profile">
      <div className="profile__wrapper profile__wrapper--alt">
        <img
          src={user.avatar_url}
          alt="User Profile"
          className="profile__image"
        />
      </div>
      <p className="profile__name">{`${user.first_name} ${user.surname}`}</p>
    </article>
  );
}

export default DisplayUser;
