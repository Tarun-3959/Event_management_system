const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    invitedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["sent", "accepted", "declined", "expired"],
      default: "sent",
    },
    invitationDate: { type: Date, default: Date.now },
    responseDate: { type: Date, optional: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invitation", invitationSchema);
