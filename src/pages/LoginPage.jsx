import React, { useState } from "react";
import "./css/Login.css";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      alert(` Welcome ${user.displayName}! `);
      console.log(user, "authdata");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="login-main-container">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={(e) => handleLogin(e)}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <button>Log in</button>
        </form>
        <p>
          Not registered? <Link to="/signin">Sign up</Link>
        </p>
      </div>
      <div className="logo-container">
        <img src="/mlogo.jpg" alt="" style={{ width: "100px" }} />
        <h1>Manage Now</h1> <p>A free online platform to store user details</p>
      </div>
    </div>
  );
};

export default LoginPage;
