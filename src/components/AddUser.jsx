import React, { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../index";
import "./css/AddUser.css";

const AddUser = ({ userId, updateDetails, onUpdate, onCancel }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Set form fields when updateDetails change
    if (updateDetails.isActive) {
      setUsername(updateDetails.username || "");
      setEmail(updateDetails.email || "");
      setMobile(updateDetails.mobile || "");
    } else {
      // Reset the form fields when not updating
      setUsername("");
      setEmail("");
      setMobile("");
    }
  }, [updateDetails]);

  const handleAddUser = async (e) => {
    e.preventDefault();

    setError(""); // Clear any previous error

    const userDetailsCollection = collection(
      db,
      "user_details",
      userId,
      "details"
    );

    if (updateDetails.isActive) {
      const userDetailsDocRef = doc(
        userDetailsCollection,
        updateDetails.userId
      );

      await updateDoc(userDetailsDocRef, {
        username: username,
        email: email,
        mobile: mobile,
      });

      onUpdate(); // Callback to notify the parent about the update
    } else {
      // For new user addition
      const emailUnique = await isEmailUnique();

      if (!emailUnique) {
        setError("Email already exists.");
        return;
      }

      const userDetailsDocRef = doc(userDetailsCollection);

      await setDoc(userDetailsDocRef, {
        username: username,
        email: email,
        mobile: mobile,
      });

      onUpdate(); // Callback to notify the parent about the update
    }

    // Reset the form
    setUsername("");
    setEmail("");
    setMobile("");
  };

  const isEmailUnique = async () => {
    const userDetailsCollection = collection(
      db,
      "user_details",
      userId,
      "details"
    );

    const querySnapshot = await getDocs(
      query(userDetailsCollection, where("email", "==", email))
    );

    return querySnapshot.empty;
  };

  return (
    <div className="container">
      <h1>{updateDetails.isActive ? "Update User" : "Add User"}</h1>
      {error && <p className="error-message">{error}</p>}

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
        </div>
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit">
            {updateDetails.isActive ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
