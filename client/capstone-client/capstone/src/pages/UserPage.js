import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import DisplayUser from "../components/DisplayUser/DisplayUser";
import CreatePostForm from "../components/CreatePostForm/CreatePostForm";
import Button from "../components/Button/Button";
import Upload from "../assets/Icons/upload.svg";
import error from "../assets/Icons/error-24px.svg";
import DisplayPost from "../components/DisplayPost/DisplayPost";
import "../components/Modal/Modal.scss";
import "./UserPage.scss";

function UserPage({ currentUser, posted, setPostedTrue, setCurrentChange }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    setCurrentChange(null);
    navigate("/");
  };
  const handleToggle = async () => {
    try {
      await axios.put(`http://localhost:8080/api/users/${id}`, {
        active: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`http://localhost:8080/api/users/${id}`);
      console.log(response.data);
      setUser(response.data);
    };
    getUser();
  }, [id, handleToggle]);

  function formatISODateTime(ISODateTimeString) {
    const date = new Date(ISODateTimeString);

    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    let hh = date.getHours();
    const min = String(date.getMinutes()).padStart(2, "0");
    const amOrPm = hh >= 12 ? "PM" : "AM";

    hh = hh % 12 || 12;

    const formattedDate = `${dd}/${mm}/${yyyy}`;
    const formattedTime = `${hh}:${min} ${amOrPm}`;

    return { date: formattedDate, time: formattedTime };
  }

  if (!user) {
    return (
      <div className="modal__overlay modal__overlay--active">
        <div className="modal--active modal">
          <p className="modal__loading">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <section className="user">
      {!show && (
        <h1 className="user__title">
          {currentUser.id === user.id ? "YOUR PROFILE" : "PROFILE"}
        </h1>
      )}
      <div className="user__container">
        <div className="user__flex">
          <DisplayUser user={user} />

          {user.active === 0 ? (
            <div className="user__details">
              <p className="user__info">
                LAST ACTIVE: {formatISODateTime(user.expirationTime).time}
              </p>
            </div>
          ) : (
            <div className="user__details user__details--active">
              <div className="user__details-status"></div>
              <p className="user__info--active">ACTIVE NOW</p>
            </div>
          )}
          {!show && currentUser.id === user.id ? (
            <button onClick={logout} className="user__button">
              Log out
            </button>
          ) : (
            ""
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
              (user.active === 0 ? (
                <Button
                  image={Upload}
                  onClick={handleShow}
                  text="Activate"
                  alt="user"
                />
              ) : (
                <>
                  <DisplayPost
                    currentUser={user}
                    user={user}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    show={show}
                    setShow={setShow}
                  />
                </>
              ))}
            {show && (
              <CreatePostForm
                userId={id}
                handleClose={handleClose}
                posted={posted}
                setPostedTrue={setPostedTrue}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default UserPage;
