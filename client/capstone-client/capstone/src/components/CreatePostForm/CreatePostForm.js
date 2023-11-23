import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Button from "../Button/Button";
import "../Modal/Modal.scss";
import close from "../../assets/Icons/close-24px.svg";
import { useNavigate } from "react-router-dom";
import "./CreatePostForm.scss";

//TO DO -
//FORM VALIDATION INCLUDING ERROR MESSAGE FIELDS
//FORM SUBMISSION NAVIGATION TO WHO'S AVAILABLE PAGE

function CreatePostForm({ userId, handleClose }) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    duration: "",
    content: "",
  });
  const [posted, setPosted] = useState(false);

  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const isFormValid = () => {
    if (!fields.duration || !fields.content) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      setIsError(true);
      return;
    } else {
      setIsError(false);
      try {
        const durationMilliseconds = parseInt(fields.duration, 10) * 60 * 1000;
        const expirationTime = new Date(Date.now() + durationMilliseconds);
        const formattedExpirationTime = expirationTime
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
        const userEdit = await axios.put(
          `http://localhost:8080/api/users/${userId}`,
          { active: true, expirationTime: formattedExpirationTime }
        );

        const response = await axios.post("http://localhost:8080/api/posts/", {
          ...fields,
          author_id: userId,
          duration: durationMilliseconds,
          expirationTime: formattedExpirationTime,
        });

        if (response.status === 201) {
          setIsError(false);
          handleClose();
          setPosted(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
          console.log("success!");
        } else {
          console.error("Post creation failed.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal">
        <Button image={close} onClick={handleClose} />
        <div className="form">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__container">
              <label htmlFor="duration" className="form__label">
                How long are you free for?
                <select
                  className="form__input" // Apply appropriate styling
                  name="duration"
                  id="duration"
                  value={fields.duration}
                  onChange={handleChange}
                >
                  <option value="">Select duration</option>
                  <option value="1">1 Minutes</option>
                  <option value="2">2 Minutes</option>
                  <option value="3">3 Minutes</option>
                  <option value="5">5 Minutes</option>

                  {/* Add other duration options as needed */}
                </select>
              </label>
              <label htmlFor="content" className="form__label">
                What do you want to do?
                <textarea
                  name="content"
                  id="content"
                  cols="30"
                  rows="10"
                  className="form__input  form__input--textarea"
                  placeholder="Add a content to your video"
                  onChange={handleChange}
                ></textarea>
              </label>
              {isError && (
                <p className="form__response">Please fill both fields</p>
              )}
              {posted && (
                <p className="form__response">
                  Post successful - redirecting to homepage
                </p>
              )}
            </div>
            <div className="form__button-container">
              <button className="form__button">CANCEL</button>
              <Button
                image="none"
                text="Post"
                className="form__button--other"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePostForm;
