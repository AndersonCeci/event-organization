import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Loginpage = () => {
  return (
    <div className="auth">
      <Login />
      <ToastContainer />
    </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
        secretCode,
      });

      setCookies("access_token", result.data.token);
      setCookies("role", result.data.role);
      window.localStorage.setItem("userID", result.data.userID);
      window.localStorage.setItem("userName", result.data.name);

      if (result.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="secretCode">Admin Secret Code:</label>
          <input
            type="password"
            className="form-control"
            id="secretCode"
            value={secretCode}
            onChange={(event) => setSecretCode(event.target.value)}
            data-test="secret-code-admin-login"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            data-test="email-login-input"
            type="email"
            className="form-control"
            id="name"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            data-test="password-login-input"
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" data-test="login-button">
          Login
        </button>
        <h3 style={{ fontSize: "1rem" }}>
          Don't have an account yet?{' '}
          <Link
            to="/auth/register"
            style={{
              color: "blue",
              textDecoration: "underline",
              fontSize: "1.3rem",
            }}
            data-test="register-link"
          >
            Sign Up
          </Link>
        </h3>
      </form>
    </div>
  );
};
