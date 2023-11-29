import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <Link data-test="create-event-button" className="navbar-brand" to="/create-event">
          Create Event
        </Link>
        {!cookies.access_token ? (
          <Link data-test="login-register-link" className="navbar-brand" to="/auth/login">
            Login/Register
          </Link>
        ) : (
          <button className="btn btn-outline-light" onClick={logout}>
            Log out
          </button>
        )}
      </div>
    </nav>
  );
};
