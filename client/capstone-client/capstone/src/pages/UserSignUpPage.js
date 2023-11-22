import "../components/SignUp/SignUp.scss";
import Input from "../components/Input/Input";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function UserSignUpPage({ setCurrentUser }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/users", {
        first_name: event.target.first_name.value,
        surname: event.target.surname.value,
        email: event.target.email.value,
        password: event.target.password.value,
      });
      if (response.status === 201) {
        setCurrentUser(response.data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
  };

  return (
    <main className="signup-page">
      <form className="signup" onSubmit={handleSubmit}>
        <h1 className="signup__title">Sign up</h1>

        <Input type="text" name="first_name" label="First name" />
        <Input type="text" name="surname" label="Surname" />
        <Input type="text" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />

        <button className="signup__button">Sign up</button>

        {error && <div className="signup__message">{error}</div>}
      </form>

      <p>
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
}

export default UserSignUpPage;
