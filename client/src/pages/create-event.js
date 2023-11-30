import axios from "axios";
import { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useGetUserName } from "../hooks/useGetUserName";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const CreateEvent = () => {
  const userID = useGetUserID();
  const userName = useGetUserName();
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    organizer: userID,
    organizerName: userName,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData((prevEventData) => ({ ...prevEventData, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://event-organization-n2w5.onrender.com/events", eventData);
      const createdEventID = response.data._id;

      localStorage.setItem("eventID", createdEventID);

      toast.success("Event Created", { position: toast.POSITION.TOP_RIGHT });
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Error creating event", { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return (
    <div className="create-event">
      <h2>Create Event</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Event Name:</label>
          <input data-test="create-event-name-input" type="text" className="form-control" id="name" name="name" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea data-test="create-event-description-input" className="form-control" name="description" id="description" onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input data-test="create-event-date-input" type="date" className="form-control" id="date" name="date" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input data-test="create-event-location-input" type="text" className="form-control" id="location" name="location" onChange={handleChange} />
        </div>
        <button data-test="create-event-button-input" type="submit" className="btn btn-success">Create Event</button>
      </form>
    </div>
  );
};