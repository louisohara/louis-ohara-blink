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

//THIS IS THE PAGE THAT IS LINKED TO ONCE THE ACTIVE PROFILE IS CLICKED.
//IT SHOULD RECEIVE THE ID OF THE SELECTED PROFILE AS A PROP.
// THIS PAGE DISPLAYS THE POSTS MADE BY THE ACTIVE USER.
//THIS PAGE SHOULD PASS THE ID OF THE SELECTED PROFILE AS AN ARGUMENT TO:
// - add comment page.

//TO DO - styling of post
// - timestamp conversion

function DisplayPost({ currentUser, handleClose, user, handleShow, show }) {
  //   const { id } = useParams();
  const [userPost, setUserPost] = useState(null);
  // const [show, setShow] = useState(false);

  useEffect(() => {
    const getUserPost = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/users/${user.id}/posts`
      );
      const currentTime = new Date();
      // COMPARES CURRENT DATE/TIME TO POST EXPIRATION DATE
      const filteredPosts = response.data.filter((post) => {
        const expirationTime = new Date(post.expirationTime);
        return expirationTime > currentTime;
      });
      // DISPLAYS ONLY POSTS THAT HAVE YET TO EXPIRE
      setUserPost(filteredPosts[0]);
      // setUserPost(response.data[0]);
      // console.log(response.data);
      console.log(userPost);
    };
    getUserPost();
  }, [user.id]);

  const handleToggle = async () => {
    try {
      await axios.put(`http://localhost:8080/api/users/${user.id}`, {
        active: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!userPost) {
    return (
      <>
        {!show && (
          <Button image={Upload} onClick={handleShow} text="Activate" />
        )}
        {show && (
          <div className="modal__overlay">
            <CreatePostForm userId={user.id} handleClose={handleClose} />
          </div>
        )}
        ;
      </>
    );
  }

  return (
    <section className="user">
      <div className="modal__overlay modal__overlay--alt">
        <div className="modal">
          {/* {currentUser.id === user.id ? (
        ""
      ) : ( */}
          <Button image={close} onClick={handleClose} />
          {/* )} */}
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
                <span className="post__timestamp">{userPost.created_at}</span>
              </div>
              <p className="post__post">{userPost.content}</p>
            </div>
          </article>
          <DisplayPostComments postID={userPost.id} currentUser={currentUser} />
          {currentUser.id === user.id && (
            <Button image={error} onClick={handleToggle} text="Deactivate" />
          )}
        </div>
      </div>
    </section>
  );
}

export default DisplayPost;
