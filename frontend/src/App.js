import React, { useContext } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MainContext from "./context/MainContext";

function App() {
  const { userId } = useContext(MainContext);
  // It checks whether the user is logged in
  return <>{!userId ? <LoginPage /> : <HomePage />}</>;
}

export default App;
