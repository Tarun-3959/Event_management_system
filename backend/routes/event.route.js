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

eventRouter.post("/create", createEvent);
eventRouter.delete("/delete", deleteEvent);
eventRouter.put("/update", updateEvent);
eventRouter.get("/get", getEvent);
eventRouter.get("/get-by-creator/:creatorId", getEventsByCreator);
eventRouter.get("/get-by-attendee/:attendeeId", getEventsByAttendee);
eventRouter.get("/get-all", getAllEvents);

module.exports = eventRouter;
