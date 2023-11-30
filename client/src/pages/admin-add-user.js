import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AdminAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://event-organization-n2w5.onrender.com/auth/register", {
        name,
        email,
        password,
      });
      navigate("/user-list");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container" style={{ textAlign: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <h2>Add User</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            data-test="add-user-name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            data-test="add-user-email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            data-test="add-user-password"
          />
        </div>
        <button
          type="submit"
          style={{
            width: "75%",
            padding: "10px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "1rem",
          }}
          data-test="add-user-button"
        >
          Add User
        </button>
      </form>
    </div>
  );
};
