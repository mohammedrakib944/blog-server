import { check } from "express-validator";

const userLoginValidator = [
  check("name").notEmpty().withMessage("name"),
  check("email").isEmail().withMessage("email is not valid!"),
];

const userUpdateValidator = [
  check("name").notEmpty().withMessage("name"),
  check("occupation").notEmpty().withMessage("occupation"),
  check("is_banned").notEmpty().withMessage("is_banned"),
];

export default {
  userLoginValidator,
  userUpdateValidator,
};
