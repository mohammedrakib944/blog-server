import { validationResult } from "express-validator";

// input validation Result
const validationOutput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.errors.map((err) => err.msg);
    const errorMsgString = errorArray.join(", ");
    next(errorMsgString);
  }
  next();
};

export default validationOutput;
