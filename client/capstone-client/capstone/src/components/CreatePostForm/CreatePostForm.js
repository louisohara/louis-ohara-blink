import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Button from "../Button/Button";
import "../Modal/Modal.scss";
import close from "../../assets/Icons/close-24px.svg";
import { useNavigate } from "react-router-dom";
import "./CreatePostForm.scss";
import error from "../../assets/Icons/error-24px.svg";
import logo from "../../assets/Icons/publish.svg";

//TO DO -
function CreatePostForm({ userId, handleClose, posted, setPostedTrue }) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    duration: "",
    content: "",
  });

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
          setPostedTrue();
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
    <div className="modal__overlay modal__overlay--post">
      <div className="modal modal--post">
        <div className="form__cancel">
          <div className="form__image-container">
            <img src={close} onClick={handleClose} className="form__image" />
          </div>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__container">
            <label htmlFor="content" className="form__label">
              What do you want to do?{" "}
            </label>
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="5"
              className={`form__input  form__input--textarea ${
                isError && fields.content ? "form__input--error" : ""
              }`}
              placeholder="I'm in the mood for..."
              onChange={handleChange}
            ></textarea>
            {isError && !fields.duration ? (
              <div className="form__error-container">
                <img src={error} className="form__icon" />
                <p className="form__error">This field is required</p>
              </div>
            ) : (
              ""
            )}
            <label htmlFor="duration" className="form__label">
              How long are you free for?
            </label>
            <select
              className={`form__input form__input--select${
                isError && fields.duration ? "form__input--error" : ""
              }`} // Apply appropriate styling
              name="duration"
              id="duration"
              value={fields.duration}
              onChange={handleChange}
            >
              <option value="">Select your availability</option>
              <option value="1">1 Minutes</option>
              <option value="2">2 Minutes</option>
              <option value="3">3 Minutes</option>
              <option value="5">5 Minutes</option>
              <option value="120">2 Hours</option>
            </select>

            {isError && !fields.duration ? (
              <div className="form__error-container">
                <img src={error} className="form__icon" />
                <p className="form__error">This field is required</p>
              </div>
            ) : (
              ""
            )}
            <div className="form__divider"></div>
            {/* {posted && (
              <p className="form__response">
                Post successful - redirecting to homepage
              </p>
            )} */}

            <div className="form__button-container">
              <button className="form__button--submit" type="submit">
                <div className="form__button--wrapper">
                  <img src={logo} alt="" className="form__button-image" />
                  <p className="form__button-text">SUBMIT</p>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostForm;
