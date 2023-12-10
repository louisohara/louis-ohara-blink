import Button from "../Button/Button";
import add from "../../assets/Icons/addition.png";
import search from "../../assets/Icons/search.svg";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Fuse from "fuse.js";
import DisplayUser from "../DisplayUser/DisplayUser";
import close from "../../assets/Icons/close-24px.svg";
import "../../components/Modal/Modal.scss";
import "./AddFriends.scss";
import DisplayUsers from "../DisplayUsers/DisplayUsers";

function AddFriends({ users, userFriends, currentUser, getUserFriends }) {
  const filteredUsers = users.filter((user) => user.id !== currentUser.id);

  const formattedUsers = filteredUsers.map((user) => ({
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
      setIsAdded(false);
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
        setFriendUser(false);
        handleClose();
      }
    } catch (error) {
      setErrors(true);
    }
  };

  const handleOnSelect = (selectedItem) => {
    setFriendUser(selectedItem);
    setIsAdded(false);
  };
  const handleClear = () => {
    setFriendUser(null);
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

  const handleClose = () => {
    setFriendUser(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <section className="add-friends">
      <div className="add-friends__button">
        {!show && <Button image={search} onClick={handleShow} text="Search" />}
      </div>
      {show && (
        <div className="modal__overlay modal__overlay--friends">
          <div className="modal modal__friends">
            <div className="add-friends__inner">
              <div className="add-friends__close">
                <div className="add-friends__image-container">
                  <img
                    src={close}
                    onClick={handleClose}
                    className="add-friends__image"
                  />
                </div>

                <p className="add-friends__text">
                  Search for friends to get started
                </p>
              </div>
              <div style={{ width: 400 }}>
                <div className="add-friends__search">
                  <ReactSearchAutocomplete
                    items={formattedUsers}
                    onSearch={() => {
                      setSearchResults();
                    }}
                    onHover={() => {}}
                    onSelect={handleOnSelect}
                    onClear={handleClear}
                    onFocus={() => {}}
                    placeholder="Please enter a name"
                    fuseOptions={{ keys: ["first_name"] }}
                    resultStringKeyName="fullName"
                    autoFocus
                    formatResult={formatResult}
                    name="fullName"
                    id="fullName"
                  />
                </div>
                {friendUser && (
                  <div className="add-friends__results">
                    <form className="add-friends__form" onSubmit={handleSubmit}>
                      <label htmlFor="user" className="add-friends__form-label">
                        Selected Profile:
                      </label>
                      {/* {!friendUser && <DisplayUsers />} */}
                      {friendUser && <DisplayUser user={friendUser} />}
                      {/* <p>Name: {`${friendUser.first_name} ${friendUser.surname}`}</p> */}
                      <div className="add-friends__button--alt">
                        <Button
                          image={add}
                          text="Add Friend"
                          type="submit"
                          alt="friends"
                        />
                      </div>
                      {errors && <p>You are already friends with this user.</p>}
                      {friendUser && isAdded ? (
                        <p>Successfully added user: {friendUser.first_name}</p>
                      ) : (
                        ""
                      )}
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AddFriends;
