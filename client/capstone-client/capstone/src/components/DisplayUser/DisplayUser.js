function DisplayUser({ user }) {
  return (
    <article className="profile">
      <div className="profile__wrapper">
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
