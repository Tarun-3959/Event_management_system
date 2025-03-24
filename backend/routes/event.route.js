const { Router } = require("express");
const {
  createEvent,
  deleteEvent,
  updateEvent,
  getEvent,
  getEventsByCreator,
  getEventsByAttendee,
  getAllEvents,
} = require("../controllers/event.controller");
const eventRouter = Router();
const { authMD } = require("../middlewares/auth.middleware");
eventRouter.get("/get-all", getAllEvents);

eventRouter.post("/create", authMD, createEvent);
eventRouter.delete("/delete", authMD, deleteEvent);
eventRouter.put("/update", authMD, updateEvent);
eventRouter.get("/get", getEvent);
eventRouter.get("/get-by-creator/:creatorId", authMD, getEventsByCreator);
eventRouter.get("/get-by-attendee/:attendeeId", authMD, getEventsByAttendee);

module.exports = eventRouter;
