import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AdminNavBar = () => {
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
      <Link className="navbar-brand" to="/admin">
          Home
        </Link>
        <Link className="navbar-brand" to="/admin">
          Event List
        </Link>
        <Link className="navbar-brand" to="/user-list">
          Users List
        </Link>
        {!cookies.access_token ? (
          <Link className="navbar-brand" to="/auth/login">
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
