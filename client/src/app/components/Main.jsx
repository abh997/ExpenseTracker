"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./Style.css";
import Auth from "./Auth/Auth";
import Expense from "./Expense";
import { AuthContext } from "../Context/AuthContext";

const Main = () => {
  const { AuthData } = useContext(AuthContext);

  const [hasUserLoggedIn, setHasUserLoggedIn] = useState(null);
  
  return (
    <>
      {AuthData.userId == "" ? (
        <Auth setHasUserLoggedIn={setHasUserLoggedIn} />
      ) : (
        <Expense userLoggedIn={hasUserLoggedIn} />
      )}
    </>
  );
};

export default Main;
