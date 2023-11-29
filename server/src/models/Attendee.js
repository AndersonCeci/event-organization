import mongoose from "mongoose";

const attendeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'events', required: true },
  attendeeName: { type: String, required: true },
});

export const AttendeeModel = mongoose.model('attendee', attendeeSchema);
