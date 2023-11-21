import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AddComment from "../AddComment/AddComment";
import deleteComment from "../../assets/Icons/delete_outline-24px.svg";
// import Button from "../Button/Button";
import ButtonAlt from "../ButtonAlt/ButtonAlt";
import Button from "../Button/Button";

function DisplayPostComments({ postID, currentUser }) {
  const [postComments, setPostComments] = useState(null);
  const getPostComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/posts/${postID}/comments`
      );
      setPostComments(response.data);
      //   console.log(response.data);
      //   console.log(postComments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostComments();
  }, [postID]);

  if (!postComments) {
    return <p>loading...</p>;
  }

  return (
    <>
      {postComments.map((comment) => {
        const handleDelete = async (id) => {
          try {
            // console.log(id);
            const response = await axios.delete(
              `http://localhost:8080/api/comments/${id}`
            );
            if (response.status === 204) {
              console.log("comment deleted");
              getPostComments();
            }
          } catch (error) {
            console.error(error);
          }
        };
        // const handleEdit = async (id) => {
        //     try {
        //       // console.log(id);
        //       const response = await axios.edit(
        //         `http://localhost:8080/api/comments/${id}`
        //       );
        //       if (response.status === 204) {
        //         console.log("comment deleted");
        //         getPostComments();
        //       }
        //     } catch (error) {
        //       console.error(error);
        //     }
        //   };
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
            {comment.author_id === currentUser.id ? (
              <Button
                image={deleteComment}
                text="Delete"
                type="click"
                onClick={() => {
                  handleDelete(comment.id);
                }}
              />
            ) : (
              ""
            )}
          </article>
        );
      })}
      <AddComment
        postID={postID}
        currentUser={currentUser}
        getPostComments={getPostComments}
      />
    </>
  );
}
export default DisplayPostComments;
