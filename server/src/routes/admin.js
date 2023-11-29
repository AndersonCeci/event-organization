import express from "express";
import mongoose from "mongoose";
import { EventModel } from "../models/Event.js";
import { UserModel } from "../models/Users.js";


const router = express.Router();
router.get("/:eventId/admin", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const eventDetails = await EventModel.findById(eventId).populate('attendees');

    if (!eventDetails) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (!eventDetails.attendees) {
      eventDetails.attendees = [];
    }

    res.json(eventDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as adminRouter };