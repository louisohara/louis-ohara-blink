import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DisplayUser from "../components/DisplayUser/DisplayUser";
import CreatePostForm from "../components/CreatePostForm/CreatePostForm";
import Button from "../components/Button/Button";
import Upload from "../assets/Icons/upload.svg";

// THIS PAGE NEEDS TO BE THE ID OF THE CURRENT USER
// SHOULD BE PASSED THE ID OF THE USER FROM APP.JS VIA PROPS
// LOGIN/AUTH WILL FEED ID INTO THIS PAGE.
// this page is where the user can view their profile and create a post.

function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`http://localhost:8080/api/users/${id}`);
      setUser(response.data);
    };
    getUser();
  }, [id, user]);

  if (!user) {
    return <p>loading...</p>;
  }
  return (
    <section className="user">
      This is the user page
      <DisplayUser user={user} />
      {!show && <Button image={Upload} onClick={handleShow} />}
      {show && <CreatePostForm userId={id} handleClose={handleClose} />}
    </section>
  );
}

export default UserPage;
