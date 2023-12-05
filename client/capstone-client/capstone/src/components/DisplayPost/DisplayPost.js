import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import DisplayPostComments from "../DisplayPostComments/DisplayPostComments";
import Button from "../Button/Button";
import "../Modal/Modal.scss";
import close from "../../assets/Icons/close-24px.svg";
import error from "../../assets/Icons/error-24px.svg";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import Upload from "../../assets/Icons/upload.svg";
import "./DisplayPost.scss";

function DisplayPost({
  currentUser,
  handleClose,
  user,
  handleShow,
  show,
  setShow,
}) {
  const [userPost, setUserPost] = useState(null);

  useEffect(() => {
    const getUserPost = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/users/${user.id}/posts`
      );
      const currentTime = new Date();

      const filteredPosts = response.data.filter((post) => {
        const expirationTime = new Date(post.expirationTime);
        return expirationTime > currentTime;
      });

      setUserPost(filteredPosts[0]);
    };
    getUserPost();
  }, [user.id]);

  const handleToggle = async () => {
    try {
      const expirationTime = new Date(Date.now());
      const formattedExpirationTime = expirationTime
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const response = await axios.put(
        `http://localhost:8080/api/users/${user.id}`,
        {
          active: false,
          expirationTime: formattedExpirationTime,
        }
      );
      if (response.status === 200) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  function formatISODateTime(ISODateTimeString) {
    const date = new Date(ISODateTimeString);

    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    let hh = date.getHours();
    const min = String(date.getMinutes()).padStart(2, "0");
    const amOrPm = hh >= 12 ? "PM" : "AM";

    hh = hh % 12 || 12; // Convert to 12-hour clock

    const formattedDate = `${dd}/${mm}/${yyyy}`;
    const formattedTime = `${hh}:${min} ${amOrPm}`;

    return { date: formattedDate, time: formattedTime };
  }

  function calculateMinutesRemaining(expirationTime) {
    const currentTime = new Date();

    const expiration = new Date(expirationTime);

    const timeDiffInMilliseconds = expiration.getTime() - currentTime.getTime();
    const minutesRemaining = Math.floor(timeDiffInMilliseconds / (1000 * 60));

    return minutesRemaining;
  }
  if (!userPost) {
    return (
      <>
        {!show && (
          <Button
            image={Upload}
            onClick={handleShow}
            text="Activate"
            alt="user"
          />
        )}
        {show && (
          <div className="modal__overlay">
            <CreatePostForm userId={user.id} handleClose={handleClose} />
          </div>
        )}
      </>
    );
  }

  return (
    <section className="user user--alt">
      <div className="modal__overlay modal__overlay--post">
        <div className="modal modal--post">
          <div className="post__close">
            <div className="post__image-container">
              <img src={close} onClick={handleClose} className="post__image" />
            </div>

            <p className="post__text">
              {calculateMinutesRemaining(userPost.expirationTime)} minutes
              remaining
            </p>
          </div>
          <div className="post__outer">
            <article className="post">
              <div className="post__icon-container">
                <img
                  src={userPost.avatar_url}
                  alt={`${userPost.first_name}'s icon`}
                  className="post__icon"
                />
              </div>
              <div className="post__int-container">
                <div className="post__flex-wrapper">
                  <h3 className="post__name">{`${userPost.first_name} ${userPost.surname}`}</h3>
                  <span className="post__timestamp">
                    {formatISODateTime(userPost.created_at).time}
                  </span>
                </div>
                <p className="post__post">{userPost.content}</p>
              </div>
            </article>
            <DisplayPostComments
              postID={userPost.id}
              currentUser={currentUser}
              userId={user.id}
              handleToggle={handleToggle}
            />
            {currentUser.id === user.id && (
              <Button
                image={error}
                onClick={handleToggle}
                text="Deactivate"
                alt="deactivate"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DisplayPost;
