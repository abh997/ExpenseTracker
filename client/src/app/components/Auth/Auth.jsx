import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth = ({setHasUserLoggedIn}) => {
  const [isSignInFormActive, setIsSignInFormActive] = useState(true);
  
  return (
    <>
      {isSignInFormActive ? (
        <SignIn setIsSignInFormActive={setIsSignInFormActive} setHasUserLoggedIn={setHasUserLoggedIn} />
      ) : (
        <SignUp setIsSignInFormActive={setIsSignInFormActive} />  
      )}
    </>
  );
};

export default Auth;
