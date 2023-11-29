import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ListGroup } from "react-bootstrap";

export const AdminUserHome = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const navigateEvent = () => {
    navigate("/");
  };

  const addUser = () => {
    navigate("/add-user");
  };

  return (
    <div className="container mt-5">
      <h1>
        Admin User List{" "}
        <Button variant="primary" onClick={addUser} data-test="add-user-button-list">
          Add User
        </Button>
      </h1>
      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item
            key={user._id}
            className="d-flex justify-content-between align-items-center"
            data-test="users-list"
          >
            <span>
              <strong>Name:</strong> {user.name} - <strong>Email:</strong>{" "}
              {user.email} - <strong>Role:</strong> {user.role}
            </span>
            <Button variant="danger" onClick={() => deleteUser(user._id)}>
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};
