import express from "express";
import mongoose from "mongoose";
import { EventModel } from "../models/Event.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await EventModel.find({}).sort({ date: -1 });
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const event = new EventModel(req.body);

  try {
    const response = await event.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", async (req, res) => {
  try {
    const event = await EventModel.findById(req.body.eventID);
    const user = await UserModel.findById(req.body.userID);
    user.savedEvents.push(event);
    await user.save();
    res.json({ savedEvents: user.savedEvents });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedEvents/ids/:eventID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.eventID);
    const eventID = await EventModel.findById(req.params.eventID);
    res.json({ savedEvents: eventID.savedEvents });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedEvents", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.UserID);
    const savedEvents = await EventModel.find({
      _id: { $in: user.savedEvents },
    });
    res.json({ savedEvents });
  } catch (err) {
    res.json(err);
  }
});

router.get("/:eventId", async (req, res) => {
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

router.delete("/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const deletedEvent = await EventModel.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    await UserModel.updateMany({}, { $pull: { savedEvents: eventId } });
    res.json({ message: "Event deleted successfully", deletedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as eventsRouter };
