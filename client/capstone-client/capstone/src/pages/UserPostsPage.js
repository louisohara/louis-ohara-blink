import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import DisplayPostComments from "../components/DisplayPostComments/DisplayPostComments";

function UserPostsPage({ currentUser }) {
  const { id } = useParams();
  const [userPost, setUserPost] = useState(null);

  useEffect(() => {
    const getUserPost = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/users/${id}/posts`
      );
      const currentTime = new Date();

      const filteredPosts = response.data.filter((post) => {
        const expirationTime = new Date(post.expirationTime);
        return expirationTime > currentTime;
      });

      setUserPost(filteredPosts[0]);
    };
    getUserPost();
  }, [id]);

  if (!userPost) {
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

export default UserPostsPage;
