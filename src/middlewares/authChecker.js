const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const jwtSecret = process.env.JWT_SECRET || "Rakib@123!";

const authChecker = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw createError(401, "No token found!");
  }

  jwt.verify(token, jwtSecret, (err) => {
    if (err) {
      throw createError("You are unauthorized!");
    } else {
      // If everything is ok Go to next function
      next();
    }
  });
};

export default authChecker;
