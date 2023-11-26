import "../components/SignUp/SignUp.scss";
import Input from "../components/Input/Input";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import wrong from "../assets/Icons/error-24px.svg";

function UserSignUpPage({ setCurrentUser }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    first_name: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const isFormValid = () => {
    if (
      !fields.first_name ||
      !fields.surname ||
      !fields.password ||
      !fields.email
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      setError(true);
      return;
    } else {
      setError(false);
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/register",
          fields
        );
        if (response.status === 201) {
          setCurrentUser(response.data);
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        setError(error.response.data);
      }
    }
  };

  return (
    <main className="signup-page">
      <form className="signup" onSubmit={handleSubmit}>
        <h1 className="signup__title">Sign up</h1>
        <Input
          type="text"
          name="first_name"
          label="First name"
          onChange={handleChange}
        />
        {error && !fields.first_name ? (
          <div className="form__error-container">
            <img src={wrong} className="form__icon" />
            <p className="form__error">This field is required</p>
          </div>
        ) : (
          ""
        )}
        <Input
          type="text"
          name="surname"
          label="Surname"
          onChange={handleChange}
        />{" "}
        {error && !fields.surname ? (
          <div className="signup__error-container">
            <img src={wrong} className="form__icon" />
            <p className="signup__error">This field is required</p>
          </div>
        ) : (
          ""
        )}
        <Input type="text" name="email" label="Email" onChange={handleChange} />
        {error && !fields.email ? (
          <div className="signup__error-container">
            <img src={wrong} className="form__icon" />
            <p className="signup__error">This field is required</p>
          </div>
        ) : (
          ""
        )}
        <Input
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
        />
        {error && !fields.password ? (
          <div className="signup__error-container">
            <img src={wrong} className="form__icon" />
            <p className="signup__error">This field is required</p>
          </div>
        ) : (
          ""
        )}
        <button className="signup__button">Sign up</button>
      </form>

      <p>
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
}

export default UserSignUpPage;
