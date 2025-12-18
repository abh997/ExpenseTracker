"use client";

import axios from "axios";
const { createContext, useReducer } = require("react");

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Initialize default authentication state from localStorage if available
let defaultAuthenticationState = {};

if (typeof window != "undefined") {
  defaultAuthenticationState = JSON.parse(localStorage.getItem("ExpenseAuth")) || {
    userId: "",
    Username: "",
  };
} else {
  defaultAuthenticationState = {
    userId: "",
    Username: "",
  };
}

// Create and export the authentication context
export const AuthContext = createContext(defaultAuthenticationState);

// Reducer function to update authentication state based on user actions
const authenticationReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      const signedInState = action.payload;
      localStorage.setItem("ExpenseAuth", JSON.stringify(signedInState));
      return signedInState;

    default:
      return state;
  }
};

// Provider component for managing authentication across the application
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authenticationReducer, defaultAuthenticationState);

  // Register a new user account
  const registerNewUser = async (registrationData) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/SignUp`, registrationData);
      alert(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Authenticate user credentials and establish session
  const authenticateUserLogin = async (loginData) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/SignIn`, loginData);
      if (response.data === "User not founded") {
        return response.data;
      } else {
        dispatch({ type: "SIGN_IN", payload: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        AuthData: state,
        dispatch,
        registerNewUser,
        authenticateUserLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
