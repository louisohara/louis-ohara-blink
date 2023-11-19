import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DisplayUsers from "../components/DisplayUsers/DisplayUsers";
import { Link } from "react-router-dom";

function ActiveUsersPage() {
  const [users, setUsers] = useState(null);
  const baseURL = "http://localhost:8080/api/users";

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(baseURL);
        console.log(data);
        setUsers(
          data
          // id: data.id,
          // first_name: data.first_name,
          // surname: data.surname,
          // avatar_url: data.avatar_url,
          // active: data.active,
        );
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  if (!users) {
    return <p>Loading...</p>;
  }
  return (
    <section className="active">
      This is the active users page
      <DisplayUsers usersArray={users} />
    </section>
  );
}

export default ActiveUsersPage;
