const { Router } = require("express");
const { signIn, signUp } = require("../controllers/auth.controller");
const { authMD } = require("../middlewares/auth.middleware");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authRouter = Router();
authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/refresh-token", authMD, (req, res) => {
  const email = req.userEmail;
  console.log(email);
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "24h",
  });
  res.status(200).json({ accessToken: token });
});
module.exports = authRouter;
