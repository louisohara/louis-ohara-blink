import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./ActiveUsersPage.scss";
import DisplayUsersActive from "../components/DisplayUsersActive/DisplayUsersActive";

function ActiveUsersPage({ currentUser, active, setActive }) {
  const baseURL = "http://localhost:8080/api/users";
  const [friends, setFriends] = useState(null);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      //GETS FRIENDS OF THE CURRENT USER
      try {
        const { data } = await axios.get(
          `${baseURL}/${currentUser.id}/friends`
        );
        const currentTime = new Date();
        // COMPARES CURRENT DATE/TIME TO POST EXPIRATION DATE
        const filteredUsers = data.filter((user) => {
          const expirationTime = new Date(user.expirationTime);
          return expirationTime > currentTime;
        });

        setFriends(data.length);
        setActive(filteredUsers);
        console.log(active);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  //THIS IS THE INTERVAL TIMER
  const updateUser = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/api/users/${userId}`, {
        active: false,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const expirationCheck = () => {
      const currentTimeUpdated = new Date();

      const updatedUsers = active.map((user) => {
        if (
          user.active &&
          new Date(user.expirationTime) <= currentTimeUpdated
        ) {
          updateUser(user.id);

          return { ...user, active: false };
        }
        return user;
      });

      setActive(updatedUsers);

      // const sortedUsers = active.slice().sort((a, b) => b.active - a.active);
    };

    const intervalId = setInterval(expirationCheck, 15 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [active]);

  //

  if (!active) {
    // || !active
    return <p>Loading...</p>;
  }
  return (
    <section className="active-users">
      <div className="active-users__container">
        <div className="active-users__flex">
          <h1 className="active-users__title">This is the active users page</h1>
          {friends === 0 && (
            <p>You have no friends - add friends to get started</p>
          )}
          <DisplayUsersActive
            activeArray={active}
            currentUser={currentUser}
            // sortedUsers={sortedUsers}
            // change={change}
          />
        </div>
      </div>
    </section>
  );
}

export default ActiveUsersPage;
