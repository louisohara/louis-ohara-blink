import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActiveUsersPage from "./pages/ActiveUsersPage";
import UserPage from "./pages/UserPage";
import UserPostsPage from "./pages/UserPostsPage";
import UserFriendsPage from "./pages/UserFriendsPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <main className="main">
          <div className="test">hey</div>
          <Routes>
            <Route path="/" element={<ActiveUsersPage />} />
            <Route path="/:id" element={<UserPage />} />
            <Route path="/:id/posts" element={<UserPostsPage />} />
            <Route path="/:id/friends" element={<UserFriendsPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
