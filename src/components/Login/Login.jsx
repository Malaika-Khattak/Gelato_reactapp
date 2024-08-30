import React, { useState } from "react";
import cross_icon from "../../assests/cross_icon.png";
import "./Login.css";

const Login = ({ setshowlogin }) => {
  const [currentstate, setcurrentstate] = useState("Login");
  return (
    <div className="login">
      <form className="login-container">
        <div className="login-title">
          <h2>{currentstate}</h2>
          <img
            src={cross_icon}
            alt=""
            onClick={() => {
              setshowlogin(false);
            }}
          />
        </div>
        <div className="login-input">
          {currentstate === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your Name" required />
          )}

          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button>
          {currentstate === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentstate === "Login" ? (
          <p>
            Create a new account?
            <span
              onClick={() => {
                setcurrentstate("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setcurrentstate("Login");
              }}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
