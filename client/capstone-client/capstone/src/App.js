import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActiveUsersPage from "./pages/ActiveUsersPage";
import UserPage from "./pages/UserPage";
import UserPostsPage from "./pages/UserPostsPage";
import UserFriendsPage from "./pages/UserFriendsPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CreatePostPage from "./pages/CreatePostPage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <main className="main">
          <div className="test">hey</div>
          <Routes>
            <Route path="/" element={<ActiveUsersPage />} />
            <Route path="/post" element={<CreatePostPage />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/users/:id/posts" element={<UserPostsPage />} />
            <Route path="/users/:id/friends" element={<UserFriendsPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
