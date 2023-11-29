import express from "express";
import { AttendeeModel } from "../models/Attendee.js";
import { UserModel } from "../models/Users.js";
import { EventModel } from "../models/Event.js";

const router = express.Router();


router.post("/join", async (req, res) => {
  const { userId, eventId, attendeeName } = req.body;
  
  try {
    const user = await UserModel.findById(userId);
    const event = await EventModel.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ error: "User or event not found" });
    }

    if (!event.attendees) {
      event.attendees = [];
    }

    const existingAttendee = await AttendeeModel.findOne({ userId, eventId });

    if (existingAttendee) {
      return res.json({ message: "User is already an attendee for this event" });
    }

    const newAttendee = new AttendeeModel({ userId, eventId, attendeeName });
    await newAttendee.save();

    event.attendees.push(newAttendee);
    await event.save();

    res.json({
      message: "User joined the event successfully",
      attendee: newAttendee,
      updatedEvent: event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as attendeeRouter };
