import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function DisplayPostComments({ postID }) {
  const [postComments, setPostComments] = useState(null);

  useEffect(() => {
    const getPostComments = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/posts/${postID}/comments`
      );
      setPostComments(response.data);
      console.log(response.data);
      console.log(postComments);
    };
    getPostComments();
  }, [postID]);

  if (!postComments) {
    return <p>loading...</p>;
  }

  return (
    <>
      {postComments.map((comment) => {
        return (
          <article className="comment" key={comment.id}>
            <div className="comment__icon-container">
              <img
                src={comment.avatar_url}
                alt={`${comment.first_name}'s icon`}
                className="comment__icon"
              />
            </div>
            <div className="comment__int-container">
              <div className="comment__flex-wrapper">
                <h3 className="comment__name">{`${comment.first_name} ${comment.surname}`}</h3>
                <span className="comment__timestamp">{comment.created_at}</span>
              </div>
              <p className="comment__post">{comment.comment}</p>
            </div>
          </article>
        );
      })}
    </>
  );
}
export default DisplayPostComments;
