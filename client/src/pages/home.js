import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

export const Home = () => {
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://event-organization-n2w5.onrender.com/events");
        setEventData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const navigateEvent = (eventId) => {
    navigate(`/savedEvents/ids/${eventId}`);
  };

  return (
    <div>
      <h1>Events</h1>
      {Array.isArray(eventData) &&
        eventData.map((event) => (
          <div key={event._id} style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title" data-test="event-name-home">Event Name: {event.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Organizer: {event.organizerName}</h6>
                <p className="card-text" style={{ fontSize: "1.1rem" }}>Description: {event.description}</p>
                <div style={{ marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "bold" }}>Location:</span> {event.location}
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "bold" }}>Date:</span> {formatDate(event.date)}
                </div>
                <button
                data-test="event-details-button"
                  className="btn btn-primary"
                  onClick={() => navigateEvent(event._id)}
                >
                  Event Details
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};