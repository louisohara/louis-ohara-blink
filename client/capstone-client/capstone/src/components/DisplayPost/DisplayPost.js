import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import DisplayPostComments from "../DisplayPostComments/DisplayPostComments";
import Button from "../Button/Button";
import "../Modal/Modal.scss";
import close from "../../assets/Icons/close-24px.svg";

//THIS IS THE PAGE THAT IS LINKED TO ONCE THE ACTIVE PROFILE IS CLICKED.
//IT SHOULD RECEIVE THE ID OF THE SELECTED PROFILE AS A PROP.
// THIS PAGE DISPLAYS THE POSTS MADE BY THE ACTIVE USER.
//THIS PAGE SHOULD PASS THE ID OF THE SELECTED PROFILE AS AN ARGUMENT TO:
// - add comment page.

//TO DO - styling of post
// - timestamp conversion

function DisplayPost({ currentUser, handleClose, user }) {
  //   const { id } = useParams();
  const [userPost, setUserPost] = useState(null);

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

  if (!userPost) {
    return <p>loading...</p>;
  }

  return (
    <section className="user modal">
      <Button image={close} onClick={handleClose} />
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
    </section>
  );
}

export default DisplayPost;