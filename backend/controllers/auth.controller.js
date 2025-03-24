require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");

const signUp = async (req, res) => {
  try {
    let { email, password, fullName, phone } = req.body;
    email = email.toLowerCase();
    let user = await userModel.findOne({ email: email });
    console.log(user);
    if (user) {
      return res.status(400).json({ message: "email already exists" });
    }
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
    let { email, password } = req.body;
    email = email.toLowerCase();
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
        userInfo: {
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          profilePicture: user.profilePicture,
        },
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

const forgetPassword = async (req, res) => {
  try {
    let { email } = req.body;
    email = email?.toLowerCase();
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error_message: "email not found" });
    }
    const token = jwt.sign({ email }, process.env.FORGET_PASSWORD_KEY, {
      expiresIn: "15m",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: "Forget Password",
      html: `<h1>Click on the link to reset your password</h1><p>${process.env.CLIENT_URL}/reset-password/${token}</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error occured during sending mail\n", error);
        return res.status(500).json({ error_message: "something went wrong" });
      }
      res.status(200).json({ message: "reset password link sent to email" });
    });
  } catch (error) {
    console.log("error occured during forgetPassword\n", error);
    res.status(500).json({ error_message: "something went wrong" });
  }
};

const resetPassword = async (req, res) => {
  try {
    let { token } = req.params;
    const { email } = jwt.verify(token, process.env.FORGET_PASSWORD_KEY);
    res.render("forgetPassword", { email, status: "pending" });
  } catch (error) {
    console.log("error occured during resetPassword\n", error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const resetPasswordMain = async (req, res) => {
  try {
    let { token } = req.params;
    let { password, confirmPassword } = req.body;
    console.log("password:", password);
    console.log("comfirmPassword:", confirmPassword);
    if (password !== confirmPassword) {
      return res.status(400).json({ error_message: "passwords do not match" });
    }
    const { email } = jwt.verify(token, process.env.FORGET_PASSWORD_KEY);
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);
    user = await userModel.updateOne(
      { email: email },
      { password: hashedPass },
      { new: true }
    );
    res.render("forgetPassword", {
      email,
      status: "done",
    });
  } catch (error) {
    console.log("error occured during resetPassword\n", error);
    res.status(500).json({ error_message: "something went wrong" });
  }
};
module.exports = {
  signUp,
  signIn,
  forgetPassword,
  resetPassword,
  resetPasswordMain,
};
