import React from "react";
import "./css/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-main-container">
      <div className="login-container">
        <h1>Login</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <Link to="/dashboard">Log in</Link>
        <p>
          Not registered? <Link to="/signin">Sigin</Link>
        </p>
      </div>
      <div className="logo-container">
        <img src="/mlogo.jpg" alt="" style={{ width: "100px" }} />
        <h1>Manage Now</h1> <p>A free online platform to store user details</p>
      </div>
    </div>
  );
};

export default Login;
