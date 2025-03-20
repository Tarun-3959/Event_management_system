const eventModel = require("../models/event.model");
const userModel = require("../models/user.model");

const createEvent = async (req, res) => {
  try {
    const userId = req.body.creator;
    const user = await userModel.findOne({ _id: userId });
    if (user) {
      const event = await eventModel.create(req.body);
      return res.status(201).json({ message: "event is created", event });
    }
    res.status(400).json({ message: "user not found" });
  } catch (err) {
    console.log("error is occured during creating event\n", err);
    res.status(500).json({ message: "something went wrong" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await eventModel.findOne({ _id: req.body.eventId });
    if (event) {
      if (event.creator !== req.body.creatorId) {
        return res
          .status(400)
          .json({ message: "only creator can delete the event!" });
      }
      await eventModel.deleteOne({ _id: req.body.eventId });

      // Remove the event reference from the user document
      await userModel.updateOne(
        { _id: req.body.creatorId },
        { $pull: { eventsCreated: req.body.eventId } }
      );

      return res.status(200).json({ message: "event is deleted" });
    }
    res.status(400).json({ message: "event not found" });
  } catch (err) {
    console.log("error occurred during deleting event\n", err);
    res.status(500).json({ message: "something went wrong" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await eventModel.findOne({ _id: req.body.eventId });
    if (event) {
      if (event.creator !== req.body.creatorId) {
        return res
          .status(400)
          .json({ message: "only creator can delete the event!" });
      }
      await eventModel.updateOne({ _id: req.body.eventId }, { $set: req.body });
      return res.status(200).json({ message: "event is updated" });
    }
    res.status(400).json({ message: "event not found" });
  } catch (err) {
    console.log("error occurred during updating a event\n", err);
    res.status(500).json({ message: "something went wrong" });
  }
};
const getEvent = async (req, res) => {
  try {
    const event = await eventModel.findOne({ _id: req.params.eventId });
    if (event) return res.status(200).json({ event });
    res.status(400).json({ message: "event not found" });
  } catch (err) {
    console.log("error is occured during getting a event\n", err);
    res.status(500).json({ message: "something went wrong" });
  }
};

const getEventsByCreator = async (req, res) => {
  try {
    const events = await eventModel.find({ creator: req.params.creatorId });
    if (events) return res.status(200).json({ events });
    res.status(400).json({ message: "events not found" });
  } catch (err) {
    console.log("error is occured during getting a events of creator\n", err);
    res.status(500).json({ message: "something went wrong" });
  }
};

const getEventsByAttendee = async (req, res) => {
  try {
    const events = await eventModel.find({ attendees: req.params.attendeeId });
    if (events) return res.status(200).json({ events });
    res.status(400).json({ message: "events not found" });
  } catch (err) {
    console.log("error is occured during getting a events of attendee\n", err);
    res.status(500).json({ message: "something went wrong" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find();
    if (events) return res.status(200).json({ events });
    res.status(400).json({ message: "events not found" });
  } catch (err) {
    console.log("error is occured during getting all events\n", err);
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = {
  createEvent,
  deleteEvent,
  updateEvent,
  getEvent,
  getEventsByCreator,
  getEventsByAttendee,
  getAllEvents,
};
