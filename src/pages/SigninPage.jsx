import React from "react";
import "../components/css/Login.css";
import { Link } from "react-router-dom";

const SigninPage = () => {
  return (
    <div className="login-main-container">
      <div className="login-container">
        <h1>Sign in</h1>
        <input type="text" placeholder="Username" />

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <Link to="/dashboard">Sign in</Link>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
      <div className="logo-container">
        <img src="/mlogo.jpg" alt="" style={{ width: "100px" }} />
        <h1>Manage Now</h1>
        <p>A free online platform to store user details</p>
      </div>
    </div>
  );
};

export default SigninPage;
