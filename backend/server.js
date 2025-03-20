const express = require("express");
const authRouter = require("./routes/auth.route");
const connectDB = require("./config/database.connection");
const eventRouter = require("./routes/event.route");
const { authMD } = require("./middlewares/auth.middleware");
require("./cron-jobs/deleteOldEvents");

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/event", authMD, eventRouter);

app.listen(3000, async () => {
  await connectDB();
  console.log("server is running on port 3000...");
});
