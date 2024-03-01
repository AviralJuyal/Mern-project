import React, { useState } from "react";
import MainContext from "./MainContext";

const MainState = (props) => {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  return (
    <MainContext.Provider value={{ jwt, setJwt, userId, setUserId }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainState;
