import React, { useContext, useState } from "react";
import style from "./Auth.css";
import { AuthContext } from "../../Context/AuthContext";

const SignIn = (props) => {
  const { setIsSignInFormActive, setHasUserLoggedIn } = props;
  const { authenticateUserLogin } = useContext(AuthContext);
  const [loginFormData, setLoginFormData] = useState({});

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    const response = await authenticateUserLogin(loginFormData);
    if(response ==="User not founded"){
      alert("Error: Email or Password does'nt exists")
      setIsSignInFormActive(true)
    }
    
  };

  return (
    <div className="formcomponent">
      <div className="Authcontainer">
        <h2>Sign In</h2>
        <p className="auth-subtitle">Welcome back to Expense Tracker</p>
        
        <form onSubmit={handleLoginSubmit}>
          <div className="input-container">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="off"
              onChange={(e) => {
                setLoginFormData((prev) => {
                  return { ...prev, Email: e.target.value };
                });
              }}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="off"
              onChange={(e) => {
                setLoginFormData((prev) => {
                  return { ...prev, Password: e.target.value };
                });
              }}
              required
            />
          </div>

          <button type="submit">Sign In</button>
        </form>

        <div className="auth-toggle-section">
          <span className="auth-toggle-text">Don't have an account?</span>
          <span
            className="auth-toggle-link"
            onClick={() => {
              setIsSignInFormActive(false);
            }}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
