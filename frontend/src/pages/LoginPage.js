import React, { useContext, useState } from "react";
import { apiendpoint } from "../utils/apiendpoint";
import MainContext from "../context/MainContext";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId, setJwt } = useContext(MainContext);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length < 4 || password < 2)
      return alert(
        "Please enter email greater than 4 characters and password  than 2 characters"
      );
    let response;
    if (isLogin) {
      response = await fetch(`${apiendpoint}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      response = await response.json();
      if (!response.success) {
        alert("Enter Correct credentials !");
        return;
      }
    } else {
      response = await fetch(`${apiendpoint}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Convert the JavaScript object to a JSON string
      });
      response = await response.json();

      if (!response.success) {
        alert("Some error occurred");
        return;
      }
    }

    if (response?.userId) {
      localStorage.setItem("jwt", response.authToken);
      localStorage.setItem("userId", response.userId);
      setUserId(response.userId);
      setJwt(response.authToken);
    }
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            className="card shadow-2-strong"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body p-5 text-center">
              <h3 className="mb-5">{isLogin ? "Sign In" : "Sign Up"}</h3>

              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>

              <hr className="my-4" />

              <button onClick={toggleForm} className="btn btn-link">
                {isLogin
                  ? "Need an account? Sign Up"
                  : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
