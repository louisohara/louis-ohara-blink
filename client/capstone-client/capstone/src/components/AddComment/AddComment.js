import add_comment from "../../assets/Icons/add_comment.svg";
import Button from "../Button/Button";
import { useState } from "react";
import axios from "axios";
import error from "../../assets/Icons/error-24px.svg";
import "./AddComment.scss";

function AddComment({ postID, currentUser, getPostComments }) {
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
          setComment("");
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
        <textarea
          type="text"
          name="comment"
          id="comment"
          className="conversation-form__input"
          placeholder="Add a new comment"
          onChange={handleChange}
          value={comment}
        ></textarea>
        {errors && (
          <p className="conversation-form__error">
            You haven't added a comment
          </p>
        )}
      </div>
      <div className="conversation-form__button-container">
        <Button image={add_comment} alt="comment" type="submit" />
      </div>
    </form>
  );
}

export default AddComment;
