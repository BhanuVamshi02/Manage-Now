import React, { useState } from "react";
import "./css/Login.css";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const [displayName, setDisplayname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName });

      alert(` ${user.displayName} you are successfully signup\n Please login.`);
      console.log(user, "authdata");
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="login-main-container">
      <div className="login-container">
        <h1>Sign up</h1>
        <form onSubmit={(e) => handleSignup(e)}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setDisplayname(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Sign up</button>
        </form>

        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
      <div className="logo-container">
        <Link to="/">
          <img src="/mlogo.jpg" alt="" style={{ width: "100px" }} />
        </Link>{" "}
        <h1>Manage Now</h1>
        <p>A free online platform to store user details</p>
      </div>
    </div>
  );
};

export default SigninPage;
