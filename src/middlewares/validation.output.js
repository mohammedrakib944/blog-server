import { validationResult } from "express-validator";

// input validation Result
const validationOutput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.errors.map((err) => err.msg);
    let errorMsgString = errorArray.join(", ");
    errorMsgString += " - required!";
    next(errorMsgString);
  }
  next();
};

export default validationOutput;
