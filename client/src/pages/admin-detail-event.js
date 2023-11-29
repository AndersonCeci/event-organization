import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import "bootstrap/dist/css/bootstrap.min.css";

export const AdminEventDetails = () => {
  const { eventId } = useParams();

  const [eventData, setEventData] = useState({});
  const [attendeeData, setAttendeeData] = useState([]);
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [attendeeName, setAttendeeName] = useState("");
  const [editedEvent, setEditedEvent] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    organizerName: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [isEventOrganizer, setIsEventOrganizer] = useState(false);

  useEffect(() => {
    const fetchEventsDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/events/${eventId}`
        );
        setEventData(response.data);
        setAttendeeData(response.data.attendees || []);
        setEditedEvent(response.data);
        setIsEventOrganizer(response.data.organizerId === userID);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEventsDetails();
  }, [eventId, userID]);

  const handleNameChange = (e) => {
    setAttendeeName(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditedEvent({
      ...editedEvent,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const saveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/events/${eventId}`,
        editedEvent
      );
      setEventData(response.data);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:4000/events/${eventId}`);
      navigate("/admin");
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="card" style={{ width: "25rem", border: "none" }}>
        <div className="card-body">
          <h1 className="card-title">Event Details</h1>
          {eventData && eventData.name && (
            <ul className="list-group">
              <li key={eventData._id} className="list-group-item">
                <div>
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Event Name"
                      value={editedEvent.name}
                      onChange={handleEditChange}
                      data-test="edit-event-name-input"
                      style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
                    />
                  ) : (
                    <h2
                      style={{ fontWeight: "bold" }}
                      data-test="event-name-edited"
                    >
                      Event name: {eventData.name}
                    </h2>
                  )}
                </div>
                <div>
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder="Event Description"
                      value={editedEvent.description}
                      onChange={handleEditChange}
                      data-test="edit-event-description-input"
                      style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
                    />
                  ) : (
                    <h2
                      style={{ fontWeight: "bold" }}
                      data-test="event-description-edited"
                    >
                      Event Description: {eventData.description}
                    </h2>
                  )}
                </div>
                <div>
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      placeholder="Event Location"
                      value={editedEvent.location}
                      onChange={handleEditChange}
                      style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
                    />
                  ) : (
                    <div style={{ marginBottom: "0.5rem" }}>
                      <span style={{ fontWeight: "bold" }}>Location: </span>{" "}
                      {eventData.location}
                    </div>
                  )}
                </div>

                <div>
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="date"
                      placeholder="Event Date"
                      value={formatDate(editedEvent.date)}
                      onChange={handleEditChange}
                      style={{ marginBottom: "0.8rem", fontWeight: "bold" }}
                    />
                  ) : (
                    <div style={{ marginBottom: "0.5rem" }}>
                      <span style={{ fontWeight: "bold" }}>Date: </span>{" "}
                      {formatDate(eventData.date)}
                    </div>
                  )}
                </div>
                <h3 className="card-subtitle mb-2 text-muted">
                  Organizer: {eventData.organizerName}
                </h3>
                <button
                  onClick={deleteEvent}
                  className="btn btn-danger mr-2"
                  style={{ marginRight: "0.2rem" }}
                >
                  Delete Event
                </button>
                {editMode ? (
                  <button
                    onClick={saveChanges}
                    className="btn btn-success mr-2"
                    style={{ marginRight: "0.2rem" }}
                    data-test="save-changes-button"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={toggleEditMode}
                    className="btn btn-primary mr-2"
                    data-test="edit-event-button"
                  >
                    Edit Event
                  </button>
                )}
              </li>
            </ul>
          )}
          <h3>Attendees List:</h3>
          <ul className="list-group">
            {Array.isArray(attendeeData) &&
              attendeeData.map((attendee) => (
                <li key={attendee._id} className="list-group-item">
                  {attendee.attendeeName}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
