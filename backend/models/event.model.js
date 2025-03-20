const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    dateTime: { type: Date, required: true }, // Date and time of the event
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users attending this event
    maxAttendees: { type: Number, default: 100 }, // Optional, can be set to limit attendance
    status: { type: String, enum: ["open", "closed"], default: "open" }, // Event status (open for RSVPs or closed)
    category: { type: String, required: true }, // e.g., Party, Meeting, Conference, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
