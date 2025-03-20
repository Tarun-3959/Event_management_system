const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, optional: true },
    profilePicture: { type: String, optional: true }, // URL to profile image
    eventsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    eventsAttending: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
