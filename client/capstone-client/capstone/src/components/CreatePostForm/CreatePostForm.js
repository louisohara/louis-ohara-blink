import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Button from "../Button/Button";

//TO DO -
//FORM VALIDATION INCLUDING ERROR MESSAGE FIELDS
//FUNCTION TO UNSET ACTIVE STATE OF USER AFTER X MANY MINUTES/HOURS
//DROP DOWN MENU TO SELECT DURATION VALUE
//FORM SUBMISSION NAVIGATION TO WHO'S AVAILABLE PAGE

function CreatePostForm({ userId }) {
  //   console.log(userId);
  // const [isError, setIsError] = useState(false);
  const [fields, setFields] = useState({
    duration: null,
    content: "",
  });

  const [errors, setErrors] = useState("");

  const handleChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(fields);
    // if (!isFormValid()) {
    //   setIsError(true);
    //   return;
    // } else {
    //   setIsError(false);
    try {
      const userEdit = await axios.put(
        `http://localhost:8080/api/users/${userId}`,
        { active: true }
      );

      const response = await axios.post("http://localhost:8080/api/posts/", {
        ...fields,
        author_id: userId,
      });

      if (response.status === 201) {
        //   setUploaded(true);
        //   setTimeout(() => {
        //     navigate("/");
        //   }, 2000);
        console.log("success!");
      } else {
        console.error("Post creation failed.");
      }
    } catch (error) {
      console.error(error);
    }
    // }
  };

  return (
    <div className="form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__container">
          <label htmlFor="duration" className="form__label">
            How long are you free for?
            <input
              type="text"
              className="form__input"
              placeholder="Add a duration to your video"
              name="duration"
              id="duration"
              onChange={handleChange}
            />
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
          {/* {isError && (
      <p className="form__response">Please fill all fields</p>
    )} */}
          {/* {uploaded && (
      <p className="form__response">
        Upload successful - redirecting to homepage
      </p>
    )} */}
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
  );
}

export default CreatePostForm;
