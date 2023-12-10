import DisplayUsers from "../components/DisplayUsers/DisplayUsers";
import { useState } from "react";
import { useRef, useEffect } from "react";
import axios from "axios";

import AddFriends from "../components/AddFriends/AddFriends";
import "./UserFriendsPage.scss";

function UserFriendsPage({ currentUser, users }) {
  const [userFriends, setUserFriends] = useState(null);
  const containerRef = useRef(null);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const baseURL = `http://localhost:8080/api/users/${currentUser.id}/friends`;
  const getUserFriends = async () => {
    try {
      const { data } = await axios.get(baseURL);
      console.log(data);
      setUserFriends(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserFriends();
  }, [currentUser.id]);

  useEffect(() => {
    if (!userFriends) return;
    const container = containerRef.current;

    const handleScroll = () => {
      if (container) {
        setShowTopShadow(container.scrollTop > 0);
        setShowBottomShadow(
          container.scrollHeight - container.scrollTop > container.clientHeight
        );
      }
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [userFriends]);

  if (!userFriends) {
    return (
      <div className="modal__overlay modal__overlay--active">
        <div className="modal--active modal">
          <p className="modal__loading">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <section className="friends">
      <div className="friends_container">
        <h1 className="friends__title">
          You have {userFriends.length} friends
        </h1>
        <div
          className={`friends__flex friends__shadow--${
            showTopShadow ? "top" : ""
          } friends__shadow--${showBottomShadow ? "bottom" : ""}`}
          ref={containerRef}
        >
          <DisplayUsers usersArray={userFriends} />
          <div className="friends__add">
            <AddFriends
              users={users}
              userFriends={userFriends}
              currentUser={currentUser}
              getUserFriends={getUserFriends}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserFriendsPage;
