import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./ActiveUsersPage.scss";
import DisplayUsersActive from "../components/DisplayUsersActive/DisplayUsersActive";
import "../components/Modal/Modal.scss";
import { NavLink } from "react-router-dom";

function ActiveUsersPage({
  currentUser,
  active,
  setPostedTrue,
  setActive,
  users,
  posted,
  setPostedFalse,
}) {
  const baseURL = "http://localhost:8080/api/users";
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(
          `${baseURL}/${currentUser.id}/friends`
        );

        const currentTime = new Date();

        const filteredUsers = data.filter((user) => {
          const expirationTime = new Date(user.expirationTime);
          return expirationTime > currentTime;
        });

        setFriends(data.length);

        if (
          currentUser.active === 1 &&
          new Date(currentUser.expirationTime) > currentTime
        ) {
          setActive([...filteredUsers, currentUser]);
        } else {
          setActive(filteredUsers);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [posted]);

  const updateUser = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/api/users/${userId}`, {
        active: false,
      });
      setPostedTrue();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const expirationCheck = () => {
      const currentTimeUpdated = new Date();
      // if (active) {
      const updatedUsers = active.map((user) => {
        if (
          user.active === 1 &&
          new Date(user.expirationTime) <= currentTimeUpdated
        ) {
          updateUser(user.id);
          console.log(`User ${user.id}: updated`);
          setPostedFalse();

          return { ...user, active: false };
        }
        return user;
      });

      setActive(updatedUsers);
      console.log();
      // }
    };

    const intervalId = setInterval(expirationCheck, 15 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [active]);

  if (!active) {
    return (
      <p></p>
      // <div className="modal__overlay modal__overlay--active">
      //   <div className="modal--active modal">
      //     <p className="modal__loading">Loading...</p>
      //   </div>
      // </div>
    );
  }
  return (
    <section className="active-users">
      <div className="active-users__container">
        <div className="active-users__flex">
          <h1 className="active-users__title">ACTIVE USERS</h1>
          {friends === 0 && (
            <div className="modal__overlay modal__overlay--active">
              <div className="modal--active modal">
                <NavLink to="/friends" className="active-users__navlink">
                  <p className="active-users__message">
                    You have no friends?
                    <span className="active-users__span">
                      Add friends to get started.
                    </span>
                  </p>
                </NavLink>
              </div>
            </div>
          )}
          <DisplayUsersActive
            activeArray={active}
            currentUser={currentUser}
            setPostedFalse={setPostedFalse}
          />
        </div>
      </div>
    </section>
  );
}

export default ActiveUsersPage;
