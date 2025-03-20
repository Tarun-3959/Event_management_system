const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMD = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("request come here\n", token);
  let secreteKey = process.env.ACCESS_TOKEN_KEY;
  if (req.url === "/refresh-token") secreteKey = process.env.REFRESH_TOKEN_KEY;
  console.log("secrete key is\n", secreteKey);
  jwt.verify(token, secreteKey, function (err, decoded) {
    if (err) return res.status(400).json({ message: "invalid token" });
    console.log(decoded);
    req.userEmail = decoded.email;
    next();
  });
};

module.exports = { authMD };
