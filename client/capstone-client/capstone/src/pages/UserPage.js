import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DisplayUser from "../components/DisplayUser/DisplayUser";
import CreatePostForm from "../components/CreatePostForm/CreatePostForm";
import Button from "../components/Button/Button";
import Upload from "../assets/Icons/upload.svg";
import error from "../assets/Icons/error-24px.svg";
import DisplayPost from "../components/DisplayPost/DisplayPost";
import "../components/Modal/Modal.scss";
import "./UserPage.scss";

// THIS PAGE NEEDS TO BE THE ID OF THE CURRENT USER
// SHOULD BE PASSED THE ID OF THE USER FROM APP.JS VIA PROPS
// LOGIN/AUTH WILL FEED ID INTO THIS PAGE.
// this page is where the user can view their profile and create a post.

function UserPage({ currentUser }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`http://localhost:8080/api/users/${id}`);
      setUser(response.data);
    };
    getUser();
  }, [id, user]);

  const handleToggle = async () => {
    try {
      await axios.put(`http://localhost:8080/api/users/${id}`, {
        active: false,
      });
    } catch (error) {
      console.error(error);
    }
  };
  if (!user) {
    return <p>loading...</p>;
  }
  return (
    <section className="user">
      <div className="user__container">
        <div className="user__flex">
          {!show && <h1 className="user__title">YOUR PROFILE</h1>}
          <DisplayUser user={user} />

          {user.active !== 0 ? (
            <div className="user__details">
              <p className="user__info">LAST ACTIVE: {user.expirationTime}</p>
            </div>
          ) : (
            <div className="user__details user__details--active">
              <div className="user__details-status"></div>
              <p className="user__info--active">ACTIVE NOW</p>
            </div>
          )}
        </div>
        {currentUser.id !== user.id ? (
          !user.active ? (
            <DisplayPost
              currentUser={currentUser}
              user={user}
              handleClose={handleClose}
              handleShow={handleShow}
              show={show}
            />
          ) : (
            ""
          )
        ) : (
          <>
            {!show &&
              (!user.active ? (
                // <div className="user__flex">
                <Button
                  image={Upload}
                  onClick={handleShow}
                  text="Activate"
                  alt="user"
                />
              ) : (
                // </div>
                <>
                  <DisplayPost
                    currentUser={user}
                    user={user}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    show={show}
                  />
                  {/* <Button image={error} onClick={handleToggle} text="Deactivate" /> */}
                </>
              ))}
            {show && <CreatePostForm userId={id} handleClose={handleClose} />}
          </>
        )}
      </div>
    </section>
  );
}

export default UserPage;
