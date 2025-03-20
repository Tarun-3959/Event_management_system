const cron = require("node-cron");
const eventModel = require("../models/event.model");

// Define the cron job to run at 1:00 AM every day
cron.schedule("0 1 * * *", async () => {
  try {
    // Calculate the date of yesterday
    const currentDate = new Date();
    const startOfYesterday = new Date(
      currentDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    startOfYesterday.setHours(0, 0, 0, 0); // Set to the start of yesterday
    const endOfYesterday = new Date(startOfYesterday);
    endOfYesterday.setHours(23, 59, 59, 999); // Set to the end of yesterday

    // Delete events that happened yesterday
    const deletedEvents = await eventModel.deleteMany({
      dateTime: {
        $gte: startOfYesterday,
        $lt: endOfYesterday,
      },
    });

    console.log("deleted events from yesterday:", deletedEvents);
  } catch (error) {
    console.error("Error deleting events from yesterday:\n", error);
  }
});
