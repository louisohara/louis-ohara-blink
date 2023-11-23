import DisplayUsers from "../components/DisplayUsers/DisplayUsers";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddFriends from "../components/AddFriends/AddFriends";
import "./UserFriendsPage.scss";

//MUST RECEIVE THE ID OF THE SELECTED USER AS A PROP IN ORDER TO VIEW THEIR FRIENDS
function UserFriendsPage({ currentUser, users }) {
  // const { id } = useParams();
  const [userFriends, setUserFriends] = useState(null);
  console.log(users);
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

  if (!userFriends) {
    return <p>Loading...</p>;
  }
  return (
    <section className="friends">
      <div className="friends_container">
        <h1 className="friends__title">This is the user friends page</h1>
        <div className="friends__flex">
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
