import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DisplayUser from "../components/DisplayUser/DisplayUser";

function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`http://localhost:8080/api/users/${id}`);
      setUser(response.data);
    };
    getUser();
  }, [id, user]);

  if (!user) {
    return <p>loading...</p>;
  }
  return (
    <section className="user">
      This is the user page
      <DisplayUser user={user} />
    </section>
  );
}

export default UserPage;
