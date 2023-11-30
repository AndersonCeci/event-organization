import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EventDetails = () => {
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
          `https://event-organization-n2w5.onrender.com/events/${eventId}`
        );
        setEventData(response.data);
        setAttendeeData(response.data.attendees || []);
        setEditedEvent(response.data);
        setIsEventOrganizer(response.data.organizer === userID);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching event details");
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
      if (!isEventOrganizer) {
        console.error("You are not authorized to edit this event.");
        toast.error("You are not authorized to edit this event.");
        return;
      }

      const response = await axios.put(
        `https://event-organization-n2w5.onrender.com/events/${eventId}`,
        editedEvent
      );
      setEventData(response.data);
      setEditMode(false);
      toast.success("Event changes saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error saving event changes");
    }
  };

  const joinEvent = async () => {
    try {
      if (!attendeeName.trim()) {
        console.error("Attendee name is required");
        toast.error("Attendee name is required");
        return;
      }

      const response = await axios.post("https://event-organization-n2w5.onrender.com/attendee/join", {
        eventId,
        userId: userID,
        attendeeName: attendeeName,
      });

      const updatedEvent = response.data.updatedEvent;
      setAttendeeData(updatedEvent.attendees || []);
      toast.success("Successfully joined the event!");
    } catch (err) {
      console.error(err);
      toast.error("Error joining the event");
    }
  };

  const deleteEvent = async () => {
    try {
      if (!isEventOrganizer) {
        console.error("You are not authorized to delete this event.");
        toast.error("You are not authorized to delete this event.");
        return;
      }

      await axios.delete(`https://event-organization-n2w5.onrender.com/events/${eventId}`);
      navigate("/");
      toast.success("Event deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting the event");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-5">
      <h1>Event Details</h1>
      {eventData && eventData.name && (
        <div className="card">
          <div className="card-body">
            <div>
              {editMode ? (
                <input
                  className="form-control mb-2"
                  type="text"
                  name="name"
                  placeholder="Event Name"
                  value={editedEvent.name}
                  onChange={handleEditChange}
                  data-test="edit-event-name-input"
                />
              ) : (
                <h2 data-test="event-name-edited">
                  <strong>Event Name:</strong> {eventData.name}
                </h2>
              )}
            </div>
            <div>
              {editMode ? (
                <input
                  className="form-control mb-2"
                  type="text"
                  name="description"
                  placeholder="Event Description"
                  value={editedEvent.description}
                  onChange={handleEditChange}
                  data-test="edit-event-description-input"
                />
              ) : (
                <h2 data-test="event-description-edited">
                  <strong>Event Description:</strong> {eventData.description}
                </h2>
              )}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              {editMode ? (
                <input
                  className="form-control mb-2"
                  type="text"
                  name="location"
                  placeholder="Event Location"
                  value={editedEvent.location}
                  onChange={handleEditChange}
                />
              ) : (
                <div>
                  <span style={{ fontWeight: "bold" }}>Location: </span>{" "}
                  {eventData.location}
                </div>
              )}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              {editMode ? (
                <input
                  className="form-control mb-2"
                  type="text"
                  name="date"
                  placeholder="Event Date"
                  value={formatDate(editedEvent.date)}
                  onChange={handleEditChange}
                />
              ) : (
                <div>
                  <span style={{ fontWeight: "bold" }}>Date: </span>{" "}
                  {formatDate(eventData.date)}
                </div>
              )}
            </div>
            <h3 className="card-subtitle mb-2 text-muted">
              <strong>Organizer:</strong> {eventData.organizerName}
            </h3>
            <div>
              <input
                className="form-control mb-2"
                type="text"
                placeholder="Enter your name to join event"
                value={attendeeName}
                onChange={handleNameChange}
                data-test="join-attende-input"
              />
            </div>
            <button
              className="btn btn-primary mt-3"
              style={{ marginRight: "0.2rem" }}
              onClick={joinEvent}
              data-test="join-attende-button"
            >
              Join Event
            </button>
            <button
              className="btn btn-danger mt-3"
              style={{ marginRight: "0.2rem" }}
              onClick={deleteEvent}
              data-test="delete-event-button"
            >
              Delete Event
            </button>
            {editMode ? (
              <button
                className="btn btn-success mt-3"
                style={{ marginRight: "0.2rem" }}
                onClick={saveChanges}
                data-test="save-changes-button"
              >
                Save Changes
              </button>
            ) : (
              <button
                className="btn btn-warning mt-3"
                onClick={toggleEditMode}
                data-test="edit-event-button"
              >
                Edit Event
              </button>
            )}
          </div>
        </div>
      )}
      <h3 className="mt-5">Attendees list:</h3>
      <ul className="list-group">
        {Array.isArray(attendeeData) &&
          attendeeData.map((attendee) => (
            <li
              className="list-group-item"
              key={attendee._id}
              data-test="joined-attende-name"
            >
              {attendee.attendeeName}
            </li>
          ))}
      </ul>
    </div>
  );
};
