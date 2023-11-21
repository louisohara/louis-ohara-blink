import add_comment from "../../assets/Icons/add_comment.svg";
import Button from "../Button/Button";
import { useState } from "react";
import axios from "axios";

//ADD COMMENT MUST PASS THE ID OF THE CURRENT USER/COMMENTER TO THE API
//MUST RECEIVE THE ID AS A PROP.

function AddComment({ postID, currentUser, getPostComments }) {
  const [comment, setComment] = useState(null);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(comment);

    try {
      const response = await axios.post("http://localhost:8080/api/comments", {
        comment: comment,
        post_id: postID,
        author_id: currentUser.id,
      });
      if (response.status === 201) {
        console.log("success!");
        getPostComments();
        setComment(null);
      } else {
        console.error("Comment creation failed.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__container">
        <label htmlFor="comment" className="form__label">
          JOIN THE CONVERSATION
        </label>
        <textarea
          type="text"
          name="comment"
          id="comment"
          className="form__input"
          placeholder="Add a new comment"
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="conversation__button-container">
        <Button
          image={add_comment}
          text="COMMENT"
          className="conversation__button"
          type="submit"
        />
      </div>
    </form>
  );
}

export default AddComment;
