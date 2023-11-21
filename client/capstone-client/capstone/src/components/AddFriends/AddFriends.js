import Button from "../Button/Button";
import search from "../../assets/Icons/search-24px.svg";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Fuse from "fuse.js";
import DisplayUser from "../DisplayUser/DisplayUser";
import close from "../../assets/Icons/close-24px.svg";
import "../../components/Modal/Modal.scss";

function AddFriends({ users, userFriends, currentUser, getUserFriends }) {
  const formattedUsers = users.map((user) => ({
    ...user,
    fullName: `${user.first_name} ${user.surname}`,
  }));

  const [friendUser, setFriendUser] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [errors, setErrors] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResults, setSearchResults] = useState(formattedUsers);

  const fuse = new Fuse(formattedUsers, {
    includeScore: true,
    includeMatches: true,
    keys: ["first_name", "surname", "fullName"],
    threshold: 0.2,
    findAllMatches: true,
  });
  useEffect(() => {
    if (searchTerm) {
      const results = fuse.search(searchTerm);
      console.log(results);
      const filteredResults = results.filter((result) => result.item); // Extract matched items
      setSearchResults(filteredResults);
    } else {
      setSearchResults(users.filter((user) => !userFriends.includes(user.id)));
    }
  }, [searchTerm]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/friends", {
        friend_id: friendUser.id,
        user_id: currentUser.id,
      });
      if (response.status === 201) {
        setIsAdded(true);
        getUserFriends();
        handleClose();
      }
    } catch (error) {
      setErrors(true);
    }
  };

  const handleOnSelect = (selectedItem) => {
    setFriendUser(selectedItem);
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {`${item.first_name} ${item.surname}`}
        </span>
      </>
    );
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <section>
      <Button image={search} onClick={handleShow} />
      {show && (
        <div className="modal">
          <Button image={close} onClick={handleClose} />
          This is the add friends component
          <div style={{ width: 400 }}>
            <ReactSearchAutocomplete
              items={formattedUsers}
              onSearch={() => {
                setSearchResults();
              }}
              onHover={() => {}}
              onSelect={handleOnSelect}
              onFocus={() => {}}
              fuseOptions={{ keys: ["first_name"] }}
              resultStringKeyName="fullName"
              autoFocus
              formatResult={formatResult}
              name="fullName"
              id="fullName"
            />
            {friendUser && (
              <div>
                <form className="form" onSubmit={handleSubmit}>
                  <label htmlFor="user" className="form__label">
                    Selected Profile:
                  </label>
                  <DisplayUser user={friendUser} />
                  {/* <p>Name: {`${friendUser.first_name} ${friendUser.surname}`}</p> */}
                  <Button image={search} text="Add Friend" type="submit" />
                </form>
              </div>
            )}
          </div>
        </div>
      )}
      {errors && <p>You are already friends with this user.</p>}
      {isAdded && <p>Successfully added user: {friendUser.first_name}</p>}
    </section>
  );
}

export default AddFriends;
