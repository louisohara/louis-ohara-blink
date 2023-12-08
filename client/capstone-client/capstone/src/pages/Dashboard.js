import "./Dashboard.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Modal/Modal.scss";
import { NavLink } from "react-router-dom";
import EditProfilePage from "./EditProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";

function Dashboard({ setCurrentChange, currentUser, posted, setPostedTrue }) {
  const [failedAuth, setFailedAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const login = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8080/api/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.status === 200) {
        setData(response.data);
        setCurrentChange(response.data);
        navigate(`/users/${response.data.id}`);
      }
    } catch (error) {
      setFailedAuth(true);
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    login();
  }, []);

  if (failedAuth) {
    return (
      <div className="modal__overlay modal__overlay--active modal__overlay--loading">
        <div className="modal--active modal">
          <NavLink to="/signup" className="active-users__navlink">
            <p className="modal__loading modal__loading--alt">
              You must login to see this page
            </p>
          </NavLink>
        </div>
      </div>
    );
  }

  if (!data || currentUser) {
    return <main className="dashboard">Loading...</main>;
  }
}

export default Dashboard;
