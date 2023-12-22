import React, { useEffect, useState } from "react";
import "./css/AddUser.css";
const AddUser = ({ userId }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [store, setStore] = useState(
    JSON.parse(localStorage.getItem("userStore"))
  );

  useEffect(() => {
    // If userId is provided, find the corresponding user details
    if (userId) {
      const userToEdit = store.find((user) => user.id === userId);
      if (userToEdit) {
        setUsername(userToEdit.username);
        setEmail(userToEdit.email);
        setMobile(userToEdit.mobile);
      }
    }
  }, [userId, store]);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (username === "" || email === "" || mobile === "") {
      return alert("Please fill in all the details");
    } else {
      let newUser = {
        username: username,
        email: email,
        mobile: mobile,
        id: userId || Date.now(),
      };

      setStore((prevStore) => {
        if (Array.isArray(prevStore)) {
          // If prevStore is an array, perform the necessary operations
          if (userId) {
            // If updating, find the user in the store and update details
            return prevStore.map((user) =>
              user.id === userId ? newUser : user
            );
          } else {
            // If adding, append the new user to the store
            return [...prevStore, newUser];
          }
        } else {
          // If prevStore is not an array, initialize it as an array with the new user
          return [newUser];
        }
      });

      // Clear the input fields after adding/updating a user
      setUsername("");
      setEmail("");
      setMobile("");
      alert(`${newUser.username} ${userId ? "updated" : "added"} to the store`);
    }
    window.location.reload();
    console.log(store);
  };

  // Save the data to local storage whenever the store changes
  useEffect(() => {
    localStorage.setItem("userStore", JSON.stringify(store));
    console.log(store);
  }, [store]);
  return (
    <div className="container">
      <h1>Add User</h1>

      <form className="form-container" onSubmit={handleAddUser}>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </div>{" "}
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="mobile">Mobile No.</label>
          <input
            type="text"
            id="mobile"
            onChange={(e) => setMobile(e.target.value)}
            minLength={10}
            maxLength={10}
            value={mobile}
            required
          />
        </div>
        <div>
          <button type="submit">{userId ? "Update User" : "Add User"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
