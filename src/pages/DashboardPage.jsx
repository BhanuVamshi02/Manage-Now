import React, { useState, useEffect, useContext } from "react";
import "./css/DashboardPage.css";
import AddUser from "../components/AddUser";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Context } from "../Context/AuthContext";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../index";

const DashboardPage = () => {
  const [addUsers, setAddUsers] = useState(false);
  const [getDetails, setGetDetails] = useState([]);
  const [updateDetails, setUpdateDetails] = useState({
    isActive: false,
    userId: null,
    username: "",
    email: "",
    mobile: "",
  });

  const [toggleview, setToggleView] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const usersCollection = collection(db, "user_details", user.uid, "details");

  const addUserDetails = () => {
    setAddUsers(!addUsers);
  };

  const fetchUserDetails = async () => {
    try {
      const querySnapshot = await getDocs(usersCollection);
      const userDetails = [];
      querySnapshot.forEach((doc) => {
        userDetails.push({ id: doc.id, ...doc.data() });
      });
      setGetDetails(userDetails);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [usersCollection]);

  function handleUpdate(id) {
    const selectedUser = getDetails.find((user) => user.id === id);

    setUpdateDetails({
      isActive: !updateDetails.isActive, // Toggle isActive
      userId: id,
      username: selectedUser.username,
      email: selectedUser.email,
      mobile: selectedUser.mobile,
    });

    setAddUsers(!addUsers); // Toggle AddUser component
  }
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(usersCollection, id));
      setGetDetails((prevDetails) =>
        prevDetails.filter((user) => user.id !== id)
      );
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

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
                  <p>{eachUser.id}</p>
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
      {addUsers || updateDetails.isActive ? (
        <AddUser
          userId={user.uid}
          updateDetails={updateDetails}
          onUpdate={() => {
            fetchUserDetails(); // Reload user details on successful update
            setAddUsers(false); // Close AddUser component
            setUpdateDetails({ isActive: false, userId: null }); // Reset updateDetails
          }}
          onCancel={() => {
            setAddUsers(false); // Close AddUser component
            setUpdateDetails({ isActive: false, userId: null }); // Reset updateDetails
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default DashboardPage;
