import DisplayUsers from "../components/DisplayUsers/DisplayUsers";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//MUST RECEIVE THE ID OF THE SELECTED USER AS A PROP IN ORDER TO VIEW THEIR FRIENDS
function UserFriendsPage() {
  const { id } = useParams();
  const [userFriends, setUserFriends] = useState(null);
  const baseURL = `http://localhost:8080/api/users/${id}/friends`;

  useEffect(() => {
    const getUserFriends = async () => {
      try {
        const { data } = await axios.get(baseURL);
        console.log(data);
        setUserFriends(
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
    getUserFriends();
  }, [id]);

  if (!userFriends) {
    return <p>Loading...</p>;
  }
  return (
    <section className="friends">
      This is the user friends page
      <DisplayUsers usersArray={userFriends} />
    </section>
  );
}

export default UserFriendsPage;
