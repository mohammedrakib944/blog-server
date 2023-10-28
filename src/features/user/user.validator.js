import { check } from "express-validator";

const userLoginValidator = [
  check("name").notEmpty().withMessage("name is required!"),
  check("email").isEmail().withMessage("email is not valid!"),
];

const userUpdateValidator = [
  check("name").notEmpty().withMessage("name is required!"),
  check("is_banned").notEmpty().withMessage("is_banned is required!"),
];

export default {
  userLoginValidator,
  userUpdateValidator,
};
