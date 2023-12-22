import React, { useLayoutEffect, useEffect, useState } from "react";
import "./css/DashboardPage.css";
import AddUser from "../components/AddUser";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Context } from "../Context/AuthContext";

const DashboardPage = () => {
  const [addUsers, setAddUsers] = useState(false);
  const [getDetails, setGetDetails] = useState(
    JSON.parse(localStorage.getItem("userStore"))
  );
  const [updateDetails, setUpdateDetails] = useState({
    isActive: false,
    userId: null,
  });

  const [toggleview, setToggleView] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const addUserDetails = () => {
    setAddUsers(!addUsers);
  };

  function handleUpdate(id) {
    console.log("update", id);
    setUpdateDetails({ isActive: !updateDetails.isActive, userId: id });
  }

  const Allitems = JSON.parse(localStorage.getItem("userStore"));

  function handleDelete(id) {
    const updatedItems = Allitems.filter((item) => item.id !== id);
    localStorage.setItem("userStore", JSON.stringify(updatedItems));
    setGetDetails(updatedItems);
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(Allitems);
  // useEffect(() => {
  //   setGetDetails(JSON.parse(localStorage.getItem("userStore")));
  // }, []); // Add an empty dependency array to run the effect only once

  // console.log(getDetails);

  // useLayoutEffect(() => {
  //   const storedDetails = JSON.parse(localStorage.getItem("userStore"));
  //   console.log("storedDetails:", storedDetails);
  //   setGetDetails(storedDetails);
  //   console.log("getDetails", getDetails);
  // }, []);
  // console.log("outside layout getDetails:", getDetails);

  // useEffect(() => {
  //   setGetDetails(JSON.parse(localStorage.getItem("userStore")));
  //   console.log("getDetails: ", getDetails);
  // }, []);

  return (
    <div className="main-container">
      <div className="nav-container">
        <div className="nav-logo">
          <img src="./mlogo.jpg" alt="" />
          <h1>Manage Now</h1>
        </div>
        <div className="nav-buttons">
          <button onClick={addUserDetails}>
            {addUsers ? "CANCEL USER" : "ADD USER"}
          </button>
          <button onClick={handleLogout}>LOGOUT </button>
        </div>
      </div>

      <button
        className="view-button"
        onClick={() => setToggleView(!toggleview)}
      >
        {toggleview ? "Card View" : "Table View"}
      </button>

      {getDetails && getDetails.length > 0 ? (
        toggleview ? (
          <table>
            <thead>
              <tr>
                <th>S. no</th>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {getDetails.map((eachUser) => (
                <tr className="row" key={eachUser.id}>
                  <td>{eachUser.id}</td>
                  <td>{eachUser.username}</td>
                  <td>{eachUser.email}</td>
                  <td>{eachUser.mobile}</td>
                  <td>
                    <img
                      src="/update-logo.svg"
                      alt="update"
                      onClick={() => handleUpdate(eachUser.id)}
                    />
                  </td>
                  <td>
                    <img
                      src="/delete-logo.svg"
                      alt="Delete"
                      onClick={() => handleDelete(eachUser.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="card-container">
            {getDetails.map((eachUser) => (
              <div key={eachUser.id} className="card-component">
                <div className="label-container">
                  <span>S.no: </span>
                  <p> {eachUser.id}</p>
                </div>
                <div className="label-container">
                  <span> Username: </span>
                  <p>{eachUser.username}</p>
                </div>
                <div className="label-container">
                  <span> Email: </span>
                  <p>{eachUser.email}</p>{" "}
                </div>
                <div className="label-container">
                  <span> Mobile No: </span>
                  <p>{eachUser.mobile}</p>{" "}
                </div>

                <div className="card-handlers">
                  <button onClick={() => handleUpdate(eachUser.id)}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(eachUser.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            height: "80%",
            marginTop: "50px",
            paddingBottom: "50px",
            flexWrap: "wrap",
          }}
        >
          <h1>No user details available</h1>
        </div>
      )}
      {addUsers ? <AddUser /> : ""}
      {updateDetails.isActive ? <AddUser userId={updateDetails.userId} /> : ""}
    </div>
  );
};

export default DashboardPage;
