import add_comment from "../../assets/Icons/add_comment.svg";
import Button from "../Button/Button";

function AddComment() {
  return (
    <form className="form">
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
        ></textarea>
      </div>
      <div className="conversation__button-container">
        <Button
          img={add_comment}
          text="COMMENT"
          className="conversation__button"
          type="submit"
        />
      </div>
    </form>
  );
}

export default AddComment;
