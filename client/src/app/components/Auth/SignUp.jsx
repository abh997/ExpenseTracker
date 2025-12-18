import { React, useContext, useState, useRef } from "react";
import style from "./Auth.css";
import { AuthContext } from "../../Context/AuthContext";

const SignUp = (props) => {
  const { setIsSignInFormActive } = props;
  const { registerNewUser } = useContext(AuthContext);
  const [registrationFormData, setRegistrationFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
  });
  const usernameFieldRef = useRef(null);
  const emailFieldRef = useRef(null);
  const passwordFieldRef = useRef(null);

  const clearFormFields = () => {
    usernameFieldRef.current.value = "";
    emailFieldRef.current.value = "";
    passwordFieldRef.current.value = "";
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    const response = await registerNewUser(registrationFormData);
    if (response === "Email Already Exists") {
      setIsSignInFormActive(false);
      clearFormFields();
    } else {
      setIsSignInFormActive(true);
      clearFormFields();
    }
  };

  return (
    <>
      <div className="formcomponent">
        <div className="Authcontainer">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join Expense Tracker today</p>
          
          <form onSubmit={handleRegistrationSubmit}>
            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                ref={usernameFieldRef}
                autoComplete="off"
                onChange={(e) => {
                  setRegistrationFormData((prev) => {
                    return { ...prev, Username: e.target.value };
                  });
                }}
                required
              />
            </div>

            <div className="input-container">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                autoComplete="off"
                ref={emailFieldRef}
                name="email"
                onChange={(e) => {
                  setRegistrationFormData((prev) => {
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
                placeholder="Create a strong password"
                autoComplete="off"
                ref={passwordFieldRef}
                name="password"
                required
                onChange={(e) => {
                  setRegistrationFormData((prev) => {
                    return { ...prev, Password: e.target.value };
                  });
                }}
              />
            </div>

            <button type="submit">Sign Up</button>
          </form>

          <div className="auth-toggle-section">
            <span className="auth-toggle-text">Already have an account?</span>
            <span
              className="auth-toggle-link"
              onClick={() => {
                setIsSignInFormActive(true);
              }}
            >
              Sign In
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
