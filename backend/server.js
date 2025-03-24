const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const connectDB = require("./config/database.connection");
const eventRouter = require("./routes/event.route");
const { authMD } = require("./middlewares/auth.middleware");

require("./cron-jobs/deleteOldEvents");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/event", eventRouter);

app.listen(3000, async () => {
  await connectDB();
  console.log("server is running on port 3000...");
});
