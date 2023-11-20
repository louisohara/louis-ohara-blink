import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DisplayUsersActive from "../components/DisplayUsersActive/DisplayUsersActive";

function ActiveUsersPage() {
  const [users, setUsers] = useState(null);
  const [active, setActive] = useState(null);
  const baseURL = "http://localhost:8080/api/users";

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(baseURL);
        const currentTime = new Date();
        // COMPARES CURRENT DATE/TIME TO POST EXPIRATION DATE
        const filteredUsers = data.filter((user) => {
          const expirationTime = new Date(user.expirationTime);
          return expirationTime > currentTime;
        });
        // console.log(filteredUsers);
        // setUsers(filteredUsers);
        setUsers(data);
        setActive(filteredUsers);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  // useEffect(() => {
  //   if (!users || !Array.isArray(users)) {
  //     return; // Ensure users data is available and valid
  //   }

  //   const expirationCheck = () => {
  //     const currentTime = new Date();
  //     const updatedUsers = users.map((user) => {
  //       if (user.active && new Date(user.expirationTime) <= currentTime) {
  //         updateUser(user.id); // Update user's active status
  //         return { ...user, active: false }; // Return updated user object
  //       }
  //       return user; // Return unmodified user object
  //     });

  //     setUsers(updatedUsers); // Update the state with updated users
  //   };

  //   const intervalId = setInterval(expirationCheck, 15 * 1000); // Run expiration check every 15 seconds

  //   return () => {
  //     clearInterval(intervalId); // Cleanup on component unmount
  //   };
  // }, [users]);

  // const updateUser = async (userId) => {
  //   try {
  //     await axios.put(`http://localhost:8080/api/users/${userId}`, {
  //       active: false,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  if (!users || !active) {
    return <p>Loading...</p>;
  }
  return (
    <section className="active">
      This is the active users page
      <DisplayUsersActive usersArray={users} activeArray={active} />
    </section>
  );
}

export default ActiveUsersPage;
