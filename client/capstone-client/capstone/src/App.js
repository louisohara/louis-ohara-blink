import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ActiveUsersPage from "./pages/ActiveUsersPage";
import UserPage from "./pages/UserPage";
import UserPostsPage from "./pages/UserPostsPage.js";
import UserFriendsPage from "./pages/UserFriendsPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import UserSignUpPage from "./pages/UserSignUpPage";
import LoginPage from "./pages/LoginPage";
import EditProfilePage from "./pages/EditProfilePage";
import "./components/Modal/Modal.scss";
import Dashboard from "./pages/Dashboard";
import Button from "./components/Button/Button";

function App() {
  const [active, setActive] = useState(null);
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [posted, setPosted] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);

    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  const setCurrentChange = (user) => {
    setCurrentUser(user);
  };

  const setActiveChange = (prop) => {
    setActive(prop);
  };
  const setPostedTrue = () => {
    setPosted(true);
  };

  const setPostedFalse = () => {
    setPosted(false);
  };
  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(`http://localhost:8080/api/users/`);
      setUsers(response.data);
    };
    const getCurrent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${currentUser.id}`
        );
        setCurrentUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
    getCurrent();
  }, [posted]);

  // if (!currentUser || !users) {
  //   return (
  //     <div className="modal__overlay modal__overlay--active">
  //       <div className="modal--active modal">
  //         <p className="modal__loading">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="app">
      <BrowserRouter>
        <Header />

        <Footer currentUser={currentUser} active={active} />
        <main className="main">
          <div className="main__div">
            <Particles
              id="tsparticles"
              className="particles"
              init={particlesInit}
              loaded={particlesLoaded}
              options={{
                fullScreen: false,
                background: {
                  color: {
                    value: "#1E2F23",
                  },
                },
                fpsLimit: 120,
                interactivity: {
                  events: {
                    onClick: {
                      enable: true,
                      mode: "push",
                    },
                    onHover: {
                      enable: true,
                      mode: "repulse",
                    },
                    resize: true,
                  },
                  modes: {
                    push: {
                      quantity: 4,
                    },
                    repulse: {
                      distance: 50,
                      duration: 0.4,
                    },
                  },
                },
                particles: {
                  color: {
                    value: "#ffffff",
                  },
                  links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                  },
                  move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                      default: "bounce",
                    },
                    random: true,
                    speed: 2,
                    straight: false,
                  },
                  number: {
                    density: {
                      enable: true,
                      area: 800,
                    },
                    value: 80,
                  },
                  opacity: {
                    value: 0.5,
                  },
                  shape: {
                    type: "circle",
                  },
                  size: {
                    value: { min: 1, max: 3 },
                  },
                },
                detectRetina: true,
              }}
            />
          </div>

          <div className="main__inner">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    setCurrentChange={setCurrentChange}
                    currentUser={currentUser}
                    posted={posted}
                    setPostedTrue={setPostedTrue}
                  />
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/signup"
                element={<UserSignUpPage setCurrentChange={setCurrentChange} />}
              />
              <Route
                path="/users/:id"
                element={
                  <UserPage
                    currentUser={currentUser}
                    posted={posted}
                    setPostedTrue={setPostedTrue}
                    setCurrentChange={setCurrentChange}
                    setPostedFalse={setPostedFalse}
                  />
                }
              />
              <Route
                path="/active"
                element={
                  <ActiveUsersPage
                    currentUser={currentUser}
                    active={active}
                    setActiveChange={setActiveChange}
                    setActive={setActive}
                    users={users}
                    posted={posted}
                    setPostedFalse={setPostedFalse}
                    setPostedTrue={setPostedTrue}
                  />
                }
              />
              <Route
                path="/friends"
                element={
                  <UserFriendsPage currentUser={currentUser} users={users} />
                }
              />
              <Route
                path="/profile"
                element={<EditProfilePage currentUser={currentUser} />}
              />
            </Routes>
          </div>
          <div className="main__bottom"></div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
