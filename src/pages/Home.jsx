import React from "react";
import "./css/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="home-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {" "}
      <img src="/mlogo.jpg" alt="" style={{ width: "100px" }} />
      <h1>Manage Now</h1>
      <p>A free online platform to store user details</p>
      <div
        className="buttons-container"
        style={{ display: "flex", gap: "20px" }}
      >
        <Link to="/login">Login</Link>

        <Link to="/signin">Signin</Link>
      </div>
    </div>
  );
};

export default Home;
