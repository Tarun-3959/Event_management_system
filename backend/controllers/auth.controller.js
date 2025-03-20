require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");

const signUp = async (req, res) => {
  try {
    const { email, password, fullName, phone } = req.body;
    let user = await userModel.findOne({ email: email });
    console.log(user);
    if (user) return res.status(400).json({ message: "user already exits" });
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);
    user = await userModel.create({
      email,
      password: hashedPass,
      fullName,
      phone,
    });
    res.status(201).json({ message: "user created successfully", user });
  } catch (error) {
    console.log("error occured during signUp\n", error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const accessToken = jwt.sign(
        { email: user.email },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "24h" }
      );
      const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: "7d" }
      );
      return res.status(200).json({
        message: "user logged in successfully",
        accessToken,
        refreshToken,
      });
    }
    res.status(404).json({ message: "invalid email or password" });
  } catch (error) {
    console.log("error occured during signIn\n", error);
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = { signUp, signIn };
