import "./Register.css";
import { useContext, useRef } from "react";
import axios from "axios";
// import { useHistory } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  // const profilePicture = useRef();
  // const coverPicture = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity(
        "Password and confirm password must be same!"
      );
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        // profilePicture: profilePicture.current.value,
        // coverPicture: coverPicture.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">KenelChat</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on KenelChat.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              className="loginInput"
              ref={username}
              required
            />
            <input
              placeholder="Email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              className="loginInput"
              ref={password}
              required
              minLength="6"
            />
            <input
              placeholder="Confirm Password"
              className="loginInput"
              ref={confirmPassword}
              required
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
