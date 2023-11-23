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

import UserSignUpPage from "./pages/UserSignUpPage";
import LoginPage from "./pages/LoginPage";

//GET THE ID OF THE CURRENT USER AND PASS AS PROPS TO:
//USER PAGE
//USER FRIENDS PAGE
//CREATE POST PAGE
//USERPOSTSPAGE - IN ORDER TO ADD COMMENTS

function App() {
  const [active, setActive] = useState(null);
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  //GET THE MOST RECENT USER ADDED - the user profile most recently added should be the current user
  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await axios.get(`http://localhost:8080/api/users/`);
      setUsers(response.data);
      setCurrentUser(response.data[response.data.length - 1]);
    };
    getCurrentUser();
  }, []);

  if (!currentUser || !users) {
    return <p>loading...</p>;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Header currentUser={currentUser} />
        <Footer currentUser={currentUser} active={active} />
        <main className="main">
          <div className="main__div"></div>
          <div className="main__inner">
            <Routes>
              <Route
                path="/signup"
                element={<UserSignUpPage setCurrentUser={setCurrentUser} />}
              />
              <Route
                path="/"
                element={
                  <ActiveUsersPage
                    currentUser={currentUser}
                    active={active}
                    setActive={setActive}
                  />
                }
              />
              <Route
                path="/login"
                element={<LoginPage currentUser={currentUser} />}
              />
              <Route
                path="/users/:id"
                element={<UserPage currentUser={currentUser} />}
              />
              <Route
                path="/users/:id/posts"
                element={<UserPostsPage currentUser={currentUser} />}
              />
              <Route
                path="/users/friends"
                element={
                  <UserFriendsPage currentUser={currentUser} users={users} />
                }
              />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
