import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  location: { type: String, require: true },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  organizerName: {
    type: String, 
    ref: "users.name",  
    required: true,
  },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'attendee' }],

});



export const EventModel = mongoose.model("events", EventSchema);
