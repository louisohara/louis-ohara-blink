import add_comment from "../../assets/Icons/add_comment.svg";
import Button from "../Button/Button";
import { useState } from "react";
import axios from "axios";
import error from "../../assets/Icons/error-24px.svg";
import "./AddComment.scss";

//ADD COMMENT MUST PASS THE ID OF THE CURRENT USER/COMMENTER TO THE API
//MUST RECEIVE THE ID AS A PROP.

function AddComment({
  postID,
  currentUser,
  getPostComments,
  userId,
  handleToggle,
}) {
  const [comment, setComment] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleChange = (event) => {
    setComment(event.target.value);
  };
  const isFormValid = () => {
    if (!comment) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(comment);

    if (!isFormValid()) {
      setErrors(true);
      return;
    } else {
      setErrors(false);
      try {
        const response = await axios.post(
          "http://localhost:8080/api/comments",
          {
            comment: comment,
            post_id: postID,
            author_id: currentUser.id,
          }
        );
        if (response.status === 201) {
          setErrors(false);
          console.log("success!");
          getPostComments();
          setComment(null);
        } else {
          console.error("Comment creation failed.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <form className="conversation-form" onSubmit={handleSubmit}>
      <div className="conversation-form__container">
        {/* <label htmlFor="comment" className="conversation-form__label">
          JOIN THE CONVERSATION
        </label> */}
        <textarea
          type="text"
          name="comment"
          id="comment"
          className="conversation-form__input"
          placeholder="Add a new comment"
          onChange={handleChange}
        ></textarea>
        {errors && (
          <p className="conversation-form__error">
            You haven't added a comment
          </p>
        )}
      </div>
      <div className="conversation-form__button-container">
        <Button
          image={add_comment}
          text="COMMENT"
          alt="comment"
          type="submit"
        />
        {currentUser.id === userId && (
          <Button
            image={error}
            onClick={handleToggle}
            text="DELETE"
            alt="comment"
          />
        )}
      </div>
    </form>
  );
}

export default AddComment;
